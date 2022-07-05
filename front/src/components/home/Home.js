import { Container } from '@mui/material'
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
  }, [postList])
  return (
    <div className='container'>
      {error ? <h1>Error!</h1>
        : !isLoaded ? <h1>Loading</h1>
          : <>
            <PostForm fetchData={fetchData} userId={1} userName={"furkan"} />
            {postList.map((post, index) => {
              return <Post postId={post.id}
                userId={post.userId}
                userName={post.userName}
                key={index}
                title={post.title}
                text={post.text} />
            })}
          </>
      }
    </div>
  )
}

export default Home