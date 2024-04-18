// Problem 1: Find the rank of every hand in your set, what are the total winnings?

const fs = require('fs')

// put inputs from text file into an array
const puzzleData = fs.readFileSync('./input.txt', 'utf8').split('\n')
console.log({puzzleData})
const cardStrengthOrder = ['2', '3','4','5','6','7','8','9','T','J','Q','K','A' ]
const handStrengthOrder = ['HC','1P', '2P', 'TOK', 'FH', '4OK', '5OK']

const handRegex = /[\w]{5}/
const bidRegex = /\s\d+/
// figure out the type of hand we have
const handType = (hand)=>{
    const charMap = {}
    for (let char of hand) {
        if (charMap[char]) {
            charMap[char]++
        } else {
            charMap[char] = 1
        }
    }
    console.log({charMap})
    let handType = ''
    const numberOfUniqueChars = Object.keys(charMap).length
    const duplicateArray = Object.values(charMap)
    console.log({duplicateArray})

    // ['HC','1P', '2P', 'TOK', 'FH', '4OK', '5OK']
    switch (numberOfUniqueChars) {
        case 1:
            handType = '5OK'
            break
        case 2:
            // could be four of a kind or a fullhouse
            if (duplicateArray.includes(4)){
                handType = '4OK'
            } else {
                handType = 'FH'
            }
            break
        case 3:
            // could be three of a kind or two pair
            if (duplicateArray.includes(3)){
                handType = 'TOK'
            } else {
                handType = '2P'
            }
            break
        case 4: 
            handType = '1P'
            break
        case 5:
            handType = 'HC' 
            break    
    }
    return handType
}

const handData = puzzleData.map(line =>{
    const hand = line.match(handRegex)[0]
    return {
        hand,
        handType: handType(hand),
        bid: Number(line.match(bidRegex))
    }
})
console.log({handData})

// rank the type of hands we have
handData.sort((handA,handB)=> {
    if (handA.handType !== handB.handType) {
        // descending order
        return handStrengthOrder.indexOf(handB.handType) - handStrengthOrder.indexOf(handA.handType)
    } else {
        return cardStrengthOrder.indexOf(handB.hand[0]) - cardStrengthOrder.indexOf(handA.hand[0]) 
    } 
})

console.log('handDataSorted', handData)

// multiply the bids by the rank
