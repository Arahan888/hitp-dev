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
  
    const demolambda = new lambda.Function(this, 'LambdaFunction', {
      runtime: lambda.Runtime.NODEJS_14_X,
      handler: 'index.handler',
      code: lambda.Code.fromInline('exports.handler = _ => "Hello, CDK";')
    });

      // const lambdaretrievevitals = new lambda.Function(this, 'lambdaretrievevitalsid', {
      //   handler:'lambda_retrievevitals.retrievevitals',
      //   runtime: lambda.Runtime.PYTHON_3_11,
      //   code: lambda.Code.fromAsset('./services/'),
      //   functionName: 'lambdaretrievevitals',
      //   //handler: 'index.handler',
      //   //code: lambda.Code.fromInline('exports.handler = _ => "Hello, CDK";')
      //   //role: lambdaVPCExecutionRole,
      //   //vpc:getExistingVpc
      // });

    }
}     