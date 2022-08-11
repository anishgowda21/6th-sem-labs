%{
#include<stdio.h>
#include<stdlib.h>
#include "y.tab.h"
extern yylval;
%}


%%
"int"|"float" {return type;}

[a-zA-Z][a-zA-Z0-9]* {return id;}

[0-9]+ {yylval=atoi(yytext);return num;}

[\t];

\n {return 0;}

. {return yytext[0];}

%%


int yywrap(){
	return 1;
}


