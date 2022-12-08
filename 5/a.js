const fs = require('fs');
let listOfStacks = []

listOfStacks[0] = ['B','G','S','C']
listOfStacks[1] = ['T','M','W','H','J','N','V','G']
listOfStacks[2] = ['M','S','Q']
listOfStacks[3] = ['B','S','L','T','W','N','M']
listOfStacks[4] = ['J','Z','F','T','V','G','W','P']
listOfStacks[5] = ['C','T','B','G','Q','H','S']
listOfStacks[6] = ['T','H','P','B','W']
listOfStacks[7] = ['G','D','C','Z','F','T','Q','M']
listOfStacks[8] = ['N','S','H','B','P','F']

// listOfStacks[0] = ['Z','N']
// listOfStacks[1] = ['M','C','D']
// listOfStacks[2] = ['P']

try {
    const queries = fs.readFileSync('a.txt', 'utf8').split('\r\n').map((i) => {
        const splitted = i.split(' ')
        return [splitted[1], splitted[3], splitted[5]]
    });
    
    for(query of queries) {
        const count = +query[0];
        const from = +query[1] - 1;
        const fromLen = listOfStacks[from].length;
        const to = +query[2] - 1;

        const deleted = listOfStacks[from].splice(fromLen - count, count).reverse();
        listOfStacks[to].push(...deleted)
        // for(stack of listOfStacks) {
        //     console.log(stack)
        // }
        // console.log('\n')
    }
    let res = "";
    for(stack of listOfStacks) {
        res += stack[stack.length - 1]
    }
    console.log(res)
} catch (err) {
    console.error(err);
}