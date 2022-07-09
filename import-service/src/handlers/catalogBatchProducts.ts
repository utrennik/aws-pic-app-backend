import AWS from 'aws-sdk';
import { postAll } from '../db-service/db-service';
import { IProduct } from './../../../product-service/src/models/types';
import { REGION } from '../constants';

const notifyAboutAddProducts = async (postedProducts: IProduct[]) => {
  const sns = new AWS.SNS({ region: REGION });

  const promises = postedProducts.map(async (product) => {
    return sns
      .publish({
        MessageAttributes: {
          title: {
            DataType: 'String',
            StringValue: product.title,
          },
        },
        Subject: `New product added: ${product.title}`,
        Message: JSON.stringify(product),
        TopicArn: process.env.SNS_TOPIC_ARN,
      })
      .promise();
  });

  return Promise.all(promises);
};

const catalogBatchProducts = async (event: any) => {
  try {
    const products = event.Records.map((record) => JSON.parse(record.body));

    console.log('catalogBatchProducts: ', JSON.stringify(products));

    const result = await postAll(products);

    console.log('catalogBatchProducts result: ', JSON.stringify(result));

    await notifyAboutAddProducts(products);

    console.log('Email sent');

    return {
      statusCode: 201,
      headers: { 'Access-Control-Allow-Origin': '*' },

      body: JSON.stringify(result, null, 2),
    };
  } catch (error) {
    return {
      statusCode: error.statusCode || 500,
      headers: { 'Access-Control-Allow-Origin': '*' },
      body: JSON.stringify(error.message),
    };
  }
};

export { catalogBatchProducts };
