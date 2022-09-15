package com.tweetapp.model;

import java.time.LocalDateTime;

import org.springframework.data.annotation.Id;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class TweetsReply {

	@Id
	private String tweetReplyId;
	private String repliedBy;
	private LocalDateTime datetime;
	private String tweetReplyBody;

}
