import {
  capitalize,
  objectToArray,
  removeArrayDuplicates,
  stringMatch,
  joinUrl,
  isValidManifestJsonStringOrObject,
  inRange
} from '.';

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

  describe('joinUrl', () => {
    it('Should return the right result', () => {
      const baseUrl = 'https://pwa.com/pwa/assets';
      const url = 'assets/icon.png';
      const result = joinUrl(baseUrl, url);
      expect(result).toBe('https://pwa.com/pwa/assets/icon.png');
    });
  });

  describe('isValidManifestJsonStringOrObject', () => {
    it('Should return true when a string is a parsable manifest json', () => {
      const string = '{ "name": "This is a valid manifest json" }';
      const result = isValidManifestJsonStringOrObject(string);
      expect(result).toBe(true);
    });

    it('Should return false when a string is a not a parsable manifest json', () => {
      const string = 'Not a manifest json object';
      const result = isValidManifestJsonStringOrObject(string);
      expect(result).toBe(false);
    });

    it('Should return true when an object can be stringified and parsed as a JSON', () => {
      const object = { name: 'This object can be stringified and parsed as a manifest json' };
      const result = isValidManifestJsonStringOrObject(object);
      expect(result).toBe(true);
    });

    it('Should return false when an object can not be stringified and parsed as a JSON', () => {
      const array = [{ name: 'This array can not be stringified and parsed as a manifest json' }];
      const result = isValidManifestJsonStringOrObject(array);
      expect(result).toBe(true);
    });
  });

  describe('inRange', () => {
    it('Should return true when within the range', () => {
      const array = [1, 2, 3];
      const result = inRange(array, 0, 3);

      expect(result).toBe(true);
    });

    it('Should return false when outside the range', () => {
      const array = [1, 2, 3];
      const result = inRange(array, 0, 2);

      expect(result).toBe(false);
    });

    it('Should return true when greater than min', () => {
      const array = [1, 2, 3];
      const result = inRange(array, 2);

      expect(result).toBe(true);
    });

    it('Should return false when less than min', () => {
      const array = [1, 2, 3];
      const result = inRange(array, 4);

      expect(result).toBe(false);
    });

    it('Should return true when less than max', () => {
      const array = [1, 2, 3];
      const result = inRange(array, 1, 4);

      expect(result).toBe(true);
    });

    it('Should return false when greater than max', () => {
      const array = [1, 2, 3];
      const result = inRange(array, 0, 2);

      expect(result).toBe(false);
    });
  });
});
