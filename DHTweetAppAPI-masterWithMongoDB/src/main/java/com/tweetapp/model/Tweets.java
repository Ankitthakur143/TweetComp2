package com.tweetapp.model;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
@Document(collection = "Tweets")
public class Tweets {

	@Id
	private String tweetId;
	private String tweetBody;
	private String userName;
	private LocalDateTime datetime;
	private List<String> likedBy;
	private List<TweetsReply> replies;
}
