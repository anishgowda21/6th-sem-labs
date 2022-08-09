#include<stdio.h>
#include<dirent.h>
#include<fcntl.h>
#include<sys/stat.h>
#include<time.h>
#include<stdlib.h>

int main(int argc,char *argv[]){
	if(argc < 2){
		printf("Error:Directory path not provided\n");
		exit(0);
	}

	DIR *dp;
	struct dirent *dirp;
	struct stat sb;

	dp = opendir(argv[1]);
	if(dp == 0){
		printf("Please give a valid directory path\n");
		exit(0);
	}
	while((dirp = readdir(dp)) != NULL){
		if(lstat(dirp->d_name,&sb) == -1)
		{
			printf("lstat error:Cannot open file %s\n",dirp->d_name);
			continue;
		}
		printf("\nFilename:%s\n",dirp->d_name);
		printf("I-node number:%ld\n",(long) sb.st_ino);
		printf("No of links:%ld\n",(long)sb.st_nlink);
		printf("Mode: %lo (octal)\n",(unsigned long) sb.st_mode);
		printf("Owenership: UID = %ld ,GID = %ld\n",(long)sb.st_uid,(long)sb.st_gid);
		printf("File Size:%lld bytes\n",(long long)sb.st_size);
		printf("Last status change:%s\n",ctime(&sb.st_ctime));
		printf("Last file access:%s\n",ctime(&sb.st_atime));
		printf("Last file modification:%s\n",ctime(&sb.st_atime));
		printf("\n");
	}
	closedir(dp);
	return 0;


}
