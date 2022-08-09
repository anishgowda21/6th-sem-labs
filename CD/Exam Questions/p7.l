%{
#include "y.tab.h"
#include <stdio.h>
extern yylval;
%}

%%

("int"|"float"|"short"|"char") {return type;}

[a-zA-Z][a-zA-Z0-9]* {return id;}

[0-9]+ {yylval=atoi(yytext);return num;}

[\t];


\n {return 0;}

. {return yytext[0];}

%%

int yywrap(){
	return 1;
}