%{
#include<stdio.h>
#include "y.tab.h"
extern yylval;
int val;
%}

%%

[a-zA-Z][0-9A-Za-z]* {printf("Enter the value of the variable %s:",yytext);scanf("%d",&val);yylval=val;return id;}
[0-9]+ {yylval = atoi(yytext);return num;}
[\t];
\n {return 0;}
. {return yytext[0];}

%%

int yywrap(){
return 1;
}
