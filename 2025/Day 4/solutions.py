# How many rolls of paper have less than 4 rolls adjacent
# diagram = []
# with open("inputs.txt", "r") as file:
#     diagram = file.read().splitlines()
# print('diagram', diagram)

# def can_access(row, col):
#     # 8-directional deltas
#     DIRS = [(-1,-1), (-1,0), (-1,1),
#             ( 0,-1),         ( 0,1),
#             ( 1,-1), ( 1,0), ( 1,1)]
#     roll_count = 0
#     for dr, dc in DIRS:
#         r, c = row + dr, col + dc
#         if 0 <= r < len(diagram) and 0 <= c < len(diagram[0]):
#             if diagram[r][c] == '@':
#                 roll_count += 1
#         if roll_count > 3:
#             return False   
#     return True

# num_rows = len(diagram)
# num_cols = len(diagram[0])
# access_count = 0
# for row_index in range(num_rows):
#     for col_index in range(num_cols):
#         symbol = diagram[row_index][col_index]
#         if symbol == '@':
#             if can_access(row_index,col_index):
#                 print('accessable', row_index, col_index)
#                 access_count += 1
# print(access_count)

# part 2 if we remove the rolls in each step of access, how many rolls can be accessed?
# create a memo / set to track access

diagram = []
with open("inputs.txt", "r") as file:
    diagram = file.read().splitlines()

removed_set = set()

def can_access(row, col):
    if (row,col) in removed_set:
        return False
    DIRS = [(-1,-1), (-1,0), (-1,1),
            ( 0,-1),         ( 0,1),
            ( 1,-1), ( 1,0), ( 1,1)]
    roll_count = 0
    for dr, dc in DIRS:
        r, c = row + dr, col + dc
        if 0 <= r < len(diagram) and 0 <= c < len(diagram[0]):
            if diagram[r][c] == '@' and (r, c) not in removed_set:
                roll_count += 1
        if roll_count > 3:
            return False   
    return True

num_rows = len(diagram)
num_cols = len(diagram[0])
access_count = 0
while True:
    to_be_removed = []
    for row_index in range(num_rows):
        for col_index in range(num_cols):
            symbol = diagram[row_index][col_index]
            if symbol == '@':
                if can_access(row_index,col_index):
                    to_be_removed.append((row_index,col_index))
                    access_count += 1
    if len(to_be_removed) == 0:
        break
    removed_set.update(to_be_removed)
print('total removed', access_count)