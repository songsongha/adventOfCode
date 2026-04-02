id_data = []
with open("inputs.txt", "r") as file:
    id_data = file.read().strip().split(',')

def check_for_match(id:int):
    id_str = str(id)
    length = len(id_str)
    if length % 2 != 0:
        return False
    halfway_index = length//2    
    for i in range(halfway_index):
        if id_str[i] != id_str[halfway_index+i]:
            return False
    return True

def check_for_match_part2(id:int):
    id_str = str(id)
    length = len(id_str)
    for chunk_size in range(1, length):
        if length % chunk_size == 0:  # must divide evenly
            chunk = id_str[:chunk_size]
            if chunk * (length // chunk_size) == id_str:
                return True
    return False
    

# Part 1: Sum up all ids with double repeating values
# Part 2: Sum up all ids with any repeating values
total = 0
for id_range in id_data:
    lower, upper = map(int, id_range.split('-'))
    print(lower, upper)
    # check range for duplicates
    id = lower
    while id <= upper:
        length = len(str(id))
        halfway_index = length//2
        print(halfway_index)
        # only needed for part 1
        # if length % 2 != 0 or length == 1:
        #     # no way to have matching double number
        #     # round to nearest double number with even number of places
        #     half_value = 10 ** halfway_index
        #     id = int(str(half_value) + str(half_value))
        #     continue
        # # check for matching values,
        if check_for_match_part2(id):
            total += id
        id = id+1 
print(total)
