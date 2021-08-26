import { capitalize, objectToArray, removeArrayDuplicates, stringMatch } from '.';

describe('utils', () => {
  describe('removeArrayDuplicates', () => {
    it('should remove values that are not unique', () => {
      const array = [8, 1, 2, 9, 3, 4, 1, 5, 3, 6, 7, 8, 9];
      const result = removeArrayDuplicates(array);
      const expected = [8, 1, 2, 9, 3, 4, 5, 6, 7];

      expect(result).toMatchObject(expected);
    });
  });

  describe('objectToArray', () => {
    it('should convert an object to an array', () => {
      const object = { key1: 'value1', key2: 'value2' };
      const result = objectToArray(object);
      const expected = ['value1', 'value2'];

      expect(result).toMatchObject(expected);
    });
  });

  describe('stringMatch', () => {
    it('should return true with a string match without case sensitivity', () => {
      const string1 = 'abcdef';
      const string2 = `abc`;
      const result = stringMatch(string1, string2);
      const expected = ['abc'];

      expect(result).toMatchObject(expected);
    });

    it('should return false with a string match with case sensitivity', () => {
      const string1 = 'string1';
      const string2 = `String1`;
      const result = stringMatch(string1, string2, true);

      expect(result).toBeNull();
    });
  });
});
