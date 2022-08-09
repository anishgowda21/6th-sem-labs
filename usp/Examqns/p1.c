#include<stdio.h>
#include<unistd.h>
#include<fcntl.h>
#include<stdlib.h>

int main(int argc,char* argv[]){
	if(argc < 2){
		printf("Error: filename not provided");
		exit(0);
	}

	char ch;
	int fd,beg,offset,k=-1;
	fd = open(argv[1],O_RDONLY);
	beg = lseek(fd,0,SEEK_CUR);
	offset = lseek(fd,k,SEEK_END);
	while(offset>=beg){
		read(fd,&ch,1);
		write(1,&ch,1);
		k--;
		offset = lseek(fd,k,SEEK_END);
	}
	printf("\n");
	return 0;
}
