import React, { useState } from 'react'
import UsernameSelection from './Username'
import Chat from './Chatter'
import 'bootstrap/dist/css/bootstrap.min.css'

const App = (props) => {
    const [username, setUsername] = useState(null)
    const usernameHandler = (e) => {
        e.preventDefault()
        setUsername(e.target.username.value)
    }
    if (!username) {
        return (
            <UsernameSelection submit={usernameHandler} />
        )
    }
    else {
        return (
            <Chat user={username} />
        )
    }
}

export default App