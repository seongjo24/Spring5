"use strict"
$.prototype.nullCheker =x=>{
	let flag =false
	let i=0
	for(i in x){
		if(x[i]===''){
			flag =true
		}
	}
	return flag
}