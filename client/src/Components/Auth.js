import React from 'react'
import Login from './Login'
import Signup from './Signup'
import '../App.css'
export default function Auth() {
    return (
        <div className="container">
            {/* <h1>dShrtnr-Auth</h1> */}
            <Login className="container__half1 one" />
            <Signup className="container__half1 two" />
        </div>
    )
}
