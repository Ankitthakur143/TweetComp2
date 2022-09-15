package com.tweetapp.repo;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import com.tweetapp.model.Users;

@Repository
public interface UsersRepo extends MongoRepository<Users, String> {

//	Optional<Users> findByUserName(String email);

	Users findByUserName(String email);

	@Query(value = "update Users set loggedIn = 1 where email= :email")
	void updateStatus(String email);

	Boolean existsByUserName(String email);

}
