import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from "react-router-dom";
import Avatar from '../avatar/Avatar';
import UserActivity from '../useractivity/UserActivity';

function User() {
    const { userId } = useParams()
    const [user, setUser] = useState();

    const getUser = async () => {
        try {
            const response = await axios.get(`/users/${userId}`, {
                headers: {
                    "Authorization": localStorage.getItem("tokenKey")
                }
            })
            setUser(response.data)
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        getUser()
    }, [])

    return (
        <div style={{ display: "flex" }} >
            {user ? <Avatar avatarId={user.avatarId} /> : ""}
            <UserActivity userId={userId} />
        </div>
    )
}

export default User