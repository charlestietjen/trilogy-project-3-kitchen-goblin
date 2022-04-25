const aws = require('aws-sdk');

aws.config.region = 'us-east-1';

const S3_BUCKET = process.env.S3_BUCKET;

module.exports = { S3_BUCKET, aws}