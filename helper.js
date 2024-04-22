function gcd(a, b) {
    // Using Euclid's algorithm
    while (b !== 0) {
        let temp = b;
        b = a % b;
        a = temp;
    }
    return a;
}

// Function to calculate the least common multiple (LCM) of two numbers
function lcm(a, b) {
    return (a * b) / gcd(a, b);
}

// Function to calculate the least common multiple (LCM) of an array of numbers
function lcmOfArray(numbers) {
    return numbers.reduce((acc, curr) => lcm(acc, curr), 1);
}

module.exports = lcmOfArray;
