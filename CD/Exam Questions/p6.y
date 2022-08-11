%{
#include<stdio.h>
int res = 0;
%}

%token id num

%%

S:E {res = $$;}
 ;

E:E'+'E {$$=$1+$3;printf("\n+ detected");}
 |E'+''+'{$$=$1+1;printf("\n increment detected");} 
 |E'-'E {$$=$1-$3;printf("\n- detected");}
 |E'-''-'{$$=$1-1;printf("\n decrement detected");}
 |E'*'E {$$=$1*$3;printf("\n* detected");}
 |E'/'E {$$=$1/$3;printf("\n/ detected");}
 |'('E')' {$$=$2;printf("\n brackets detcted");}
 |id
 |num 
;

%%

int main(){
printf("\nEnter valid expression:");
yyparse();
printf("\nResult is %d\n",res);
}

void yyerror(){
	printf("Invalid\n");
}
