# Part 1: Find sum of distance between the columns
def get_dial_position(input: int):
    dial_number = input % 100
    if dial_number >= 0 and dial_number <= 99:
        return dial_number
    if dial_number < 0:
        return 100 + dial_number
    if dial_number > 99:
        return dial_number - 100

instructions = []
with open("inputs.txt", "r") as file:
    instructions = file.read().splitlines()
    
print(instructions)    
zero_count = 0
dial_position = 50
for line in instructions:
    direction = line[0]    # "L"
    amount = int(line[1:])  
    if direction == 'L':
        dial_position = get_dial_position(dial_position - amount)
        print('LEFT', amount)
    elif direction == 'R':
        dial_position = get_dial_position(dial_position + amount)
        print('RIGHT', amount)
    if dial_position == 0:
        zero_count+=1
        print('increment counter')
    print('new dial position', dial_position)
print('zero_counter', zero_count)
