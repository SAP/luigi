import { GenericHelperFunctions } from '../../src/utilities/helpers';

describe('GenericHelpers', () => {
  it('test isFunction', () => {
    const fun = () => {};
    const noFun = {};

    expect(GenericHelperFunctions.isFunction(undefined)).toBeFalsy();
    expect(GenericHelperFunctions.isFunction(null)).toBeFalsy();
    expect(GenericHelperFunctions.isFunction(1)).toBeFalsy();
    expect(GenericHelperFunctions.isFunction(noFun)).toBeFalsy();
    expect(GenericHelperFunctions.isFunction(fun)).toBe(true);
  });
});
