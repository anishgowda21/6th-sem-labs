#include<stdio.h>
#include<stdlib.h>
#include<sys/types.h>
#include<sys/stat.h>
#include<fcntl.h>
#include<unistd.h>

int main(int argc, char *argv[]){
    if(argc != 2){
        printf("Usage: %s <file_name>\n", argv[0]);
        return 1;
    }
    struct stat buff;
    char *fileType;
    if(lstat(argv[1], &buff) == -1){
        printf("lstat() failed\n");
        return 1;
    }

    if(S_ISREG(buff.st_mode))
        fileType = "regular";
    else if(S_ISDIR(buff.st_mode))
        fileType = "directory";
    else if(S_ISCHR(buff.st_mode))
        fileType = "character special";
    else if(S_ISBLK(buff.st_mode))
        fileType = "block special";
    else if(S_ISFIFO(buff.st_mode))
        fileType = "fifo";
    else if(S_ISLNK(buff.st_mode))
        fileType = "symbolic link";
    else if(S_ISSOCK(buff.st_mode))
        fileType = "socket";
    else  
        fileType = "unknown";
    
    printf("%s is a %s file\n", argv[1], fileType);
    return 0;
}
