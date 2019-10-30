package com.hanrabong.web.brd;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.hanrabong.web.cmm.IConsumer;
import com.hanrabong.web.cmm.IFunction;
import com.hanrabong.web.cmm.IPredicate;
import com.hanrabong.web.cmm.ISupplier;
import com.hanrabong.web.util.Printer;

@RestController
@RequestMapping("/articles")
public class BrdCtrl {
@Autowired Brd brd;
@Autowired Printer printer;
@Autowired BrdMapper brdMapper;

@PostMapping("/")
public Map<?,?> article(@RequestBody Brd brd){
	ISupplier<Integer>s=()->brdMapper.brdCount();
	brd.setBrdseq(s.get()+1);
	IConsumer<Brd> c=t->brdMapper.insertArticle(brd);
	c.accept(brd);
	HashMap<String, String>map=new HashMap<>();
	map.put("result","success");
	return map;
}
@GetMapping("/get")
public List<Brd> viewArticle() {
	printer.accept("들어옴");
	List<Brd> list=new ArrayList<>();
	ISupplier<Integer>s=()->brdMapper.brdCount();
	IFunction<Brd, Brd>f=t->brdMapper.view(brd);
	for(int i=s.get();i>(s.get()-5);i--) {
	
		brd.setBrdseq(i);

		list.add(f.apply(brd));
	
	
	}

	return list ; 
}
@PutMapping("/")
public Map<?,?>update(@RequestBody Brd brd){
	printer.accept(brd.toString());
	IConsumer<Brd> c=t->brdMapper.updateBrd(brd);
	c.accept(brd);
	HashMap<String,String>map=new HashMap<String, String>();
	map.put("result", "success");
	
	return map;
}
@DeleteMapping("/{brdseq}")
public Map<?,?> delete(@PathVariable int brdseq){
	printer.accept("delete");
	brd.setBrdseq(brdseq);
	IConsumer<Brd>c=t->brdMapper.deleteBrd(brd);
	IConsumer<Brd>z=t->brdMapper.updateNum(brd);
	c.accept(brd);
	z.accept(brd);
	HashMap<String,String>map=new HashMap<String, String>();
	map.put("result", "success");

	return map;
}
}
