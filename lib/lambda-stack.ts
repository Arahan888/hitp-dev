import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as lambda from  'aws-cdk-lib/aws-lambda';
import * as ec2 from  'aws-cdk-lib/aws-ec2';
import * as iam from 'aws-cdk-lib/aws-iam';


export interface HITPStackProps extends cdk.StackProps {
  readonly stage: string;
}

export class lambdaStack extends cdk.Stack {
    constructor(scope: Construct, id: string, props?: HITPStackProps) {
      super(scope, id, props);
      const stage = props?.stage || 'default';

          //Lambda Function 
    // const lambdatest = new lambda.Function(this, 'testlogicalid', {
    //     handler:'lambda_function.lambda_handler',
    //     runtime: lambda.Runtime.PYTHON_3_11,
    //     code: lambda.Code.fromAsset('./services/'),
    //     functionName: 'testlambda',
    //     //vpc:getExistingVpc
    //   });
    //const getExistingVpc = ec2.Vpc.fromLookup(this, "VPC", { vpcName: "HITP-SIT" });

    // const demolambda = new lambda.Function(this, 'LambdaFunction', {
    //   runtime: lambda.Runtime.NODEJS_14_X,
    //   handler: 'index.handler',
    //   code: lambda.Code.fromInline('exports.handler = _ => "Hello, CDK";')
    // });
  //   const lambdaVPCExecutionRole = new iam.Role(this, `createLambdaVPCExecutionRole`, {
  //     roleName        : `lambdaVPCExecutionRole`,
  //     assumedBy       : new iam.ServicePrincipal(`lambda.amazonaws.com`),
  //     description     : `Lambda service role to operate within a VPC`,
  // });
  // lambdaVPCExecutionRole.addManagedPolicy(iam.ManagedPolicy.fromAwsManagedPolicyName('AmazonS3FullAccess'));
  // lambdaVPCExecutionRole.addManagedPolicy(iam.ManagedPolicy.fromAwsManagedPolicyName("service-role/AWSLambdaVPCAccessExecutionRole"));



  
      const lambdaretrievevitals = new lambda.Function(this, 'lambdaretrievevitalsid', {
        handler:'lambda_retrievevitals.retrievevitals',
        runtime: lambda.Runtime.PYTHON_3_11,
        code: lambda.Code.fromAsset('./services/'),
        functionName: stage+'lambdaretrievevitals',

        //handler: 'index.handler',
        //code: lambda.Code.fromInline('exports.handler = _ => "Hello, CDK";')
        //role: lambdaVPCExecutionRole,
        //vpc:getExistingVpc
      });

    }
}     