import { postAll } from '../helpers/db-service';
import notifyAboutAddProducts from '../helpers/notifyAboutAddProducts';

const catalogBatchProducts = async (event: any) => {
  console.log('Event', JSON.stringify(event));

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
