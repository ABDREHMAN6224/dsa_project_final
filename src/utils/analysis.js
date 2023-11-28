export const sortingAnalysis = {
    "bubble": {
        "best case": "O(n)",
        "worst case": "O(n^2)",
        "average case": "O(n^2)",
        "space complexity": "O(1)"
    },
    "selection": {
        "best case": "O(n^2)",
        "worst case": "O(n^2)",
        "average_case": "O(n^2)",
        "space complexity": "O(1)"
    },
    "insertion": {
        "best case": "O(n)",
        "worst case": "O(n^2)",
        "average case": "O(n^2)",
        "space complexity": "O(1)"
    },
    "merge": {
        "best case": "O(nlog n)",
        "worst case": "O(nlog n)",
        "average case": "O(nlog n)",
        "space complexity": "O(n)"
    },
    "quick": {
        "best case": "O(nlog n)",
        "worst case": "O(n^2)",
        "average case": "O(nlog n)",
        "space complexity": "O(n)"
    },
    "heap": {
        "best case": "O(nlog n)",
        "worst case": "O(nlog n)",
        "average case": "O(nlog n)",
        "space complexity": "O(1)"
    }
}
export const codes = {
    "bubble": `
    // Optimized implementation of Bubble sort
#include <bits/stdc++.h>

using namespace std;
 
// An optimized version of Bubble Sort

void bubbleSort(int arr[], int n)
{

    int i, j;

    bool swapped;

    for (i = 0; i < n - 1; i++) {

        swapped = false;

        for (j = 0; j < n - i - 1; j++) {

            if (arr[j] > arr[j + 1]) {

                swap(arr[j], arr[j + 1]);

                swapped = true;

            }

        }
 

        // If no two elements were swapped

        // by inner loop, then break

        if (swapped == false)

            break;

    }
}
 
// Function to print an array

void printArray(int arr[], int size)
{

    int i;

    for (i = 0; i < size; i++)

        cout << " " << arr[i];
}
 
// Driver program to test above functions

int main()
{

    int arr[] = { 64, 34, 25, 12, 22, 11, 90 };

    int N = sizeof(arr) / sizeof(arr[0]);

    bubbleSort(arr, N);

    cout << "Sorted array: \n";

    printArray(arr, N);

    return 0;
}`,
    "merge": `// C++ program for Merge Sort
#include <bits/stdc++.h>

using namespace std;
 
// Merges two subarrays of array[].
// First subarray is arr[begin..mid]
// Second subarray is arr[mid+1..end]

void merge(int array[], int const left, int const mid,

           int const right)
{

    int const subArrayOne = mid - left + 1;

    int const subArrayTwo = right - mid;
 

    // Create temp arrays

    auto *leftArray = new int[subArrayOne],

         *rightArray = new int[subArrayTwo];
 

    // Copy data to temp arrays leftArray[] and rightArray[]

    for (auto i = 0; i < subArrayOne; i++)

        leftArray[i] = array[left + i];

    for (auto j = 0; j < subArrayTwo; j++)

        rightArray[j] = array[mid + 1 + j];
 

    auto indexOfSubArrayOne = 0, indexOfSubArrayTwo = 0;

    int indexOfMergedArray = left;
 

    // Merge the temp arrays back into array[left..right]

    while (indexOfSubArrayOne < subArrayOne

           && indexOfSubArrayTwo < subArrayTwo) {

        if (leftArray[indexOfSubArrayOne]

            <= rightArray[indexOfSubArrayTwo]) {

            array[indexOfMergedArray]

                = leftArray[indexOfSubArrayOne];

            indexOfSubArrayOne++;

        }

        else {

            array[indexOfMergedArray]

                = rightArray[indexOfSubArrayTwo];

            indexOfSubArrayTwo++;

        }

        indexOfMergedArray++;

    }
 

    // Copy the remaining elements of

    // left[], if there are any

    while (indexOfSubArrayOne < subArrayOne) {

        array[indexOfMergedArray]

            = leftArray[indexOfSubArrayOne];

        indexOfSubArrayOne++;

        indexOfMergedArray++;

    }
 

    // Copy the remaining elements of

    // right[], if there are any

    while (indexOfSubArrayTwo < subArrayTwo) {

        array[indexOfMergedArray]

            = rightArray[indexOfSubArrayTwo];

        indexOfSubArrayTwo++;

        indexOfMergedArray++;

    }

    delete[] leftArray;

    delete[] rightArray;
}
 
// begin is for left index and end is right index
// of the sub-array of arr to be sorted

void mergeSort(int array[], int const begin, int const end)
{

    if (begin >= end)

        return;
 

    int mid = begin + (end - begin) / 2;

    mergeSort(array, begin, mid);

    mergeSort(array, mid + 1, end);

    merge(array, begin, mid, end);
}
 
// UTILITY FUNCTIONS
// Function to print an array

void printArray(int A[], int size)
{

    for (int i = 0; i < size; i++)

        cout << A[i] << " ";

    cout << endl;
}
 
// Driver code

int main()
{

    int arr[] = { 12, 11, 13, 5, 6, 7 };

    int arr_size = sizeof(arr) / sizeof(arr[0]);
 

    cout << "Given array is \n";

    printArray(arr, arr_size);
 

    mergeSort(arr, 0, arr_size - 1);
 

    cout << "\nSorted array is \n";

    printArray(arr, arr_size);

    return 0;
}`,
    "quick": `#include <bits/stdc++.h>

using namespace std;
 

int partition(int arr[],int low,int high)
{

  //choose the pivot

   

  int pivot=arr[high];

  //Index of smaller element and Indicate

  //the right position of pivot found so far

  int i=(low-1);

   

  for(int j=low;j<=high;j++)

  {

    //If current element is smaller than the pivot

    if(arr[j]<pivot)

    {

      //Increment index of smaller element

      i++;

      swap(arr[i],arr[j]);

    }

  }

  swap(arr[i+1],arr[high]);

  return (i+1);
}
 
// The Quicksort function Implement

            

void quickSort(int arr[],int low,int high)
{

  // when low is less than high

  if(low<high)

  {

    // pi is the partition return index of pivot

     

    int pi=partition(arr,low,high);

     

    //Recursion Call

    //smaller element than pivot goes left and

    //higher element goes right

    quickSort(arr,low,pi-1);

    quickSort(arr,pi+1,high);

  }
}

              

  

int main() {

  int arr[]={10,7,8,9,1,5};

  int n=sizeof(arr)/sizeof(arr[0]);

  // Function call

  quickSort(arr,0,n-1);

  //Print the sorted array

  cout<<"Sorted Array\n";

  for(int i=0;i<n;i++)

  {

    cout<<arr[i]<<" ";

  }

  return 0;
}`,
    "selection": `// C++ program for implementation of
// selection sort
#include <bits/stdc++.h>

using namespace std;
 
// Function for Selection sort

void selectionSort(int arr[], int n)
{

    int i, j, min_idx;
 

    // One by one move boundary of

    // unsorted subarray

    for (i = 0; i < n - 1; i++) {
 

        // Find the minimum element in

        // unsorted array

        min_idx = i;

        for (j = i + 1; j < n; j++) {

            if (arr[j] < arr[min_idx])

                min_idx = j;

        }
 

        // Swap the found minimum element

        // with the first element

        if (min_idx != i)

            swap(arr[min_idx], arr[i]);

    }
}
 
// Function to print an array

void printArray(int arr[], int size)
{

    int i;

    for (i = 0; i < size; i++) {

        cout << arr[i] << " ";

        cout << endl;

    }
}
 
// Driver program

int main()
{

    int arr[] = { 64, 25, 12, 22, 11 };

    int n = sizeof(arr) / sizeof(arr[0]);
 

    // Function Call

    selectionSort(arr, n);

    cout << "Sorted array: \n";

    printArray(arr, n);

    return 0;
}`,
    "heap": `// C++ program for implementation of Heap Sort
 
#include <iostream>

using namespace std;
 
// To heapify a subtree rooted with node i
// which is an index in arr[].
// n is size of heap

void heapify(int arr[], int N, int i)
{
 

    // Initialize largest as root

    int largest = i;
 

    // left = 2*i + 1

    int l = 2 * i + 1;
 

    // right = 2*i + 2

    int r = 2 * i + 2;
 

    // If left child is larger than root

    if (l < N && arr[l] > arr[largest])

        largest = l;
 

    // If right child is larger than largest

    // so far

    if (r < N && arr[r] > arr[largest])

        largest = r;
 

    // If largest is not root

    if (largest != i) {

        swap(arr[i], arr[largest]);
 

        // Recursively heapify the affected

        // sub-tree

        heapify(arr, N, largest);

    }
}
 
// Main function to do heap sort

void heapSort(int arr[], int N)
{
 

    // Build heap (rearrange array)

    for (int i = N / 2 - 1; i >= 0; i--)

        heapify(arr, N, i);
 

    // One by one extract an element

    // from heap

    for (int i = N - 1; i > 0; i--) {
 

        // Move current root to end

        swap(arr[0], arr[i]);
 

        // call max heapify on the reduced heap

        heapify(arr, i, 0);

    }
}
 
// A utility function to print array of size n

void printArray(int arr[], int N)
{

    for (int i = 0; i < N; ++i)

        cout << arr[i] << " ";

    cout << "\n";
}
 
// Driver's code

int main()
{

    int arr[] = { 12, 11, 13, 5, 6, 7 };

    int N = sizeof(arr) / sizeof(arr[0]);
 

    // Function call

    heapSort(arr, N);
 

    cout << "Sorted array is \n";

    printArray(arr, N);
}`,
    "insertion": `// C++ program for insertion sort
 
#include <bits/stdc++.h>

using namespace std;
 
// Function to sort an array using
// insertion sort

void insertionSort(int arr[], int n)
{

    int i, key, j;

    for (i = 1; i < n; i++) {

        key = arr[i];

        j = i - 1;
 

        // Move elements of arr[0..i-1],

        // that are greater than key, 

        // to one position ahead of their

        // current position

        while (j >= 0 && arr[j] > key) {

            arr[j + 1] = arr[j];

            j = j - 1;

        }

        arr[j + 1] = key;

    }
}
 
// A utility function to print an array
// of size n

void printArray(int arr[], int n)
{

    int i;

    for (i = 0; i < n; i++)

        cout << arr[i] << " ";

    cout << endl;
}
 
// Driver code

int main()
{

    int arr[] = { 12, 11, 13, 5, 6 };

    int N = sizeof(arr) / sizeof(arr[0]);
 

    insertionSort(arr, N);

    printArray(arr, N);
 

    return 0;
}`
}
export const treeAnalysis = {
    "AVL Tree": {
        "Insertion ": "O(log n)",
        "Deletion": "O(log n)",
        "Searching": "O(log n)"
    },
    "Segment Tree": {
        "Insertion ": "O(n)",
        "Deletion": "O(log n)",
        "Searching": "O(log n)"
    },
    "Binary Search Tree": {
        "Insertion ": "unbalanced = O(h) ,Balanced = O(log n)",
        "Deletion": "unBalanced = O(h) ,Balanced =  O(log n)",
        "Searching": "unBalanced = O(h) ,Balanced =  O(log n)"
    }
}
export const treeCodes = {
    "AVL Tree": `#include<iostream>
#include<cstdio>
#include<sstream>
#include<algorithm>
#define pow2(n) (1 << (n))
using namespace std;
struct avl {
   int d;
   struct avl *l;
   struct avl *r;
}*r;
class avl_tree {
   public:
      int height(avl *);
      int difference(avl *);
      avl *rr_rotat(avl *);
      avl *ll_rotat(avl *);
      avl *lr_rotat(avl*);
      avl *rl_rotat(avl *);
      avl * balance(avl *);
      avl * insert(avl*, int);
      void show(avl*, int);
      void inorder(avl *);
      void preorder(avl *);
      void postorder(avl*);
      avl_tree() {
         r = NULL;
      }
};
int avl_tree::height(avl *t) {
   int h = 0;
   if (t != NULL) {
      int l_height = height(t->l);
      int r_height = height(t->r);
      int max_height = max(l_height, r_height);
      h = max_height + 1;
   }
   return h;
}
int avl_tree::difference(avl *t) {
   int l_height = height(t->l);
   int r_height = height(t->r);
   int b_factor = l_height - r_height;
   return b_factor;
}
avl *avl_tree::rr_rotat(avl *parent) {
   avl *t;
   t = parent->r;
   parent->r = t->l;
   t->l = parent;
   cout<<"Right-Right Rotation";
   return t;
}
avl *avl_tree::ll_rotat(avl *parent) {
   avl *t;
   t = parent->l;
   parent->l = t->r;
   t->r = parent;
   cout<<"Left-Left Rotation";
   return t;
}
avl *avl_tree::lr_rotat(avl *parent) {
   avl *t;
   t = parent->l;
   parent->l = rr_rotat(t);
   cout<<"Left-Right Rotation";
   return ll_rotat(parent);
}
avl *avl_tree::rl_rotat(avl *parent) {
   avl *t;
   t = parent->r;
   parent->r = ll_rotat(t);
   cout<<"Right-Left Rotation";
   return rr_rotat(parent);
}
avl *avl_tree::balance(avl *t) {
   int bal_factor = difference(t);
   if (bal_factor > 1) {
      if (difference(t->l) > 0)
         t = ll_rotat(t);
      else
         t = lr_rotat(t);
   } else if (bal_factor < -1) {
      if (difference(t->r) > 0)
         t = rl_rotat(t);
      else
         t = rr_rotat(t);
   }
   return t;
}
avl *avl_tree::insert(avl *r, int v) {
   if (r == NULL) {
      r = new avl;
      r->d = v;
      r->l = NULL;
      r->r = NULL;
      return r;
   } else if (v< r->d) {
      r->l = insert(r->l, v);
      r = balance(r);
   } else if (v >= r->d) {
      r->r = insert(r->r, v);
      r = balance(r);
   } return r;
}
void avl_tree::show(avl *p, int l) {
   int i;
   if (p != NULL) {
      show(p->r, l+ 1);
      cout<<" ";
      if (p == r)
         cout << "Root -> ";
      for (i = 0; i < l&& p != r; i++)
         cout << " ";
         cout << p->d;
         show(p->l, l + 1);
   }
}
void avl_tree::inorder(avl *t) {
   if (t == NULL)
      return;
      inorder(t->l);
      cout << t->d << " ";
      inorder(t->r);
}
void avl_tree::preorder(avl *t) {
   if (t == NULL)
      return;
      cout << t->d << " ";
      preorder(t->l);
      preorder(t->r);
}
void avl_tree::postorder(avl *t) {
   if (t == NULL)
      return;
      postorder(t ->l);
      postorder(t ->r);
      cout << t->d << " ";
}
int main() {
   int c, i;
   avl_tree avl;
   while (1) {
      cout << "1.Insert Element into the tree" << endl;
      cout << "2.show Balanced AVL Tree" << endl;
      cout << "3.InOrder traversal" << endl;
      cout << "4.PreOrder traversal" << endl;
      cout << "5.PostOrder traversal" << endl;
      cout << "6.Exit" << endl;
      cout << "Enter your Choice: ";
      cin >> c;
      switch (c) {
         case 1:
            cout << "Enter value to be inserted: ";
            cin >> i;
            r = avl.insert(r, i);
         break;
         case 2:
            if (r == NULL) {
               cout << "Tree is Empty" << endl;
               continue;
            }
            cout << "Balanced AVL Tree:" << endl;
            avl.show(r, 1);
            cout<<endl;
         break;
         case 3:
            cout << "Inorder Traversal:" << endl;
            avl.inorder(r);
            cout << endl;
         break;
         case 4:
            cout << "Preorder Traversal:" << endl;
            avl.preorder(r);
            cout << endl;
         break;
         case 5:
            cout << "Postorder Traversal:" << endl;
            avl.postorder(r);
            cout << endl;
         break;
         case 6:
            exit(1);
         break;
         default:
            cout << "Wrong Choice" << endl;
      }
   }
   return 0;
}`,
    "Segment Tree": `// C++ program to show segment tree operations like construction, query 
// and update 
#include <bits/stdc++.h>
using namespace std;

// A utility function to get the middle index from corner indexes. 
int getMid(int s, int e) { return s + (e -s)/2; } 

/* A recursive function to get the sum of values in the given range 
	of the array. The following are parameters for this function. 

	st --> Pointer to segment tree 
	si --> Index of current node in the segment tree. Initially 
			0 is passed as root is always at index 0 
	ss & se --> Starting and ending indexes of the segment represented 
				by current node, i.e., st[si] 
	qs & qe --> Starting and ending indexes of query range */
int getSumUtil(int *st, int ss, int se, int qs, int qe, int si) 
{ 
	// If segment of this node is a part of given range, then return 
	// the sum of the segment 
	if (qs <= ss && qe >= se) 
		return st[si]; 

	// If segment of this node is outside the given range 
	if (se < qs || ss > qe) 
		return 0; 

	// If a part of this segment overlaps with the given range 
	int mid = getMid(ss, se); 
	return getSumUtil(st, ss, mid, qs, qe, 2*si+1) + 
		getSumUtil(st, mid+1, se, qs, qe, 2*si+2); 
} 

/* A recursive function to update the nodes which have the given 
index in their range. The following are parameters 
	st, si, ss and se are same as getSumUtil() 
	i --> index of the element to be updated. This index is 
			in the input array. 
diff --> Value to be added to all nodes which have i in range */
void updateValueUtil(int *st, int ss, int se, int i, int diff, int si) 
{ 
	// Base Case: If the input index lies outside the range of 
	// this segment 
	if (i < ss || i > se) 
		return; 

	// If the input index is in range of this node, then update 
	// the value of the node and its children 
	st[si] = st[si] + diff; 
	if (se != ss) 
	{ 
		int mid = getMid(ss, se); 
		updateValueUtil(st, ss, mid, i, diff, 2*si + 1); 
		updateValueUtil(st, mid+1, se, i, diff, 2*si + 2); 
	} 
} 

// The function to update a value in input array and segment tree. 
// It uses updateValueUtil() to update the value in segment tree 
void updateValue(int arr[], int *st, int n, int i, int new_val) 
{ 
	// Check for erroneous input index 
	if (i < 0 || i > n-1) 
	{ 
		cout<<"Invalid Input"; 
		return; 
	} 

	// Get the difference between new value and old value 
	int diff = new_val - arr[i]; 

	// Update the value in array 
	arr[i] = new_val; 

	// Update the values of nodes in segment tree 
	updateValueUtil(st, 0, n-1, i, diff, 0); 
} 

// Return sum of elements in range from index qs (query start) 
// to qe (query end). It mainly uses getSumUtil() 
int getSum(int *st, int n, int qs, int qe) 
{ 
	// Check for erroneous input values 
	if (qs < 0 || qe > n-1 || qs > qe) 
	{ 
		cout<<"Invalid Input"; 
		return -1; 
	} 

	return getSumUtil(st, 0, n-1, qs, qe, 0); 
} 

// A recursive function that constructs Segment Tree for array[ss..se]. 
// si is index of current node in segment tree st 
int constructSTUtil(int arr[], int ss, int se, int *st, int si) 
{ 
	// If there is one element in array, store it in current node of 
	// segment tree and return 
	if (ss == se) 
	{ 
		st[si] = arr[ss]; 
		return arr[ss]; 
	} 

	// If there are more than one elements, then recur for left and 
	// right subtrees and store the sum of values in this node 
	int mid = getMid(ss, se); 
	st[si] = constructSTUtil(arr, ss, mid, st, si*2+1) + 
			constructSTUtil(arr, mid+1, se, st, si*2+2); 
	return st[si]; 
} 

/* Function to construct segment tree from given array. This function 
allocates memory for segment tree and calls constructSTUtil() to 
fill the allocated memory */
int *constructST(int arr[], int n) 
{ 
	// Allocate memory for the segment tree 

	//Height of segment tree 
	int x = (int)(ceil(log2(n))); 

	//Maximum size of segment tree 
	int max_size = 2*(int)pow(2, x) - 1; 

	// Allocate memory 
	int *st = new int[max_size]; 

	// Fill the allocated memory st 
	constructSTUtil(arr, 0, n-1, st, 0); 

	// Return the constructed segment tree 
	return st; 
} 

// Driver program to test above functions 
int main() 
{ 
	int arr[] = {1, 3, 5, 7, 9, 11}; 
	int n = sizeof(arr)/sizeof(arr[0]); 

	// Build segment tree from given array 
	int *st = constructST(arr, n); 

	// Print sum of values in array from index 1 to 3 
	cout<<"Sum of values in given range = "<<getSum(st, n, 1, 3)<<endl; 

	// Update: set arr[1] = 10 and update corresponding 
	// segment tree nodes 
	updateValue(arr, st, n, 1, 10); 

	// Find sum after the value is updated 
	cout<<"Updated sum of values in given range = "
			<<getSum(st, n, 1, 3)<<endl; 
	return 0; 
} 
//This code is contributed by rathbhupendra
`,
    "Binary Search Tree": `// Binary Search Tree operations in C++

#include <iostream>
using namespace std;

struct node {
  int key;
  struct node *left, *right;
};

// Create a node
struct node *newNode(int item) {
  struct node *temp = (struct node *)malloc(sizeof(struct node));
  temp->key = item;
  temp->left = temp->right = NULL;
  return temp;
}

// Inorder Traversal
void inorder(struct node *root) {
  if (root != NULL) {
    // Traverse left
    inorder(root->left);

    // Traverse root
    cout << root->key << " -> ";

    // Traverse right
    inorder(root->right);
  }
}

// Insert a node
struct node *insert(struct node *node, int key) {
  // Return a new node if the tree is empty
  if (node == NULL) return newNode(key);

  // Traverse to the right place and insert the node
  if (key < node->key)
    node->left = insert(node->left, key);
  else
    node->right = insert(node->right, key);

  return node;
}

// Find the inorder successor
struct node *minValueNode(struct node *node) {
  struct node *current = node;

  // Find the leftmost leaf
  while (current && current->left != NULL)
    current = current->left;

  return current;
}

// Deleting a node
struct node *deleteNode(struct node *root, int key) {
  // Return if the tree is empty
  if (root == NULL) return root;

  // Find the node to be deleted
  if (key < root->key)
    root->left = deleteNode(root->left, key);
  else if (key > root->key)
    root->right = deleteNode(root->right, key);
  else {
    // If the node is with only one child or no child
    if (root->left == NULL) {
      struct node *temp = root->right;
      free(root);
      return temp;
    } else if (root->right == NULL) {
      struct node *temp = root->left;
      free(root);
      return temp;
    }

    // If the node has two children
    struct node *temp = minValueNode(root->right);

    // Place the inorder successor in position of the node to be deleted
    root->key = temp->key;

    // Delete the inorder successor
    root->right = deleteNode(root->right, temp->key);
  }
  return root;
}

// Driver code
int main() {
  struct node *root = NULL;
  root = insert(root, 8);
  root = insert(root, 3);
  root = insert(root, 1);
  root = insert(root, 6);
  root = insert(root, 7);
  root = insert(root, 10);
  root = insert(root, 14);
  root = insert(root, 4);

  cout << "Inorder traversal: ";
  inorder(root);

  cout << "\nAfter deleting 10\n";
  root = deleteNode(root, 10);
  cout << "Inorder traversal: ";
  inorder(root);
}`
}
export const heapAnalysis = {
    "Insertion": "O(log n)",
    "Deletion": "O(log n)",
    "Fetch": "O(1)"
}
export const heapCode = `#include <bits/stdc++.h>
#include <iostream>
using namespace std;
class Heap{
    int *list;
    int size=0;
    int capacity=20;
    public:
    Heap(){
        list=new int[capacity];
    }
    bool isFull(){
        return size==capacity;
    }
    bool isEmpty(){
        return size==0;
    }
    int getLeft(int index){
        return 2*index+1;
    }
    int getRight(int index){
        return 2*index+2;
    }
    int getParent(int index){
        return (index-1)/2;
    }
    void downHeap(int index){
        int left=this->getLeft(index);
        int right=this->getRight(index);
        int min=index;
        if(left<size && this->list[left]<list[index]){
            min=left;
        }
        if(right<size && this->list[right]<list[index]){
            min=right;
        }
        if(index!=min){
            swap(list[min],list[index]);
            this->downHeap(min);
        }
    }
    void upHeap(int index){
        int parent=this->getParent(index);
        int min=parent;
        if(parent>=0 && list[parent]<list[index]){
            min=index;
        }
        if(index!=min){
            swap(list[min],list[index]);
            this->upHeap(min);
        }
    }
    int top(){
        if(isEmpty()){
            std::cout << "empty heap!!" << std::endl;
            return 99999;
        }
        return list[0];
    }
    int sizeOfHeap(){
        return size;
    }
    int height(){
        return (log(size)/log(2));
    }
    int pop(){
        if(isEmpty()){
            std::cout << "cannot pop from empty list" << std::endl;
            return 9999;
        }
        int popped=list[0];
        list[0]=list[size-1];
        size--;
        downHeap(0);
        return popped;
    }
    void push(int value){
        if(isFull()){
            int *temp=new int[capacity*2];
            for(int i=0;i<capacity;i++){
                temp[i]=list[i];
            }
            list=temp;
            capacity*=2;
        }
        
        list[size]=value;
        upHeap(size);
        size++;
    }
    void printTree(){
        this->printHelper(0,0);
    }
    void printHelper(int root,int level){
        if(root>=size){
            return ;
        }
        this->printHelper(getRight(root),level+1);
        if(level==0){
            std::cout << list[root] << std::endl;
        }else{
            for(int i=1;i<level;i++){
                std::cout <<"\t" ;
            }
            std::cout << "|------" ;
            std::cout << list[root] << std::endl;
        }
        this->printHelper(getLeft(root),level+1);
    }
    void buildHeap(int arr[],int s){
        size=0;
        for(int i=0;i<s;i++){
            this->push(arr[i]);
        }
        this->printTree();
    }
};

int main(){
    int arr[10]={3,2,4,6,4,2,8,5,28,32};
    Heap* heap=new Heap();
    heap->buildHeap(arr,10);
    std::cout << "heap->height "<<heap->height() << std::endl;
       return 0;
}`