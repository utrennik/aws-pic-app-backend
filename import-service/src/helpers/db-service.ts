import { ValidationError } from '../errors/validationError';
import { Client } from 'pg';
import { PostError } from '../errors/postError';
import { ConnectionError } from '../errors/connectionError';
import { IProductData } from '../models/types';

const { PG_HOST, PG_PORT, PG_DATABASE, PG_USERNAME, PG_PASSWORD } = process.env;

const dbOptions = {
  host: PG_HOST,
  port: PG_PORT,
  database: PG_DATABASE,
  user: PG_USERNAME,
  password: PG_PASSWORD,
  ssl: {
    rejectUnauthorized: false,
  },
  connectionTimeoutMillis: 5000,
};

const useDB = async (cb) => {
  const client = new Client(dbOptions);
  try {
    await client.connect();
    return await cb(client);
  } catch (e) {
    throw new ConnectionError(e.message);
  } finally {
    client.end();
  }
};

const validateProductData = (productData: any) => {
  const { title, description = '', price } = productData;
  if (!title || typeof title !== 'string' || typeof description !== 'string' || isNaN(price) || price < 0) {
    throw new ValidationError('Invalid product data');
  }
};

const postAll = async (productData: IProductData[]) => {
  const products = productData.map((item: IProductData) => {
    validateProductData(item);
    return {
      title: item.title,
      description: item.description,
      price: item.price,
      count: item.count || 0,
      imageUrl: item.imageUrl || '',
    };
  });

  const promises = products.map(async (product: IProductData) => {
    return useDB(async (client) => {
      await client.query(`BEGIN`);
      try {
        const response = await client.query(
          `INSERT INTO products (title, description, price, imageUrl) VALUES ($1, $2, $3, $4) RETURNING id`,
          [product.title, product.description, product.price, product.imageUrl]
        );
        const { id } = response.rows[0];
        await client.query('INSERT INTO stocks (product_id, count) VALUES ($1, $2)', [id, product.count]);
        await client.query(`COMMIT`);
        return { ...product, id };
      } catch (e) {
        console.error('postAll error: ', e.message);
        await client.query(`ROLLBACK`);
        throw new PostError(e.message);
      }
    });
  });

  return Promise.all(promises);
};

export { postAll };
