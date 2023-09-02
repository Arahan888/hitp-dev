
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
#patchMethod = 'PATCH'
deleteMethod = 'DELETE'
vitalsPath = '/vitals'
patientPath = '/student'
#studentsPath = '/students'



def vitals(event, contest):

   # logger.info(event)
    #httpMethod = event.get('operation')
    path = event['path']

    json_data = json.loads(event['body'])
    httpMethod = json_data['operation']
    vitals_data = json_data['payload']
    
    #clientdata_dict = json.loads(json_data.read().decode('utf-8'))

    #print(json_data['NRIC'])
    #if httpMethod == 'Get':
    response = getVitals(vitals_data['NRIC'])
    #elif httpMethod == 'Put' :
    #    response = saveVitals(json_data)
    #else:
    #    response = buildResponse(404, 'Not Found')

    return response


def getVitals(patientId):
    try:
        response = table.query(
            KeyConditionExpression=Key('NRIC').eq(patientId)
        )
        
        if 'Items' in response:
            return buildResponse(200, response['Items'])
        else:
            return buildResponse(404, {'Message': 'Patient Vital/s not found' })
    except:
        logger.exception('Log it here for now')


def saveVitals(requestBody):
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



# from decimal import Decimal

# class CustomEncoder(json.JSONEncoder):
#     def default(self, obj):
#         if isinstance(obj, Decimal):
#             return float(obj)

#         return json.JSONEncoder.default(self, obj)