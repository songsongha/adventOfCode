with open('inputs.txt', 'r') as f:
    content = f.read()

before_break, after_break = content.strip().split('\n\n')

fresh_ids = before_break.strip().split('\n')
available_ingredients = after_break.strip().split('\n')

# print("fresh_ids:", fresh_ids)
# print("available_ingredients:", available_ingredients)

# # for each available ingredients check if it falls in one of the fresh id ranges.
# # if it is fresh, increment the fresh counter. 
# # maybe keep track of whether there are repeats?

# fresh_count = 0
# for ingredient in available_ingredients:
#     print(ingredient)
#     for id in fresh_ids:
#         start, end = id.split('-')
#         if int(start) <= int(ingredient) <= int(end):
#             fresh_count += 1        
#             break

# print('fresh count', fresh_count)

# part 2 find number of unique values in the ranges
already_counted = []
id_count = 0
for id in fresh_ids:
    current_start, current_end = map(int, id.split('-'))
    print('current start and end',(current_start, current_end))
    
    # recheck the already counted array until everything is combined.
    # don't do the range out until the end??
    merged = False
    for i, (start, end) in enumerate(already_counted.copy()):
        if start <= current_start <= end and start <= current_end <= end:
            print('count has already been counted')
            merged = True
            continue
        elif current_start <= start and end <= current_end:
            print('new range is larger than previous range')
            already_counted[i] = (current_start, current_end) 
            merged = True
        elif start <= current_start <= end:
            duplicates = (end - current_start + 1) 
            already_counted[i] = (start, current_end)
            merged = True
        elif start <= current_end <= end:
            duplicates = (current_end - start + 1)
            already_counted[i] = (current_start, end)
            merged = True  
    if not merged:
        already_counted.append((current_start,current_end))
    print(already_counted)        
filtered = list(set(already_counted))
print ('go over the array again to check that there are ranges')
while True:
    filtered_copy = filtered.copy()
    modification_made = False
    for i, (current_start, current_end) in enumerate(filtered_copy):
        for j in range(len(filtered_copy)):
            if i == j: continue
            (start, end) = filtered_copy[j]
            if start <= current_start <= end and start <= current_end <= end:
                # i range is contained within j range, so keep j_range
                filtered[i] = None
                modification_made = True
                continue 
            elif current_start <= start and end <= current_end:
                # i range is larger than j range, so keep i range
                filtered[j] = None 
                modification_made = True
            elif start <= current_start <= end:
                # remove i and modify j
                filtered[i] = None
                filtered[j] = (start, current_end)
                modification_made = True
            elif start <= current_end <= end:
                # remove i and modify j
                filtered[i] = None
                filtered[j] = (current_start, end)
                modification_made = True
        # if we made modifications for this particular entry, restart looking at i entries        
        if modification_made == True: 
            filtered = list(filter(None, filtered))
            break
    if modification_made == False:
        # went through the entire array with no mods
        break

print(filtered)   
# now loop over to count
for (start, end) in filtered:
    id_count += end - start + 1


print(' final id_count',id_count)