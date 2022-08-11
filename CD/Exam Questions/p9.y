%{
	#include <stdio.h>
	#include <stdlib.h>
	int res;
%}

%token id num

%%
S:E{res=$$;};
E:E '+' E {$$=$1+$3;}
	|E '-' E {$$=$1-$3;}
	|E '*' E {$$=$1*$3;}
	|E '/' E {$$=$1/$3;}
	|E '<' E {$$=($1<$3);}
	|E '>' E {$$=($1>$3);}
	|E '<' '=' E {$$=($1<=$4);}
	|E '>' '=' E {$$=($1>=$4);}
	|E '=' '=' E {$$=($1==$4);}
	|E '&' '&' E {$$=($1&&$4);}
	|E '|' '|' E {$$=($1||$4);}
	|'(' E ')'{$$=$2;}
	|'!' E {$$=!$2;}
	|id
	|num
	;
%%

int main()
{
	printf("Enter an expression : ");
	yyparse();
	printf("\nThe result is : %d",res);
	return 0;
}

int yyerror()
{
	printf("Error!");
	exit(0);
}

