import csv from 'csv-parser';
import AWS from 'aws-sdk';
import { FileOperationError } from '../errors/FileOperationError';
import { ParseError } from '../errors/parseError';
import { QueueError } from '../errors/queueError';
import { REGION, PARSED_KEY } from '../constants';

const getFileStreamsFromRecords = async (records: any) => {
  const awsS3 = new AWS.S3({ region: REGION });

  const objects = records.map((record) => {
    const bucket = record.s3.bucket.name;
    const key = record.s3.object.key;
    const params = { Bucket: bucket, Key: key };
    return awsS3.getObject(params).createReadStream();
  });

  return objects;
};

const parseStream = async (stream: any) => {
  const results = [];

  return new Promise((res, rej) => {
    stream
      .pipe(csv())
      .on('data', (data) => results.push(data))
      .on('end', () => {
        res(results);
      })
      .on('error', (e) => {
        rej(e);
      });
  });
};

const moveFileToParsed = async (records: any) => {
  const promises = records.map(async (record) => {
    const bucket = record.s3.bucket.name;
    const key = record.s3.object.key;
    const s3 = new AWS.S3({ region: REGION });

    const fileName = key.split('/').pop();

    const copyParams = {
      Bucket: bucket,
      CopySource: `${bucket}/${key}`,
      Key: `${PARSED_KEY}${fileName}`,
    };

    await s3.copyObject(copyParams).promise();

    const deleteParams = {
      Bucket: bucket,
      Key: `${key}`,
    };

    await s3.deleteObject(deleteParams).promise();
  });

  await Promise.all(promises);
};

const sendToQueue = async (productsParsed) => {
  const sqs = new AWS.SQS({ region: REGION });
  const url = process.env.SQS_URL;

  const promises = productsParsed.map(async (product) => {
    const params = {
      QueueUrl: url,
      MessageBody: JSON.stringify(product),
      DelaySeconds: 0,
    };
    await sqs.sendMessage(params).promise();
    console.log(`Successfully sent product to queue: ${JSON.stringify(product)}`);
  });

  return Promise.all(promises);
};

const importFileParser = async (event: any) => {
  console.log('importFileParser: ', JSON.stringify(event));
  try {
    const records = event.Records;
    const streams = await getFileStreamsFromRecords(records);
    let parsedRecords;
    try {
      parsedRecords = await (await Promise.all(streams.map(parseStream))).flat();
      console.log('parsedRecords: ', JSON.stringify(parsedRecords));
    } catch (e) {
      throw new ParseError(e.message);
    }

    try {
      await moveFileToParsed(records);
    } catch (e) {
      throw new FileOperationError(e.message);
    }

    try {
      await sendToQueue(parsedRecords);
      console.log(`Successfully sent ${parsedRecords.length} products to queue`);
    } catch (e) {
      console.log(`Error sending products to queue: ${e.message}`);
      throw new QueueError(e.message);
    }

    return {
      statusCode: 200,
      headers: { 'Access-Control-Allow-Origin': '*' },

      body: JSON.stringify(parsedRecords, null, 2),
    };
  } catch (error) {
    return {
      statusCode: error.statusCode || 500,
      body: JSON.stringify(error.message),
    };
  }
};

export { importFileParser };
