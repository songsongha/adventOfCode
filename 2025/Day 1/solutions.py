# Part 1: Find the number of times the dial ends on 0
# def get_dial_position(input: int):
#     dial_number = input % 100
#     if dial_number >= 0 and dial_number <= 99:
#         return dial_number
#     if dial_number < 0:
#         return 100 + dial_number
#     if dial_number > 99:
#         return dial_number - 100

# instructions = []
# with open("inputs.txt", "r") as file:
#     instructions = file.read().splitlines()
    
# print(instructions)    
# zero_count = 0
# dial_position = 50
# for line in instructions:
#     direction = line[0]    # "L"
#     amount = int(line[1:])  
#     if direction == 'L':
#         dial_position = get_dial_position(dial_position - amount)
#         print('LEFT', amount)
#     elif direction == 'R':
#         dial_position = get_dial_position(dial_position + amount)
#         print('RIGHT', amount)
#     if dial_position == 0:
#         zero_count+=1
#         print('increment counter')
#     print('new dial position', dial_position)
# print('zero_counter', zero_count)

# Part 2 - Count all of the times it passes through zero

instructions = []
with open("inputs.txt", "r") as file:
    instructions = file.read().splitlines()
    
print(instructions)    
zero_count = 0
dial_position = 50
for line in instructions:
    direction = line[0]
    amount = int(line[1:])  
    print('line', line)
    print('dial position', dial_position)

    if direction == 'L':
        new_instruction = dial_position - amount
    elif direction == 'R':
        new_instruction = dial_position + amount
    print('new instruction', new_instruction)        

    # can't use div mode here because a negative number will round towards negative infinisty instead of toward zero
    rotations = abs(int(new_instruction / 100))
    print('rotations', rotations)
    new_dial_position = new_instruction % 100
    print('new dial position', new_dial_position)
    if (new_instruction < 0 and dial_position > 0) or (new_dial_position == 0 and rotations == 0):
        rotations += 1
    zero_count += abs(rotations)
    print ('new zero count', zero_count)
    dial_position = new_dial_position
print('zero_counter', zero_count)