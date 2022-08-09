#include<fcntl.h>

#include<unistd.h>

#include<stdio.h>

#include<stdlib.h>

int main(int argc, char * argv[]) {
    if (argc < 2) {
        printf("Error : Filename not provided\n");
        exit(0);
    }
    int fd, seek;
    char buff[20];
    fd = open(argv[1], O_RDONLY);
    printf("Reading first 20 bytes..\n");
    read(fd, buff, 20);
    write(1, buff, 20);
    printf("\nSeeking to 10 bytes from begining and displaying 20 charecters\n");
    seek = lseek(fd, 10, SEEK_SET);
    read(fd, buff, 20);
    write(1, buff, 20);
    printf("\nSeeking 10 bytes ahed of current file position and printing 20 chars\n");
    seek = lseek(fd, 10, SEEK_CUR);
    read(fd, buff, 20);
    write(1, buff, 20);
    printf("\n");
    return 0;
}
