package com.tweetapp.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin(origins = "*", maxAge = 3600)

@RestController
public class HomeController {

	@GetMapping({"/home","/"})
	public String home() {
		return "Hi THERE";
	}
}
