const { dir } = require('console');
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

const dfs = (root) => {
  let total = 0;
  for(let dirname in root) {
    total += root[dirname].size <= 100000 ? root[dirname].size : 0;
    total += dfs(root[dirname]);
  }
  return total;
}
async function solve(fileName) {
  try {
    const lines = await readFileAsArray(fileName);

    const dirSize = {
      '/': {
        size: 0
      }
    };

    const cwdTree = [];
    for(let line of lines) {
      const splitted = line.split(' ');
      if(splitted[0] === '$') {
        const cmd = splitted[1];
        if(cmd === 'cd') {
          const args = splitted[2];
          switch(args) {
            case '/':
              cwdTree.splice(0);
              cwdTree.push(dirSize['/']);
              break;
            case '..':
              cwdTree.pop();
              break;
            default:
              const cwd = cwdTree[cwdTree.length - 1];
              cwdTree.push(cwd[args]);
              break;
            }
          }
        } else {
        if(splitted[0] === 'dir') {
          const cwd = cwdTree[cwdTree.length - 1];
          if(!cwd[splitted[1]]) {
            cwd[splitted[1]] = {
              size: 0
            }
          }
        } else {
          for(let a of cwdTree) {
            a.size += +splitted[0]
          }
        }
      }
    }
    let root = dirSize['/'];
    let total = dfs(root);
    console.log(JSON.stringify(dirSize, null, 2));
    console.log(total)
  } catch (err) {
    console.log(err);
  }
}

solve('./a.txt');