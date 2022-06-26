import { ValidationError } from './../errors/validationError';
import { postProduct } from '../service/service';
import { IProduct } from '../models/types';

const postProduct = async (event: any) => {
  try {
    console.log(`POST product: ${JSON.stringify(event)}`);

    if (!event.body) throw new ValidationError('No product data provided');

    const productData = JSON.parse(event.body);

    const result = await postProduct(productData);

    return {
      statusCode: 201,
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

export { postProduct };
