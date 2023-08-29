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
    #print(json_data)
    #print(type(json_data))
    #convert data from byte to string
    data_string = json_data.decode('UTF-8')
    print(data_string)
    #print(type(data_string))
    # convert from json string to dictionary
    data_dict =json.loads(data_string)

    
    #insert data to dynamodb
    table = dynamodb.Table(DynamoDB)
    table.put_item(Item=json_data)