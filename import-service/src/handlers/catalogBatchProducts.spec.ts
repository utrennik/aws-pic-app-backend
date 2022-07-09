import { catalogBatchProducts } from './catalogBatchProducts';
import { postAll } from '../helpers/db-service';
import notifyAboutAddProducts from '../helpers/notifyAboutAddProducts';

jest.mock('../helpers/notifyAboutAddProducts', () => jest.fn());
jest.mock('../helpers/db-service', () => ({
  postAll: jest.fn(),
}));

const EVENT_MOCK = {
  Records: [
    {
      messageId: '4b09dad8-8a85-4775-8b5d-3d222d01ef30',
      body: '{"title":"Frog","description":"Typical frog","price":"13","count":"23"}',
      attributes: {
        ApproximateReceiveCount: '1',
        AWSTraceHeader: 'Root=1-62c99716-3504a37c296a6cb10b5ee4f9;Parent=0d25bdea66c6975f;Sampled=0',
        SentTimestamp: '1657378583219',
        SenderId: 'AROAQPQ2FGPQNAB4HVS7R:import-service-dev-importFileParser',
        ApproximateFirstReceiveTimestamp: '1657378583223',
      },
      messageAttributes: {},
      md5OfBody: '5038629efeb9da3692b5253132d1617b',
      eventSource: 'aws:sqs',
      eventSourceARN: 'arn:aws:sqs:eu-west-1:033340863456:catalogItemsQueue',
      awsRegion: 'eu-west-1',
    },
  ],
};

const PRODUCTS_MOCK = [{ title: 'Frog', description: 'Typical frog', price: '13', count: '23' }];

describe('Given the catalogBatchProducts lambda function', () => {
  let response;

  beforeEach(async () => {
    response = await catalogBatchProducts(EVENT_MOCK);
  });

  describe('and when it is called', () => {
    it('it should call postAll function with proper params', () => {
      expect(postAll).toBeCalledWith(PRODUCTS_MOCK);
    });

    it('it should call notifyAboutAddProducts function with proper params', () => {
      expect(notifyAboutAddProducts).toHaveBeenCalledWith(PRODUCTS_MOCK);
    });

    it('it should return 201 status code', () => {
      expect(response.statusCode).toBe(201);
    });
  });
});
