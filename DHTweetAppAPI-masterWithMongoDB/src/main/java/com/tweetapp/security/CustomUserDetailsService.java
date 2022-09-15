package com.tweetapp.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.tweetapp.model.Users;
import com.tweetapp.repo.UsersRepo;

@Service
public class CustomUserDetailsService implements UserDetailsService {

	@Autowired
	private UsersRepo usersRepo;

	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {

		Users user = usersRepo.findByUserName(username);
		if (user == null)
			throw new UsernameNotFoundException("User Not FOUND - 404 !!");
		return new UserDetailsImpl(user);
	}

}
