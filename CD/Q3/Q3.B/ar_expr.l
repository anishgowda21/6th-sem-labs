%{
#include<stdio.h>
int c=0;
%}
operator [-+*/]
identifier [a-zA-Z_][a-zA-Z0-9_]*
number [0-9]+
expression ({identifier}|{number}){operator}({identifier}|{number})
%%
\n {c++;}
^"#".+ ;
^("int "|"float "|"char ").+ ;
"void main()" ;
{identifier}"="({expression}+";") {printf("Valid Expression on line no %d\n",c+1);ECHO;printf("\n");}
{identifier}"="({number}|{identifier}";") { printf("Valid Expression on line no %d\n",c+1);ECHO;printf("\n");}
({number}|([0-9]*[a-zA-Z0-9_]+))"="{expression}+ {printf("Invalid Expression on line no %d Lvalue should satisfy the identifier rules\n",c+1);ECHO;printf("\n");}
{identifier}"=;" {printf(" Invalid Expression on line no %d Rvalue is required; Expression is needed on RHS of assignment operation\n",c+1);ECHO;printf("\n");}
{operator}{operator}+ {printf(" Invalid Expression on line no %d Operator should be of one character\n",c+1);ECHO;printf("\n");} 
. ;
%%

void main(){
    yyin = fopen("source.txt", "r");
    yylex();
    fclose(yyin);   
}

