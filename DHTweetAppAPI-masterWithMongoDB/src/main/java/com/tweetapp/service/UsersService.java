package com.tweetapp.service;

import java.util.List;

import org.springframework.stereotype.Component;

import com.tweetapp.model.Users;

@Component
public interface UsersService {

	Users saveUser(Users users);

	List<Users> getAllUsers();

	Users loginUser(Users users);
	
	Users findUser(String email);

	Users updatePassword(String userName, String password);

}
