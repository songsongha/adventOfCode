
# Part 1: Find how many reports are safe
report_array = []

with open("inputs.txt", "r") as file:
    for line in file:
        report_array.append(list(map(int, line.split(' '))))

def isSafe(report):
    is_increasing = None
    for i in range(len(report)-1):
        difference = report[i+1] - report[i]
        if difference == 0:
            return False
        if i == 0:
            is_increasing = (False, True) [difference > 0]
        else:
            if (is_increasing is True and difference < 0) or (is_increasing is False and difference > 0):
                return False
        if abs(difference) > 3:
            return False
    return True

safe_count = 0
for report in report_array:
    if isSafe (report) is True:
        safe_count +=1
    
print(safe_count)        
