import { GenericHelperFunctions } from '../../src/utilities/helpers';

describe('GenericHelpers', () => {
  describe('isFunction function', () => {
    it('should return true for a function', () => {
      const testFunction = function () {
      };
      const result = GenericHelperFunctions.isFunction(testFunction);
      expect(result).toBe(true);
    });

    it('should return true for an arrow function', () => {
      const testArrowFunction = () => { };
      const result = GenericHelperFunctions.isFunction(testArrowFunction);
      expect(result).toBe(true);
    });

    it('should return false for an object', () => {
      const testObject = { key: 'value' };
      const result = GenericHelperFunctions.isFunction(testObject);
      expect(result).toBe(false);
    });

    it('should return false for an array', () => {
      const testArray = [1, 2, 3];
      const result = GenericHelperFunctions.isFunction(testArray);
      expect(result).toBe(false);
    });

    it('should return false for a string', () => {
      const testString = 'Hello, World!';
      const result = GenericHelperFunctions.isFunction(testString);
      expect(result).toBe(false);
    });
  });

  describe('isObject function', () => {
    it('should return true for an object', () => {
      const testObject = { key: 'value' };
      const result = GenericHelperFunctions.isObject(testObject);
      expect(result).toBe(true);
    });

    it('should return false for an array', () => {
      const testArray = [1, 2, 3];
      const result = GenericHelperFunctions.isObject(testArray);
      expect(result).toBe(false);
    });

    it('should return false for a string', () => {
      const testString = 'Hello, World!';
      const result = GenericHelperFunctions.isObject(testString);
      expect(result).toBe(false);
    });

    it('should return false for null', () => {
      const testNull = null;
      const result = GenericHelperFunctions.isObject(testNull);
      expect(result).toBe(false);
    });

    it('should return false for undefined', () => {
      const testUndefined = undefined;
      const result = GenericHelperFunctions.isObject(testUndefined);
      expect(result).toBe(false);
    });
  });

  describe('checkWebcomponentValue function', () => {
    it('should return the parsed object for a valid JSON string', () => {
      const jsonString = '{"selfRegistered": "true", "name": "MyComponent"}';
      const result = GenericHelperFunctions.checkWebcomponentValue(jsonString);
      expect(result).toEqual({ selfRegistered: "true", name: "MyComponent" });
    });

    it('should return the parsed object for a valid JSON string', () => {
      const jsonString = '{"selfRegistered": true, "name": "MyComponent"}';
      const result = GenericHelperFunctions.checkWebcomponentValue(jsonString);
      expect(result).toEqual({ selfRegistered: true, name: "MyComponent" });
    });

    it('should return the boolean value as is', () => {
      const booleanValue = true;
      const result = GenericHelperFunctions.checkWebcomponentValue(booleanValue);
      expect(result).toBe(booleanValue);
    });

    it('should return the object as is', () => {
      const objValue = { name: "MyComponent", selfRegistered: false };
      const result = GenericHelperFunctions.checkWebcomponentValue(objValue);
      expect(result).toEqual(objValue);
    });

    // SHOULD HAVE THIS TEST, BUT IMPLEMENTATION NEEDS ADJUSTING
    it('should return false for an invalid JSON string', () => {
      const originalConsoleError = console.error;
      console.error = () => { };
      const invalidJsonString = '{"selfRegistered": "true", "name": "MyComponent"';
      const result = GenericHelperFunctions.checkWebcomponentValue(invalidJsonString);
      expect(result).toEqual(undefined);
      global.originalConsoleError = originalConsoleError;
    });

    it('should return undefined for unsupported input types', () => {
      const unsupportedValue = 42; // Number
      const result = GenericHelperFunctions.checkWebcomponentValue(unsupportedValue);
      expect(result).toStrictEqual(undefined);
    });
  });

});


