const fs = require('fs');
try {
    const queries = fs.readFileSync('a.txt', 'utf8').split('\r\n');
    let grid = [];
    const len = queries.length;
    let leftEdge = [];
    let rightEdge = [];

    for(let i = 0; i < len; i++) {
        const cols = queries[i].split('');
        const left = cols[0];
        const right = cols[cols.length - 1];
        
        for(let j = 1; j < cols.length - 1; j++) {
            if(cols[j] > left || cols[j] > right) {
                
            }
        }
    }
    
} catch (e) {
    console.log(e)
}