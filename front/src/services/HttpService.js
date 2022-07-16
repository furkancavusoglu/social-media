import axios from "axios"

export const PostWithAuth = async (url, body) => {
    const request = await axios.post(url, body, {
        headers: {
            "Authorization": localStorage.getItem("tokenKey")
        }
    })
    console.log(request);
    return request
}

export const PostWithoutAuth = async (url, body) => {
    const request = await axios.post(url, body)
    return request
}

export const PutWithAuth = async (url, body) => {
    const request = await axios.put(url, body, {
        headers: {
            "Authorization": localStorage.getItem("tokenKey"),
        }
    })
    return request
}

export const GetWithAuth = async (url) => {
    const request = await axios.get(url, {
        headers: {
            "Authorization": localStorage.getItem("tokenKey")
        }
    })
    return request
}

export const DeleteWithAuth = async (url) => {
    const request = await axios.delete(url, {
        headers: {
            "Authorization": localStorage.getItem("tokenKey")
        }
    })
    return request
}

export const RefreshToken = () => {

    var request = fetch("/auth/refresh", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            userId: localStorage.getItem("currentUser"),
            refreshToken: localStorage.getItem("refreshKey"),
        }),
    })
    return request
}