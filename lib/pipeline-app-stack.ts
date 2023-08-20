import { CfnOutput, Stage, StageProps } from 'aws-cdk-lib';
import { Construct } from "constructs";
import { lambdaStack } from './lambda-stack';
import { s3Stack } from './s3-stack';
import { apigwStack } from './apigw-stack';
import { vpcStack } from './vpc-stack';

export class PipelineAppStage extends Stage {
  public readonly urlOutput: CfnOutput;

  constructor(scope: Construct, id: string, props: StageProps) {
      super(scope, id, props);
  
      //const HitpvpcStack = new vpcStack(this, 'VPCStack' , {stage:id});   
      const HitplambdaStack = new lambdaStack(this, 'LambdaStack' , {stage:id});      
      const Hitps3Stack = new s3Stack(this, 'S3Stack' , {stage:id});    
      const HitpapigwStack = new apigwStack(this, 'ApigwStack' , {stage:id});    
    }
}