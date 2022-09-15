package com.tweetapp.service;

import java.util.List;

import org.springframework.stereotype.Component;

import com.tweetapp.model.Tweets;
import com.tweetapp.model.TweetsReply;

@Component
public interface TweetsService {

	Tweets addTweet(Tweets tweets);

	List<Tweets> allTweets();

	List<Tweets> myTweets(String userName);
	
	Tweets likeTweets(String userName, String tweetId);
	
	Tweets updateTweet(String tweetId, Tweets tweets);
	
	Tweets commentTweets(TweetsReply tweetsReply, String tweetId);
	
	String deleteTweet(String tweetId);

}