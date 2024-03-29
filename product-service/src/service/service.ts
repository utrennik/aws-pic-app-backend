import { ValidationError } from './../errors/validationError';
import { Client } from 'pg';
import { PostError } from './../errors/postError';
import { NotFoundError } from '../errors/notFoundError';
import { ConnectionError } from '../errors/connectionError';
import { IProduct, IProductData } from './../models/types';

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

const getAll = async () => {
  return await useDB(async (client) => {
    const { rows: products } = await client.query('SELECT * FROM products');
    const { rows: stocks } = await client.query('SELECT * FROM stocks');
    const result = products.map((product: IProduct) => {
      const stock = stocks.find((stock: any) => stock.product_id === product.id);
      if (!stock) return product;
      return { ...product, count: stock.count };
    });
    return result;
  });
};

const getById = async (id: string) => {
  return await useDB(async (client) => {
    const { rows: products } = await client.query('SELECT * FROM products WHERE id = $1', [id]);
    if (!products.length) throw new NotFoundError(`Product with id ${id} not found`);
    const { rows: stocks } = await client.query('SELECT * FROM stocks WHERE product_id = $1', [id]);
    if (!stocks.length) return { ...products[0] };
    const product = { ...products[0], count: stocks[0].count };

    return product;
  });
};

const createProduct = ({ title, description = '', price, imageUrl = '' }) => {
  const product: IProductData = { title, description, price, imageUrl };
  return product;
};

const validateProductData = (productData: any) => {
  const { title, description = '', price } = productData;
  if (!title || typeof title !== 'string' || typeof description !== 'string' || isNaN(price) || price < 0) {
    throw new ValidationError('Invalid product data');
  }
};

const post = async (productData: any) => {
  validateProductData(productData);
  const product: IProductData = createProduct(productData);

  return await useDB(async (client) => {
    await client.query(`BEGIN`);

    try {
      const response = await client.query(
        `INSERT INTO products (title, description, price) VALUES ($1, $2, $3) RETURNING id`,
        [product.title, product.description, product.price, product.imageUrl]
      );
      const { id } = response.rows[0];
      const count = productData.count || 0;

      await client.query('INSERT INTO stocks (product_id, count) VALUES ($1, $2)', [id, count]);
      await client.query(`COMMIT`);
      return { ...product, id, count };
    } catch (e) {
      await client.query(`ROLLBACK`);
      throw new PostError(e.message);
    }
  });
};

export { getAll, getById, post };
