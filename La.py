import math
import numpy as np
import matplotlib.pyplot as plt

dimension=input("Enter the dimension of the square matrix: ")
dimension=int(dimension)+1
A=np.zeros((dimension,dimension))
print("Enter the elements of the matrix row-wise: ")
for i in range(dimension-1):
    for j in range(dimension-1):
        A[i][j]=input()

for i in range(dimension):
    A[dimension-1][i]=0
    if((dimension-1)==i):
        A[dimension-1][i]=1


print("Enter sequence of transformations: ")
print("1. Rotaion at an angle theta")
print("2. Reflection about a line")
print("3. Shear about a line")
print("4. Scaling")
print("5. Translation")
print("6. Projection")

input1=input("Enter the number of transformations: ")
input1=int(input1)

