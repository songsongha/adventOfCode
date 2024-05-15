// Problem 1: How many different arrangements of operational and broken springs fit the given criteria in each row and what are the sums of those values?

const fs = require('fs')

const countSpringArrangements = (conditionReport, damageArray, memo = {}) => {
    console.log({conditionReport})
    // condition report is a string
    // damageArray is an array of numbers
    // return a number
// split condtionreport at first .
// const groupings = conditionReport.split('.').filter(item=>!!item)
// console.log({groupings})
if (conditionReport.includes('?')) {
    // if the conditionReport has unknowns, create all the possible branches
    const springOptions = ['.', '#']
    for (let option of springOptions) {
        const newConditionReport = conditionReport.replace('?', option)
        console.log({newConditionReport})
        countSpringArrangements(newConditionReport, damageArray)
    }
} else {
    console.log({damageArray})
    // if conditionReport has no unknowns then check to see if it matches the grouping
    const reportGroupings = conditionReport.split('.').filter(item=>!!item)
    console.log({reportGroupings})
    let numWays = 0
    for (let i = 0; i < damageArray.length; i++){
        if (reportGroupings[i].length !== damageArray[i]){
            console.log('grouping doesnot match, should return 0')
            break
        }
    }
    console.log('group matches, return a 1')
    returnValue = 1
}
return returnValue

}

// put inputs from text file into an array
const puzzleData = fs.readFileSync('./input.txt', 'utf8').split('\n').map(line => line.split(' '))
console.log({puzzleData})
puzzleData.forEach(line =>{
    const [conditionReport, damageGrouping] = line
    const damageArray = damageGrouping.split(',').map(string => Number(string))
    console.log(countSpringArrangements(conditionReport, damageArray))
})

