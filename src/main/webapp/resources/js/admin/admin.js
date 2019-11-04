"use strict"
var admin=admin||{};
admin=(()=>{
	let _,js,brdjs,adminvue,navivue,navijs,brdvue;
	let init =()=>{
		_='/web'
		js=_+'/resources/js'
		brdjs=js+'/brd/brd.js'
		adminvue=js+'/vue/admin_vue.js'
		navivue=js+'/vue/navi_vue.js'
		navijs=js+'/cmm/navi.js'
		brdvue=js+'/vue/brd_vue.js'
	}
	
		let onCreate=()=>{
			init()
			$.when($.getScript(adminvue),
			$.getScript(navivue),
			$.getScript(navijs),
			$.getScript(brdvue)
			).done(()=>{
				setContentView()
			})
		}
		let setContentView=()=>{
			access()
		}
		let access=()=>{
			let ok= confirm('사원 입니까?')
			if(ok){
				let anum =prompt('사원번호를 입력하시오')
				let apw =prompt('사원번호를 입력하시오')
				alert('입력한 사번:'+anum)
				$.ajax({
					url:'/web/admin/',
					type:'POST',
					dataType:'json',
					data:JSON.stringify({anum:anum,apw:apw}),
					contentType:'application/json',
					success:d=>{
						alert(d.department+'부서의'+d.anum+'님 환영합니다')
						$('body').empty()
						$('body')
						.append(navi_vue.navi_bar)
					
						
						$('<table id="tab"><tr></tr></table>')
						.css({'padding-top' :'100px',border:'3px solid black',width:'80%',height:'80%','margin':'0 auto'})
						.appendTo('body')
						let arr1=[{name:'left',size:'20%'},{name:'right',size:'80%'}]
						$.each(arr1,(i,j)=>{
							$('<td id="'+j.name+'"></td>')
							.css({border:'3px solid black',width:j.size,height:'80%','margin':'0 auto','vertical-align':'top'})
							.appendTo('#tab tr')
						})
						let arr=[
							{txt:' 웹 크롤링  ',name:'web_crawl'},
							{txt:'고객관리',name:'custManage'},
							{txt:'상품 등록',name:'item_reg'},
							{txt:'상품 조회',name:'item_srch'},
							{txt:'상품관리',name:'item_mng'},
							{txt:'상품삭제',name:'item_del'},
							{txt:'      2   ',name:'2'},
							{txt:'     3    ',name:'3'},
							{txt:'      4   ',name:'4'},
							{txt:'      5   ',name:'5'},
							{txt:'      6   ',name:'6'},
							{txt:'       7  ',name:'7'},
							{txt:'        8 ',name:'8'}]
						
						$.each(arr,(i,j)=>{
							$('<div name="'+j.name+'">'+j.txt+'</div>').appendTo('#left').click(function(){
								$(this).addClass('active')
								$(this).siblings().removeClass('active')
								   
								switch($(this).attr('name')){
								 
								case 'web_crawl':
									 
									webCrawl()
									break;
								case 'custManage':
									
									break;
								   
								case 'item_reg':
									
									break;
									
								case 'item_srch':
									
									break;
									
								case 'item_mng':
									
									break;
									
								case 'item_del' :
									
									break;
								
								}
							})
						})
					
						$('#left div')
						.css({border:'1px solid black','margin':'auto 0','line-height':'50px'})
					},
					erorr:d=>{
						alert('실패')
					}
				})
			}
		}
		let webCrawl=()=>{
			$('#right').empty()
			$(    '<h1>크롤링</h1><br>'+
					'<form class="form-inline my-2 my-lg-0" action="/action_page.php">'+
					'  <select id ="webs"name="site" size="1" >'+
					'  </select>'+
					'  <br><br>'+
				    ' <input id="search"class="form-control mr-sm-2" type="text" placeholder="Search" aria-label="Search">'+
				   '<button id="crawlbtn" class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>'+
					'</form>')
					.appendTo('#right')
		let arr=[{value:'google' ,text:'구글'},{value:'naver' ,text:'네이버'},{value:'daum' ,text:'다음'},{value:'youtube' ,text:'유튜브'}]
		$.each(arr,(i,j)=>{
			$('<div id="scroll" ></div>').appendTo('#right')
			.css({width:'100%',height : '60%','overflow-x':'scroll', 'overflow-y':'scroll'
})
		$('<option value="'+j.value+'">'+j.text+'</option>').appendTo('#webs')
		})
		$('#crawlbtn').click(e=>{
			e.preventDefault()
			if(!$.fn.nullCheker([$('#search').val()])){
				$('#scroll').empty()
			alert('다슬이')
			$.ajax({
				url:'/web/tx/'+$('select  ').val()+'/'+$('#search').val(),
				type:'GET',
				contentType:'application/json',
				success:d=>{
					
					alert('aaa')
					$('<div >'+d+'</div>').appendTo('#scroll').css({width:'100%',height:'60%'})

				},
				erorr:e=>{
					alert('에러')
				}
			})
			
		}})
		
		}
		
		
		
		return{onCreate}
})()