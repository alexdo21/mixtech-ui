import { USER_ENDPOINT, REQUEST, ACCESS_TOKEN, SUCCESS, UNAUTHORIZED } from "."

const getUserInfo = () => {
    return new Promise((resolve, reject) => {
        REQUEST.method = "GET"
        REQUEST.headers["Authorization"] = `Bearer ${localStorage.getItem(ACCESS_TOKEN)}`
        delete REQUEST.body
        fetch(`${USER_ENDPOINT}/info`, REQUEST)
        .then(res => res.json())
        .then(res => {
            if (res.status === SUCCESS) {
                const user = res.user
                resolve(user)
            } else if (res.status === UNAUTHORIZED) {
                reject(UNAUTHORIZED)
            } else {
                reject(res.errorMessage)
            }
        }).catch(err => reject(err))
    })
}

const getUserAccessToken = () => {
    return new Promise((resolve, reject) => {
        REQUEST.method = "GET"
        REQUEST.headers["Authorization"] = `Bearer ${localStorage.getItem(ACCESS_TOKEN)}`
        delete REQUEST.body
        fetch(`${USER_ENDPOINT}/access-token`, REQUEST)
        .then(res => res.json())
        .then(res => {
            if (res.status === SUCCESS) {
                const accessToken = res.accessToken
                resolve(accessToken)
            } else if (res.status === UNAUTHORIZED) {
                reject(UNAUTHORIZED)
            } else {
                reject(res.errorMessage)
            }
        }).catch(err => reject(err))
    })
}

const getRefreshToken = () => {
    return new Promise((resolve, reject) => {
        REQUEST.method = "GET"
        REQUEST.headers["Authorization"] = `Bearer ${localStorage.getItem(ACCESS_TOKEN)}`
        delete REQUEST.body
        fetch(`${USER_ENDPOINT}/refresh-token`, REQUEST)
        .then(res => res.json())
        .then(res => {
            if (res.status === SUCCESS) {
                const accessToken = res.accessToken
                resolve(accessToken)
            } else if (res.status === UNAUTHORIZED) {
                reject(UNAUTHORIZED)
            } else {
                reject(res.errorMessage)
            }
        }).catch(err => reject(err))
    })
}

const startSong = (songId, deviceId) => {
    return new Promise((resolve, reject) => {
        REQUEST.method = "POST"
        REQUEST.headers["Authorization"] = `Bearer ${localStorage.getItem(ACCESS_TOKEN)}`
        fetch(`${USER_ENDPOINT}/player/start/${songId}/${deviceId}`, REQUEST)
        .then(res => res.json())
        .then(res => {
            if (res.status === SUCCESS) {
                resolve()
            } else if (res.status === UNAUTHORIZED) {
                reject(UNAUTHORIZED)
            } else {
                reject(res.errorMessage)
            }
        }).catch(err => reject(err))
    })
}

const resumeSong = (deviceId) => {
    return new Promise((resolve, reject) => {
        REQUEST.method = "POST"
        REQUEST.headers["Authorization"] = `Bearer ${localStorage.getItem(ACCESS_TOKEN)}`
        fetch(`${USER_ENDPOINT}/player/resume/${deviceId}`, REQUEST)
        .then(res => res.json())
        .then(res => res.status === SUCCESS ? resolve() : reject(res.errorMessage))
        .catch(err => reject(err))
    })
}

const pauseSong = (deviceId) => {
    return new Promise((resolve, reject) => {
        REQUEST.method = "POST"
        REQUEST.headers["Authorization"] = `Bearer ${localStorage.getItem(ACCESS_TOKEN)}`
        fetch(`${USER_ENDPOINT}/player/pause/${deviceId}`, REQUEST)
        .then(res => res.json())
        .then(res => {
            if (res.status === SUCCESS) {
                resolve()
            } else if (res.status === UNAUTHORIZED) {
                reject(UNAUTHORIZED)
            } else {
                reject(res.errorMessage)
            }
        }).catch(err => reject(err))
    })
}

export { getUserInfo, getUserAccessToken, getRefreshToken, startSong, resumeSong, pauseSong };