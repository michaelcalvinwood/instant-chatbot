
import React, { useState } from 'react'
import * as qs from 'qs';
import {
  Button,
  Container,
  FormControl,
  FormHelperText,
  FormLabel,
  Heading,
  HStack,
  Image,
  Input,
  Stack,
  Text,
} from '@chakra-ui/react';
import {
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from '@chakra-ui/react'
import InstantChatBotIcon from '../assets/images/instantChatBotoLogo.svg';
import { set } from 'lodash';
import * as complexity from 'complexity'
import isEmail from 'validator/lib/isEmail';

function Login() {
  const [intention, setIntention] = useState('Login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userName, setUserName] = useState('');
  const [alertMessage, setAlertMessage] = useState('')

  console.log(userName, password, email);

  const createAccount = () => {
    if (!email) return setAlertMessage('Please enter an email address.');
    if (!isEmail(email)) return setAlertMessage('Please enter a valid email address.');
    if (!userName) return setAlertMessage('Please enter a user name');
    if (!password) return setAlertMessage('Please enter a password');
    const options = {
      min: 8,
      uppercase    : 1,  // A through Z
      lowercase    : 1,  // a through z
      special      : 1,  // ! @ # $ & *
      digit        : 1,  // 0 through 9
    }
    if (password.indexOf(' ') !== -1) return setAlertMessage('Spaces are not allowed in password');
    if (!complexity.check(password, options)) return setAlertMessage('Password must be at least 8 characters with at least 1 uppercase, 1 lowercase, 1 digit, and 1 special character.')
  }

  const login = () => {

  }


  const signupForm = () => {
  
    return (
      <Container
      maxW="md"
      py={{
        base: '3',
        md: '3',
      }}
    >
      <Stack spacing="8">
        <Stack spacing="6">
          <Stack spacing="5">
            <FormControl isRequired>
              <FormLabel htmlFor="name">User Name</FormLabel>
              <Input id="name" type="text" onChange={(e) =>{setUserName(e.target.value); setAlertMessage('')}}/>
            </FormControl>
            <FormControl isRequired>
              <FormLabel htmlFor="email">Email</FormLabel>
              <Input id="email" type="email" onChange={(e) =>{setEmail(e.target.value); setAlertMessage('')}}/>
            </FormControl>
            <FormControl isRequired>
              <FormLabel htmlFor="password">Password</FormLabel>
              <Input id="password" type="password" value={password} onChange={(e) =>{setPassword(e.target.value); setAlertMessage('')}} />
              <FormHelperText color="muted">Strong password required</FormHelperText>
            </FormControl>
          </Stack>
          <Stack spacing="4">
            <Button variant="primary" onClick={createAccount}>Create account</Button>
           
          </Stack>
        </Stack>
        <HStack justify="center" spacing="1">
          <Text fontSize="sm" color="muted">
            Already have an account?
          </Text>
          <Button variant="link" colorScheme="blue" size="sm">
            Log in
          </Button>
        </HStack>
      </Stack>
    </Container>
    )
  }

  const query = qs.parse(window.location.search.substring(1));
  
  if (typeof query.signup !== 'undefined' && intention !== 'Sign Up') setIntention('Sign Up');

  return (
    <Container>
      <Heading textAlign="center">{intention}</Heading>
      <Alert status='error' marginTop='4px' visibility={alertMessage ? 'visible' : 'hidden'}>
        <AlertIcon />
          {alertMessage}
      </Alert>

      
      {intention === 'Sign Up' && signupForm()}
    </Container>
  )
}

export default Login