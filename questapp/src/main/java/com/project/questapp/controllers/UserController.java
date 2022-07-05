package com.project.questapp.controllers;

import com.project.questapp.entities.User;
import com.project.questapp.services.UserService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/users")
public class UserController {

    private UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping
    public List<User> getAllUsers() {
        return userService.getAllUsers();
    }

    @PostMapping
    public User createUser(@RequestBody User user) {
        return userService.saveOneUser(user);
    }

    @GetMapping("/{userId}")
    public User getOneUser(@PathVariable Long userId) {
        return userService.getOneUserById(userId);
    }

    @PutMapping("/{userId}")
    public User updateOneUser(@PathVariable Long userId, @RequestBody User user) {
        return userService.updateOneUser(userId,user);
    }

    @DeleteMapping("/{userId}")
    public void deleteOneUser(@PathVariable Long userId) {
        userService.deleteById(userId);
    }


}
