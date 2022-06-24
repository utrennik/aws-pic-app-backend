import { getProductsById } from './getProductsById';
import products from '../mocks/products';
import { getById } from '../service/service';

jest.mock('../service/service');
const product = products[0];
const id = product.id;

describe('Given the getProductsById handler', () => {
  describe('and when its called with correct id', () => {
    it('should call getById service with correct id', async () => {
      await getProductsById({ pathParameters: { productId: id } });
      expect(getById).toHaveBeenCalledWith(id);
    });
  });
});
