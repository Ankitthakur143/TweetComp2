package com.tweetapp.repo;

import java.util.List;
import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.tweetapp.model.Tweets;

public interface TweetsRepo extends MongoRepository<Tweets, String> {

	List<Tweets> findByUserName(String userName);

	Optional<Tweets> findByTweetId(String tweetId);

}
