/**
 * sortStrings - sorts array of string by two criteria "asc" or "desc"
 * @param {string[]} arr - the array of strings
 * @param {string} [param="asc"] param - the sorting type "asc" or "desc"
 * @returns {string[]}
 */
export function sortStrings(arr, param = 'asc') {
  const sortedArr = arr.slice();

  return (param === 'asc') ? sortedArr.sort(ascSort) : sortedArr.sort(descSort);
}

function ascSort(a, b) {
  return a.localeCompare(b, ['ru', 'en'], {
    caseFirst: 'upper',
  });
}

function descSort(a, b) {
  return b.localeCompare(a, ['ru', 'en'], {
    caseFirst: 'lower',
  });
}
