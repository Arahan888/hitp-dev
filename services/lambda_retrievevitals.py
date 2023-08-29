import json
import boto3
import os
dynamodb = boto3.resource('dynamodb')
  
client = boto3.client('s3')

def retrievevitals(event, context):
    s3Bucket = os.environ['S3Bucket']
    response = client.get_object( Bucket=s3Bucket, Key='Test.json')

    #convert from streaming data to byte
    data_byte = response['Body'].read()
    #convert from bytes to strings
    data_string = data_byte.decode("UTF-8")
    #convert from json string to dictionary


    return {
        'statusCode':200,
        'body': json.dumps(data_string),
        'headers' : {'Content-Type': 'application/json'},


    }