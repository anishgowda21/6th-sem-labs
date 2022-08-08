%{
#include<stdio.h>
int c=0;
int flag=0;
%}

%s STRUCTURE DECLARE VAR

identifier [a-zA-Z_][-a-zA-Z0-9_]*
number [0-9]+((".")[0-9]+)?
string ("\"")([a-zA-Z0-9]+)("\"")
type "int "|"float "

%%

\n {c++;}

"struct "({identifier}"{") {BEGIN STRUCTURE;printf("Strcuture begins at line no %d\n",c+1);ECHO;flag=1;}
"struct {" {BEGIN STRUCTURE;printf("Invalid declaration need strcutre name %d\n",c+1);ECHO;flag=1;}
<STRUCTURE>{type} {BEGIN DECLARE;ECHO;}
<DECLARE>";" {BEGIN STRUCTURE;printf("\nInvalid declaration needs identifier name linr no %d\n",c+1);}
<STRUCTURE>{identifier} {BEGIN DECLARE;ECHO;printf("Need type for declaration\n");}
<DECLARE>{identifier} {BEGIN VAR;ECHO;}
<VAR>[,] {BEGIN DECLARE;ECHO;}
<VAR>[,][,]+ {BEGIN DECLARE;ECHO;printf("\nInvalid usage of more than one comma in declaration in line no %d\n",c+1);}
<VAR>";" {BEGIN STRUCTURE;ECHO;} 
<STRUCTURE>"};" {BEGIN 0;ECHO;printf("\nStrcutr ends in line %d\n",c+1);flag=0;}

"void main()"|"int main()" {ECHO;if(flag){printf("\nSTRUCTURE declaration not closed\n");flag=0;}}
. ;

%%

void main()
{
yyin = fopen("src2.txt","r");
yylex();
fclose(yyin);
}

