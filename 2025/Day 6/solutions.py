

with open('inputs.txt', 'r') as f:
    content = list(map(str.split, f))
    

number_matrix = content[:-1]
operators = content[-1]

print(content)
transposed = [list(map(int, row)) for row in zip(*number_matrix)]

print(transposed)
print(operators)

sum = 0
for i, row in enumerate(transposed):
    row_answer = None
    for col in row:
        operator = operators[i]
        if row_answer is None:
            row_answer = col
        elif operator == '*':
            row_answer *= col
        elif operator =='+':
            row_answer += col

    print(row_answer)
    sum+= row_answer
print('sum',sum)