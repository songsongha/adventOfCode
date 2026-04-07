with open('inputs.txt', 'r') as f:
    content = f.read()

before_break, after_break = content.strip().split('\n\n')

fresh_ids = before_break.strip().split('\n')
available_ingredients = after_break.strip().split('\n')

print("fresh_ids:", fresh_ids)
print("available_ingredients:", available_ingredients)

# for each available ingredients check if it falls in one of the fresh id ranges.
# if it is fresh, increment the fresh counter. 
# maybe keep track of whether there are repeats?

fresh_count = 0
for ingredient in available_ingredients:
    print(ingredient)
    for id in fresh_ids:
        start, end = id.split('-')
        if int(start) <= int(ingredient) <= int(end):
            fresh_count += 1        
            break

print('fresh count', fresh_count)