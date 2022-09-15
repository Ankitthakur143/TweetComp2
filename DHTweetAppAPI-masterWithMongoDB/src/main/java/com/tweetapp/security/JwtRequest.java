package com.tweetapp.security;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class JwtRequest {

	private String userName;
	private String password;

	public JwtRequest() {

	}

	public JwtRequest(String userName, String password) {
		super();
		this.userName = userName;
		this.password = password;
	}
}
