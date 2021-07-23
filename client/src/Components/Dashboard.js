import React,{useEffect, useContext} from 'react'
import { useHistory, Link } from 'react-router-dom';
import userContext from './userContext';

export default function Dashboard() {

    const {userData:{user}} = useContext(userContext)
    const history = useHistory()

    useEffect(() => {
        if(!user) 
            history.push('/auth')    
    }, [user,history])

    return (
        <div>
            <h1>dShrtnr-Dashboard</h1>
            {user? (
                <h1>Welcome {user} </h1>
            ) : (
                <div>
                    <h1>You are not logged in</h1>
                    <Link to="/auth">Login</Link>
                </div>
            )}
        </div>
    )
}
