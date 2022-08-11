#include<stdio.h>
#include<sys/types.h>
#include<sys/stat.h>
#include<unistd.h>

int main(int argc, char *argv[]){
    if(argc != 2){
        printf("Usage: %s <file_name>\n", argv[0]);
        return 1;
    }
    struct stat buff;
    if(stat(argv[1], &buff) == -1){
        printf("lstat() failed\n");
        return 1;
    }

    printf("File Information for %s:\n", argv[1]);
    printf("---------------------------------\n");
    printf("File Size: %ld bytes\n", buff.st_size);
    printf("Number of Links: %ld\n", buff.st_nlink);
    printf("File Inode Number: %ld\n", buff.st_ino);

    printf("File Permissions:");
    printf((S_ISDIR(buff.st_mode) ? "d" : "-"));
    printf((buff.st_mode & S_IRUSR) ? "r" : "-");
    printf((buff.st_mode & S_IWUSR) ? "w" : "-");
    printf((buff.st_mode & S_IXUSR) ? "x" : "-");
    printf((buff.st_mode & S_IRGRP) ? "r" : "-");
    printf((buff.st_mode & S_IWGRP) ? "w" : "-");
    printf((buff.st_mode & S_IXGRP) ? "x" : "-");
    printf((buff.st_mode & S_IROTH) ? "r" : "-");
    printf((buff.st_mode & S_IWOTH) ? "w" : "-");
    printf((buff.st_mode & S_IXOTH) ? "x" : "-");
    printf("\n");

    printf("The file %s an symbolic link\n", (S_ISLNK(buff.st_mode) ? "is" : "is not"));
}