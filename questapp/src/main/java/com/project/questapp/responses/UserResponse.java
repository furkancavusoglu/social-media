package com.project.questapp.responses;

import com.project.questapp.entities.User;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserResponse {
    Long id;
    int avatarId;
    String username;

    public UserResponse(User user){
        this.id = user.getId();
        this.avatarId = user.getAvatar();
        this.username = user.getUserName();
    }

}
