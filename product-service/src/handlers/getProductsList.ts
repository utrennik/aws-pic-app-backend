import { getAll } from '../service/service';
import { IProduct } from '../models/types';

const getProductsList = async (event: any) => {
  const products: IProduct[] = await getAll();

  return {
    statusCode: 200,
    headers: { 'Access-Control-Allow-Origin': '*' },

    body: JSON.stringify(products, null, 2),
  };

  // Use this code if you don't use the http event with the LAMBDA-PROXY integration
  // return { message: 'Go Serverless v1.0! Your function executed successfully!', event };
};

export { getProductsList };
