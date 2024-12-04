
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
similarity_score = 0
occurence_hash = {}
for i in range(len(left_column)):
    left = left_column[i]
    right = right_column[i]
    # Part 1
    sum += abs(left - right)
    # Part 2
    if not left in occurence_hash:
        occurence_in_right = len([num for num in right_column if num == left])
        occurence_hash[left] = occurence_in_right
    
    similarity_score += left * occurence_hash[left]

    
print('sum', sum)
print('similarity score', similarity_score)

