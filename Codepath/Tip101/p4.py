# Problem 4: Sum of Two Integers
# The following function returns the sum of two integers: a and b.

# def sum(a, b):
#     return a + b
# Use the sum() function to calculate the sum of 13 and 27. Then, double the calculated sum and print the result to the console.

# Example Input: 20 and 8
# Example Output: 56

'''
U: Defining a function that takes two ints as a param "a and b" and sums it up , then returns the sum
P: Define function
      return the sum*2

      ex)sum(10,15)
I:
'''

def sum(a,b):
    return 2*(a+b)

# Problem 5: Product of Two Integers
# Write a function product() that returns the product of two integers, a and b.

# Example Input: 22 and 7
# Example Result: 154

'''
U- Define a function with two parameters that erturns the product of the two (a and b)
P- define function
I: 
'''
def product(a,b):
    return a * b

# print(product(5, 10))


# Problem 6: Classify Age
# Write a function classify_age() that takes an integer age as a parameter and returns "child" if the age is less than 18, and returns "adult" otherwise.

# Example Usage:

# output = classify_age(18)
# print(output)
# output = classify_age(7)
# print(output)
# output = classify_age(50)
# print(output)
'''
U:
P: write a function tat takes the paremeter age and returns either adult if 
   greater than 18 or child if age less than 18
I:  
'''

def classify_age(age):
    if(age<18):
        print("child")
    else:
        print(adult)

classify_age(10)