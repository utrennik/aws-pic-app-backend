import { getById } from '../service/service';
import { IProduct } from '../models/types';

const getProductsById = async (event: any) => {
  try {
    const product: IProduct = await getById(event.pathParameters.productId);
    return {
      statusCode: 200,
      headers: { 'Access-Control-Allow-Origin': '*' },

      body: JSON.stringify(product, null, 2),
    };
  } catch (error) {
    return {
      statusCode: error.statusCode || 500,
      body: JSON.stringify(error.message),
    };
  }
};

export { getProductsById };
