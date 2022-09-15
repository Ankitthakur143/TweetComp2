package com.tweetapp.security;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class JwtResponse {

	String token;

	public JwtResponse() {
	}

	public JwtResponse(String token) {
		super();
		this.token = token;
	}

}
