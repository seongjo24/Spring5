package com.hanrabong.web.hcust;


import java.util.HashMap;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.hanrabong.web.cmm.IConsumer;
import com.hanrabong.web.cmm.IFunction;
import com.hanrabong.web.util.Printer;



@RestController
@RequestMapping("/hcust")
public class HCustCtrl{
   private static final Logger logger = LoggerFactory.getLogger(HomeController.class);
   @Autowired HCust hcust;
   @Autowired Printer printer;
   @Autowired HCustMapper hCustMapper;
   
   @GetMapping("/{cid}")
   public Map<?,?> existId(@PathVariable String cid){
	   printer.accept("exist 들어옴");
	   hcust.setCid(cid);
	   HashMap<String,String>map=new HashMap<>();
	   IFunction<HCust, Integer>f=t->hCustMapper.existId(hcust);
	   
	   map.clear();
	   map.put("msg",(f.apply(hcust)==0) ?"success":"fail");
	   printer.accept(map.toString());
	   return map;
   }
   @PostMapping("/")
   public @ResponseBody Map<?,?> join(@RequestBody HCust hcust) {
	   printer.accept("join 들어옴");
      IConsumer<HCust> c =t->hCustMapper.insertHCust(hcust);
      c.accept(hcust);
      HashMap<String, String>map=new HashMap<>();
      map.put("result","success");
      return map;
   }
 
   @PostMapping("/{cid}")
   public  HCust login(@PathVariable String cid,@RequestBody HCust hcust) {
	  IFunction<HCust,HCust>f=t->hCustMapper.selectById(hcust);
		return f.apply(hcust);	
	}
      
      
}
