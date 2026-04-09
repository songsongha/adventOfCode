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
    print('already_counted', already_counted)
    current_start, current_end = map(int, id.split('-'))
    print('current start and end',(current_start, current_end))
    range_count = current_end - current_start + 1
    print('range count. before', range_count)
    
    # recheck the already counted array until everything is combined.
    # don't do the range out until the end??
    for i, (start, end) in enumerate(already_counted):
        if start <= current_start <= end and start <= current_end <= end:
            print('count has already been counted')
            continue 
        elif current_start <= start and end <= current_end:
            print('new range is larger than previous range')
            duplicates = (end - start + 1)
            range_count = range_count - duplicates
            already_counted[i] = (current_start, current_end) 
        elif start <= current_start <= end:
            duplicates = (end - current_start + 1) 
            range_count = range_count - duplicates
            print('modify range count', range_count)
            already_counted[i] = (start, current_end)
        elif start <= current_end <= end:
            duplicates = (current_end - start + 1)
            range_count = range_count - duplicates
            print('modify range count', range_count)
            already_counted[i] = (current_start, end)
        else:
            already_counted.append((current_start,current_end))    

    print('range count. after', range_count)
    id_count += range_count
    print('id_count!', id_count)
    if len(already_counted) == 0:
        already_counted.append((current_start,current_end))

print(' final id_count',id_count)