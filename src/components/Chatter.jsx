import React, { useState, useEffect, useRef } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faExpandAlt } from '@fortawesome/free-solid-svg-icons'
import { io } from 'socket.io-client'
import Loader from './Loading'
import RenderMsg from './Message'
import Sidebar from './Sidebar'
import 'bootstrap/dist/css/bootstrap.min.css'
import '../css/style.css'

const RenderChat = (props) => {
    const socketRef = useRef()
    const [conn, connected] = useState(false)
    const [data, setData] = useState(null)
    const [userData, setUserData] = useState(null)
    const [sidebarIsToggled, sidebarToggle] = useState(false)
    const msgInput = useRef(null)
    const dummyDivRef = useRef(null)
    useEffect(() => {
        socketRef.current = io('https://vast-waters-60826.herokuapp.com')
        socketRef.current.on('connect', () => {
            connected(true)
            socketRef.current.emit('userJoined', props.user, socketRef.current.id)
        })
        socketRef.current.on('userList', userMainData => {
            setUserData(userMainData)
        })
        socketRef.current.on('initialData', iniData => {
            setData(iniData)
        })
        socketRef.current.on('msgRecv', data => {
            setData(data)
        })
    }, [props.user])
    const sendMsg = (e) => {
        e.preventDefault()
        socketRef.current.emit('msgSend', e.target.msg.value, props.user)
        msgInput.current.value = ''
        setTimeout(() => {
            dummyDivRef.current.scrollIntoView({behavior: 'smooth'})
        }, 1000)
    }
    const sidebarToggler = () => {
        if (sidebarIsToggled) {
            sidebarToggle(false)
        }
        else {
            sidebarToggle(true)
        }
    }
    const internalSidebarToggler = () => {
        sidebarToggle(false)
    }
    if (!conn) {
        return (
            <Loader />
        )
    }
    else {
        return (
            <React.Fragment>
                <div className="main-container">
                    <button className="sidebar-toggler" style={sidebarIsToggled ? {backgroundColor: `limegreen`, color: `black`} : {backgroundColor: `transparent`}} onClick={sidebarToggler}>
                        <FontAwesomeIcon icon={faExpandAlt} />
                    </button>
                    <Sidebar userData={userData} socketRef={socketRef} sidebar={sidebarIsToggled} toggler={internalSidebarToggler} />
                    <div className="chatbox" style={sidebarIsToggled ? {display: `none`} : {display: `flex`}}>
                        <div className="chat-view">
                            <div className="id-container">
                                <code>Welcome, {props.user}!</code>
                            </div>
                            {
                                !data ?
                                    <h5 className="text-center my-5">Loading Messages ...</h5>
                                : data.length > 0 ? 
                                    data.map((value, index) => {
                                        return (
                                            <RenderMsg key={value._id} author={value.author} msg={value.message} user={props.user} />
                                        )
                                    })
                                : data.length === 0 ?
                                    <h5 className="text-center my-5">No Messages yet, Be the first one to chat!</h5>
                                : null
                            }
                            <div className="dummy" ref={dummyDivRef}></div>
                        </div>
                        <div className="chat-inputs">
                            <form action="." onSubmit={sendMsg}>
                                <input type="text" className="form-control" name="msg" id="floatingInput" placeholder="Start chatting" ref={msgInput} required />
                                <button type="submit">Send</button>
                            </form> 
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

export default RenderChat
