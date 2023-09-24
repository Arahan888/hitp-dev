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
  

    const lambdaVPCExecutionRole = new iam.Role(this, `createLambdaGenericExecutionRole-${stagename}`, {
      roleName        : `lambdaGenericExecutionRole-${stagename}`,
      assumedBy       : new iam.ServicePrincipal(`lambda.amazonaws.com`),
      description     : `Lambda service role to operate within a VPC`,
  });
  lambdaVPCExecutionRole.addManagedPolicy(iam.ManagedPolicy.fromAwsManagedPolicyName('AmazonS3FullAccess'));
  lambdaVPCExecutionRole.addManagedPolicy(iam.ManagedPolicy.fromAwsManagedPolicyName('AmazonDynamoDBFullAccess'));
  lambdaVPCExecutionRole.addManagedPolicy(iam.ManagedPolicy.fromAwsManagedPolicyName("service-role/AWSLambdaVPCAccessExecutionRole"));



  
    //   const lambdaretrievevitals = new lambda.Function(this, `lambdaretrievepatientvitalsid-${stagename}`, {
    //     handler:'lambda_retrievevitals.retrievevitals',
    //     runtime: lambda.Runtime.PYTHON_3_11,
    //     code: lambda.Code.fromAsset('./services/'),
    //     functionName: `lambdaretrievepatientvitals-${stagename}`,
    //     role: lambdaVPCExecutionRole,
    //    // vpc:getExistingTestVpc,
    //   vpc: getExistingVpc,
    //   vpcSubnets: getExistingVpc.selectSubnets({
    //    subnetType: ec2.SubnetType.PRIVATE_WITH_EGRESS,
    //  }),
    //    // allowPublicSubnet:true,
    //     environment: {
    //       ENV: stagename,
    //       S3Bucket: "s3unittestdata-"+stagename,
    //       DynamoDB: "patientvitals-"+stagename
    //     }
    //   });


    //   const lambdasavevitals = new lambda.Function(this, `lambdasavepatientvitalsid-${stagename}`, {
    //     handler:'lambda_savevitals.savevitals',
    //     runtime: lambda.Runtime.PYTHON_3_11,
    //     code: lambda.Code.fromAsset('./services/'),
    //     functionName: `lambdasavepatientvitals-${stagename}`,
    //     role: lambdaVPCExecutionRole,
    //    // vpc:getExistingTestVpc,
    //    vpc: getExistingVpc,
    //    vpcSubnets: getExistingVpc.selectSubnets({
    //     subnetType: ec2.SubnetType.PRIVATE_WITH_EGRESS,
    //   }),
    //    // allowPublicSubnet:true,
    //     environment: {
    //       ENV: stagename,
    //       S3Bucket: "s3unittestdata-"+stagename,
    //       DynamoDB: "patientvitals-"+stagename,
    //     }
    //   });




    const lambdavitals = new lambda.Function(this, `lambdapatientvitalsid-${stagename}`, {
      handler:'lambda_vitals.vitals',
      runtime: lambda.Runtime.PYTHON_3_11,
      code: lambda.Code.fromAsset('./services/'),
      functionName: `lambdapatientvitals-${stagename}`,
      role: lambdaVPCExecutionRole,
     // vpc:getExistingTestVpc,
     vpc: getExistingVpc,
     vpcSubnets: getExistingVpc.selectSubnets({
      subnetType: ec2.SubnetType.PRIVATE_WITH_EGRESS,
    }),
     // allowPublicSubnet:true,
      environment: {
        ENV: stagename,
        S3Bucket: "s3unittestdata-"+stagename,
        DynamoDB: "patientvitals-"+stagename,
      }
    });

      //Cloudwatch Alarms
  const cloudwatchlambda = new cloudwatch.Alarm(this, 'cloudwatchlambdavitalsid-'+stagename,{
    evaluationPeriods:1,
    threshold:1,
    metric:lambdavitals.metricErrors(), 
  });

    const lambdapatientdetails = new lambda.Function(this, `lambdapatientdetailsid-${stagename}`, {
      handler:'lambda_patientdetails.patientdetails',
      runtime: lambda.Runtime.PYTHON_3_11,
      code: lambda.Code.fromAsset('./services/'),
      functionName: `lambdapatientdetails-${stagename}`,
      role: lambdaVPCExecutionRole,
     // vpc:getExistingTestVpc,
     vpc: getExistingVpc,
     vpcSubnets: getExistingVpc.selectSubnets({
      subnetType: ec2.SubnetType.PRIVATE_WITH_EGRESS,
    }),
     // allowPublicSubnet:true,
      environment: {
        ENV: stagename,
        S3Bucket: "s3unittestdata-"+stagename,
        DynamoDB: "patientdetails-"+stagename,
      }
    });

  //Cloudwatch Alarms
  const cloudwatchpatientlambda = new cloudwatch.Alarm(this, 'cloudwatchpatientlambdaid-'+stagename,{
    evaluationPeriods:1,
    threshold:1,
    metric:lambdapatientdetails.metricErrors(), 
  });



    }
}     