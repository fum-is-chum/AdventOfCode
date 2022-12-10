const fs = require('fs');
try {
    const queries = fs.readFileSync('a.txt', 'utf8').split('\r\n');
    let xLength = 0;
    let yLength = 0;

    let _x = 0;
    let _y = 0;
    for(let lines of queries) {
        let [dir, steps] = lines.split(' ');
        steps = +steps
        switch(dir) {
            case 'R':
                _x += steps;
                break;
            case 'L':
                _x -= steps;
                break;
            case 'U':
                _y += steps;
                break;
            case 'D':
                _y -= steps;
                break;
        }
        if(_x > xLength) xLength = _x;
        if(_y > yLength) yLength = _y;
    }
    const vis = Array(1000).fill(0).map((x) => new Array(1000).fill(0));
    const hPos = [yLength, 0];
    const tPos = [yLength, 0];

    // const m = JSON.parse(JSON.stringify(vis));
    // m[hPos[0]][hPos[1]] = 'H';
    // m[tPos[0]][tPos[1]] = 'T';
    console.log(xLength, yLength)
    for(let lines of queries) {
        // console.log(lines)
        let [dir, steps] = lines.split(' ');
        steps = +steps;

        switch(dir) {
            case 'R':
                hPos[1] += steps;
                break;
            case 'L':
                hPos[1] -= steps;
                break;
            case 'U':
                hPos[0] -= steps;
                break;
            case 'D':
                hPos[0] += steps;
                break;
        }
        let xDiff = hPos[1] - tPos[1];
        let yDiff = hPos[0] - tPos[0];

        if(
            (Math.abs(xDiff) > 1 && Math.abs(yDiff) >= 1) ||
            (Math.abs(xDiff) >= 1 && Math.abs(yDiff) > 1)
        ){
            if(Math.abs(xDiff) > 1) {
                tPos[0] = hPos[0];
                tPos[1] += (xDiff < 0 ? -1 : 1)
            } else if(Math.abs(yDiff) > 1) {
                tPos[0] += (yDiff < 0 ? -1 : 1 )
                tPos[1] = hPos[1]
            }
        }

        xDiff = hPos[1] - tPos[1];
        yDiff = hPos[0] - tPos[0];
        
        if(Math.abs(xDiff) > 1) {
            if(xDiff > 0) {
                while(tPos[1] < hPos[1] - 1) {
                    vis[tPos[0]][tPos[1]] = 1;
                    tPos[1]++;
                }
            } else if(xDiff < 0) {
                while(tPos[1] > hPos[1] + 1) {
                    vis[tPos[0]][tPos[1]] = 1;
                    tPos[1]--;
                }
            }
        }

        if(Math.abs(yDiff) > 1) {
            if(yDiff > 0) {
                while(tPos[0] < hPos[0] - 1) {
                    vis[tPos[0]][tPos[1]] = 1;
                    tPos[0]++;
                }
            } else if(yDiff < 0) {
                while(tPos[0] > hPos[0] + 1) {
                    vis[tPos[0]][tPos[1]] = 1;
                    tPos[0]--;
                }
            }
        }

        vis[tPos[0]][tPos[1]] = 1;
        
        // const map = JSON.parse(JSON.stringify(vis));
        // map[hPos[0]][hPos[1]] = 'H';
        // map[tPos[0]][tPos[1]] = 'T';
        // for(let row of map) {
        //     console.log(JSON.stringify(row))
        // }
        // console.log();
    }

    let count = 0;
    for(let row of vis) {
        for(let col of row) {
            if(+col === 1) count++;
        }
    }
    console.log(tPos, hPos);
    console.log(count)
} catch (e) {
    console.log(e)
}