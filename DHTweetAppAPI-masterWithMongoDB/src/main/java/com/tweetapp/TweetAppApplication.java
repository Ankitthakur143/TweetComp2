package com.tweetapp;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
@EnableAutoConfiguration
public class TweetAppApplication {

	public static void main(String[] args) {
		System.setProperty("server.servlet.context-path", "/tweets/");
		SpringApplication.run(TweetAppApplication.class, args);
	}

}
