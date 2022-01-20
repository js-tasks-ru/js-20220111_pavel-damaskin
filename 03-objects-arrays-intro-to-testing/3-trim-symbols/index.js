/**
 * trimSymbols - removes consecutive identical symbols if they quantity bigger that size
 * @param {string} string - the initial string
 * @param {number} size - the allowed size of consecutive identical symbols
 * @returns {string} - the new string without extra symbols according passed size
 */
export function trimSymbols(string, size) {
  if (size === 0) {
    return '';
  }

  if (!size) {
    return string;
  }

  let res = '';

  const currentChar = {
    char: string[0],
    times: 0,
  };

  for (let char of string.split('')) {
    if (char === currentChar.char) {
      if (currentChar.times < size) {
        res += char;
      }

      currentChar.times++;
    } else {
      currentChar.char = char;
      currentChar.times = 1;

      res += char;
    }
  }

  return res;
}
