const fs = require('fs');
try {
    const queries = fs.readFileSync('a.txt', 'utf8').split('\r\n');
    for(line of queries) {
        // console.log(line)
        let l = 0; let r = 3;
        map = {}
        while(r < line.length) {
            let found = true;
            for(let i = l; i <= r; i++) {
                if(!map[line[i]]) map[line[i]] = true;
                else {
                    found = false;
                    break;
                };
            }
            if(!found) {
                l += 1;
                r += 1;
                map = {};
            } else {
                console.log(r + 1);
                break;
            }
        }
    }
} catch (e) {

}