package com.tweetapp.controller;

import java.util.List;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
//import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.tweetapp.model.Users;
import com.tweetapp.service.UsersService;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
public class UsersController {

	@Autowired
	private UsersService usersService;

	@PostMapping("/register")
	public Users saveUsers(@RequestBody Users users) {
		log.info(users.toString());
		Users registerUser = new Users();
		BeanUtils.copyProperties(users, registerUser);
		return usersService.saveUser(users);
	}

	@GetMapping("/users/all")
	public List<Users> getAllUsers() {
		return usersService.getAllUsers();
	}

	@PostMapping("/login")
	public ResponseEntity<Users> loginUser(@RequestBody Users users) {
		log.info(users.toString());
		Users loginUser = usersService.loginUser(users);
		return new ResponseEntity<>(loginUser, new HttpHeaders(), HttpStatus.OK);
	}

	@GetMapping("/user/search/{username}")
	public Users getUserByPin(@PathVariable("username") String username) {
		return usersService.findUser(username);
	}

	@PostMapping("/forgot/{userName}")
	public ResponseEntity<Users> loginUser(@PathVariable("userName") String userName, @RequestBody String password) {
		Users user = usersService.updatePassword(userName, password);
		return new ResponseEntity<>(user, new HttpHeaders(), HttpStatus.OK);
	}

}
