import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as ec2 from 'aws-cdk-lib/aws-ec2';

export interface HITPStackProps extends cdk.StackProps {
  readonly stage: string;
}

export class vpcStack extends cdk.Stack {
    constructor(scope: Construct, id: string, props?: HITPStackProps) {
      super(scope, id, props);
      const stagename = props?.stage || 'default';


  
    //VPC and Subnets
    const HITPVPC = new ec2.Vpc(this, 'HITPVPC-'+stagename, {
      vpcName: 'HITP-'+stagename,
      ipAddresses:ec2.IpAddresses.cidr('10.0.0.0/16'),
      natGateways:0
    })
   //const vpcname = props.vpc

    const HITPSG = new ec2.SecurityGroup(this, 'HITPSG-'+stagename, {
      vpc:HITPVPC,
      securityGroupName: 'Allow HTTP Traffic',
      allowAllOutbound: true

    });
    HITPSG.addIngressRule(ec2.Peer.anyIpv4(), ec2.Port.tcp(80), 'allow http traffic')
  
  

    }
}     