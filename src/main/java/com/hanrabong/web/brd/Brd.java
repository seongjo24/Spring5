package com.hanrabong.web.brd;

import org.springframework.stereotype.Component;

import com.hanrabong.web.hcust.HCust;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Component
@AllArgsConstructor
@NoArgsConstructor
public class Brd {
	 private String  writer, writedate, cnum, bpoint, content, comseq,title;
	 private int brdseq;
}
