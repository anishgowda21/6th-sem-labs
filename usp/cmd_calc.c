// Simulate calculaator in commandline 

#include<stdio.h>
#include<stdlib.h>
#include<string.h>
#include<math.h>

int main(int argc, char *argv[]){
    if(argc != 4){
        printf("Usage: %s <operator> <operand> <operator>\n", argv[0]);
        return 1;
    }
    double op1 = atof(argv[1]);
    double op2 = atof(argv[3]);
    
    if(strcmp(argv[2], "+") == 0){
        printf("%.2f + %.2f = %.2f\n", op1, op2, op1 + op2);
    }
    else if(strcmp(argv[2], "-") == 0){
        printf("%.2f - %.2f = %.2f\n", op1, op2, op1 - op2);
    }
    else if(strcmp(argv[2], "*") == 0){
        printf("%.2f * %.2f = %.2f\n", op1, op2, op1 * op2);
    }
    else if(strcmp(argv[2], "/") == 0){
        printf("%.2f / %.2f = %.2f\n", op1, op2, op1 / op2);
    }
    else if(strcmp(argv[2], "^") == 0){
        printf("%.2f ^ %.2f = %.2f\n", op1, op2, pow(op1, op2));
    }
    else{
        printf("Unknown operator\n");
    }
}
