// Problem 1: Find the rank of every hand in your set, what are the total winnings?
// Part 2: J cards are now jokers and the weakest individual card, but can be wild. What are the new total winnings?

const fs = require('fs')

// put inputs from text file into an array
const puzzleData = fs.readFileSync('./input.txt', 'utf8').split('\n')


const camelCardsGame = (gameType)=> {

    const cardStrengthOrder = gameType === 'joker'? ['J','2', '3','4','5','6','7','8','9','T','Q','K','A' ]: ['2', '3','4','5','6','7','8','9','T','J','Q','K','A' ]
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

        let handType = ''
        const charMapKeys = Object.keys(charMap)
        const numberOfJokers = charMap['J']
        let numberOfUniqueChars = charMapKeys.length
        let duplicateArray = Object.values(charMap)

        if( gameType === 'joker' && numberOfJokers && numberOfJokers < 5){
            delete charMap['J']
            duplicateArray = Object.values(charMap)
            // sort descending
            duplicateArray.sort((a,b)=> b-a)
            duplicateArray[0] += numberOfJokers
            numberOfUniqueChars = duplicateArray.length
        }

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

    // rank the type of hands we have
    handData.sort((handA,handB)=> {
        if (handA.handType !== handB.handType) {
            // ascending order
            return handStrengthOrder.indexOf(handA.handType) - handStrengthOrder.indexOf(handB.handType)
        } else if (handB.hand[0] !== handA.hand[0]) {
            return cardStrengthOrder.indexOf(handA.hand[0]) - cardStrengthOrder.indexOf(handB.hand[0]) 
        } else if (handB.hand[1] !== handA.hand[1]){
            return cardStrengthOrder.indexOf(handA.hand[1]) - cardStrengthOrder.indexOf(handB.hand[1]) 
        } else if (handB.hand[2] !== handA.hand[2]){
            return cardStrengthOrder.indexOf(handA.hand[2]) - cardStrengthOrder.indexOf(handB.hand[2]) 
        }else if (handB.hand[3] !== handA.hand[3]){
            return cardStrengthOrder.indexOf(handA.hand[3]) - cardStrengthOrder.indexOf(handB.hand[3]) 
        } else {
            return cardStrengthOrder.indexOf(handA.hand[4]) - cardStrengthOrder.indexOf(handB.hand[4]) 
        }
    })
console.log({handData})
    // multiply the bids by the rank
    let winnings = 0
    handData.forEach((hand, index) =>{
        const { bid } = hand
        winnings += bid * (index+1)
    })
    console.log( gameType, winnings)
}

camelCardsGame('regular')
camelCardsGame('joker')