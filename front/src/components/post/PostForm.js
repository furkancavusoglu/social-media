import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { InputAdornment, OutlinedInput } from '@mui/material';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { Link } from "react-router-dom"
import axios from 'axios'
import React, { useState, useEffect } from 'react'

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function PostForm({ userName, userId, fetchData }) {
    const [text, setText] = useState("")
    const [title, setTitle] = useState("")
    const [isSent, setIsSent] = useState(false)

    const handleSubmit = () => {
        try {
            axios.post("/posts", { title: title, userId: userId, text: text }, {
                headers:
                    { 'Authorization': localStorage.getItem("tokenKey") }
            })
            setIsSent(true)
            setText("")
            setTitle("")
        } catch (error) {
            console.log(error);
        }
    }
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setIsSent(false);
    };

    return (
        <>
            <Snackbar open={isSent} autoHideDuration={2000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                    Post Saved!
                </Alert>
            </Snackbar>
            <Card sx={{ maxWidth: 800, margin: "20px", width: "600px", textAlign: "left" }}>
                <CardHeader
                    avatar={
                        <Link to={{ pathname: '/users/' + userId }} style={{ textDecoration: "none" }} >
                            <Avatar aria-label="recipe" style={{ backgroundColor: "steelblue" }} >
                                {userName.charAt(0).toUpperCase()}
                            </Avatar>
                        </Link>
                    }
                    title={<OutlinedInput
                        id="outlined-adornment-amount"
                        multiline
                        placeholder="Title"
                        inputProps={{ maxLength: 25 }}
                        fullWidth
                        value={title}
                        onChange={(i) => setTitle(i.target.value)}
                    >
                    </OutlinedInput>} />
                <CardContent>
                    <Typography variant="body2" color="textSecondary" component="p">
                        <OutlinedInput
                            id="outlined-adornment-amount"
                            multiline
                            placeholder="Text"
                            inputProps={{ maxLength: 250 }}
                            fullWidth
                            value={text}
                            onChange={(i) => setText(i.target.value)}
                            endAdornment={
                                <InputAdornment position="end">
                                    <Button
                                        variant="contained"
                                        style={{
                                            background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
                                            color: 'white'
                                        }}
                                        onClick={handleSubmit}
                                    >Post</Button>
                                </InputAdornment>
                            }
                        >
                        </OutlinedInput>
                    </Typography>
                </CardContent>
            </Card>
        </>

    )
}

export default PostForm