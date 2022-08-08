%{
#include<stdio.h>
int c=0,bc=0,fc=0;
%}


%s IF OPENP CLOSEP ELSE OPENF

%%

\n {c++;}

"if" {BEGIN IF;ECHO;bc=0;}
<IF>"(" {BEGIN OPENP;ECHO;bc++;}
<IF>")" {BEGIN CLOSEP;ECHO;bc--;}

<OPENP>")" {ECHO;bc--;BEGIN CLOSEP;}
<OPENP>"(" {ECHO;bc++;}
<OPENP>. {ECHO;}

<CLOSEP>"{" {if(bc==0) {printf("Condition is valid in line no %d\n",c+1);} else {printf("Condition is invalid in line no %d; Parenthisis mismatch in condition \n",c+1);}BEGIN OPENF;ECHO;printf("\n");fc++;}

<CLOSEP>"(" {BEGIN OPENP;bc++;ECHO;}
<CLOSEP>")" {ECHO;bc--;}
<CLOSEP>. {ECHO;}
<OPENF>"} else" {fc--;BEGIN ELSE;ECHO;}
<OPENF>"}" {fc--;if(fc==0) BEGIN 0;ECHO;printf("\n");}
<OPENF>. {ECHO;}

<ELSE>"{" {BEGIN OPENF;ECHO;}
<ELSE>"if" {BEGIN IF;ECHO;}


. ;

%%

int main(){
yyin = fopen("src3.txt","r");
yylex();
fclose(yyin);
}