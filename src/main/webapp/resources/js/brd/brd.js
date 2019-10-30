"use strict"
var brd=brd||{};
brd=((x)=>{
		let _ ,js, authvue,brdvue,info,cname,navijs,navivue,cookie_js;
		let init =()=>{
			_='/web'
			js=_+'/resources/js'
			authvue=js+'/vue/auth_vue.js'
			brdvue=js+'/vue/brd_vue.js'
			info=js+'/cmm/info.js'
			navijs=js+'/cmm/navi.js'
			navivue=js+'/vue/navi_vue.js'
			cookie_js=js+'/cmm/cookie.js'
		}
		let onCreate=()=>{
			init()
			$.when($.getScript(brdvue),
			$.getScript(navivue),
			$.getScript(cookie_js)
			) 
			.done(()=>{
			setContentView()
			})
			
		}
		let setContentView=()=>{
			brd()
			navigation()
		}
		let brd=()=>{
		$.when(
			$('head')
			.html(brd_vue.brd_head()),
			$('body')
			.html(brd_vue.brd_body()).append(navi_vue.navi_bar())
			).done(()=>{main()})
			
			
		}
		let main=()=>{
			$('#main').html(brd_vue.brd_main())
			$('#brdText .d-block ').remove()
			$('#brdText .media ').remove()
			$.getJSON('/web/articles/get',d=>{
				$.each(d,(i,j)=>{
				$('#brdText').append(
				        '<div class="media text-muted pt-3">'+
				        '<img data-src="holder.js/32x32?theme=thumb&amp;bg=007bff&amp;fg=007bff&amp;size=1" alt="32x32" class="mr-2 rounded" style="width: 32px; height: 32px;" src="data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%2232%22%20height%3D%2232%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%2032%2032%22%20preserveAspectRatio%3D%22none%22%3E%3Cdefs%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E%23holder_16dfcdddb72%20text%20%7B%20fill%3A%23007bff%3Bfont-weight%3Abold%3Bfont-family%3AArial%2C%20Helvetica%2C%20Open%20Sans%2C%20sans-serif%2C%20monospace%3Bfont-size%3A2pt%20%7D%20%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cg%20id%3D%22holder_16dfcdddb72%22%3E%3Crect%20width%3D%2232%22%20height%3D%2232%22%20fill%3D%22%23007bff%22%3E%3C%2Frect%3E%3Cg%3E%3Ctext%20x%3D%2211.5390625%22%20y%3D%2216.9%22%3E32x32%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E" data-holder-rendered="true">'+
				        ' <p id= "id_'+i+'"class="media-body pb-3 mb-0 small lh-125 border-bottom border-gray">'+
				        '</p></div>')
				$(' <strong class="d-block text-gray-dark"><a>'+j.writer+'</strong>').appendTo('#id_'+i).click(()=>{alert('id')})
				$('<a>'+j.title+'</a>').appendTo('#id_'+i).click(e=>{detail(j)})
				})
			})
		
			
			$('#brdText2 .media ').remove()
			$('#brdText2 .d-block ').remove()
			$('#brdText2').append('<h2>새로운 글이 있습니다</h2>')
		}
		let write=()=>{
			
			$.when($('#main')
					.html(brd_vue.brd_write())).done(
					$('#write_form input[name=writer]').val(getCookie("cname")).css('color','black')
					)
					$('<input>',{
						value:'cancel',
						style:'float:right;width:100px;margin-right:10px',
						href:'#',
						type:'reset',
						
					}).addClass('btn btn-danger')
					.appendTo('#write_div').click(e=>{e.preventDefault();
							alert('cancel 성공')
							main()})
					
					$('<input>',{
						value:'submit',
						href:'#',
						type:'submit',
						style:'float:right;width:100px;margin-right:10px" value="SUBMIT',
						
					}).addClass('btn btn-primary')
					.appendTo('#write_div').click(e=>{
				
					let data={writer: $('#write_form input[name=writer]').val(),
							content:$('#write_form textarea').val(),
							title:$('#write_form input[name=title]').val()
							}
							
			
					$.ajax({
						url:'/web/articles/',
						type:'POST',
						dataType:'json',
						data:JSON.stringify(data),
						contentType:'application/json',
						success:d=>{
							alert('ajax 성공')
							main()
						
						},
						error: e=>{
							alert('ajax 실패')
						}
							
					})
					})
					
		}
		let navigation=(x)=>{
			$.getScript(navijs,()=>{navi.onCreate(x)})
		
		}
		
		let detail =x=>{
			alert('넘기는 시퀀스'+x.writer)
			$('#main').html(brd_vue.brd_content)
			$('#content p').append('<h1>제목:'+x.title+'</h1>')
			$('#content ').append('<h4>작성자:'+x.writer+'<br>'+x.content+'</h4>')
			$('<button>',{
						text:'수정',
						style:'float:right;width:100px;margin-right:10px',
						href:'#',
						
						
					}).addClass('btn btn-danger')
					.appendTo('#content').click(e=>{
						e.preventDefault();
							alert('수정')
							$('#main').html(brd_vue.brd_write())
							$('#write_div h1').html('수정')
							$('#write_form input[name=writer]').val(x.writer)
							$('#write_form input[name=title]').val(x.title)
							$('#write_form textarea').val(x.content)
				$('<button>',{
						text:'완료',
						href:'#',
						style:'float:right;width:100px;margin-right:10px" value="SUBMIT',
						
					}).addClass('btn btn-primary')
					.appendTo('#write_form').click(e=>{
						e.preventDefault()
						update(x)
						
					})
							
					})
							
							$('<button>',{
						text:'삭제',
						href:'#',
						style:'float:right;width:100px;margin-right:10px" value="SUBMIT',
						
					}).addClass('btn btn-primary')
					.appendTo('#content').click(e=>{
						e.preventDefault()
						deleteBrd(x)
					})
			
		}
		let update=x=>{	
			let data={brdseq:x.brdseq,
					writer:$('#write_form input[name=writer]').val(),
					title:$('#write_form input[name=title]').val(),
					content:$('#write_form textarea').val()
				}
			$.ajax({
			url:_+'/articles/',
			type:'PUT',
			dataType:'json',
			data:JSON.stringify(data),
			contentType:'application/json',
			success:d=>{
				alert(d.result)
				
			main()
			},
			error: e=>{
				alert('ajax 실패')
			}
				
		})
			
		}
		let deleteBrd=x=>{
			$.ajax({
				url:_+'/articles/'+x.brdseq,
				type:'DELETE',
				dataType:'json',
				contentType:'application/json',
				success:d=>{
					alert(d.result)
					
				main()
				},
				error: e=>{
					alert('ajax 실패')
				}
					
			})
		}
		
		
		return{onCreate,write,brd,main}
})()