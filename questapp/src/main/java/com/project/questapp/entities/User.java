package com.project.questapp.entities;

import lombok.Data;

import javax.persistence.*;

@Entity
@Table(name = "Users")
@Data
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;

    String username;
    String password;
}
