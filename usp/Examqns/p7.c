#include<stdio.h>
#include<stdlib.h>
#include<setjmp.h>

static void f1(int,int,int,int);
static void f2(void);

static jmp_buf jumpbuff;

static int globval;

int main(){
	int autoval;
	register int regval;
	volatile int volval;
	static int statval;

	globval = 1;
	autoval = 2;
	regval = 3;
	volval = 4;
	statval = 5;

	if(setjmp(jumpbuff) != 0){
		printf("After long jump\n");
		printf("globval = %d, autoval = %d, regival = %d, volaval = %d, statval = %d\n", globval, autoval, regval, volval, statval);
	exit(0);
	}

	globval = 95;
	autoval = 96;
	regval = 97;
	volval = 98;
	statval = 99;

	f1(autoval,regval,volval,statval);
	return 0;
}

static void f1(int i,int j,int k,int l){
	printf("In f1():\n");
	printf("globval = %d, autoval = %d, regival = %d, volaval = %d, statval = %d\n", globval, i, j, k, l);
	globval = 10000;
	j = 10000;
	f2();
}

static void f2(){
	longjmp(jumpbuff,1);
}
