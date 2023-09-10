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


  
    const PatientVitalsLambda = lambda.Function.fromFunctionName(this, "patientvitalsLambda", "lambdapatientvitals-"+stagename);
    const PatientDetailsLambda = lambda.Function.fromFunctionName(this, "patientdetailsLambda", "lambdapatientdetails-"+stagename);

    //API Gateway
    const HITPVitalsAPI = new apigw.LambdaRestApi(this, 'hitppatientvitalsapiid-'+stagename, {
        handler: PatientVitalsLambda,
        restApiName: 'HITPPatientVitalsAPI-'+stagename,
        deploy: true,
        proxy: false,
        
  
      })
      const vitals = HITPVitalsAPI.root.addResource('vitals');
      vitals.addMethod('POST');
      //vitals.addMethod('PUT');
  
      const HITPPatientDetailsAPI = new apigw.LambdaRestApi(this, 'hitppatientdetailsapiid-'+stagename, {
        handler: PatientDetailsLambda,
        restApiName: 'HITPPatientDetailsAPI-'+stagename,
        deploy: true,
        proxy: false,
        
  
      })
      const pxdetails = HITPPatientDetailsAPI.root.addResource('patientdetails');
      pxdetails.addMethod('POST');
      //vitals.addMethod('PUT');

      // const HITPRetrieveVitalsAPI = new apigw.LambdaRestApi(this, 'hitpretrievepatientvitalsapiid-'+stagename, {
      //   handler: RetrieveVitalsLambda,
      //   restApiName: 'HITPRetrievePatientVitalsAPI-'+stagename,
      //   deploy: true,
      //   proxy: false,
        
  
      // })
      // const savevitals = HITPRetrieveVitalsAPI.root.addResource('vitals');
      // savevitals.addMethod('GET');      

    
  }     

}