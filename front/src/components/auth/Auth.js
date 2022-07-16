import { FormControl, Input, InputLabel, Button, FormHelperText } from '@mui/material'
import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";
import { PostWithAuth } from '../../services/HttpService';

const Auth = () => {
    const [userName, setUserName] = useState()
    const [password, setPassword] = useState()
    let navigate = useNavigate();

    const handleButton = (path) => {
        sendRequest(path)
        setUserName("")
        setPassword("")
        navigate("/auth")
    }


    const sendRequest = async (path) => {
        const response = await PostWithAuth(`/auth/${path}`, { userName, password })
        console.log(response.data);
        localStorage.setItem("currentUser", response.data.userId)
        localStorage.setItem("tokenKey", response.data.message)
        localStorage.setItem("userName", userName)
    }

    return (
        <FormControl style={{ marginTop: 20 }} >
            <InputLabel>Username</InputLabel>
            <Input onChange={(e) => setUserName(e.target.value)} value={userName} />
            <InputLabel style={{ top: 80 }} >Password</InputLabel>
            <Input onChange={(e) => setPassword(e.target.value)} style={{ top: 40 }} value={password} />
            <Button
                variant='contained'
                style={{ marginTop: 60, background: "steelblue", color: "white" }}
                onClick={() => handleButton("register")}
            >Register</Button>
            <FormHelperText style={{ margin: 20 }} >Are you already registered?</FormHelperText>
            <Button
                variant='contained'
                style={{ marginTop: 20, background: "steelblue", color: "white" }}
                onClick={() => handleButton("login")}
            >Login</Button>
        </FormControl>
    )
}

export default Auth