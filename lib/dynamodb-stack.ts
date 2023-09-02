import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as dynamodb from 'aws-cdk-lib/aws-dynamodb';
import * as appScaling from 'aws-cdk-lib/aws-applicationautoscaling';

export interface HITPStackProps extends cdk.StackProps {
    readonly stage: string;
  }
  
  export class dynamodbStack extends cdk.Stack {
      constructor(scope: Construct, id: string, props?: HITPStackProps) {
        super(scope, id, props);
        const stagename = props?.stage || 'default';
  
  
    
      //Dynamo table for Audit
      const dynamodbAudit = new dynamodb.Table(this, 'audittableid-'+stagename, {
        readCapacity:3,
        writeCapacity:3,
        partitionKey:{name:'actionid',type:dynamodb.AttributeType.NUMBER},
        tableName: 'audittable-'+stagename,
        removalPolicy: cdk.RemovalPolicy.DESTROY,
      });
    
      const readAuditScaling = dynamodbAudit.autoScaleReadCapacity({ minCapacity: 1, maxCapacity: 10 })
      readAuditScaling.scaleOnUtilization({
        targetUtilizationPercent: 65
      })
      const writeAuditScaling = dynamodbAudit.autoScaleWriteCapacity({ minCapacity: 1, maxCapacity: 10 })
      writeAuditScaling.scaleOnUtilization({
        targetUtilizationPercent: 65
      })
      writeAuditScaling.scaleOnSchedule('ScaleUpInMorning', {
        schedule: appScaling.Schedule.cron({hour: '5', minute: '30'}),
        maxCapacity: 10,
        minCapacity: 5,
      })
      writeAuditScaling.scaleOnSchedule('ScaleDownInNight', {
        schedule: appScaling.Schedule.cron( { hour: '00', minute: '00' }),
        maxCapacity: 5,
        minCapacity: 1,
      })
  

      //Dynamo table for Patient Vitals
      const dynamodbPatientVitals = new dynamodb.Table(this, 'patientvitalsid-'+stagename, {
        readCapacity:3,
        writeCapacity:3,
        partitionKey:{name:'NRIC',type:dynamodb.AttributeType.STRING},
        sortKey:{name:'TimeTaken',type:dynamodb.AttributeType.STRING},
        tableName: 'patientvitals-'+stagename,
        removalPolicy: cdk.RemovalPolicy.DESTROY,
      });
    
      const readVitalsScaling = dynamodbPatientVitals.autoScaleReadCapacity({ minCapacity: 1, maxCapacity: 10 })
      readVitalsScaling.scaleOnUtilization({
        targetUtilizationPercent: 65
      })
      const writeVitalsScaling = dynamodbPatientVitals.autoScaleWriteCapacity({ minCapacity: 1, maxCapacity: 10 })
      writeVitalsScaling.scaleOnUtilization({
        targetUtilizationPercent: 70
      })
      writeVitalsScaling.scaleOnSchedule('ScaleUpInMorning', {
        schedule: appScaling.Schedule.cron({hour: '5', minute: '30'}),
        maxCapacity: 10,
        minCapacity: 5,
      })
      writeVitalsScaling.scaleOnSchedule('ScaleDownInNight', {
        schedule: appScaling.Schedule.cron( { hour: '00', minute: '00' }),
        maxCapacity: 5,
        minCapacity: 1,
      })


      //Dynamo table for Patient Details
      const dynamodbPatientDetails = new dynamodb.Table(this, 'patientdetailsid-'+stagename, {
        readCapacity:3,
        writeCapacity:3,
        partitionKey:{name:'NRIC',type:dynamodb.AttributeType.STRING},
        tableName: 'patientdetails-'+stagename,
        removalPolicy: cdk.RemovalPolicy.DESTROY,
      });
    
      const readPatientDetailsScaling = dynamodbPatientDetails.autoScaleReadCapacity({ minCapacity: 1, maxCapacity: 10 })
      readPatientDetailsScaling.scaleOnUtilization({
        targetUtilizationPercent: 70
      })
      const writePatientDetailsScaling = dynamodbPatientDetails.autoScaleWriteCapacity({ minCapacity: 1, maxCapacity: 10 })
      writePatientDetailsScaling.scaleOnUtilization({
        targetUtilizationPercent: 70
      })
      writePatientDetailsScaling.scaleOnSchedule('ScaleUpInMorning', {
        schedule: appScaling.Schedule.cron({hour: '5', minute: '30'}),
        maxCapacity: 10,
        minCapacity: 5,
      })
      writePatientDetailsScaling.scaleOnSchedule('ScaleDownInNight', {
        schedule: appScaling.Schedule.cron( { hour: '00', minute: '00' }),
        maxCapacity: 5,
        minCapacity: 1,
      })


      }
  }     