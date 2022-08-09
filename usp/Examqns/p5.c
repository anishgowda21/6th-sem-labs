#include<stdio.h>
#include<sys/stat.h>
#include<time.h>
#include<utime.h>
#include<stdlib.h>

int main(int argc,char *argv[]){
	if(argc<3){
		printf("Follow proper formate: %s file1_name file2_name\n",argv[0]);
		exit(0);
	}

	struct stat sb1;
	struct stat sb2;
	struct utimbuf ub;

	if(stat(argv[1],&sb1)==-1){
		printf("Lstat error:cannot open file %s\n",argv[1]);
		exit(0);
	}

	if(stat(argv[2],&sb2)==-1){
                 printf("Lstat error:cannot open file %s\n",argv[2]);
		 exit(0);
         }

	printf("Before copying..\n");
	printf("Access time:%s Modification time:%s",ctime(&sb1.st_atime),ctime(&sb1.st_mtime));

	ub.actime = sb2.st_atime;
	ub.modtime = sb2.st_mtime;

	if(utime(argv[1],&ub)<0){
		printf("Error copying time..\n");
		exit(0);
	}
	if(stat(argv[1],&sb1)==-1){
		printf("Lstat error:cannot open file %s\n",argv[1]);
		exit(0);
	}

	printf("After copying..\n");
	printf("Access time:%s Modification time:%s",ctime(&sb1.st_atime),ctime(&sb1.st_mtime));
}

