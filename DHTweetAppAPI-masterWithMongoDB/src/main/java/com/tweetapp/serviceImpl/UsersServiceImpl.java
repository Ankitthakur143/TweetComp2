package com.tweetapp.serviceImpl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.tweetapp.model.Users;
import com.tweetapp.repo.UsersRepo;
import com.tweetapp.service.UsersService;

@Service
public class UsersServiceImpl implements UsersService {

	@Autowired
	private UsersRepo usersRepo;

	@Override
	public Users saveUser(Users users) {
		if (usersRepo.existsByUserName(users.getUserName()))
			return users;
		else
			return usersRepo.save(users);

	}

	@Override
	public List<Users> getAllUsers() {
		return usersRepo.findAll();
	}

	@Override
	public Users loginUser(Users users) {
		Users actualUser = new Users();
		actualUser = usersRepo.findByUserName(users.getUserName());
		if (users.getPassword().equals(actualUser.getPassword())) {
			System.out.println("User login successful: " + actualUser.toString());
			return actualUser;
		} else {
			System.out.println("User not found");
			return null;
		}
	}

	@Override
	public Users findUser(String email) {
		return usersRepo.findByUserName(email);
	}

	@Override
	public Users updatePassword(String userName, String password) {
		Users user = usersRepo.findByUserName(userName);
		user.setPassword(password);
		return usersRepo.save(user);
	}

}
