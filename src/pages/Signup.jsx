
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
import axios from 'axios';
import { Link } from 'react-router-dom';

function Signup() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userName, setUserName] = useState('');
  const [alertType, setAlertType] = useState('error');
  const [alertMessage, setAlertMessage] = useState('')

  console.log('render Login', userName, password, email);

  const showAlert = (type, message) => {
    setAlertType(type);
    setAlertMessage(message);
  }

  const createAccount = () => {
    if (!email) return showAlert('error', 'Please enter an email address.');
    if (!isEmail(email)) return showAlert('error', 'Please enter a valid email address.');
    if (!userName) return showAlert('error', 'Please enter a user name');
    if (!password) return showAlert('error', 'Please enter a password');
    const options = {
      min: 8,
      uppercase    : 1,  // A through Z
      lowercase    : 1,  // a through z
      special      : 1,  // ! @ # $ & *
      digit        : 1,  // 0 through 9
    }
    if (password.indexOf(' ') !== -1) return showAlert('error', 'Spaces are not allowed in password');
    if (!complexity.check(password, options)) return showAlert('error', 'Password must be at least 8 characters with at least 1 uppercase, 1 lowercase, 1 digit, and 1 special character.')
  
    const request = {
      url: 'https://admin.instantchatbot.net:6200/signup',
      method: 'post',
      data: {
        password, email, userName
      }
    }

    axios(request)
    .then(response => showAlert('success', `Verification email has been sent to ${email}. If you do not see it, please check your spam folder.`))
    .catch(err => showAlert('error', `Unable to send verification email to ${email}. Please use another email address, or try again.`))
  }

  const login = () => {

  }

  const updateUserName = e => {
    const val = e.target.value;
    var regex = new RegExp(/^[A-Za-z][A-Za-z0-9\-]*$/gm);
    if (regex.test(val)) setUserName(val); 
    setAlertMessage('')
  }

  const updateEmail = e => {
    setEmail(e.target.value); 
    setAlertMessage('');
  }

  const updatePassword = e => {
    setPassword(e.target.value); 
    setAlertMessage('');
  }

  const query = qs.parse(window.location.search.substring(1));

  return (
    <Container>
      <Heading textAlign="center">Sign Up</Heading>
      <Alert status={alertType} marginTop='4px' visibility={alertMessage ? 'visible' : 'hidden'}>
        <AlertIcon />
          {alertMessage}
      </Alert>
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
              <Input id="name" type="text" value={userName} onChange={updateUserName}/>
            </FormControl>
            <FormControl isRequired>
              <FormLabel htmlFor="email">Email</FormLabel>
              <Input id="email" type="email" onChange={updateEmail}/>
            </FormControl>
            <FormControl isRequired>
              <FormLabel htmlFor="password">Password</FormLabel>
              <Input id="password" type="password" value={password} onChange={updatePassword} />
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
          <Link to='/login'>
            <Button variant="link" colorScheme="blue" size="sm">
              Log in
            </Button>
          </Link>
        </HStack>
      </Stack>
    </Container>
      
     
    </Container>
  )
}

export default Signup