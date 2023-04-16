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
  constructor(reverse = true) {
    this.reverse = reverse;
  }

  encrypt(message, key) {
    if (!message || !key) {
      throw new Error('Invalid arguments');
    }

    const messageUpperCase = message.toUpperCase();
    const keyUpperCase = key.toUpperCase();
    let encryptedMessage = '';

    for (let i = 0, j = 0; i < message.length; i++) {
      const currentChar = messageUpperCase[i];

      if (/[A-Z]/.test(currentChar)) {
        const keyChar = keyUpperCase[j % key.length];
        const keyCharCode = keyChar.charCodeAt(0) - 65;
        const currentCharCode = currentChar.charCodeAt(0) - 65;
        const encryptedCharCode = ((currentCharCode + keyCharCode) % 26) + 65;
        const encryptedChar = String.fromCharCode(encryptedCharCode);
        encryptedMessage += encryptedChar;
        j++;
      } else {
        encryptedMessage += currentChar;
      }
    }

    if (this.reverse) {
      return encryptedMessage.split('').reverse().join('');
    }

    return encryptedMessage;
  }

  decrypt(encryptedMessage, key) {
    if (!encryptedMessage || !key) {
      throw new Error('Invalid arguments');
    }
  
    const encryptedMessageUpperCase = encryptedMessage.toUpperCase();
    const keyUpperCase = key.toUpperCase();
    let decryptedMessage = '';
  
    for (let i = 0, j = 0; i < encryptedMessage.length; i++) {
      const currentChar = encryptedMessageUpperCase[i];
  
      if (/[A-Z]/.test(currentChar)) {
        const keyChar = keyUpperCase[j % key.length];
        const keyCharCode = keyChar.charCodeAt(0) - 65;
        const currentCharCode = currentChar.charCodeAt(0) - 65;
        const decryptedCharCode =
          ((currentCharCode - keyCharCode + 26) % 26) + 65;
        const decryptedChar = String.fromCharCode(decryptedCharCode);
        decryptedMessage += decryptedChar;
        j++;
      } else {
        decryptedMessage += currentChar;
      }
    }
  
    if (this.reverse) {
      return decryptedMessage.split('').reverse().join('');
    }
  
    return decryptedMessage;
  }
}


module.exports = {
  VigenereCipheringMachine,
};
