import { isObject } from 'sdk-helpers/objectHelper';

const isArray = input => input instanceof Array;
const isArrayObject = input => {
  let result = false;
  let count = 0;
  for (let i = 0; i < input.length; i++) {
    const element = input[i];
    if (isObject(element)) {
      count++;
    }
  }
  if (count === input.length) {
    result = true;
  }
  return result;
};

const findItemByKey = (array, value, key = 'value') => {
  let result = null;
  result = array.find(item => {
    let boolValue = false;
    if (item && item.hasOwnProperty('value')) {
      boolValue = item[key] === value;
    }
    return boolValue;
  });
  return result;
};

function replaceAt(array, index, value) {
  const clonedArray = array.slice(0);
  clonedArray[index] = value;
  return clonedArray;
}

export { isArray, findItemByKey, isArrayObject, replaceAt };
