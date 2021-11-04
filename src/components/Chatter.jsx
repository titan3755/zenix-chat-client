import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import '../css/style.css'

const RenderMsg = (props) => {
    if (props.user === props.author) {
        return (
            <React.Fragment>
                <div className="message">
                        <div className="bubble bg-primary text-white">{props.msg}</div>
                    <small className="text-end mt-4">{props.author} [You]</small>
                </div>
            </React.Fragment>
        )
    }
    else {
        return (
            <React.Fragment>
                <div className="message">
                        <div className="bubble-2 text-black">{props.msg}</div>
                    <small className="text-start ms-2 mt-4">{props.author}</small>
                </div>
            </React.Fragment>
        )
    }
}

const RenderChat = (props) => {
    return (
        <React.Fragment>
            <div className="main-container">
                <div className="chatbox">
                    <div className="chat-view">
                        <div className="id-container">
                            <code>Welcome, {props.user}! ID: <samp>{props.socket.id}</samp></code>
                        </div>
                        {
                            props.data 
                            ? 
                            props.data.map((value, index) => {
                                return (
                                    <RenderMsg key={value._id} author={value.author} msg={value.message} user={props.user} />
                                )
                            })
                            :
                            <h5 className="text-center">No messages yet, be the first one!</h5>
                        }
                    </div>
                    <div className="chat-inputs">
                        <form action="." onSubmit={props.sender}>
                            <input type="text" className="form-control" name="msg" id="floatingInput" placeholder="Message" ref={props.inputRef} required />
                            <button type="submit">Send</button>
                        </form> 
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}

export default RenderChat
