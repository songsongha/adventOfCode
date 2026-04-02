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
    
        
print (id_data)
# brute force
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
        if length % 2 != 0 or length == 1:
            # no way to have matching double number
            # round to nearest double number with even number of places
            half_value = 10 ** halfway_index
            id = int(str(half_value) + str(half_value))
            continue
        # check for matching values
        if check_for_match(id):
            total += id
        id = id+1 # change this to next duplicate number for efficiency
print(total)
