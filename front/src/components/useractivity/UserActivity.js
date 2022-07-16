import React, { useEffect, useState } from 'react'
import {
    Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Dialog, AppBar, Toolbar,
    IconButton, Typography, Slide, Button
} from "@mui/material"
import CloseIcon from '@mui/icons-material/Close';
import Post from "../post/Post"
import axios from "axios"
import { GetWithAuth } from '../../services/HttpService';

function PopUp({ isOpen, postId, setIsOpen }) {
    const [open, setOpen] = useState(false);
    const [post, setPost] = useState(null)

    const Transition = React.forwardRef(function Transition(props, ref) {
        return <Slide direction="up" ref={ref} {...props} />;
    });

    const getPost = async () => {
        try {
            const response = await GetWithAuth(`/posts/${postId}`)
            console.log(response.data);
            setPost(response.data)
        } catch (error) {
            console.log(error);
        }
    }

    const handleClose = () => {
        setOpen(false)
        setIsOpen(false)
    };

    useEffect(() => {
        setOpen(isOpen)
    }, [isOpen])

    useEffect(() => {
        getPost()
    }, [postId])

    return (<Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
        <AppBar sx={{ position: 'relative' }}>
            <Toolbar>
                <IconButton
                    edge="start"
                    color="inherit"
                    onClick={handleClose}
                    aria-label="close">
                    <CloseIcon />
                </IconButton>
                <Button autoFocus color="inherit" onClick={handleClose}>
                    Close
                </Button>
            </Toolbar>
        </AppBar>
        {post ? <Post likes={post.postLikes} postId={post.id} userId={post.userId} userName={post.userName}
            title={post.title} text={post.text} ></Post> : "loading"}
    </Dialog>)
}

const UserActivity = ({ userId }) => {
    const [error, setError] = useState(null)
    const [isLoaded, setIsLoaded] = useState(false)
    const [rows, setRows] = useState([])
    const [isOpen, setIsOpen] = useState(false)
    const [selectedPost, setSelectedPost] = useState(null)

    useEffect(() => {
        getActivity()
    }, [])

    const handleNotification = (postId) => {
        setSelectedPost(postId)
        setIsOpen(true)
    }

    const getActivity = async () => {
        try {
            const response = await GetWithAuth(`/users/activity/${userId}`)
            setIsLoaded(true)
            if (response.data !== "") {
                setRows(response.data)
            }
        } catch (error) {
            console.log(error);
            setIsLoaded(true)
            setError(error)
        }
    }

    return (
        <> {isOpen ? <PopUp isOpen={isOpen} postId={selectedPost} setIsOpen={setIsOpen} /> : ""}
            <Paper sx={{ width: '100%' }}>
                <TableContainer sx={{ maxHeight: 440 }}>
                    <Table stickyHeader aria-label="sticky table">
                        <TableHead>
                            <TableRow>
                                <TableCell align="center" colSpan={2}>
                                    User Activity
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows.map((row) => {
                                return (
                                    <Button onClick={() => handleNotification(row[1])} >
                                        <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                                            {row[3] + " " + row[0] + " your post"}
                                        </TableRow>
                                    </Button>
                                );
                            })}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>
        </>
    )
}

export default UserActivity