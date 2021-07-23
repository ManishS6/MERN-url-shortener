import React,{useEffect, useContext} from 'react'
import Login from './Login'
import Signup from './Signup'
import '../App.css'
import { useHistory, Link } from 'react-router-dom';
import userContext from './userContext';

export default function Auth() {

    const {userData:{user}} = useContext(userContext)
    const history = useHistory()

    useEffect(() => {
        if(user) 
            history.push('/')    
    }, [user,history])

    return (
        <div className="container">
            {/* <h1>dShrtnr-Auth</h1> */}
            <Login className="container__half1 one" />
            <Signup className="container__half1 two" />
        </div>
    )
}
