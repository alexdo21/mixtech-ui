import { USER_ENDPOINT, REQUEST, ACCESS_TOKEN } from "."

const logout = () => {
    localStorage.removeItem(ACCESS_TOKEN)
}

const getUserInfo = () => {
    return new Promise((resolve, reject) => {
        REQUEST.method = "GET"
        REQUEST.headers["Authorization"] = `Bearer ${localStorage.getItem(ACCESS_TOKEN)}`
        delete REQUEST.body
        fetch(`${USER_ENDPOINT}/info`, REQUEST)
        .then(res => res.json())
        .then(res => {
            if (res.status === "Success") {
                const user = res.user
                resolve(user)
            } else {
                reject(res.errorMessage)
            }
        }).catch(err => reject(err))
    })
}

export { logout, getUserInfo };