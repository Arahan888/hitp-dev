
import boto3
import json
#from custom_encoder import CustomEncoder
import logging 
import os   
from boto3.dynamodb.conditions import Key

logger = logging.getLogger()
logger.setLevel(logging.INFO)

DynamoDBName = os.environ['DynamoDB']

dynamodbTableName = DynamoDBName
dynamodb = boto3.resource('dynamodb')
table = dynamodb.Table(dynamodbTableName)


getMethod = 'GET'
postMethod = 'POST'
deleteMethod = 'DELETE'
vitalsPath = '/vitals'
patientPath = '/patient'


def patientdetails(event, contest):

   # logger.info(event)
    #httpMethod = event.get('operation')
    path = event['path']

    json_data = json.loads(event['body'])
    httpMethod = json_data['operation']
    patient_data = json_data['payload']
    
    #clientdata_dict = json.loads(json_data.read().decode('utf-8'))

    #print(json_data['NRIC'])
    if httpMethod == 'Get':
        response = getPxDetails(patient_data['NRIC'])
    elif httpMethod == 'Put' :
        response = savePxDetails(patient_data)
    else:
        response = buildResponse(404, 'Operation Not Found')

    return response


def getPxDetails(patientId):
    try:
        response = table.query(
            KeyConditionExpression=Key('NRIC').eq(patientId)
        )
        
        if 'Items' in response:
            if response['Items']:
                return buildResponse(200, response['Items'])
            else:
                return buildResponse(404, {'Message': 'Patient not found' })
        else:
            return buildResponse(404, {'Message': 'Patient not found' })
    except:
        logger.exception('Log it here for now')


def savePxDetails(requestBody):
    try:
        table.put_item(Item=requestBody)
        body = {
            'Operation': 'SAVE',
            'Message': 'SUCCESS',
            'Item': requestBody
        }
        return buildResponse(200, body)
    except:
        logger.exception('Log it here for now')



def buildResponse(statusCode, body=None):
    response = {
        'statusCode': statusCode,
        'body': json.dumps(body),
        'headers': {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        },
    }
    # if body is not None:
    #     response['body'] = json.dumps(body, cls=CustomEncoder)
    return response


