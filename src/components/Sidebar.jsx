import React, { useState, useEffect } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import '../css/style.css'

const Sidebar = ({userData, socketRef, sidebar, toggler}) => {
    const getWindowDimensions = () => {
        const { innerWidth, innerHeight } = window
        return { innerWidth, innerHeight }
    }
    const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions())
    useEffect(() => {
        window.addEventListener('resize', () => {
            setWindowDimensions(getWindowDimensions)
        })
        return () => {window.removeEventListener('resize', () => {
            setWindowDimensions(getWindowDimensions)
        })}
    }, [])
    useEffect(() => {
        if (windowDimensions.innerWidth > 700) {
            toggler()
        }
    })
    if (windowDimensions.innerWidth > 700) {
        return (
            <React.Fragment>
                <div className="sidebar">
                    <div className="titlebar">
                        <div className="h3 text-center mb-2">Zenix Chat</div>
                        <div className="p text-center mt-2">Zenix&reg; Chat is a chat application made with SocketIO and ReactJS. It provides clients with realtime and fast chat/messaging services.</div>
                    </div>
                    <div className="connected-titlebar">
                        Online Users
                    </div>
                    <div className="connected-users">
                        {
                            userData ?
                                userData.map((value, index) => {
                                    return (
                                        <div className="user" key={value.user_id}>
                                            <div className="username-section">
                                                <div className="online-user">{value.username}</div><div className="online-indicator"></div>
                                            </div>
                                            <div className="user-id-section">
                                                <small className="text-muted">{value.user_id}</small>
                                            </div>
                                        </div>
                                    )
                                })
                            : <div className="no-user my-5">No Users Connected!</div>
                        }
                    </div>
                    <div className="id-box">
                        <div className="id-main text-center">
                            <samp>You are connected with id : {socketRef.current.id}</samp>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }
    else if (windowDimensions.innerWidth <= 700 && sidebar) {
        return (
            <React.Fragment>
                <div className="sidebar-toggled">
                    <div className="titlebar">
                        <div className="h3 text-center mb-2">Zenix Chat</div>
                        <div className="p text-center mt-2">Zenix&reg; Chat is a chat application made with SocketIO and ReactJS. It provides clients with realtime and fast chat/messaging services.</div>
                    </div>
                    <div className="connected-titlebar">
                        Online Users
                    </div>
                    <div className="connected-users">
                        {
                            userData ?
                                userData.map((value, index) => {
                                    return (
                                        <div className="user" key={value.user_id}>
                                            <div className="username-section">
                                                <div className="online-user">{value.username}</div><div className="online-indicator"></div>
                                            </div>
                                            <div className="user-id-section">
                                                <small className="text-muted">{value.user_id}</small>
                                            </div>
                                        </div>
                                    )
                                })
                            : <div className="no-user my-5">No Users Connected!</div>
                        }
                    </div>
                    <div className="id-box">
                        <div className="id-main text-center">
                            <samp>You are connected with id : {socketRef.current.id}</samp>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }
    else {
        return null
    }

}

export default Sidebar