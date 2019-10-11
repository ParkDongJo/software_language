function calcAvgHeight(data) {
    // Calculate average height from received data. If no data, return null.
    let len = Object.keys(data).length;
    let sum = 0;
    if (data === undefined || len === 0) return null;

    for (let key in data) {
        sum += data[key].height;
    }
    return sum / len;
  }
  
  var avgHeight = calcAvgHeight({
    Matt: { height: 174, weight: 69 },
    Jason: { height: 190, weight: 103 },
    Jason: { height: 194, weight: 103 },
  });
  console.log(avgHeight);
  console.log(calcAvgHeight({}));
  console.log(calcAvgHeight({Matt: { height: 174, weight: 69 }}));