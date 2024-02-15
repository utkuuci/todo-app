import React, { useState, useEffect } from 'react'
import { Input, 
         Stack, 
         Center, 
         Button, 
         useToast } from '@chakra-ui/react'
import axios from 'axios'
import {Link, useNavigate} from 'react-router-dom'

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassowrd] = useState('')
  const toast = useToast();

  useEffect(() => {
    if (localStorage.getItem('access_token') !== null) navigate('/me')
  }, [navigate])

  const handleLogin = async (e) => {
    if (email === '' || password === '') {
      toast({
        title: "Email or password is empty",
        status: 'warning',
        isClosable: true
      });
      return;
    }
    const data = { email, password }
    await axios.post('http://localhost:5000/auth/login', data, {
      headers: {
        "Content-Type": "application/json"
      }
    }).then(res => {
      localStorage.setItem('access_token', JSON.stringify(res.data))
      navigate('/me')
    })
    .catch(err => toast({ title: err.message, status: 'error' }))
    
  }
  return (
    <Center h='100vh'>
      <Stack spacing={4} width={400} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Input type='email' placeholder='Email' id='email' onChange={(e) => setEmail(e.target.value)} />
        <Input type='password' placeholder='Password' id='passowrd' onChange={(e) => setPassowrd(e.target.value)} />
        <Button colorScheme='blue' onClick={handleLogin} type=''>Login</Button>
        <Button colorScheme='blue' onClick={handleLogin} type=''><Link to='/signup'>Signup</Link></Button>
      </Stack>
    </Center>
  )
}

export default Login
