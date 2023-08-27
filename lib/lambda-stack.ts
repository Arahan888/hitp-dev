import * as cdk from 'aws-cdk-lib';
import * as cdkcore from 'aws-cdk-lib/core';
import { Construct } from 'constructs';
import * as lambda from  'aws-cdk-lib/aws-lambda';
import * as ec2 from  'aws-cdk-lib/aws-ec2';
import * as iam from 'aws-cdk-lib/aws-iam';
import * as cloudwatch from 'aws-cdk-lib/aws-cloudwatch';

export interface HITPStackProps extends cdk.StackProps {
  readonly stage: string;
}

export class lambdaStack extends cdk.Stack {
    constructor(scope: Construct, id: string, props?: HITPStackProps) {
      super(scope, id, props);
      const stagename = props?.stage || 'default';

          //Lambda Function 
    // const lambdatest = new lambda.Function(this, 'testlogicalid', {
    //     handler:'lambda_function.lambda_handler',
    //     runtime: lambda.Runtime.PYTHON_3_11,
    //     code: lambda.Code.fromAsset('./services/'),
    //     functionName: 'testlambda',
    //     //vpc:getExistingVpc
    //   });
   const getExistingVpc = ec2.Vpc.fromLookup(this, `VPC-${stagename}`, { vpcName: `HITP-${stagename}` });
  
//    const getExistingTestVpc = ec2.Vpc.fromVpcAttributes(this, 'HITP-test', {
//     vpcId:'vpc-0b828649733458d5a',
//     availabilityZones: ['ap-southeast-1a','ap-southeast-1b','ap-southeast-1c'],
//    // publicSubnetIds: ['subnet-0183c2e0f5154e250','subnet-0a434094a9bbfe3b3','subnet-0bc0da1e916e56521']
//     privateSubnetIds: ['subnet-030dc571a75a456fe','subnet-0cb1831be44095ed8','subnet-008b54d4205875805']
// });


// const getExistingProdVpc = ec2.Vpc.fromVpcAttributes(this, 'HITP-prod', {
//   vpcId:'vpc-0632cc682151dc451',
//   availabilityZones: ['ap-southeast-1a','ap-southeast-1b','ap-southeast-1c'],
//  // publicSubnetIds: ['subnet-0183c2e0f5154e250','subnet-0a434094a9bbfe3b3','subnet-0bc0da1e916e56521']
//   privateSubnetIds: ['subnet-0899e8ad5dfd40e1b','subnet-04b7d85280c5a1700','subnet-068db935ab09e8e4d']
// });


  // const bucketName = cdkcore.Fn.conditionIf(
  //   "UseProdVPC",
  //   const prodVPC = getExistingVpc,
  //   "app-beta-bucket"
  // );
  
  // const Bucket = s3.Bucket.import(this, "AppBucket", {
  //   bucketName
  // });




   



    // const demolambda = new lambda.Function(this, 'LambdaFunction', {
    //   runtime: lambda.Runtime.NODEJS_14_X,
    //   handler: 'index.handler',
    //   code: lambda.Code.fromInline('exports.handler = _ => "Hello, CDK";')
    // });
    const lambdaVPCExecutionRole = new iam.Role(this, `createLambdaRetrieveExecutionRole-${stagename}`, {
      roleName        : `lambdaRetrieveExecutionRole-${stagename}`,
      assumedBy       : new iam.ServicePrincipal(`lambda.amazonaws.com`),
      description     : `Lambda service role to operate within a VPC`,
  });
  lambdaVPCExecutionRole.addManagedPolicy(iam.ManagedPolicy.fromAwsManagedPolicyName('AmazonS3FullAccess'));
  lambdaVPCExecutionRole.addManagedPolicy(iam.ManagedPolicy.fromAwsManagedPolicyName('AmazonDynamoDBFullAccess'));
  lambdaVPCExecutionRole.addManagedPolicy(iam.ManagedPolicy.fromAwsManagedPolicyName("service-role/AWSLambdaVPCAccessExecutionRole"));



  
      const lambdaretrievevitals = new lambda.Function(this, `lambdaretrievepatientvitalsid-${stagename}`, {
        handler:'lambda_retrievevitals.retrievevitals',
        runtime: lambda.Runtime.PYTHON_3_11,
        code: lambda.Code.fromAsset('./services/'),
        functionName: `lambdaretrievepatientvitals-${stagename}`,
        role: lambdaVPCExecutionRole,
       // vpc:getExistingTestVpc,
       vpc: getExistingVpc,
       // allowPublicSubnet:true,
        environment: {
          ENV: stagename,
          S3Bucket: "s3unittestdata-"+stagename,
        }
      });


    //Cloudwatch Alarms
    const cloudwatchlambda = new cloudwatch.Alarm(this, 'cloudwatchlambdaid',{
      evaluationPeriods:1,
      threshold:1,
      metric:lambdaretrievevitals.metricErrors()
    });

    }
}     