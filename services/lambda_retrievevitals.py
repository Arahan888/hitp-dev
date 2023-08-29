import json
import boto3
from boto3.dynamodb.conditions import Key
import os   
dynamodb = boto3.resource('dynamodb')
  
def retrievevitals(event, context):

    DynamoDBName = os.environ['DynamoDB']
    #response = client.get_object( Bucket=s3Bucket, Key='Test.json')

    #convert from streaming data to byte
    #data_byte = response['Body'].read()
    #convert from bytes to strings
    #data_string = data_byte.decode("UTF-8")
    #convert from json string to dictionary
    table = dynamodb.Table(DynamoDBName)
    
    #data = table.get_item(Key={'NRIC':'S1234567A','TimeTaken':'2023-08-25 19:00:00'})
    
    data = table.query(
        KeyConditionExpression=Key('NRIC').eq('S1234567A')
    )

    response = {
        'statusCode': 200,
        'body': json.dumps(data),
        'headers': {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        },
    }
    
    return response