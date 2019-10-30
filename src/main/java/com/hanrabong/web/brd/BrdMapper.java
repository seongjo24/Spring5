package com.hanrabong.web.brd;

import org.springframework.stereotype.Repository;
@Repository
public interface BrdMapper {
public void insertArticle(Brd brd);
public Brd view(Brd brd);
public int brdCount();
public void updateBrd(Brd brd);
public void deleteBrd(Brd brd);
public void updateNum(Brd brd);
}
