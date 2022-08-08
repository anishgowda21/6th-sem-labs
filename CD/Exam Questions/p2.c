#include<stdio.h>
#include<stdlib.h>
#include<string.h>

int main(){
	FILE *fp;
	int commentCheck,i,comment,lineno = 0,open=0,close=0,openlineno=0,closelineno=0;
	char line[100];

	fp = fopen("file2.txt","r");
	if(fp == NULL){
		printf("Cannot open file...\n");
		exit(0);
	}

	while(fgets(line,sizeof(line),fp) != NULL){
		lineno++;
		commentCheck = 0;
		comment = 0;

		if(strstr(line,"//")){
			printf("\n%s\n",line);
			printf("\nSingle line comment on line %d\n",lineno);
		}

		if(open == 1 && close == 0)
			printf("%s\n",line);
		if(strstr(line,"/*") && open ==0)
		{
			open = 1;
			close = 0;
			comment = 1;
			openlineno = lineno;
			printf("%s\n",line);
		} 
		if(strstr(line,"*/")&&close==0&&open==1){
			closelineno = lineno;
				open = 0;
				close = 1;
				printf("Comment is displayed above!\nComment opend in line no %d and closed in line no %d\n",openlineno,closelineno);
		}
	}

	if(open == 1 && close == 0)
	{
		printf("Unterminated comment in begin in line no %d. It Has to be closed\n",openlineno);
		commentCheck = 1;
	} else if(comment == 1 && commentCheck ==0){
		printf("Comment usage on line %d is validated..\n",lineno);
	}
	return 0;
}


