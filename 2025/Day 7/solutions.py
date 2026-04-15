# Part 1 beam splitter
# find the index of S
# check rows below for first splitter
# increment the split count
# keep track of indices of the new split, remove the old beam location


# Part 2 how many timelines? Each node has two ways to leave there.
# Need to know how long the node chain is.
    # row index is not the depth of the tree
    # depth of the tree is number of nodes before it

with open('inputs.txt', 'r') as f:
    content = f.read().splitlines()

print(content)
beam_split_count = 0
beam_index_set = set()
upper_bound = len(content[0])
# key is the node position it came from
# value is the number of ways we got there
pathways_memo = {}
for row_index, row in enumerate(content):
    if row_index == 0:
        s_index = row.index('S')
        beam_index_set.add(s_index)
        pathways_memo[s_index] = 1
        continue
    copy_beam_index_set = beam_index_set.copy()
    for beam_index in copy_beam_index_set:
        if row[beam_index] == '^':
            ways_to_get_here = pathways_memo[beam_index]
            # check if the new paths already have a way to get there
            left = pathways_memo.get(beam_index-1)
            if left:
                pathways_memo[beam_index-1] = left + ways_to_get_here
            else:
                pathways_memo[beam_index-1] = ways_to_get_here

            right = pathways_memo.get(beam_index+1)
            if right:
                pathways_memo[beam_index+1] = right + ways_to_get_here
            else:
                pathways_memo[beam_index+1] = ways_to_get_here

            beam_split_count += 1
            beam_index_set.remove(beam_index)
            del pathways_memo[beam_index]
            beam_index_set.update([beam_index+1, beam_index-1])
            beam_index_set.difference_update([-1, upper_bound ])
print(beam_split_count)

# check all my ending beam pathways and add up paths
total_paths = 0
for beam_index in beam_index_set:
    total_paths += pathways_memo[beam_index]
print(total_paths)


