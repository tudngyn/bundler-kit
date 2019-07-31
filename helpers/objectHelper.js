import _isEmpty from 'lodash/isEmpty';

const cleanObject = object => {
  Object.keys(object).map(key => {
    if (typeof object[key] === 'object' && _isEmpty(object[key])) {
      delete object[key];
    } else if (
      typeof object[key] === 'string' &&
      (object[key] === '' || !object[key])
    ) {
      delete object[key];
    } else if (
      Number.isNaN(object[key]) ||
      typeof object[key] === 'undefined'
    ) {
      delete object[key];
    }
  });
  return object;
};

const isObject = input =>
  typeof input === 'object' && !(input instanceof Array);

export { cleanObject, isObject };
