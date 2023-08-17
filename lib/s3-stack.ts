import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as s3 from 'aws-cdk-lib/aws-s3';
import * as ec2 from  'aws-cdk-lib/aws-ec2';
import * as iam from 'aws-cdk-lib/aws-iam';


export interface HITPStackProps extends cdk.StackProps {
  readonly stage: string;
}

export class s3Stack extends cdk.Stack {
    constructor(scope: Construct, id: string, props?: HITPStackProps) {
      super(scope, id, props);
      const stagename = props?.stage || 'default';


  
      //S3 Bucket

    const s3SPAStaticPageBucket = new s3.Bucket(this, 's3spastaticpageid-'+stagename,{
        bucketName: 's3spastaticpage-'+stagename,
        versioned: true,
        publicReadAccess: false,
        removalPolicy: cdk.RemovalPolicy.DESTROY,
        autoDeleteObjects: true,
        
        
      });
  
      const s3UnitTestData = new s3.Bucket(this, 's3unittestdataid-'+stagename,{
        bucketName: 's3unittestdata'+stagename,
        versioned: true,
        publicReadAccess: false,
        removalPolicy: cdk.RemovalPolicy.DESTROY,
        autoDeleteObjects: true
      });
  
  

    }
}     