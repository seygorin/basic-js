const { NotImplementedError } = require('../extensions/index.js');

/**
 * Implement class VigenereCipheringMachine that allows us to create
 * direct and reverse ciphering machines according to task description
 *
 * @example
 *
 * const directMachine = new VigenereCipheringMachine();
 *
 * const reverseMachine = new VigenereCipheringMachine(false);
 *
 * directMachine.encrypt('attack at dawn!', 'alphonse') => 'AEIHQX SX DLLU!'
 *
 * directMachine.decrypt('AEIHQX SX DLLU!', 'alphonse') => 'ATTACK AT DAWN!'
 *
 * reverseMachine.encrypt('attack at dawn!', 'alphonse') => '!ULLD XS XQHIEA'
 *
 * reverseMachine.decrypt('AEIHQX SX DLLU!', 'alphonse') => '!NWAD TA KCATTA'
 *
 */
class VigenereCipheringMachine {
  constructor() {
    this.charCodeA = 65;
    this.charCodeZ = 90;
  }

  normalizeStrings(message = '', key = '') {
    const normalizedMessage = message.toUpperCase();
    let normalizedKey = key.toUpperCase();
    while (normalizedKey.length < normalizedMessage.length) {
      normalizedKey = normalizedKey.repeat(2);
    }
    normalizedKey = normalizedKey.slice(0, normalizedMessage.length);
    return [normalizedMessage, normalizedKey];
  }

  encrypt(message = '', key = '', shouldReverse = true) {
    if (!message || !key) {
      throw Error('Incorrect arguments!');
    }
    const [normalizedMessage, normalizedKey] = this.normalizeStrings(message, key);
    let encryptedMessage = '';
    for (let messageIndex = 0, keyIndex = 0; messageIndex < normalizedMessage.length; messageIndex++) {
      if (/^[A-Z]$/.test(normalizedMessage[messageIndex])) {
        const shiftedCharCode = normalizedMessage.charCodeAt(messageIndex) + normalizedKey.charCodeAt(keyIndex) - this.charCodeA;
        if (shiftedCharCode > this.charCodeZ) {
          shiftedCharCode -= this.charCodeZ - this.charCodeA + 1;
        }
        encryptedMessage += String.fromCharCode(shiftedCharCode);
        keyIndex++;
      } else {
        encryptedMessage += normalizedMessage[messageIndex];
      }
    }
    if (!shouldReverse) {
      encryptedMessage = encryptedMessage.split('').reverse().join('');
    }
    return encryptedMessage;
  }

  decrypt(message = '', key = '', shouldReverse = true) {
    if (!message || !key) {
      throw Error('Incorrect arguments!');
    }
    const [normalizedMessage, normalizedKey] = this.normalizeStrings(message, key);
    let decryptedMessage = '';
    for (let messageIndex = 0, keyIndex = 0; messageIndex < normalizedMessage.length; messageIndex++) {
      if (/^[A-Z]$/.test(normalizedMessage[messageIndex])) {
        let shiftedCharCode = normalizedMessage.charCodeAt(messageIndex) - normalizedKey.charCodeAt(keyIndex) + this.charCodeA;
        if (shiftedCharCode < this.charCodeA) {
          shiftedCharCode += this.charCodeZ - this.charCodeA + 1;
        }
        decryptedMessage += String.fromCharCode(shiftedCharCode);
        keyIndex++;
      } else {
        decryptedMessage += normalizedMessage[messageIndex];
      }
    }
    if (!shouldReverse) {
      decryptedMessage = decryptedMessage.split('').reverse().join('');
    }
    return decryptedMessage;
  }
}

module.exports = {
  VigenereCipheringMachine,
};
