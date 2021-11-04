import React, { useRef } from 'react'
import rndC from 'randomcolor'
import 'bootstrap/dist/css/bootstrap.min.css'
import '../css/style.css'

const UsernameSelection = (props) => {
    const color = useRef(rndC())
    return (
        <React.Fragment>
            <div className="username" style={{backgroundColor: `${color.current}`}}>
                <div className="username-main">
                    <form action="." onSubmit={props.submit}>
                        <div className="input-fields">
                            <h3>Username Selection</h3>
                            <p>Before proceeding into the chat application, you must provide a username to identify the message senders and receivers. Everytime you refresh the chat page, you will have to provide a new username, so we don't recommend refreshing the page for no reason. Don't put sensitive information as your username.</p>
                            <input type="text" className="form-control" name="username" id="floatingInput" placeholder="Username" required />
                            <button type="submit" className="username-submit">Submit</button>
                        </div>
                    </form>
                </div>
            </div>
        </React.Fragment>
    )
}

export default UsernameSelection