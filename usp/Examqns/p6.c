 #include<stdio.h>

 #include<stdlib.h>

 #include<unistd.h>

 #include<fcntl.h>
 int main(int argc, char * argv[]) {
         if (argc < 3) {
             printf("Error : filename not provided\n");
             exit(0);
         }

	 char buff[1000];
         int fd1, fd2;
         off_t size, set;
         ssize_t readdata, writedata;

         if ((fd1 = open(argv[1], O_RDONLY)) == -1) {
             printf("Cannot open file %s\n", argv[1]);
	     exit(0);
         } else {
             printf("%s opened successfully\n", argv[1]);
         }
         if ((fd2 = open(argv[2], O_WRONLY | O_CREAT | O_TRUNC, 0666)) == -1) {
             printf("Cannot open file %s\n", argv[2]);
	     exit(0);
         } else {
             printf("%s opened successfully\n", argv[2]);
         }
         size = lseek(fd1, 0L, SEEK_END);
         if (size == -1) {
             printf("Cannot obtain file size for %s\n", argv[1]);
	     exit(0);
	 }
	 else{
		 printf("Obtained file size for %s\n", argv[1]);
	 }

	 set = lseek(fd1,0L,SEEK_SET);
	 if(set == -1){
		 printf("Cannot retrace file %s\n",argv[1]);
	 }

	 readdata = read(fd1,buff,size);
	 if(readdata == -1){
		 printf("Cannot read file %s\n",argv[1]);
	 }
	 else{
		 printf("Successfully read file %s\n",argv[1]);
	 }

	 writedata = write(fd2,buff,size);
	 if(size == writedata){
		 printf("Successfully written to file %s\n",argv[2]);
	 }
	 else{
		 printf("Error while writing to file %s\n",argv[2]);
	 }
	 return 0;
 }
