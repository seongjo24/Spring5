"use strict"
var navi=navi||{};
navi=((x)=>{
	let js,_ ,authvue,brdvue,info,cname,navi,brdjs,authjs,navivue,cookie_js;
	let init=(x)=>{
		
		_='/web'
		js=_+'/resources/js'
		brdjs=js+'/brd/brd.js'
		authvue=js+'/vue/auth_vue.js'
		brdvue=js+'/vue/brd_vue.js'
		info=js+'/cmm/info.js'
		authjs=js+'/cmm/auth.js'
		navivue=js+'/vue/navi_vue.js'
		cookie_js=js+'/cmm/cookie.js'
	}
	let onCreate=(x)=>{
	
		init(x)
		$.getScript(cookie_js)
		$.getScript(authjs)
	    $.getScript(brdjs)
		setContentView()
	
	}
	let setContentView=()=>{
		navigationBar()
	}
	let navigationBar=()=>{
		$('<a>',{
			href:'#',
			text:'글쓰기',
			click: e=>{
				e.preventDefault()
			
				
				brd.write()
			}
			
			
		}).addClass('nav-link')
			.appendTo('#go_write')
$('<a>',{
			href:'#',
			text:'로그아웃',
			click: e=>{
				e.preventDefault()
				alert('로그아웃')
				deleteCookie()
				auth.onCreate()
	
			}
			
			
		}).addClass('nav-link')
			.appendTo('#logout')
	}
	
	return {onCreate}
})()