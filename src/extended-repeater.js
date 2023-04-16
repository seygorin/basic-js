const { NotImplementedError } = require('../extensions/index.js');

/**
 * Create a repeating string based on the given parameters
 *
 * @param {String} str string to repeat
 * @param {Object} options options object
 * @return {String} repeating string
 *
 *
 * @example
 *
 * repeater('STRING', { repeatTimes: 3, separator: '**',
 * addition: 'PLUS', additionRepeatTimes: 3, additionSeparator: '00' })
 * => 'STRINGPLUS00PLUS00PLUS**STRINGPLUS00PLUS00PLUS**STRINGPLUS00PLUS00PLUS'
 *
 */

function repeater(str, options) {
  let separator =
    options.separator !== undefined ? String(options.separator) : '+';
  let additionSeparator =
    options.additionSeparator !== undefined
      ? String(options.additionSeparator)
      : '|';
  let repeatTimes = options.repeatTimes !== undefined ? options.repeatTimes : 1;
  let additionRepeatTimes =
    options.additionRepeatTimes !== undefined ? options.additionRepeatTimes : 1;
  let addition = options.addition !== undefined ? String(options.addition) : '';

  let strArr = [];
  let additionArr = [];

  for (let i = 0; i < repeatTimes; i++) {
    strArr.push(String(str));
    if (i !== repeatTimes - 1) {
      for (let j = 0; j < additionRepeatTimes; j++) {
        additionArr.push(addition);
      }
    }
  }

  let additionStr = additionArr.join(additionSeparator);
  let resultStr = strArr.map((item) => item + additionStr).join(separator);

  return resultStr;
}
module.exports = {
  repeater,
};
