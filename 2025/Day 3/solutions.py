# What is the largest possible joltage
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

total_jolt = 0    
for bank in battery_banks:
    first_index = get_index_of_highest_value(bank, True)
    first_num = bank[first_index]
    rest = bank[first_index+1:]

    second_index = get_index_of_highest_value(rest, False)
    second_num = rest[second_index]

    jolt = int(first_num + second_num)
    total_jolt += jolt

print(total_jolt)
