#include<stdio.h>
#include<stdlib.h>
#include<sys/wait.h>
#include<unistd.h>

static void charatatime(char *);

int main(){
	pid_t pid;
	if((pid = fork())<0){
		printf("Fork error..\n");
		exit(0);
	}
	else if(pid == 0){
		charatatime("output from childdddddd\n");
	}
	else{
		charatatime("output from parenttttt\n");
	}

	return 0;
}


static void charatatime(char *str)
{
	char *ptr;
	int ch;
	setbuf(stdout,NULL);
	for(ptr=str;(ch=*ptr++)!=0;){
		putc(ch,stdout);
	}
}

