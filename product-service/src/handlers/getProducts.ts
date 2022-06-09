import { getAllProducts } from '@service';
import { IProduct } from './../models/types';

const getProducts = async (event: any) => {
  const products: IProduct[] = await getAllProducts();

  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        products: products,
      },
      null,
      2
    ),
  };

  // Use this code if you don't use the http event with the LAMBDA-PROXY integration
  // return { message: 'Go Serverless v1.0! Your function executed successfully!', event };
};

export { getProducts };
