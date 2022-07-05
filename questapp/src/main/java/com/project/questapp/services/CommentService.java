package com.project.questapp.services;

import com.project.questapp.entities.Comment;
import com.project.questapp.entities.Post;
import com.project.questapp.entities.User;
import com.project.questapp.repos.CommentRepository;
import com.project.questapp.requests.CommentCreateRequest;
import com.project.questapp.requests.CommentUpdateRequest;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CommentService {

    private CommentRepository commentRepository;
    private PostService postService;
    private UserService userService;

    public CommentService(CommentRepository commentRepository, PostService postService, UserService userService) {
        this.commentRepository = commentRepository;
        this.postService = postService;
        this.userService = userService;
    }

    public List<Comment> getAllCommentsWithParam(Optional<Long> userId, Optional<Long> postId) {
        if (userId.isPresent() && postId.isPresent()) {
            return commentRepository.findByUserIdAndPostId(userId.get(), postId.get());
        } else if (userId.isPresent()) {
            return commentRepository.findByUserId(userId.get());
        } else if (postId.isPresent()) {
            return commentRepository.findByPostId(postId.get());
        } else
            return commentRepository.findAll();
    }

    public Comment getOneCommentById(Long commentId) {
        return commentRepository.findById(commentId).orElse(null);
    }

    public Comment postOneComment(CommentCreateRequest request) {
        User user = userService.getOneUserById(request.getUserId());
        Post post = postService.getOnePostById(request.getPostId());
        if (user != null && post != null) {
            Comment comment = new Comment();
            comment.setId(request.getId());
            comment.setPost(post);
            comment.setUser(user);
            comment.setText(request.getText());
            return commentRepository.save(comment);
        } else return null;
    }


    public Comment updateOneCommentById(Long commentId, CommentUpdateRequest request) {
        Optional<Comment> comment = commentRepository.findById(commentId);
        if(comment.isPresent()){
            Comment updateComment = comment.get();
            updateComment.setText(request.getText());
            return commentRepository.save(updateComment);
        }else return null;
    }

    public void deleteOneCommentById(Long commentId) {
        commentRepository.deleteById(commentId);
    }
}
