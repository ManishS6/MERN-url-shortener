import axios from 'axios';
import React,{useRef,useState,useContext} from 'react'
import {Card,Form,Button,Alert} from 'react-bootstrap'
import {useHistory} from 'react-router-dom'
import UserContext from './userContext';

export default function Login() {
    const idRef = useRef();
    const passwordRef = useRef();
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const {setUserData} = useContext(UserContext)
    const history = useHistory()

    async function handleSubmit(e){
        e.preventDefault()

        try{
            setError('')
            setLoading(true)
            const loginUser = {input1: idRef.current.value, password: passwordRef.current.value}
            const loginRes = await axios.post('http://localhost:5000/auth/signin',loginUser)
            console.log(loginRes)
            setUserData({
                user: loginRes.data.username,
                token: loginRes.data.accessToken
            })
            localStorage.setItem("auth-token",loginRes.data.accessToken)
            setLoading(false)
            history.push('/') // this unmounts this.Component
        } catch{
            setError('Failed to login')
        }

    }

    return (
        <Card>
            <Card.Body>
                <h2 className="text-center mb-4">Log in</h2>
                {error && <Alert variant="danger">{error}</Alert> }
                <Form onSubmit={handleSubmit}>
                    <Form.Group id="id">
                        <Form.Label>Username/ Email</Form.Label>
                        <Form.Control type="text" ref={idRef} required />
                    </Form.Group>
                    <Form.Group id="password">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" ref={passwordRef} required />
                    </Form.Group>
                    <Button disabled={loading} type="submit" className="w-100 mt-4">Login</Button>
                </Form>
            </Card.Body>
        </Card>
    )
}
