package com.hanrabong.web.hcust;

import org.springframework.stereotype.Repository;

@Repository
public interface HCustMapper {
		public void insertHCust(HCust hcust);
		public HCust selectById(HCust hcust);
		public int existId(HCust hcust);
}
