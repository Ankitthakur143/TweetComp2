package com.tweetapp.serviceImpl;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.tweetapp.common.TweetAppUtils;
import com.tweetapp.model.Tweets;
import com.tweetapp.model.TweetsReply;
import com.tweetapp.repo.TweetsRepo;
import com.tweetapp.service.TweetsService;

@Service
public class TweetsServiceImpl implements TweetsService {

	@Autowired
	private TweetAppUtils tweetAppUtils;

	@Autowired
	private TweetsRepo tweetsRepo;

	@Override
	public Tweets addTweet(Tweets tweets) {
		tweets.setTweetId(tweetAppUtils.getRandomUUID());
		return tweetsRepo.save(tweets);
	}

	@Override
	public List<Tweets> allTweets() {
		return tweetsRepo.findAll();
	}

	@Override
	public List<Tweets> myTweets(String userName) {
		return tweetsRepo.findByUserName(userName);
	}

	@Override
	public Tweets likeTweets(String userName, String tweetId) {
		Tweets tweets = tweetsRepo.findById(tweetId)
				.orElseThrow(() -> new RuntimeException("Error: Tweet is not found."));
		if (tweets.getLikedBy() == null) {
			List<String> likedByUser = new ArrayList<>();
			likedByUser.add(userName);
			tweets.setLikedBy(likedByUser);
			tweetsRepo.save(tweets);
		} else {
			tweets.getLikedBy().add(userName);
		}
		tweetsRepo.save(tweets);
		return tweets;
	}

	@Override
	public Tweets commentTweets(TweetsReply tweetsReply, String tweetId) {
		Tweets tweets = tweetsRepo.findById(tweetId)
				.orElseThrow(() -> new RuntimeException("Error: Tweet is not found."));
		tweetsReply.setTweetReplyId(tweetAppUtils.getRandomUUID());
		if (tweets.getReplies() == null) {
			List<TweetsReply> reply = new ArrayList<>();
			reply.add(tweetsReply);
			tweets.setReplies(reply);
			tweetsRepo.save(tweets);
		} else {
			tweets.getReplies().add(tweetsReply);
		}
		tweetsRepo.save(tweets);
		return tweets;
	}

	@Override
	public String deleteTweet(String tweetId) {
		tweetsRepo.deleteById(tweetId);
		return tweetId;
	}

	@Override
	public Tweets updateTweet(String tweetId, Tweets tweets) {
		Tweets tweetfromDb = tweetsRepo.findById(tweetId)
				.orElseThrow(() -> new RuntimeException("Error: Tweet is not found."));
		tweetfromDb.setTweetBody(tweets.getTweetBody());
		tweetfromDb.setDatetime(tweets.getDatetime());
		tweetsRepo.save(tweetfromDb);
		return tweetfromDb;
	}

}
