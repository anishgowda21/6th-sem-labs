%{
	#include <stdio.h>
	#include "y.tab.h"
%}


%%
[a] {return id;}
[\t];
\n {return 0;}
. {return yytext[0];}
%%
