import { Client } from 'pg';
import { IProduct, IProductData } from './../models/types';
import { NotFoundError } from '../errors/notFoundError';
import { ConnectionError } from '../errors/connectionError';

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

let client;

const connect = async () => {
  try {
    client = new Client(dbOptions);
    await client.connect();
  } catch (error) {
    throw new ConnectionError(error.message);
  }
};

const getAll = async () => {
  if (!client) await connect();
  const { rows: products } = await client.query('SELECT * FROM products');
  const { rows: stocks } = await client.query('SELECT * FROM stocks');
  const result = products.map((product: IProduct) => {
    const stock = stocks.find((stock: any) => stock.product_id === product.id);
    return { ...product, count: stock.count };
  });
  return result;
};

const getById = async (id: string) => {
  if (!client) await connect();
  const { rows: products } = await client.query('SELECT * FROM products WHERE id = $1', [id]);
  if (!products.length) throw new NotFoundError(`Product with id ${id} not found`);
  const { rows: stocks } = await client.query('SELECT * FROM stocks WHERE product_id = $1', [id]);
  if (!stocks.length) throw new NotFoundError(`Stock info for product with id ${id} not found`);
  const product = { ...products[0], count: stocks[0].count };

  return product;
};

const createProduct = ({ title, description = '', price }) => {
  const product: IProductData = { title, description, price };
  return product;
};

const validateProductData = (productData: any) => {
  const { title, description = '', price } = productData;
  if (!title || typeof title !== 'string' || typeof description !== 'string' || isNaN(price) || price < 0) {
    throw new Error('Invalid product data');
  }
};

const postProduct = async (productData: any) => {
  validateProductData(productData);
  const product: IProductData = createProduct(productData);
  if (!client) await connect();
  await client.query('INSERT INTO products (title, description, price) VALUES ($1, $2, $3)', [
    product.title,
    product.description,
    product.price,
  ]);
  return product;
};

export { getAll, getById, postProduct };
