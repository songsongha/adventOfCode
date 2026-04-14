

# with open('inputs.txt', 'r') as f:
#     content = list(map(str.split, f))
    

# number_matrix = content[:-1]
# operators = content[-1]
# print (number_matrix)
# print(content)
# transposed = [list(map(int, row)) for row in zip(*number_matrix)]

# print(transposed)
# print(operators)

# sum = 0
# for i, row in enumerate(transposed):
#     row_answer = None
#     for col in row:
#         operator = operators[i]
#         if row_answer is None:
#             row_answer = col
#         elif operator == '*':
#             row_answer *= col
#         elif operator =='+':
#             row_answer += col

#     print(row_answer)
#     sum+= row_answer
# print('sum',sum)

# part 2 
# split off the operators
# split on each row, keep it as a string
# get the length of the row, this is the loop to iterate over
# however many rows there are are how many arrays we need to look through.
# check the index for all rows if all values are an empty space move operator index


with open('inputs.txt', 'r') as f:
    content = f.read().splitlines()
    

number_matrix = content[:-1]
operators = content[-1].split()
print(number_matrix)
print(operators)
operator_index = 0
str_length = len(number_matrix[0])
grand_total = 0
sub_total = None
for col_index in range(str_length):
    operator = operators[operator_index]
    str_value = ''
    for row_index, row in enumerate(number_matrix):
        str_value += number_matrix[row_index][col_index]
    if str_value.isspace() or col_index == str_length:
        print('subtotal', sub_total)
        grand_total += sub_total
        operator_index +=1
        sub_total = None
    else:
        num_value = int(str_value)
        print(num_value)
        if sub_total is None:
            sub_total = num_value
        elif operator == '*':
            sub_total *= num_value
        elif operator =='+':
            sub_total += num_value   

# need to add the last subtotal
grand_total += sub_total
print('grand total', grand_total)
