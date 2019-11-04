package com.hanrabong.web.config;

import javax.sql.DataSource;

import org.apache.ibatis.session.SqlSessionFactory;
import org.mybatis.spring.SqlSessionFactoryBean;
import org.mybatis.spring.SqlSessionTemplate;
import org.mybatis.spring.annotation.MapperScan;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.EnableAspectJAutoProxy;
import org.springframework.jdbc.datasource.DataSourceTransactionManager;
import org.springframework.jdbc.datasource.DriverManagerDataSource;
import org.springframework.transaction.annotation.EnableTransactionManagement;

import com.zaxxer.hikari.HikariConfig;

import com.zaxxer.hikari.HikariDataSource;

@Configuration
@ComponentScan(basePackages = {"com.hanrabong.web"})
@MapperScan(basePackages= {"com.hanrabong.web"})
//@EnableTransactionManagement
//@EnableAspectJAutoProxy
public class RootConfig {
@Bean
public DataSource dataSource() {

	  DriverManagerDataSource dataSource = new DriverManagerDataSource();

	    dataSource.setDriverClassName("com.mysql.jdbc.Driver");
	    dataSource.setUrl("jdbc:mysql://localhost:3306/hanrabong?serverTimezone=UTC");
	    dataSource.setUsername("hanrabong");
	    dataSource.setPassword("hanrabong");

	    return dataSource;
}
@Bean
public DataSourceTransactionManager txManaget() {
	return new DataSourceTransactionManager(dataSource());
}
}
