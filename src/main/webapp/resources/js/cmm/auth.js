"use strict"
var auth=auth||{};
auth =((x)=>{
	let _, js,authvue,brdjs,cookie_js;
	let init =()=>{
		_='/web';
		js=_+'/resources/js';
		authvue=js+'/vue/auth_vue.js'
		brdjs=js+'/brd/brd.js'
		cookie_js=js+'/cmm/cookie.js'
	}
	let onCreate =()=>{
		init();
		$.getScript(brdjs)
		$.getScript(cookie_js)
		$.getScript(authvue).done(()=>{
			setContentView()
			$('#a_go_join').click(()=>{
				$('head')
				.html(auth_vue.join_head())
				$('body')
				.html(auth_vue.join_body())
				$('#cid').keyup(()=>{
					if ($('#cid').val().length>2){
						$.ajax({
				            url : _+'/hcust/'+$('#cid').val(),
				            contentType : 'application/json',
				            success : d =>{
				                if(d.msg==="success")
				                	$('#dupl_check').val('회원가입 가능').css('color','blue')
				                	else
				                		$('#dupl_check').val('회원가입 불가').css('color','red')
				            },
				            error : e =>{
				                alert('AJAX실패exist' )
				            }
				        })
				}
					
				})
					$('<button>',{
			        text : 'Continue to checkout' ,
			        href: '#' ,
			        click : e=>{
			        	e.preventDefault();
			         join()
			         }
			        })
			        .addClass('btn btn-primary btn-lg btn-block')
			        .appendTo('#checkbtn')
	        });
		})
		
	
	}		
	let login=()=>{
		 
		   
			
		       	$('<button>',{ type:"submit",
		       						text:"Sign in",
		       						click: e=>{
		       							e.preventDefault();
		       							let data = { cid :  $('#inputcid').val() ,
		       		                            cpw : $('#inputcpw').val()}
		       							
		       							$.ajax({
		       		                        url : _+'/hcust/'+data.cid,
		       		                        type : 'POST',
		       		                        dataType : 'json',
		       		                        data: JSON.stringify(data) ,
		       		                        contentType : 'application/json',
		       		                        success : d =>{
		       		                        	alert('ajax성공')
		       		                           
		       		                            setCookie('cname',d.cname)
		       		                            
		       		                             brd.onCreate()
		       		                     
		       		                        },
		       		                            error : e =>{
		       			                            alert('AJAX실패' )
		       			                        }})
		       						}
		           }).addClass("btn btn-lg btn-primary btn-block")
		          .appendTo('#btn_login')
		
	}
	let setContentView=()=>{
		 $('head')
			.html(auth_vue.login_head({css:_+'/resources/css',img:_+'/resources/img'}))
			
			$('body')
			.addClass('text-center')
			.html(auth_vue.login_body({css:_+'/resources/css',img:_+'/resources/img'}))
		login()
	}
	
	let join=()=>{
		   let data = { cid :  $('#cid').val() ,
                   cpw : $('#cpw').val(),
                   cnum:$('#cnum').val(),
                   cname:$('#cname').val()
           }
			    $.ajax({
                   url : _+'/hcust/',
                   type : 'POST',
                   dataType : 'json',
                   data: JSON.stringify(data) ,
                   contentType : 'application/json',
                   success : d =>{
                       alert('joinAJAX 성공 ' +d.result)
                       setContentView()
                   },
                   error : e =>{
                       alert('AJAX실패' )
                   }
               })
      
     
	}
	

	let board=()=>{
		$('head')
		.html(auth_vue.brd_head())
		
		$('body')
		.html(auth_vue.brd_body())
	}
	let mypage=d=>{
	   
		$('head')
		.html(auth_vue.mypage_head())
		
		$('body')
		.html(auth_vue.mypage_body(d))
		
	}
	return{onCreate ,join ,login}
})();