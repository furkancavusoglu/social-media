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
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CommentIcon from '@mui/icons-material/Comment';
import { Link } from "react-router-dom"
import React, { useState, useEffect, useRef } from 'react'
import axios from 'axios';

const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
})(({ theme, expand }) => ({
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
    }),
}));

function Post({ title, text, userName, userId, postId }) {
    const [expanded, setExpanded] = useState(false)
    const [liked, setLiked] = useState(false)
    const [error, setError] = useState()
    const [isLoaded, setIsLoaded] = useState(false)
    const [commentList, setCommentList] = useState([])
    const isInitialMount = useRef(true)

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };
    const handleLike = () => {
        setLiked(!liked)
    }
    const fetchData = async () => {
        try {
            const response = await axios(`/comments?postId=${postId}`)
            setCommentList(response.data)
            setIsLoaded(true)
        } catch (error) {
            setIsLoaded(true)
            setError(error)
        }
    }

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
                <IconButton onClick={handleLike} aria-label="add to favorites">
                    <FavoriteIcon style={liked ? { color: "red" } : null} />
                </IconButton>
                <ExpandMore
                    expand={expanded}
                    onClick={handleExpandClick}
                    aria-expanded={expanded}
                    aria-label="show more">
                    <CommentIcon />
                </ExpandMore>
            </CardActions>
            <Collapse in={expanded} timeout="auto" unmountOnExit>
                <CardContent>
                </CardContent>
            </Collapse>
        </Card>
    )
}

export default Post