%{
#include<stdio.h>
#include<stdlib.h>
int res=0;
%}

%token id num type

%%

S:E {res=1;}
 ;

E:type ' ' id L
 |type ' ' id ARR
;

L:',' id L
 |','',' {printf("Multiple comma detected..\n");exit(0);}
 |';'
;

ARR:'[' num ']' ARR
   |',' id ARR
   |'[' num {printf("Array bracket not closed!\n");exit(0);}
   |'['id']' {printf("Array size should be int\n");exit(0);}
   |';'
;

%%

int main(){
printf("\nEnter the expression:");
yyparse();
if(res)
	printf("\nSuccess\n");
}

void yyerror(){
printf("Error!!\n");
}
