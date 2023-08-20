import * as cdk from 'aws-cdk-lib';
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
   // const getExistingVpc = ec2.Vpc.fromLookup(this, `VPC`, { vpcName: `HITP-test` });

   const getExistingVpc = ec2.Vpc.fromVpcAttributes(this, 'HITP-test', {
    vpcId:'vpc-004d47910b7828d4b',
    availabilityZones: ['ap-southeast-1a','ap-southeast-1b','ap-southeast-1c'],
    publicSubnetIds: ['subnet-0b0364ac00c60598f','subnet-02e3efcce7320ece7','subnet-02f8738f3c3387c69']
});

    // const demolambda = new lambda.Function(this, 'LambdaFunction', {
    //   runtime: lambda.Runtime.NODEJS_14_X,
    //   handler: 'index.handler',
    //   code: lambda.Code.fromInline('exports.handler = _ => "Hello, CDK";')
    // });
    const lambdaVPCExecutionRole = new iam.Role(this, `createLambdaVPCExecutionRole-${stagename}`, {
      roleName        : `lambdaVPCExecutionRole-${stagename}`,
      assumedBy       : new iam.ServicePrincipal(`lambda.amazonaws.com`),
      description     : `Lambda service role to operate within a VPC`,
  });
  lambdaVPCExecutionRole.addManagedPolicy(iam.ManagedPolicy.fromAwsManagedPolicyName('AmazonS3FullAccess'));
  lambdaVPCExecutionRole.addManagedPolicy(iam.ManagedPolicy.fromAwsManagedPolicyName("service-role/AWSLambdaVPCAccessExecutionRole"));



  
      const lambdaretrievevitals = new lambda.Function(this, `lambdaretrievevitalsid-${stagename}`, {
        handler:'lambda_retrievevitals.retrievevitals',
        runtime: lambda.Runtime.PYTHON_3_11,
        code: lambda.Code.fromAsset('./services/'),
        functionName: `lambdaretrievevitals-${stagename}`,
        role: lambdaVPCExecutionRole,
        vpc:getExistingVpc,

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