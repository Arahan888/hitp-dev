import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { CodePipeline, CodePipelineSource, ShellStep } from 'aws-cdk-lib/pipelines';
import { PipelineAppStage } from './pipeline-app-stack';
import { ManualApprovalStep } from 'aws-cdk-lib/pipelines';


export class HitpDevStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const hitppipeline = new CodePipeline(this, 'Pipeline', {
      pipelineName: 'HITPPipeline',
      synth: new ShellStep('Synth', {
        input: CodePipelineSource.gitHub('Arahan888/hitp-dev', 'main'),
        commands: ['npm ci', 'npm run build', 'npx cdk synth']
      })
    });

    const testingStage = hitppipeline.addStage(new PipelineAppStage(this, 'test', {
      env: { account: '196715057542', region: 'us-east-1' }
    }));

    testingStage.addPost(new ManualApprovalStep('approval'));

    const prodStage = hitppipeline.addStage(new PipelineAppStage(this, 'prod', {
      env: { account: '196715057542', region: 'us-east-1' }
    }));
  }
}
