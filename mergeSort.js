function merge(leftArr, rightArr) {
  let resultArr = [];
  let i = 0,
    j = 0;
  while (i < leftArr.length && j < rightArr.length) {
    if (leftArr[i] < rightArr[j]) {
      resultArr.push(leftArr[i]);
      i++;
    } else {
      resultArr.push(rightArr[j]);
      j++;
    }
  }
  while (i < leftArr.length) {
    resultArr.push(leftArr[i]);
    i++;
  }
  while (j < rightArr.length) {
    resultArr.push(rightArr[j]);
    j++;
  }
  return resultArr;
}

function mergeSort(arr) {
  if (arr.length <= 1) {
    return arr;
  }
  const m = parseInt(arr.length / 2);
  let leftArr = arr.slice(0, m);
  let rightArr = arr.slice(m);
  let sortedLeftArr = mergeSort(leftArr);
  let sortedRightArr = mergeSort(rightArr);
  return merge(sortedLeftArr, sortedRightArr);
}

export { mergeSort };
