
# Part 1: Fix the multiplication machine

import re

input = ''

with open("inputs.txt", "r") as file:
    input = file.read()

regex = r"mul\((\d+),(\d+)\)"

calculations = re.findall(regex, input)

total_sum = 0
for match in calculations:
    num1, num2 = map(int, match)
    total_sum += num1 * num2

print(total_sum)