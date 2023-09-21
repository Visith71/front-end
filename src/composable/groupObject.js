export function groupByKey(array, key) {
  let reducedArr = array.reduce((hash, obj) => {
    if(obj[key] === undefined) return hash;
    return Object.assign(hash, 
      {
        [obj[key]]:( hash[obj[key]] || [] ).concat(obj)
      }
    )
  }, {})
  const keysObject = Object.keys(reducedArr)
  const resultArr = []
  for (let i = 0; i < keysObject.length; i++) {
    const resultObj = {
      label: keysObject[i],
      code: keysObject[i],
      items: reducedArr[keysObject[i]]
    }
    resultArr.push(resultObj)
  }
  return resultArr
}
