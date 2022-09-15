package com.tweetapp.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
@Document(collection = "Users")
public class Users {

	@Id
	private String id;
	private String firstName;
	private String lastName;
	private String gender;
	private String dob;
	private String userName;
	private String password;
}
