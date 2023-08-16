import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as lambda from  'aws-cdk-lib/aws-lambda';

export class lambdaStack extends cdk.Stack {
    constructor(scope: Construct, id: string, props?: cdk.StackProps) {
      super(scope, id, props);


          //Lambda Function 
    // const lambdatest = new lambda.Function(this, 'testlogicalid', {
    //     handler:'lambda_function.lambda_handler',
    //     runtime: lambda.Runtime.PYTHON_3_11,
    //     code: lambda.Code.fromAsset('./services/'),
    //     functionName: 'testlambda',
    //     //vpc:getExistingVpc
    //   });
  
  
      const lambdaretrievevitals = new lambda.Function(this, 'lambdaretrievevitalsid', {
        handler:'lambda_retrievevitals.retrievevitals',
        runtime: lambda.Runtime.PYTHON_3_11,
        code: lambda.Code.fromAsset('../services/'),
        functionName: 'lambdaretrievevitals',
        //role: lambdaVPCExecutionRole,
        //vpc:getExistingVpc
      });

    }
}     