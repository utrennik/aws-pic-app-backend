import { getAll } from '../service/service';

jest.mock('../service/service');

describe('Given the getProducts handler', () => {
  describe('and when its called with correct id', () => {
    it('should call getAll service', async () => {
      await getAll();
      expect(getAll).toBeCalledTimes(1);
    });
  });
});
