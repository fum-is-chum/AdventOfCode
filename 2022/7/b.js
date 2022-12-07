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

const dfs = (root, target, map) => {
  for(let dirname in root) {
    // console.log(map);
    if(root[dirname].size >= target && root[dirname].size < map.size) {
      map.size = root[dirname].size;
    }
    dfs(root[dirname], target, map);
  }
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
    const disk = 70000000
    const needed = 30000000
    const unused = disk - root.size;
    const target = needed - unused;
    const map = {
      size: root.size,
    }
    console.log(target);
    dfs(root, target, map);
    // console.log(JSON.stringify(dirSize, null, 2));
    console.log(map)
  } catch (err) {
    console.log(err);
  }
}

solve('./b.txt');