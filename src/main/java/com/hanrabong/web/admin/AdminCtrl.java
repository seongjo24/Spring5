package com.hanrabong.web.admin;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.hanrabong.web.cmm.IFunction;
import com.hanrabong.web.util.Printer;

@RestController
@RequestMapping("/admin")
public class AdminCtrl {
@Autowired Admin admin;
@Autowired AdminMapper adminMapper;
@Autowired Printer printer;

@PostMapping("/")
public Admin access(@RequestBody Admin admin){
	printer.accept("access 들어옴");
	IFunction<Admin,Admin>f=t->adminMapper.adminAccess(admin);
	

	return f.apply(admin);
}
}
