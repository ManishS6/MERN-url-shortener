import axios from 'axios';
import React,{useRef,useState,useContext} from 'react'
import {Card,Form,Button,Alert} from 'react-bootstrap'
import {useHistory} from 'react-router-dom'
import UserContext from './userContext';

export default function Signup() {
    const usernameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();
    const passwordConfirmRef = useRef();
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const {setUserData} = useContext(UserContext)
    const history = useHistory()

    async function handleSubmit(e){
        e.preventDefault()
        if(passwordRef.current.value !== passwordConfirmRef.current.value){
            return setError('Passwords do not match')
        }
        try{
            setError('')
            setLoading(true)
            const signupUser = {
                username: usernameRef.current.value,
                password: passwordRef.current.value,
                email: emailRef.current.value
            }
            const signupRes = await axios.post('http://localhost:5000/auth/signup',signupUser)
            console.log(signupRes)
            setUserData({
                user: signupRes.data.username,
                token: signupRes.data.accessToken
            })
            localStorage.setItem("auth-token",signupRes.data.accessToken)
            history.push('/')
        } catch{
            setError('Failed to sign up')
        }
        setLoading(false)

    }

    return (
        <Card>
            <Card.Body>
                <h2 className="text-center mb-4">Sign Up</h2>
                {error && <Alert variant="danger">{error}</Alert> }
                <Form onSubmit={handleSubmit}>
                    <Form.Group id="username">
                        <Form.Label>Username</Form.Label>
                        <Form.Control type="text" ref={usernameRef} required />
                    </Form.Group>
                    <Form.Group id="email">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" ref={emailRef} required />
                    </Form.Group>
                    <Form.Group id="password">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" ref={passwordRef} required />
                    </Form.Group>
                    <Form.Group id="password-confirm">
                        <Form.Label>Password Confirmation</Form.Label>
                        <Form.Control type="password" ref={passwordConfirmRef} required />
                    </Form.Group>
                    <Button disabled={loading} type="submit" className="w-100 mt-4">Sign Up</Button>
                </Form>
            </Card.Body>
        </Card>
    )
}
