// Problem 1: How many different arrangements of operational and broken springs fit the given criteria in each row and what are the sums of those values?
// Problem 2: conditionRepor is expanded, now how many possibibilities exist and what is the sum?

const fs = require('fs')

const countSpringArrangements = (conditionReport, damageArray, memo = {}) => {
    console.log({conditionReport})
    let totalCount = 0
    // condition report is a string
    // damageArray is an array of numbers
    // return a number
if (conditionReport.includes('?')) {
    // if the conditionReport has unknowns, create all the possible branches
    console.log({conditionReport})
    // check if we need to prune the branch
    const reportGroupings = conditionReport.split('.').filter(item=>!!item)
    console.log({reportGroupings})
    for (let i = 0; i < damageArray.length; i++){
        if (reportGroupings[i].includes('?')){
            // don't bother with rest of the for loop if we have an unknown
            break
        } else if (reportGroupings[i].length !== damageArray[i]){
            console.log('grouping doesnot match, should return 0')
            return 0
        }
    }
    const springOptions = ['.', '#']
    for (let option of springOptions) {
        const newConditionReport = conditionReport.replace('?', option)
        console.log({newConditionReport})
        const result =  countSpringArrangements(newConditionReport, damageArray)
        if (result) totalCount += result
    }
} else {
    console.log({damageArray})
    // if conditionReport has no unknowns then check to see if it matches the grouping
    const reportGroupings = conditionReport.split('.').filter(item=>!!item)
    console.log({reportGroupings})
    for (let i = 0; i < damageArray.length; i++){
        if (reportGroupings.length !== damageArray.length || reportGroupings[i].length !== damageArray[i]){
            console.log('grouping doesnot match, should return 0')
            return 0
        }
    }
    console.log('group matches, return a 1')
    return 1
}
return totalCount

}

// put inputs from text file into an array
const puzzleData = fs.readFileSync('./input.txt', 'utf8').split('\n').map(line => line.split(' '))
console.log({puzzleData})
let totalCount = 0
puzzleData.forEach(line =>{
    const [conditionReport, damageGrouping] = line
    const damageArray = damageGrouping.split(',').map(string => Number(string))
    totalCount += (countSpringArrangements(conditionReport, damageArray))
})

console.log({totalCount})