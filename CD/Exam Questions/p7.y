%{
	#include<stdio.h>
	#include<stdlib.h>
	int flag=0;
%}

%token id num type

%%

S:E {flag=1;}

;

E:type ' ' id L
  |type ' ' id ARR
;

L:',' id L
  |',' id ARR
  | ','',' {printf("Multiple comma detected..\n");exit(0);}
  | ';'
;

ARR:'[' num ']' ARR
  |',' id L
  |',' id ARR
  |'[' num {printf("Array bracket not closed!\n");exit(0);}
  |'['id']' {printf("Array size should be int\n");exit(0);}
  | ';'
 ;

%%


int main()
{
	printf("Enter a declaration statement : ");
	yyparse();
	printf("Success!\n");
	return 0;
}

void yyerror()
{
	printf("Error!!\n");
	exit(0);
}
