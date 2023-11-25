#include<iostream>
#include<cstdlib>
#include<ctime>
using namespace std;

bool checkIfSymmetric(int *matrix[],int rows){
    bool symmetric;
    for(int i=0;i<rows;i++){
        symmetric=false;
        for(int k=0;k<rows;k++){
            if (matrix[i][k]==matrix[k][i]){
                symmetric=true;
            }
            if(!symmetric){
                return false;
            }
        }
    }
    return symmetric;
}
bool bothMatricesAreEqual(int *matrix1[],int *matrix2[],int rows){
    for(int i=0;i<rows;i++){
        for(int k=0;k<rows;k++){
            if(matrix1[i][k]!=matrix2[i][k]){
                return false;
            }
        }
    }
    return true;
}

void check(int *matrix1[],int *matrix2[],int rows){
    int operations=0;
    bool equalFlag=false;
    while(bothMatricesAreEqual(matrix1,matrix2,rows)!=true){
    for(int i=0;i<rows;i++){
        for(int k=0;k<rows;k++){
            equalFlag=false;
            if(matrix1[i][k]==matrix2[i][k]){
                equalFlag=true;
            }
            if(!equalFlag){
                //not exactly same => matrix1[i][k] != matrix2[i][k]
                int temp=matrix1[i][k];
                matrix1[i][k]=matrix2[i][k];
                operations++;
                if(checkIfSymmetric(matrix1,rows)==true){
                    //revert to original
                    matrix1[i][k]=temp;
                    operations--;
                }

            }
        }
    }
    }
    if(operations==-1){
        std::cout << "cannot be converted" << std::endl;
    }else{
    std::cout << "operation done => "<<operations << std::endl;
    }
}

void printMatrix(int *matrix[],int rows,int cols){
    for(int i=0;i<rows;i++){
        for(int k=0;k<cols;k++){
            std::cout << *(*(matrix+i)+k)<<"\t";
        }
        std::cout << "" << std::endl;
    }
}




int main()
{

    int x = time(0);
    srand(x);
    int test,rowcol,num;

    cout<<"Enter the Maximum number of Cases : ";
    cin>>test;

    for(int i=1; i<=test; i++)
    {
        bool flag = false;
        do
        {
        cout<<"Enter the behaviour : ";
        cin>>rowcol;
        }while(!(rowcol>=1 && rowcol<=100));
        do
        {
        cout<<"Enter the maximum number : ";
        cin>>num;
        }while(!(num>=1 && num<=9));

        int **matrix1=new int*[rowcol];
        int **matrix2=new int*[rowcol];
        for (int i = 0; i < rowcol; ++i) {
            matrix1[i] = new int[rowcol];
            matrix2[i] = new int[rowcol];
        }
        cout<<"Enter the numbers for array 1 : "<<endl;
        for(int t=0; t<rowcol; t++)
        {
            for(int u=0; u<rowcol; u++)
            {
                do
                {
            cin>>matrix1[t][u];
                }while(!(matrix1[t][u]>=1 && matrix1[t][u]<=9 && matrix1[t][u]>0));
            }
        }

        cout<<"Enter the numbers for array 2 : "<<endl;
        for(int h=0; h<rowcol; h++)
        {
            for(int z=0; z<rowcol; z++)
            {
                do
                {
            cin>>matrix2[h][z];
                }while(!(matrix2[h][z]>=1 && matrix2[h][z]<=9 && matrix2[h][z]>0));
            }
        }
  std::cout << "before operations" << std::endl;
        std::cout << "matrix1" << std::endl;
        printMatrix(matrix1,rowcol,rowcol);
        std::cout << "\n" << std::endl;
        std::cout << "matrix2" << std::endl;
        printMatrix(matrix2,rowcol,rowcol);
        std::cout << "\n\n" << std::endl;
        std::cout << "after operations" << std::endl;
        std::cout << "----------------" << std::endl;
        check(matrix1,matrix2,rowcol);
        std::cout << "----------------" << std::endl;
        std::cout << "matrix1" << std::endl;
        printMatrix(matrix1,rowcol,rowcol);
        std::cout << "\n" << std::endl;
        std::cout << "matrix2" << std::endl;
        printMatrix(matrix2,rowcol,rowcol);



    }
}