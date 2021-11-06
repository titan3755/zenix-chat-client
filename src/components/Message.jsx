import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import '../css/style.css'

const RenderMsg = (props) => {
    if (props.user === props.author) {
        return (
            <React.Fragment>
                <div className="message d-flex flex-column justify-content-center align-items-end">
                    <div className="bubble bg-primary text-white mb-2">{props.msg}</div>
                    <small className="text-end me-1">{props.author} [You]</small>
                </div>
            </React.Fragment>
        )
    }
    else {
        return (
            <React.Fragment>
                <div className="message d-flex flex-column justify-content-center align-items-start">
                        <div className="bubble-2 text-black mb-2">{props.msg}</div>
                        <small className="text-start ms-1">{props.author}</small>
                </div>
            </React.Fragment>
        )
    }
}

export default RenderMsg