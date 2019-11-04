package com.hanrabong.web.aop;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@Transactional
@RequestMapping("/tx")
public class TxController {
	@Autowired Proxy pxy;
	

	@GetMapping("/{name}/{search}")
	public List<?> searchCrawl(@PathVariable String name,@PathVariable String search){
		System.out.println(name+search);
		
		return pxy.searchCrawl(name,search);
	}
}
