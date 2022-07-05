import React from 'react'
import { useLocation, useParams } from "react-router-dom";

function User() {
    const { userId } = useParams()
   // const param = useLocation()
   // const id = param.state.id

    return (
        <div>User {userId}</div>
    )
}

export default User