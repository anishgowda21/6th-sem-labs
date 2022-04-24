#include<fcntl.h>
#include<stdio.h>
#include<unistd.h>
#include<stdlib.h>
int main(int argc, char *argv[]){

	struct flock fl;
	int fd, fsize, offset;
	char res[10],buff[50];
	
	// flock Initialtion
	fl.l_type = F_WRLCK; // Write Lock
	fl.l_whence = SEEK_SET; // Begining of the file
	fl.l_start = 0; // offset from l_whence
	fl.l_len = 50; // lenght , 0=EOF
	fl.l_pid = getpid(); // PID
	
	// open the file
	printf("Trying to open the file...\n");
	fd = open(argv[1],O_RDWR);
	if(fd == -1){ //If opening the file is unsuccesfull exit the program		
		perror("Can't open the file\n");
		exit(1);
	}
	printf("File opened fd : %d\n",fd);

	// Lock the file
	printf("\nFile is not locked yet press any key to lock the file\n");
	getchar();
	printf("Trying to lock the file....\n");
	int a=fcntl(fd,F_SETLKW,&fl);

	if(a == -1){
		printf("Cannot set exclusive Lock on the file...\n");
	}
	else if(fl.l_type != F_UNLCK)
	{
		printf("File has been exclusively locked by the process: %d\n",fl.l_pid);
	}
	do{
	printf("Press U to unlock the file:");
	scanf("%s",res);
	}while(res =="U" || res == "u");
	
	fl.l_type = F_UNLCK;
	fcntl(fd,F_SETLK,&fl);

	printf("File Unlocked....\n");
}
