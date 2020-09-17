const fs = require('fs')

const input = fs.readFileSync('coverage.txt').toString()

let lines = input.split('\n')

lines = lines.filter((l) => {
    if (l.trim().length === 0) return false
    if (l.trim() === 'Done') return false
    return true
})

lines = lines.map((l) => `|${l}`)

lines = lines.filter((line, index) => {
    if (index === 2) return true
    if (line.includes('-') && line.includes('|')) return false
    return true
})

console.log(lines.join('\n'))
