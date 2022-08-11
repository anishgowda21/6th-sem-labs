%{
#include<stdio.h>
%}

%token type id

%%

S:D {printf("Valid\n");}
 ;
D:T L
 ;

T:type
 ;

L:L ',' id
 |id
;

%%

int main(){
printf("\nEnter the expression:");
yyparse();
return 0;
}

int yyerror(){
printf("\nInvalid\n");
}
