import AWS from 'aws-sdk';
import { ParamError } from '../errors/paramError';
import { REGION, BUCKET, UPLOADED_KEY } from '../constants';

const CSV_CONTENT_TYPE = 'text/csv';

const importProductsFile = async (event: any) => {
  try {
    const s3 = new AWS.S3({ region: REGION });

    const { fileName } = event.queryStringParameters;

    if (!fileName) throw new ParamError('No file name provided');

    const params = {
      Bucket: BUCKET,
      Key: `${UPLOADED_KEY}${fileName}`,
      ContentType: CSV_CONTENT_TYPE,
    };

    const signedUrl = await new Promise((res, rej) => {
      s3.getSignedUrl('putObject', params, (err, url) => {
        if (err) rej(err);
        res(url);
      });
    });

    return {
      statusCode: 201,
      headers: { 'Access-Control-Allow-Origin': '*' },

      body: JSON.stringify(signedUrl, null, 2),
    };
  } catch (error) {
    return {
      statusCode: error.statusCode || 500,
      headers: { 'Access-Control-Allow-Origin': '*' },
      body: JSON.stringify(error.message),
    };
  }
};

export { importProductsFile };
