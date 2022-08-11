#include<stdio.h>
#include<string.h>
#include<stdlib.h>

int main(){
	FILE *fp;
	int lineno=0;
	int string=0,i;
	char line[100];
	int open=0;
	fp = fopen("file.txt","r");
	if(fp == NULL){
		printf("File can't be opened..\n");
		exit(0);
	}

	printf("File opened successfully\n");
	while(fgets(line,sizeof(line),fp)!=NULL){
		lineno++;
		string = 0;
		for(i=0;i<strlen(line);i++){
			if(line[i]=='"'){
				open = open ? 0 : 1;
				string = 1;
			}
		}
		if(line[i-2] == '\\' && open){
			printf("Multiline string detected on line %d\n",lineno);
		} else if(open){
			printf("Unterminated string on linr %d\n",lineno);
			open = 0;
		}else if(string){
			printf("String terminated correctly on line %d\n",lineno);
		}

	}
	return 0;
}
