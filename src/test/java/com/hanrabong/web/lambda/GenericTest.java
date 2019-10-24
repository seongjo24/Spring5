package com.hanrabong.web.lambda;

public class GenericTest {
	static class box<T>{
		T item;
		void setItem(T item) {
			this.item=item;
		}
		T getItem() {return item;}
	}
	public static void main(String[] args) {
		GenericTest s=new GenericTest();
		GenericTest.box<String> s2=new GenericTest.box<>();
		GenericTest.box<Integer>s3=new GenericTest.box<>();
	}
}
