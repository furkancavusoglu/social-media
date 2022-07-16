package com.project.questapp.responses;

import com.project.questapp.entities.Comment;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CommentResponse {
    Long id;
    Long userId;
    String text;

    String userName;
 
    public CommentResponse(Comment c) {
        this.userName = c.getUser().getUserName();
        this.id = c.getId();
        this.userId = c.getUser().getId();
        this.text = c.getText();
    }
}
