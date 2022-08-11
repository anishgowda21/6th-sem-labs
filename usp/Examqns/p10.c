#include<stdio.h>

#include<stdlib.h>

#include<unistd.h>

#include<sys/stat.h>
void deamonize() {
    pid_t pid = fork();

    if (pid < 0) {
      printf("Fork error\n");
      exit(0);
    } else if (pid) {
      printf("PID of child:%d\n", pid);
      exit(0);
    }

    umask(0);
    if(chdir("/")<0){
	    printf("Error changing directory\n");
	    exit(0);
    }
    if(setsid()<0){
	    printf("Error setting sid\n");
	    exit(0);
    }
    printf("Deamon craeted..\n");
}


    int main() {
      deamonize();
      system("ps -axj");
      return 0;
    }
