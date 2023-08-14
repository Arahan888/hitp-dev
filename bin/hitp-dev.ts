#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { HitpDevStack } from '../lib/hitp-dev-stack';

const app = new cdk.App();
new HitpDevStack(app, 'HitpDevStack', {

  env: { account: '612547137591', region: 'ap-southeast-1' },

});