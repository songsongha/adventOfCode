
# Part 1: Find sum of distance between the columns

left_column = []
right_column = []

with open("inputs.txt", "r") as file:
    for line in file:
        line.strip().splitlines()
        left, right = map(int, line.split())
        left_column.append(left)
        right_column.append(right)

left_column.sort()
right_column.sort()

sum = 0
for i in range(len(left_column)):
    sum += abs(left_column[i] - right_column[i])
    
print(sum)