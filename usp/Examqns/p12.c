#include<stdio.h>
#include<stdlib.h>
#include<unistd.h>
#include<signal.h>

void callback(){
	printf("Intruppt recived\n");
	(void)signal(SIGINT,SIG_DFL);
}


int main(){
	int ch,i=0;

	printf("1.Call handler and default\n2.Ignore and default\nEnter choice:");
	scanf("%d",&ch);

	switch(ch){
		case 1: (void)signal(SIGINT,callback);
			break;
		case 2: (void)signal(SIGINT,SIG_IGN);
			break;
	}

	while(1)
	{
		sleep(1);
		printf("press ctrl+c\n");
		i++;

		if(i==5 && ch == 2)
			(void)signal(SIGINT,SIG_DFL);
	}
	return 0;
}
