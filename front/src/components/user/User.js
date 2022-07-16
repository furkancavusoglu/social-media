import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from "react-router-dom";
import { GetWithAuth } from '../../services/HttpService';
import Avatar from '../avatar/Avatar';
import UserActivity from '../useractivity/UserActivity';

function User() {
    const { userId } = useParams()
    const [user, setUser] = useState();

    const getUser = async () => {
        const response = await GetWithAuth(`/users/${userId}`)
        setUser(response.data)
    }
    useEffect(() => {
        getUser()
    }, [])

    return (
        <div style={{ display: "flex" }} >
            {user ? <Avatar avatarId={user.avatarId} userId={userId} userName={user.userName} /> : ""}
            {localStorage.getItem("currentUser") === userId ? <UserActivity userId={userId} /> : null}
        </div>
    )
}

export default User