"use strict"
var auth=auth||{};
auth =((x)=>{
	let _, js,authvue;
	let init =()=>{
		_=$.ctx();
		js=$.js();
		authvue=js+'/vue/auth_vue.js'
		
	}
	let onCreate =()=>{
		init();
		$.getScript(authvue).done(()=>{
			setContentView()
			$('#a_go_join').click(()=>{
				$('head')
				.html(auth_vue.join_head())
				
				$('body')
				.html(auth_vue.join_body())
					$('<button>',{
			        text : 'Continue to checkout' ,
			        href: '#' ,
			        click : e=>{
			        	e.preventDefault();
			         existId()
			         }
			        })
			        .addClass('btn btn-primary btn-lg btn-block')
			        .appendTo('#checkbtn')
	        });
		})
		
	
	}		
	let login=()=>{
		 let x={css:$.css(),img:$.img()}
		    $('head')
			.html(auth_vue.login_head(x))
			
			$('body')
			.addClass('text-center')
			.html(auth_vue.login_body(x))
			
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
		       		                            alert("ajax 성공")
		       		                        board()    
		       		                        },
		       		                            error : e =>{
		       			                            alert('AJAX실패' )
		       			                        }})
		       							
		       							
		       						}
		           }).addClass("btn btn-lg btn-primary btn-block")
		          .appendTo('#btn_login')
		
	}
	let setContentView=()=>{
		login()
	}
	let join=()=>{
		   let data = { cid :  $('#cid').val() ,
                   cpw : $('#cpw').val(),
                   cnum:$('#cnum').val()
           }
			    $.ajax({
                   url : _+'/hcust/',
                   type : 'POST',
                   dataType : 'json',
                   data: JSON.stringify(data) ,
                   contentType : 'application/json',
                   success : d =>{
                       alert('joinAJAX 성공 ' +d.result)
                 login()
                   },
                   error : e =>{
                       alert('AJAX실패' )
                   }
               })
      
     
	}
	
	let existId=()=>{
		
		$.ajax({
            url : _+'/hcust/'+$('#cid').val(),
            type : 'GET',
            dataType : 'json',
            data: JSON.stringify( $('#cid').val()) ,
            contentType : 'application/json',
            success : d =>{
                alert('AJAX 성공 ' +d.msg)
                if(d.msg==="success")
                	join()
                	else
                		alert('existId 실패')
            },
            error : e =>{
                alert('AJAX실패exist' )
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