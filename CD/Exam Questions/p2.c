#include<stdio.h>
#include<stdlib.h>
#include<string.h>

int main(){
	FILE *fp;
	int comCheck=0;
	int i,lineno=0,comment=0;
	char line[100];
	int open=0,close=0,openline,closeline;

	fp = fopen("file2.txt","r");

	if(fp == NULL){
		printf("File cannot be opened..\n");
		exit(0);
	}

	printf("File opended\n");

	while(fgets(line,sizeof(line),fp)!=NULL){
		lineno++;
		if(strstr(line,"//")){
			printf("%s\n",line);
			printf("Single line comment detected on line %d\n",lineno);
			continue;
		}

		if(open != close){
			printf("%s\n",line);
		}

		if(strstr(line,"/*") && open ==0){
			open = 1;
			close = 0;
			openline = lineno;
			printf("\n%s",line);
		}
		if(strstr(line,"*/") && open == 1){
			open = 0;
			closeline = lineno;
			printf("Valid comment opend on line %d and closed on %d\n",openline,closeline);
		}
	}

	if(open!=close){
		printf("unterminated comment on line no %d\n",openline);
	}
	return 0;
}
