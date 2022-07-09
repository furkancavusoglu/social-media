import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import FavoriteIcon from '@mui/icons-material/Favorite';
import CommentIcon from '@mui/icons-material/Comment';
import { Link } from "react-router-dom"
import React, { useState, useEffect, useRef } from 'react'
import axios from 'axios';
import { Container } from '@mui/material';
import Comment from '../comment/Comment';
import CommentForm from '../comment/CommentForm';

const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
})(({ theme, expand }) => ({
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
    }),
}));

function Post({ title, text, userName, userId, postId, likes }) {
    const [expanded, setExpanded] = useState(false)
    const [liked, setLiked] = useState(false)
    const [error, setError] = useState()
    const [isLoaded, setIsLoaded] = useState(false)
    const [commentList, setCommentList] = useState([])
    const [likeCount, setLikeCount] = useState(likes.length)
    const isInitialMount = useRef(true)
    const [likeId, setLikeId] = useState();

    let disabled = localStorage.getItem("currentUser") === null ? true : false

    const handleExpandClick = () => {
        setExpanded(!expanded)
        refreshComments()
    };
    const handleLike = () => {
        setLiked(!liked)
        if (!liked) {
            saveLike()
            setLikeCount(likeCount + 1)
        } else {
            deleteLike()
            setLikeCount(likeCount - 1)
        }
    }
    const checkLikes = () => {
        let likeControl = likes.find(like => ""+like.userId === localStorage.getItem("currentUser"))
        if (likeControl != null) {
            setLikeId(likeControl.id)
            setLiked(likeControl)
        }
    }

    const saveLike = () => {
        axios.post("/likes",
            { postId: postId, userId: localStorage.getItem("currentUser") }, {
            headers:
                { 'Authorization': localStorage.getItem("tokenKey") }
        })
    }
    const deleteLike = () => {
        axios.delete(`/likes/${likeId}`, {
            headers:
                { 'Authorization': localStorage.getItem("tokenKey") }
        })
    }

    const refreshComments = async () => {
        try {
            const response = await axios(`/comments?postId=${postId}`)
            setCommentList(response.data)
            setIsLoaded(true)
        } catch (error) {
            setIsLoaded(true)
            setError(error)
        }
    }

    useEffect(() => {
        if (isInitialMount.current) {
            isInitialMount.current = false;
        } else {
            refreshComments()
        }
    }, [commentList])



    useEffect(() => {
        checkLikes()
    }, [])


    return (
        <Card sx={{ maxWidth: 800, margin: "20px", width: "600px", textAlign: "left", }}>
            <CardHeader
                avatar={
                    <Link className='link' to={`/users/${userId}`}>
                        <Avatar sx={{ bgcolor: "steelblue" }} aria-label="recipe">
                            {userName.charAt(0).toUpperCase()}
                        </Avatar>
                    </Link>}
                title={title} />
            <CardContent>
                <Typography variant="body2" color="text.secondary">
                    {text}
                </Typography>
            </CardContent>
            <CardActions disableSpacing>
                <IconButton disabled={disabled} onClick={handleLike} aria-label="add to favorites">
                    <FavoriteIcon style={liked ? { color: "red" } : null} />
                </IconButton>
                {likeCount}
                <ExpandMore
                    expand={expanded}
                    onClick={handleExpandClick}
                    aria-expanded={expanded}
                    aria-label="show more">
                    <CommentIcon />
                </ExpandMore>
            </CardActions>
            <Collapse in={expanded} timeout="auto" unmountOnExit>
                <Container fixed sx={{}} >
                    {error ? "error" :
                        isLoaded ? commentList.map(comment => (
                            <Comment userId={1} userName={"USER"} text={comment.text}></Comment>
                        )) : "Loading"}
                    {disabled ? "" :
                        <CommentForm userId={userId} userName={userName} postId={postId} ></CommentForm>}
                </Container>
            </Collapse>
        </Card >
    )
}

export default Post