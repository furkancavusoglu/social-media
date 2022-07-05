import React from 'react'
import { CardContent, InputAdornment, OutlinedInput } from '@mui/material'
import { Link } from "react-router-dom"
import Avatar from '@mui/material/Avatar';


const Comment = ({ text, userId, userName }) => {


  return (
    <CardContent sx={{
      display: "flex",
      flexWrap: "wrap",
      justifyContent: "flex-start",
      alignItems: "center",
    }} >
      <OutlinedInput
        disabled
        id='outlined-adornment-amount'
        multiline
        inputProps={{ maxLength: 25 }}
        value={text}
        fullWidth
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
      >
      </OutlinedInput>
    </CardContent>
  )
}

export default Comment