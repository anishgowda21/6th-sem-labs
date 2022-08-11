%{
	#include <stdio.h>
	#include <stdlib.h>
	#include "y.tab.h"
	extern yylval;
	int val;
%}

%%
[a-zA-Z][a-zA-Z0-9]* {printf("Enter the value of the variable %s:",yytext);scanf("%d",&val);yylval=val;return id;}
[0-9]+ {yylval=atoi(yytext);return num;}
[\t];
\n {return 0;}
. {return yytext[0];}

%%

int yywrap(){
return 1;
}
