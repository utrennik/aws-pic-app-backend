import AWS from 'aws-sdk';
import { IProduct } from '../../../product-service/src/models/types';
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

export default notifyAboutAddProducts;
