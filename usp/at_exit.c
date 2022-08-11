// Create a c program to demonstrate at_exit() function.

#include <stdio.h>
#include <stdlib.h>

static void myexit1(void);
static void myexit2(void);

int main(){
	if(atexit(myexit2) != 0)
		printf("Cannot register myexit2\n");
	if(atexit(myexit1) != 0)
		printf("Cannot register myexit1\n");
	if(atexit(myexit1) != 0)
		printf("Cannot register myexit1\n");

	printf("Main is done...\n");

	return 0;
}

static void myexit1(void) {
	printf("First exit handler...\n");
}


static void myexit2(void) {
	printf("second exit handler...\n");
}




