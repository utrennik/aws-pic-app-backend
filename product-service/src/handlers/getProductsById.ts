import { getById } from '../service/service';
import { IProduct } from '../models/types';

const getProductsById = async (event: any) => {
  try {
    console.log(`GET product: ${JSON.stringify(event)}`);
    const product: IProduct = await getById(event.pathParameters.productId);
    return {
      statusCode: 200,
      headers: { 'Access-Control-Allow-Origin': '*' },

      body: JSON.stringify(product, null, 2),
    };
  } catch (error) {
    return {
      statusCode: 404,
      body: error.message,
    };
  }
};

export { getProductsById };
