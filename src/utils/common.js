
export function toThousands(num) {
  num = num + ''
  if (!num.includes('.')) {
    num += '.'
  }
  return num.replace(/(\d)(?=(\d{3})+\.)/g, function($0, $1) {
    return $1 + ','
  }).replace(/\.$/, '')
}

export function commafyback(num) {
  var x = num.split(',')
  return parseFloat(x.join(''))
}

export function keyToValue(data) {
  return data.reduce((acc, cur) => {
    acc[cur.keyWord] = cur.name
    return acc
  }, {})
}

export function calculatingPrice(data,banPrice) {
  var sum = 0.0;
  data.forEach((obj1,banPrice) => {
    obj1.spec.forEach((obj2,banPrice) => {
      var correntPrice = parseFloat(obj2.correntPrice)
      var cappedPrice = parseFloat(obj2.cappedPrice)
      var minPrice = parseFloat(obj2.minPrice)
      var price = parseFloat(banPrice) + parseFloat(correntPrice)
      var bjPrice = parseFloat(price) < parseFloat(minPrice) ? parseFloat(minPrice) : parseFloat(price) > parseFloat(cappedPrice)? parseFloat(cappedPrice) : parseFloat(price)
      sum =  parseFloat(sum) + parseFloat(bjPrice) + parseFloat(price)
    })
  })
  return parseFloat(sum) + parseFloat(banPrice)
}

export function dataToFormData(formdata, data) {
  for (var i in data) {
    if (Array.isArray(data[i])) {
      formdata.append(i, JSON.stringify(data[i]))
    } else {
      formdata.append(i, data[i])
    }
  }
  return formdata
}
