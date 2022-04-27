%{
#include<stdio.h>
int c = 0;
%}

%%
\n {c++;}
["][a-zA-Z0-9]*["] {ECHO;printf(" Valid String in Line Number %d\n", c+1);}
["][a-zA-Z0-9]* {ECHO;printf(" Invalid String in Line Number %d (Missing Closing Quotes)\n", c+1);}
[a-zA-Z0-9]*["] {ECHO;printf(" Invalid String in Line Number %d (Missing Opening Quotes)\n", c+1);}
. ;
%%

void main(){
    yyin = fopen("source.txt", "r");
    yylex();
    fclose(yyin);
}