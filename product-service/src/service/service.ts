import { IProduct } from './../models/types';
import { NotFoundError } from '../errors/notFoundError';
import products from '@/mocks/products';

const getAll = async () => {
  return products;
};

const getById = async (id: string) => {
  const product: IProduct = products.find((product: IProduct) => product.id === Number(id));
  if (!product) {
    throw new NotFoundError(`Product with id ${id} not found`);
  }
  return product;
};

export { getAll, getById };
