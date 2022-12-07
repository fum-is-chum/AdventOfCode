const fs = require('fs');

const readFileAsArray = (file) => {
  return new Promise((resolve, reject) => {
      fs.readFile(file, (err, data) => {
        if (err) {
          reject(err);
          // return cb(err);
        }
         else {
          // const lines = data.toString().trim().split('\n');
          resolve(data.toString().trim().split('\r\n'))
        }
        // cb(null, lines);
      })
  })
}

const overlap = (a, b, c, d) => {
  return (a <= d && b >= c) || (a >= c && a <= d && b >= c && b <= d) || (c >= a && c <= b && d >= a && d <= b)
} 

async function solve(fileName) {
  try {
    const lines = await readFileAsArray(fileName);
    let cnt = 0;
    for(let line of lines) {
      let intervals = line.split(',')
      let inputs = []
      for(let interval of intervals) {
        let nums = interval.split('-')
        inputs.push(...nums.map((x) => parseInt(x)))
      }
      if(overlap(inputs[0],inputs[1],inputs[2],inputs[3])) {
        // console.log(inputs)
        cnt++;
      }
    }
    console.log(cnt);
  } catch (err) {
    console.log(err);
  }
}

solve('./b.txt');