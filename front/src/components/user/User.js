import React from 'react'
import { useLocation, useParams } from "react-router-dom";

function User() {
    const { userId } = useParams()

    return (
        <div>User {userId}</div>
    )
}

export default User