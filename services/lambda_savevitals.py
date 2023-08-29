import json
import boto3
import os

client = boto3.client('s3')
dynamodb = boto3.resource('dynamodb')

def savevitals(event, context):
    DynamoDB = os.environ['DynamoDB']
    #response = client.get_object( Bucket=s3Bucket, Key='Test.json')
# convert from streaming data to byte
    # json_data = response['Body'].read()

    json_data = event.get('payload')

    
    #insert data to dynamodb
    table = dynamodb.Table(DynamoDB)
    table.put_item(Item=json_data)