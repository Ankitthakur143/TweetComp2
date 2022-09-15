package com.tweetapp.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.tweetapp.model.Tweets;
import com.tweetapp.model.TweetsReply;
import com.tweetapp.service.TweetsService;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
public class TweetsController {

	@Autowired
	private TweetsService tweetsService;

	@PostMapping("/add")
	public Tweets addTweet(@RequestBody Tweets tweets) {
		System.out.println(tweets.toString());
		return tweetsService.addTweet(tweets);
	}

	@GetMapping("/all")
	public List<Tweets> allTweets() {
		return tweetsService.allTweets();
	}

	@GetMapping("/{userName}")
	public List<Tweets> myTweets(@PathVariable("userName") String userName) {
		return tweetsService.myTweets(userName);
	}

	@PutMapping("/update/{tweetId}")
	public ResponseEntity<Tweets> updateTweets(@PathVariable("tweetId") String tweetId, @RequestBody Tweets tweets) {
		Tweets returnTweet = tweetsService.updateTweet(tweetId, tweets);
		return new ResponseEntity<>(returnTweet, HttpStatus.OK);
	}

	@DeleteMapping("/delete/{tweetId}")
	public ResponseEntity<?> deleteTweet(@PathVariable String tweetId) {
		tweetsService.deleteTweet(tweetId);
		return new ResponseEntity<>(HttpStatus.OK);
	}

	@PutMapping("/{userName}/like/{tweetId}")
	public ResponseEntity<Tweets> likeTweets(@PathVariable("userName") String userName,
			@PathVariable("tweetId") String tweetId) {
		Tweets tweets = tweetsService.likeTweets(userName, tweetId);
		return new ResponseEntity<>(tweets, HttpStatus.OK);
	}

	@PostMapping("/{userName}/reply/{tweetId}")
	public ResponseEntity<Tweets> commentTweets(@PathVariable("userName") String userName,
			@PathVariable("tweetId") String tweetId, @RequestBody TweetsReply tweetsReply) {
		log.info("userName: " + userName);
		log.info("tweetId: " + tweetId);
		Tweets tweets = tweetsService.commentTweets(tweetsReply, tweetId);
		return new ResponseEntity<>(tweets, HttpStatus.OK);
	}

}
