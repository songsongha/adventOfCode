
# Part 1: Fix the multiplication machine

import re

input_string = ''

with open("inputs.txt", "r") as file:
    input_string = file.read()

def getCalcs(input):
    regex = r"mul\((\d+),(\d+)\)"

    calculations = re.findall(regex, input)

    total_sum = 0
    for match in calculations:
        num1, num2 = map(int, match)
        total_sum += num1 * num2

    return total_sum

print('Part1', getCalcs(input_string))

regex2 = r"don't\(\).*?do\(\)"
result = re.sub(regex2, "", input_string)
result = re.sub(regex2, "", result)
result = re.sub(regex2, "", result)
result = re.sub(regex2, "", result)

print(result)
print('Part2', getCalcs(result))
