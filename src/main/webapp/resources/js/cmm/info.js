"use strict"
function Info(x){

	sessionStorage.setItem('cname',x.cname);
	return {
		cname:()=>{return sessionStorage.getItem('cname')}
	}
}