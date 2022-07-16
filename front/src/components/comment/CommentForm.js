import React, { useState } from 'react'
import { CardContent, InputAdornment, OutlinedInput } from '@mui/material'
import { Link } from "react-router-dom"
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import axios from 'axios';
import { PostWithAuth, RefreshToken } from '../../services/HttpService';
import { useNavigate } from "react-router-dom"


const CommentForm = ({ userId, userName, postId, setCommentRefresh }) => {
  const [text, setText] = useState("")
  const navigate = useNavigate()
  const logout = () => {
    localStorage.removeItem("tokenKey")
    localStorage.removeItem("currentUser")
    localStorage.removeItem("userName")
    localStorage.removeItem("refreshToken")
    navigate(0)
  }

  const handleSubmit = () => {
    saveComment()
    setText("")
    setCommentRefresh()
  }

  const saveComment = async () => {
    try {
      await PostWithAuth("/comments", { postId: postId, userId: userId, text: text })
    } catch (error) {
      try {
        const response = await RefreshToken()
        localStorage.setItem("tokenKey", response.data.accessToken)
        saveComment()
      } catch (error) {
        console.log("refresh token is not valid");
        logout()
      }
      // if(error.error==="Unauthorized"){}
    }

  }


  return (
    <CardContent sx={{
      display: "flex",
      flexWrap: "wrap",
      justifyContent: "flex-start",
      alignItems: "center",
    }} >
      <OutlinedInput
        id='outlined-adornment-amount'
        multiline
        inputProps={{ maxLength: 250 }}
        fullWidth
        value={text}
        onChange={(e) => setText(e.target.value)}
        startAdornment={
          <InputAdornment position='start'>
            <Link sx={{
              textDecoration: "none",
              boxShadow: "none",
              color: "white",
            }} to={`/users/${userId}`}>
              <Avatar sx={{
                width: "30px",
                height: "30px",
                textDecoration: "none",
                backgroundColor: "steelblue"
              }} aria-label="recipe">
                {userName.charAt(0).toUpperCase()}
              </Avatar>
            </Link>
          </InputAdornment>}
        style={{ color: "black", backgroundColor: "white" }}
        endAdornment={
          <InputAdornment position="end"  >
            <Button
              variant="contained"
              style={{
                background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
                color: 'white'
              }}
              onClick={handleSubmit}
            >Comment</Button>
          </InputAdornment>
        }
      >
      </OutlinedInput>
    </CardContent>
  )
}

export default CommentForm