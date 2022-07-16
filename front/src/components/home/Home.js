import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Post from '../post/Post'
import PostForm from '../post/PostForm'
import "./Home.scss"


function Home() {
  const [error, setError] = useState(null)
  const [isLoaded, setIsLoaded] = useState(false)
  const [postList, setPostList] = useState([])

  const fetchData = async () => {
    try {
      const response = await axios("/posts")
      setPostList(response.data)
      setIsLoaded(true)
    } catch (error) {
      setIsLoaded(true)
      setError(error)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  if (error) {
    return <div> Error !!!</div>;
  } else if (!isLoaded) {
    return <div> Loading... </div>;
  } else {
    return (
      <div className="container">
        {localStorage.getItem("currentUser") == null ? "" :
          <PostForm userId={localStorage.getItem("currentUser")} userName={localStorage.getItem("userName")} />}
        {postList.map(post => (
          <Post likes={post.postLikes} postId={post.id} userId={post.userId} userName={post.userName}
            title={post.title} text={post.text}></Post>
        ))}
      </div>
    );
  }
}

  export default Home