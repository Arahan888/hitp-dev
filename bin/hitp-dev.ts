#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { HitpDevStack } from '../lib/hitp-dev-stack';

import { lambdaStack } from '../lib/lambda-stack';
import { s3Stack } from '../lib/s3-stack';
import { apigwStack } from '../lib/apigw-stack';
import { dynamodbStack } from '../lib/dynamodb-stack';

const app = new cdk.App();
// new HitpDevStack(app, 'HitpDevStack', {

//   env: { account: '612547137591', region: 'ap-southeast-1' },

// });

new lambdaStack(app, 'lambdaStack', {stage:'test', env: { account: '612547137591', region: 'ap-southeast-1' }});
new apigwStack(app, 'apigwStack', {stage:'test', env: { account: '612547137591', region: 'ap-southeast-1' }});
new s3Stack(app, 's3stack', {stage:'test', env: { account: '612547137591', region: 'ap-southeast-1' }});
new dynamodbStack(app, 'dynamodbStack', {stage:'test', env: { account: '612547137591', region: 'ap-southeast-1' }});