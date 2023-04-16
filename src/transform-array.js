const { NotImplementedError } = require('../extensions/index.js');

/**
 * Create transformed array based on the control sequences that original
 * array contains
 *
 * @param {Array} arr initial array
 * @returns {Array} transformed array
 *
 * @example
 *
 * transform([1, 2, 3, '--double-next', 4, 5]) => [1, 2, 3, 4, 4, 5]
 * transform([1, 2, 3, '--discard-prev', 4, 5]) => [1, 2, 4, 5]
 *
 */
function transform(arr ) {
  if (!(arr instanceof Array))  {
    throw new Error('Invalid argument: arr must be an array');
    }
    
    const result = [];
    
    if (arr.length === 0) {
    return result;
    }
    
    for (let i = 0; i < arr.length; i++) {
    const current = arr[i];
    const next = arr[i + 1];
    const prev = result[result.length - 1];
    switch (current) {
      case '--discard-next':
        i++;
        break;
      case '--discard-prev':
        if (prev !== undefined && prev !== null) {
          result.pop();
        }
        break;
      case '--double-next':
        if (next !== undefined) {
          result.push(next);
        }
        break;
      case '--double-prev':
        if (prev !== undefined && prev !== null) {
          result.push(prev);
        }
        break;
      default:
        result.push(current);
    }
    return result;
  }
}

module.exports = {
  transform,
};
