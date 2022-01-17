/**
 * sortStrings - sorts array of string by two criteria "asc" or "desc"
 * @param {string[]} arr - the array of strings
 * @param {string} [param="asc"] param - the sorting type "asc" or "desc"
 * @returns {string[]}
 */
export function sortStrings(arr, param = 'asc') {
  const sortedArr = [...arr];
  const locales = ['ru', 'en'];

  const sort = (a, b) => {
    return (param === 'asc')
      ?
      a.localeCompare(b, locales, {
        caseFirst: 'upper',
      })
      :
      b.localeCompare(a, locales, {
        caseFirst: 'lower',
      });
  };

  return sortedArr.sort(sort);
}
