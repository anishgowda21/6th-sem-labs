#include<stdio.h>
#include<stdlib.h>
#include<sys/wait.h>
#include<unistd.h>


int main(){
	pid_t pid;

	if((pid = fork())<0){
		printf("Frok error\n");
		exit(0);
	}
	else if(pid == 0){
		if((pid = fork())<0){
			printf("Frok error\n");
			exit(0);
		}
		else if(pid>0){
			exit(0);
		}
		sleep(2);
		printf("Second child, parent pid = %ld\n",(long)getppid());
		exit(0);
	}
	if(waitpid(pid,NULL,0)!=pid){
		printf("Wait pid error..\n");
		exit(0);
	}

	return 0;
}

