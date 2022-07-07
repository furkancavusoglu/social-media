package com.project.questapp.controllers;

import com.project.questapp.entities.User;
import com.project.questapp.requests.UserRequest;
import com.project.questapp.security.JwtTokenProvider;
import com.project.questapp.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/auth")
public class AuthController {

    private JwtTokenProvider jwtTokenProvider;

    private AuthenticationManager authenticationManager;

    private UserService userService;

    private PasswordEncoder passwordEncoder;

    public AuthController(JwtTokenProvider jwtTokenProvider,
                          AuthenticationManager authenticationManager,
                          UserService userService,
                          PasswordEncoder passwordEncoder) {
        this.jwtTokenProvider = jwtTokenProvider;
        this.authenticationManager = authenticationManager;
        this.userService = userService;
        this.passwordEncoder = passwordEncoder;
    }

    @PostMapping("/login")
    public String login(@RequestBody UserRequest request) {
        UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(request.getUserName(), request.getPassword());
        Authentication auth = authenticationManager.authenticate(authToken);
        SecurityContextHolder.getContext().setAuthentication(auth);
        return "Bearer " + jwtTokenProvider.generateJwtToken(auth);
    }

    @PostMapping("/register")
    public ResponseEntity<String> register(@RequestBody UserRequest request) {
        if (userService.getOneUserByUserName(request.getUserName()) != null) {
            return new ResponseEntity<>("Username already in use", HttpStatus.BAD_REQUEST);
        }
        System.out.println(request.getPassword()+" :"+request.getUserName());
        User user = new User();
        user.setUserName(request.getUserName());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        userService.saveOneUser(user);
        return new ResponseEntity<>("User successfully registered", HttpStatus.CREATED);
    }
}
