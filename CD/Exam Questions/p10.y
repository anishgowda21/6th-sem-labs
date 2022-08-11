%{
#include<stdio.h>
%}

%token id

%%
S:E {printf("\nValid\n");}
 ;

E:E E '+'
 |E E '*'
 |'('E')'
 |id
;

%%

int main()
{
	printf("Enter a string as input : ");
	yyparse();
	return 0;
}

void yyerror()
{
	printf("\nInvalid");
}
