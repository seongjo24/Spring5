package com.hanrabong.web.hcust;

import java.util.HashMap;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.hanrabong.web.util.Printer;



@RestController
@RequestMapping("/hcust/*")
public class HcustCtrl{
   private static final Logger logger = LoggerFactory.getLogger(HomeController.class);
   @Autowired HCust hcust;
   @Autowired Printer printer;
   
   @PostMapping("/")
   public Map<?,?> join(@RequestBody HCust hcust) {
       logger.info("ajax가 보낸 아이디 {}", hcust.getCid() +","+ hcust.getCpw());
       printer.accept("ajax가 보낸 아이디 {}"+ hcust.getCid() +","+ hcust.getCpw());
       HashMap<String,String> map= new HashMap<>();
       map.put("cid",  hcust.getCid());
       map.put("cpw", hcust.getCpw());
       logger.info("map에 담긴 아이디와 비번 {}", map.get("cid") +","+ map.get("cpw"));
       return map;
   }
   @PostMapping("/login")
   public  Map<?,?> login(@RequestBody HCust hcust) {
       logger.info("ajax가 보낸 아이디 {}", hcust.getCid() +","+ hcust.getCpw());
       HashMap<String,String> map= new HashMap<>();
       map.put("cid", hcust.getCid());
       map.put("cnum", hcust.getCid());
       
       logger.info("map에 담긴 사용자 정보 {}", map.toString());
       return map;
   }
}