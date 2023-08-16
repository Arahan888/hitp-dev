import { CfnOutput, Stage, StageProps } from 'aws-cdk-lib';
import { Construct } from "constructs";
import { lambdaStack } from './lambda-stack';

export class PipelineAppStage extends Stage {
  public readonly urlOutput: CfnOutput;

  constructor(scope: Construct, id: string, props: StageProps) {
      super(scope, id, props);
  
      const demolambdaStack = new lambdaStack(this, 'LambdaStack' , {stage:id});      
    }
}