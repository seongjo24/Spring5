package com.hanrabong.web.aop;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.jsoup.Connection;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Component;

import lombok.Data;

@Data
@Component
@Lazy
public class Proxy {
	private int pageNum;
	private String search;
	


	public List<?> searchCrawl(String name,String search) {
		 List<String>proxyList=new ArrayList<String>();
		String curl = "";
		 switch(name) {
			case "google":
					curl="https://www.google.com/search?q="+search+"&oq="+search;
				break;
			case"naver":
				curl="https://search.naver.com/search.naver?query="+search+"&oquery="+search;
				break;
			case "daum":
				
				curl="https://search."+name+".net/search?q="+search;
				break;
			case"youtube":
				curl="https://www."+name+".com/results?search_query="+search;
			break;
				
			}
		 System.out.println(curl);
		proxyList.clear();
		try {
			Connection.Response response = Jsoup.connect(curl).method(Connection.Method.GET).execute();
			Document document = response.parse();
			String text = document.text();
			proxyList.add(text);
		} catch (Exception e2) {
			e2.printStackTrace();
		}	
		return proxyList;
	}
	
	

}
