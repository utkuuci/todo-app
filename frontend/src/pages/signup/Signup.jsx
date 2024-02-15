import React, { useState, useEffect } from 'react'
import { Input, 
         Stack, 
         Center, 
         Button, 
         useToast } from '@chakra-ui/react'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'


const Signup = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassowrd] = useState('')
  const [passwordCheck, setPassowrdCheck] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const toast = useToast();

  useEffect(() => {
    if (localStorage.getItem('access_token') !== null) navigate('/me')
  }, [navigate])


  const handleSignUp = async () => {
    if (email === '' || password === '' || passwordCheck === '' || firstName === '' || lastName === ''){
      toast({ title: "Please fill the empty inputs" })
      return;
    }
    const data = { firstName, lastName, email, password, passwordCheck }
    await axios.post('http://localhost:5000/auth/signup', data, {
      headers: {
        "Content-Type": "application/json"
      }
    }).then(res => {
      localStorage.setItem('access_token', JSON.stringify(res.data))
      navigate('/me')
    }).catch(err => toast({ title: err.message, status: 'error' }))
  }

  return (
    <Center h='100vh'>
      <Stack spacing={4} width={400} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Input type='text' placeholder='First Name' id='firstname' onChange={(e) => setFirstName(e.target.value)} />
        <Input type='text' placeholder='Last Name' id='lastname' onChange={(e) => setLastName(e.target.value)} />
        <Input type='email' placeholder='Email' id='email' onChange={(e) => setEmail(e.target.value)} />
        <Input type='password' placeholder='Password' id='passowrd' onChange={(e) => setPassowrd(e.target.value)} />
        <Input type='password' placeholder='Password Check' id='passowrdcheck' onChange={(e) => setPassowrdCheck(e.target.value)} />
        <Button colorScheme='blue' onClick={handleSignUp} type=''>Signup</Button>
      </Stack>
    </Center>
  )
}

export default Signup
