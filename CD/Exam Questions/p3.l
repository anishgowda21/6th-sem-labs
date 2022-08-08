%{
#include<stdio.h>
int c = 0;
%}

relopar "=="|"<"|">"|"<="|">="|"!="
operator [-+*/]
identifier [a-zA-Z_][-a-zA-Z0-9_]*
number [0-9]+
arthexpress ({identifier}|{number}){operator}({identifier}|{number})
relopexpression ({identifier}|{number}){relopar}({identifier}|{number})


%%
\n {c++;}
{identifier}"="({arthexpress}+";") {ECHO;printf(" Valid Arithmatic Expression on line no %d\n",c+1);}
{identifier}"="({relopexpression}+";") {ECHO;printf(" Valid Relational Expression on line no %d\n",c+1);}


{identifier}"="({number}|{identifier}";") {ECHO;printf(" Valid Expression on line no %d\n",c+1);}

{relopexpression}+ {ECHO;printf(" Valid Relational Expression on line no %d\n",c+1);}

({number}|([0-9]*[-a-zA-Z0-9_]+))"="{arthexpress}+ {ECHO;printf(" Invalid Expression on line no %d Lvalue should satisfy the identifier rules\n",c+1);}

{identifier}"=" {ECHO;printf(" Invalid Expression on line no %d Rvalue is required; Expression is needed on RHS of assignment operation\n",c+1);}

({operator}{relopexpression}|{relopexpression}{operator}) {ECHO;printf(" Invalid relational Expression on line no %d\n",c+1);}

{operator}{operator}+ {ECHO;printf(" Invalid Expression on line no %d Operator should be of one character\n",c+1);}
. ;
%%
void main(){
    yyin = fopen("source.txt", "r");
    yylex();
    fclose(yyin);   
}

