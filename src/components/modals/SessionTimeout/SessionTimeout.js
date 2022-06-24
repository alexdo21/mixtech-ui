import React from 'react';
import Modal from "react-responsive-modal"
import { useIdleTimer } from 'react-idle-timer';
import { getTokenExpiryTime, getRefreshToken, ACCESS_TOKEN } from "../../../services"
import { LOGOUT } from "../../../reducers/types"
import { useDispatch } from "react-redux";

function SessionTimeout() {
    const ONE_SECOND = 1000
    const ONE_MINUTE = ONE_SECOND * 60
    const FIVE_MINUTES = ONE_MINUTE * 5

    const [expiryTime, setExpiryTime] = React.useState(getTokenExpiryTime())
    const [timeElapsed, setTimeElapsed] = React.useState(0)
    const [timeRemaining, setTimeRemaining] = React.useState(0)
    const [isSessionTimeoutModalOpen, setIsSessionTimeoutModalOpen] = React.useState(false)
    const dispatch = useDispatch()

    const handleOnIdle = () => {
        console.log("idle")
    }

    const handleStayLoggedIn = React.useCallback(() => {
        getRefreshToken()
        .then(accessToken => {
            localStorage.setItem(ACCESS_TOKEN, accessToken)
            setExpiryTime(getTokenExpiryTime())
            if (isSessionTimeoutModalOpen) {
                setIsSessionTimeoutModalOpen(false)
            }
        }).catch(err => console.log(err))
    }, [isSessionTimeoutModalOpen])

    const handleLogout = React.useCallback(() => {
        dispatch({ type: LOGOUT })
    }, [dispatch])

    const {isIdle} = useIdleTimer({
        onIdle: handleOnIdle,
        timeout: FIVE_MINUTES
    })

    React.useEffect(() => {
        const interval = setInterval(() => {
            setTimeElapsed(timeElapsed + 1)
            console.log(timeElapsed)
            const now = new Date()
            const tokenRemainingTime = expiryTime - now.getTime()
            if (tokenRemainingTime <= FIVE_MINUTES) {
                setTimeRemaining(FIVE_MINUTES)
                if (!isIdle()) {
                    if (!isSessionTimeoutModalOpen) {
                        handleStayLoggedIn()
                    } else {
                        setTimeRemaining(timeRemaining - ONE_SECOND)
                        if (tokenRemainingTime <= 0) {
                            handleLogout()
                        }
                    }
                } else {
                    if (!isSessionTimeoutModalOpen) {
                        setIsSessionTimeoutModalOpen(true)
                    } else {
                        setTimeRemaining(timeRemaining - ONE_SECOND)
                        if (tokenRemainingTime <= 0) {
                            handleLogout()
                        }
                    }
                }
            }
        }, ONE_SECOND)
        return () => clearInterval(interval)
    }, [FIVE_MINUTES, expiryTime, handleLogout, handleStayLoggedIn, isIdle, isSessionTimeoutModalOpen, timeElapsed, timeRemaining])

    return (
        <Modal open={isSessionTimeoutModalOpen} onClose={() => setIsSessionTimeoutModalOpen(false)} closeOnOverlayClick={false} closeOnEsc={false} showCloseIcon={false}>
            <div className="modal-header">
                <h4>Session is about to expire. Stay logged in?</h4>
            </div>
            <div className="modal-footer">
                { timeRemaining <= ONE_MINUTE ? <p>Logging out in {Math.ceil(timeRemaining / 1000)}</p> : null}
                <button type="button" className="btn btn-secondary" onClick={handleStayLoggedIn}>Stay logged in</button>
                <button type="button" className="btn btn-danger" onClick={handleLogout}>Log out</button>
            </div>
        </Modal>
    );
}

export { SessionTimeout };