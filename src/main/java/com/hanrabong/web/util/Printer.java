package com.hanrabong.web.util;

import java.util.function.Consumer;

import org.springframework.stereotype.Service;

import com.hanrabong.web.cmm.IHcust;
@Service
public class Printer implements IHcust{

	@Override
	public void accept(Object o) {
		Consumer<String> c =System.out :: println;
		c.accept((String)o);
	}

}
