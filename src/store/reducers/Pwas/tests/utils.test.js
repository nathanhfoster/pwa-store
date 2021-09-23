import { mergePwas } from '../utils';

describe('Pwas reducer utils', () => {
  describe('mergePwas', () => {
    it('Should merge and sort data', () => {
      const currentStoreItems = [
        { id: 1, updated_at: '2021-09-01T01:46:39.302514Z' },
        { id: 2, updated_at: '2021-09-02T01:46:39.302514Z' },
        { id: 3, updated_at: '2021-09-03T01:46:39.302514Z' }
      ];
      const newItems = [
        { id: 4, updated_at: '2021-09-01T01:46:39.302514Z' },
        { id: 1, updated_at: '2021-09-03T01:46:39.302514Z' },
        { id: 5, updated_at: '2021-09-03T01:46:39.302514Z' }
      ];

      const result = mergePwas(currentStoreItems, newItems);
      const expected = [
        { id: 1, updated_at: '2021-09-03T01:46:39.302514Z' },
        { id: 2, updated_at: '2021-09-02T01:46:39.302514Z' },
        { id: 3, updated_at: '2021-09-03T01:46:39.302514Z' },
        { id: 4, updated_at: '2021-09-01T01:46:39.302514Z' },
        { id: 5, updated_at: '2021-09-03T01:46:39.302514Z' }
      ];

      expect(result).toEqual(expected);
    });
  });
});
