import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as lambda from  'aws-cdk-lib/aws-lambda';
import * as apigw from 'aws-cdk-lib/aws-apigateway';

export interface HITPStackProps extends cdk.StackProps {
  readonly stage: string;
}

export class apigwStack extends cdk.Stack {
    constructor(scope: Construct, id: string, props?: HITPStackProps) {
      super(scope, id, props);
      const stagename = props?.stage || 'default';


  
    const getExistingLambda = lambda.Function.fromFunctionName(this, "existingLambda", "lambdaretrievepatientvitals-"+stagename);

    //API Gateway
    const HITPRetrieveAPI = new apigw.LambdaRestApi(this, 'hitpretrievepatientvitalsapiid-'+stagename, {
        handler: getExistingLambda,
        restApiName: 'HITPRetrievePatientVitalsAPI-'+stagename,
        deploy: true,
        proxy: false,
        
  
      })
      const vitals = HITPRetrieveAPI.root.addResource('vitals-'+stagename);
      vitals.addMethod('GET');
  
  

    }
}     