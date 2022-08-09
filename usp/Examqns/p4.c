#include<stdio.h>
#include<stdlib.h>
#include<dirent.h>
#include<sys/stat.h>
#include<string.h>
int main(int argc,char *argv[])
{
	if(argc<2){
		printf("Error:Directory path not provided..\n");
		exit(0);
	}
	DIR *dp;
	struct dirent *dirp;
	struct stat sb;
	char str[50];
	dp = opendir(argv[1]);
	if(dp==0){
		printf("Please provide a valid directory path..\n");
		exit(0);
	}
	while((dirp = readdir(dp)) != NULL){
		if(stat(dirp->d_name,&sb)==-1)
		{
			printf("Lstat Error: Cannor open file %s\n",dirp->d_name);
			exit(0);
		}
		strcpy(str,dirp->d_name);
		if(sb.st_size<1){
			if((remove(str)) == 0){
				printf("Deleted file %s\n",str);
			}else{
				printf("Cannot delete file %s\n",str);
			}
		}
	}
	return 0;
}
