const fs = require('fs');
try {
    const queries = fs.readFileSync('b.txt', 'utf8').split('\r\n');
    const vis = [];
    const scores = [];
    const grid = queries.map((lines) => lines.split('').map((x) => +x))
    const n = grid.length;
    const m = grid[0].length;

    let count = 0;
    vis[0] = Array(m).fill(0);
    vis[n-1] = Array(m).fill(0);
    
    for(let i = 1; i < n-1; i++) {
        vis[i] = Array(m).fill(0)
        const cols = grid[i]
        const left = cols[0];
        const right = cols[m - 1];
        
        for(let j = 1; j < m-1; j++) {
            const top = grid[0][j];
            const bottom = grid[n-1][j];
            if(left >= cols[j] && right >= cols[j] && top >= cols[j] && bottom >= cols[j]) {
                vis[i][j] = -1
                continue;
            }
            if(vis[i][j] || vis[i][j] === -1) continue;
            if(left < cols[j]) {
                let valid = true;
                for(let k = 1; k < j; k++) {
                    if(cols[k] >= cols[j]) {
                        valid = 0;
                        break;
                    }
                }
                if(valid) {
                    count++
                    // console.log(i, j, cols[j])
                    if(!vis[i]) {
                        vis[i] = []
                    }
                    vis[i][j] = 1;
                }
            }
            if(vis[i][j] || vis[i][j] === -1) continue;
            if(right < cols[j]) {
                let valid = 1;
                for(let k = j + 1; k < m - 1; k++) {
                    if(cols[k] >= cols[j]) {
                        valid = 0;
                        break;
                    }
                }
                if(valid) {
                    count++;
                    // console.log(i, j, cols[j])
                    if(!vis[i]) {
                        vis[i] = []
                    }
                    vis[i][j] = 1;
                }
            }
        }
    }

    for(let i = 1; i < m-1; i++) {
        const top = grid[0][i];
        const bottom = grid[n-1][i];

        for(let j = 1; j < n-1; j++) {
            if(vis[j][i] || vis[j][i] === -1) continue;
            if(top < grid[j][i]) {
                let valid = true;
                for(let k = 1; k < j; k++) {
                    if(grid[k][i] >= grid[j][i]) {
                        valid = 0;
                        break;
                    }
                }
                if(valid) {
                    count++
                    // console.log(i, j, cols[j])
                    if(!vis[j]) {
                        vis[j] = []
                    }
                    vis[j][i] = 1;
                }
            }
            if(vis[j][i] || vis[j][i] === -1) continue;
            if(bottom < grid[j][i]) {
                let valid = true;
                for(let k = j + 1; k < n - 1; k++) {
                    if(grid[k][i] >= grid[j][i]) {
                        valid = 0;
                        break;
                    }
                }
                if(valid) {
                    count++;
                    // console.log(i, j, cols[j])
                    if(!vis[j]) {
                        vis[j] = []
                    }
                    vis[j][i] = 1;
                }
            }
        }
    }
    
    let scenic = 0;
    
    for(let i = 1; i < n-1; i++) {
        for(let j = 1; j < m-1; j++) {
            let score = 1;
            if(vis[i][j] === 1) {
                // check left
                let k = 0
                let count = 0
                for(k = j-1; k >= 0; k--) {
                    count++;
                    if(grid[i][k] >= grid[i][j]) {
                        break;
                    }
                }
                score *= count;
                // check right
                count = 0;
                for(k = j + 1; k < m; k++) {
                    count++;
                    if(grid[i][k] >= grid[i][j]) {
                        break;
                    }
                }
                score *= count;
                // check top
                count = 0;
                for(k = i-1; k >= 0; k--) {
                    count++;
                    if(grid[k][j] >= grid[i][j]) {
                        break;
                    }
                }
                score *= count;
                // check bottom
                count = 0
                for(k = i + 1; k < n; k++) {
                    count++;
                    if(grid[k][j] >= grid[i][j]) {
                        break;
                    }
                }
                score *= count;
            }
            vis[i][j] = score;
            if(score > scenic) scenic = score;
        }
    }
    console.log(scenic)
    // for(let row of vis) {
    //     console.log(row)
    // }
    
} catch (e) {
    console.log(e)
}