# What is the largest possible joltage when turning on 2 batteries in each bank
battery_banks = []
with open("inputs.txt", "r") as file:
    battery_banks = file.read().splitlines()
print('battery_banks', battery_banks)

def get_index_of_highest_value(string_num: str, exclude_last: bool):
    length = len(string_num)
    for i in reversed(range(0,10)):
        index = string_num.find(str(i))
        if index == -1 or (exclude_last and index == length -1): continue
        return index
    
def get_index_of_highest_value_2(string_num: str, exclude_size: int):
    length = len(string_num)
    exclude_index = length - exclude_size
    for i in reversed(range(0,10)):
        index = string_num.find(str(i))
        if index == -1 or index >= exclude_index: 
            continue
        return index


total_jolt = 0
# Part 1 Code  
# for bank in battery_banks:
#     first_index = get_index_of_highest_value(bank, True)
#     first_num = bank[first_index]
#     rest = bank[first_index+1:]

#     second_index = get_index_of_highest_value(rest, False)
#     second_num = rest[second_index]

#     jolt = int(first_num + second_num)
#     total_jolt += jolt

# print(total_jolt)

# what if we turn on 12 batteries in each bank
for bank in battery_banks:
    jolt_string = ''
    bank_left_to_check = bank
    exclude_size = 0
    for j in range(12):
        exclude_size = 11-j

        str_index = get_index_of_highest_value_2(bank_left_to_check, exclude_size)
        digit = bank_left_to_check[str_index]
        bank_left_to_check = bank_left_to_check[str_index+1:]
        jolt_string += digit

    jolt = int(jolt_string)   
    total_jolt += jolt

print(total_jolt)