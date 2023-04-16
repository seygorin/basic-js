const { NotImplementedError } = require('../extensions/index.js');

/**
 * Given some integer, find the maximal number you can obtain
 * by deleting exactly one digit of the given number.
 *
 * @param {Number} n
 * @return {Number}
 *
 * @example
 * For n = 152, the output should be 52
 *
 */
function deleteDigit(n) {
  const numStr = String(n);
  let maxNum = 0;

  for (let i = 0; i < numStr.length; i++) {
    const newNumStr = numStr.slice(0, i) + numStr.slice(i + 1);
    const newNum = Number(newNumStr);
    if (newNum > maxNum) {
      maxNum = newNum;
    }
  }

  return maxNum;
}

module.exports = {
  deleteDigit,
};
