import React, { useState, useEffect, useRef } from 'react'
import { io } from 'socket.io-client'
import Loader from './Loading'
import UsernameSelection from './Username'
import Chat from './Chatter'
import 'bootstrap/dist/css/bootstrap.min.css'

const socket = io('https://vast-waters-60826.herokuapp.com')
const App = (props) => {
    const [conn, connected] = useState(false)
    const [data, setData] = useState([])
    const [username, setUsername] = useState(null)
    const msgInput = useRef(null)
    useEffect(() => {
        socket.on('connect', () => {
            connected(true)
        })
        socket.on('initialData', iniData => {
            setData(iniData)
        })
        socket.on('msgRecv', data => {
            setData(data)
        })
    }, [])
    const usernameHandler = (e) => {
        e.preventDefault()
        setUsername(e.target.username.value)
    }
    const sendMsg = (e) => {
        e.preventDefault()
        socket.emit('msgSend', e.target.msg.value, username)
        msgInput.current.value = ''
    }
    if (username) {
        if (conn) {
            return (
                <React.Fragment>
                    <Chat data={data} sender={sendMsg} user={username} socket={socket} inputRef={msgInput} />
                </React.Fragment>
            )
        }
        else {
            return (
                <React.Fragment>
                    <Loader />
                </React.Fragment>
            )
        }
    }
    else {
        return (
            <React.Fragment>
                <UsernameSelection submit={usernameHandler} />
            </React.Fragment>
        )
    }
}

export default App