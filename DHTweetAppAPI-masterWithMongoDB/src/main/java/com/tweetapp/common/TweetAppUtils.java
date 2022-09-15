package com.tweetapp.common;

import java.util.UUID;

import org.springframework.stereotype.Component;

@Component
public class TweetAppUtils {

	synchronized public String getRandomUUID() {
		UUID uuid = UUID.randomUUID();
		return uuid.toString();
	}
}
