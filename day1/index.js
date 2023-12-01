const fs = require("fs")

const getRowNumber = row => {
    const numbers = row.replace(/[^0-9]/g, '')
    const first = numbers[0]
    const last = numbers[numbers.length - 1]
    return parseInt(`${first}${last}`, 10)
}

const compute = data => {
    
    const rows = data.split("\n")
    let sum = 0
    for (const row of rows) {
        sum += getRowNumber(row)
    }
    console.log(sum)
}


fs.readFile("../inputs/day1", 'utf8', (err, data) => {
    compute(data)
})
