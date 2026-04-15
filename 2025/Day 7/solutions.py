# beam splitter
# find the index of S
# check rows below for first splitter
# increment the split count
# keep track of indices of the new split, remove the old beam location

with open('inputs.txt', 'r') as f:
    content = f.read().splitlines()

print(content)
beam_split_count = 0
beam_index_set = set()
upper_bound = len(content[0])
for row_index, row in enumerate(content):
    if row_index == 0:
        s_index = row.index('S')
        beam_index_set.add(s_index)
        continue
    copy_beam_index_set = beam_index_set.copy()
    for beam_index in copy_beam_index_set:

        if row[beam_index] == '^':
            beam_split_count += 1
            beam_index_set.remove(beam_index)
            beam_index_set.update([beam_index+1, beam_index-1])
            beam_index_set.difference_update([-1, upper_bound ])
print(beam_split_count)
        

