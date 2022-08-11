%{
	#include <stdio.h>
	#include <stdlib.h>
	int res=0;
%}

%token id num

%%

S:E{res=1;}
;

E:L '=' R
 |R
;

L:'*' R
 |id
 |num
;

R:L
 ;

%%
int main()
{
	printf("\nENTER STRING  : ");
	yyparse();
	if(res==1)
	{
	printf("\nValid\n");
	}
	return 0;
}

void yyerror()
{
	printf("\nInvalid!\n");
	exit(0);
}



