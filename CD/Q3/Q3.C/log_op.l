%{
#include<stdio.h>
int c=0;
%}

OR (\|\|)
AND (&&)
NOT (!)
identifier [a-zA-Z_][a-zA-Z0-9_]*
number [0-9]+
statement (({identifier}|{number})({OR}|{AND})({identifier}|{number}))|({NOT}({identifier}|{number}))
expression (({statement}|{identifier}|{number})({OR}|{AND}|)({statement}|{identifier}|{number}))|({NOT}({statement}|{identifier}|{number}))
%%
\n {c++;}
^"#".+ ;
^"void main()" ;
{identifier}"="({expression}+";") {ECHO;printf(" Valid Expression on line %d\n",c+1);};
"("{expression}+")" {ECHO;printf(" Valid Expression on line %d\n",c+1);}
. ;
%%

void main(){
    yyin = fopen("source.txt", "r");
    yylex();
    fclose(yyin);
}