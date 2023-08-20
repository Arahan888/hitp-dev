import json
import boto3
import os
  
client = boto3.client('s3')

def retrievevitals(event, context):
    s3Bucket = os.environ['S3Bucket']
    response = client.get_object( Bucket=s3Bucket, Key='Test.json')

    #convert from streaming data to byte
    data_byte = response['Body'].read()
    #convert from bytes to strings
    data_string = data_byte.decode("UTF-8")
    #convert from json string to dictionary
    data_dict = json.loads(data_string)
    s3Bucket = os.environ['AWS_REGION']
    return {
        'statusCode':200,
        'body': json.dumps(data_string),
        'headers' : {'Content-Type': 'application/json'},


    }