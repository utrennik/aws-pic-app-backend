import { ParseError } from './../errors/postError';
import AWS from 'aws-sdk';
import csv from 'csv-parser';
import fs from 'fs';

import { REGION } from '../constants';

const getFileStreamsFromRecords = async (records: any) => {
  const objects = records.map((record) => {
    const { s3 } = record;
    const { bucket, key } = s3;
    const params = { Bucket: bucket, Key: key };
    return s3.getObject(params).createReadStream();
  });

  return objects;
};

const importFileParser = async (event: any) => {
  console.log('importFileParser: ', JSON.stringify(event));
  try {
    const s3 = new AWS.S3({ region: REGION });
    const { records } = event;
    const streams = await getFileStreamsFromRecords(records);

    const products = [];

    for await (const stream of streams) {
      try {
        const parser = stream.pipe(csv());
        for await (const product of parser) {
          products.push(product);
        }
      } catch (e) {
        throw new ParseError(e.message);
      }
    }

    const result = products.flat();

    console.log(`importFileParser result: ${JSON.stringify(result)}`);

    return {
      statusCode: 200,
      headers: { 'Access-Control-Allow-Origin': '*' },

      body: JSON.stringify(result, null, 2),
    };
  } catch (error) {
    return {
      statusCode: error.statusCode || 500,
      body: JSON.stringify(error.message),
    };
  }
};

export { importFileParser };
