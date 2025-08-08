# Problem 1: Cast Vote
# Write a function cast_vote() that records a vote for a candidate in an election. The function accepts a dictionary votes that maps candidates to their current number of votes and a string candidate that represents the candidate the user would like to vote for. If the candidate doesn't exist, add them to the dictionary. The function should return the updated dictionary.

# def cast_vote(votes, candidate):
#     pass
# Example Usage:

# votes = {"Alice": 5, "Bob": 3}
# cast_vote(votes, "Alice")
# print(votes)
# cast_vote(votes, "Gina")
# print(votes)

# def cast_vote(votes, candidate):
#     if candidate in votes:
#         votes[candidate] += 1
#     else:
#         votes[candidate] = 1
#     return votes

# votes = {"Alice": 5, "Bob": 3}
# cast_vote(votes, "Alice")
# print(votes)
# cast_vote(votes, "Gina")
# print(votes)


# Problem 2: Keys in Common
# Write a function that takes in two dictionaries, dict1 and dict2 and finds all keys common to both dictionaries. The function returns a list of common keys.

# def common_keys(dict1, dict2):
# 	pass
# Example Usage:

# dict1 = {"a": 1, "b": 2, "c": 3}
# dict2 = {"b": 4, "c": 5, "d": 6}
# common_list = common_keys(dict1, dict2)
# print(common_list)

# def common_keys(dict1, dict2):
#     list=[]
#     for keys in dict1:
#             if keys in dict2:
#                 list.append(keys)
#     return list
                
# dict1 = {"a": 1, "b": 2, "c": 3}
# dict2 = {"b": 4, "c": 5, "d": 6}
# common_list = common_keys(dict1, dict2)
# print(common_list)


# Problem 3: Highest Priority Task
# Given a dictionary tasks where keys are task names and values are priorities (1-10, where 10 is the highest priority), write a function get_highest_priority_task() that removes the task with the highest priority from the dictionary and returns its name.
# If two tasks have the same priority, return the task that comes first in the alphabet.

# def get_highest_priority_task(tasks):
# 	pass
# Example Usage:

# tasks = {"task1": 8, "task2": 10, "task3": 9, "task4": 10, "task5": 7}
# perform_task = (get_highest_priority_task(tasks))
# print(perform_task)

# perform_task = (get_highest_priority_task(tasks))
# print(perform_task)

# perform_task = (get_highest_priority_task(tasks))
# print(perform_task)

# print(tasks)

# def get_highest_priority_task(tasks):
#     max_value=0
#     highest_priority_task=""
#     for key in tasks:
#         if tasks[key]>max_value:
#             max_value=tasks[key]
#             highest_priority_task=key
    
#     tasks.pop(highest_priority_task)
#     return highest_priority_task

# tasks = {"task1": 8, "task2": 10, "task3": 9, "task4": 10, "task5": 7}
# perform_task = (get_highest_priority_task(tasks))
# print(perform_task)

# perform_task = (get_highest_priority_task(tasks))
# print(perform_task)

# perform_task = (get_highest_priority_task(tasks))
# print(perform_task)

# print(tasks)

# Problem 4: Frequency Count
# Write a function that takes in a list of integers nums and counts the number of occurrences of each integer. The function returns the result as a dictionary with integers as keys and their counts as values.

# def count_occurrences(nums):
#     pass
# Example Input: nums = [1, 2, 2, 3, 3, 3, 4]
# Example Output: {1: 1, 2: 2, 3: 3, 4: 1}

def count_occurrences(nums):
    
    dict={}
    for key in nums:
        if key in dict:
            dict[key]+= 1
        else:
            dict[key]= 1
    return dict

nums = [1, 2, 2, 3, 3, 3, 4]
print(count_occurrences(nums))
# create empty dictionary
# iterate over list 
# check if the key exists and if it doesn't add it to dictionary and assign 1
# if the key does exist its found and you add 1
# return dictionary

