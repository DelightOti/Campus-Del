# Problem #1
# Given a string s consisting of lowercase and/or uppercase English letters and digits, return all possible strings that can be formed by changing the case of the letters in s. You may not alter the order of characters in the string, and digits should remain unchanged.
# Input: s = "a1b2"
# Output: ["a1b2", "A1b2", "a1B2", "A1B2"]
# Input: s = "3z4"
# Output: ["3z4", "3Z4"]
# Input: s = "12345"
# Output: ["12345"]

# Plan:

def possible_strings(string):
# create an empty list to store outputs
    rt=[]
# put input string into list
    rt.append(string)
# iterate over input string
    for x in string:
# if its a letter and its lowercase change it uppercase char.isupper()
        if x.isalpha():
            x.isupper()
        rt.append(string)
# ignore the number and move on to next string
        # if x is a number
            # ignore it
    # up=string.upper()
    # rt.append(up)
# return rt
# at the end convert each letter in the string to uppercase because that is final combination


