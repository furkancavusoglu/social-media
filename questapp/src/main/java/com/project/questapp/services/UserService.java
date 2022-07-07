package com.project.questapp.services;

import com.project.questapp.entities.User;
import com.project.questapp.repos.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {

    UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }


    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    public User saveOneUser(User user) {
        return userRepository.save(user);
    }

    public User getOneUserById(Long userId) {
        return userRepository.findById(userId).orElse(null);
    }

    public User updateOneUser(Long userId, User user) {
        Optional<User> userD = userRepository.findById(userId);
        if (userD.isPresent()) {
            User foundUser = userD.get();
            foundUser.setPassword(user.getPassword());
            foundUser.setUserName(user.getUserName());
            userRepository.save(foundUser);
            return foundUser;
        } else
            return null;
    }

    public void deleteById(Long userId) {
        userRepository.deleteById(userId);
    }

    public User getOneUserByUserName(String userName) {
        return userRepository.findByUserName(userName);
    }
}
