%{
#include<stdio.h>
#include "y.tab.h"
%}

%%

[a-zA-Z][a-zA-Z0-9]* {return id;}

"int "|"float "|"long int "|"double "|"static int "|"register int " {return type;}

[\t] {;}
\n {return 0;}

. {return yytext[0];}

%%
