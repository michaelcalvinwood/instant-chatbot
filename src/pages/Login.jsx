
import React, { useEffect, useRef, useState } from 'react'
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
import { useNavigate } from "react-router-dom";

function Login(props) {




  const {userName, setUserName} = props;
  console.log('Login', userName);
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [alertType, setAlertType] = useState('error');
  const [alertMessage, setAlertMessage] = useState('');

  const propsRef = useRef();
  propsRef.current = props;

  console.log('propsRef', propsRef.current);
 
  let navigate = useNavigate();
  let loaded = false;
  if (window.location.pathname !== '/login') window.location.href = '/login';

  const showAlert = (type, message) => {
    setAlertType(type);
    setAlertMessage(message);
  }

  const setInfo = info => {
    console.log('info', info)
    console.log(props.setUserName);
    console.log(info.userName);
    props.setUserName(info.userName);
    props.setStorageTokens(info.storageTokens);
    props.setQueryTokens(info.queryTokens);
    props.setHasKey(info.hasKey);
    props.setToken(info.token);
    navigate('/dashboard');
  }

  const loginToAccount = () => {
    if (!userName) return showAlert('error', 'Please enter a user name');
    if (!password) return showAlert('error', 'Please enter a password');
    
    const request = {
      url: 'https://admin.instantchatbot.net:6200/login',
      method: 'post',
      data: {
        password, userName
      }
    }

    axios(request)
    .then(response => {
      const info = response.data;
      setInfo(info);
    })
    .catch(err => {
      console.error(err);
      showAlert('error', `Unable to login with these credentials.`)
    })
  }

  const login = () => {

  }

  const updateUserName = e => {
    console.log('updateUserName', loaded, propsRef);
    
    const val = e.target.value;
    var regex = new RegExp(/^[A-Za-z][A-Za-z0-9\-]*$/gm);
    if (regex.test(val)) propsRef.current.setUserName(val); 
    setAlertMessage('')
  }

  const updatePassword = e => {
    setPassword(e.target.value); 
    setAlertMessage('');
  }


  const query = qs.parse(window.location.search.substring(1));
  
  
  useEffect(() => {
    loaded = true;
  })
  return (
    <Container>
      <Heading textAlign="center">Login</Heading>
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
              <FormLabel htmlFor="password">Password</FormLabel>
              <Input id="password" type="password" value={password} onChange={updatePassword} />
              
            </FormControl>
          </Stack>
          <Stack spacing="4">
            <Button variant="primary" onClick={loginToAccount}>Access account</Button>
           
          </Stack>
        </Stack>
        <HStack justify="center" spacing="1">
          <Text fontSize="sm" color="muted">
            Don't have an account?
          </Text>
          <Link to="/signup">
            <Button variant="link" colorScheme="blue" size="sm">
              Sign up
            </Button>
          </Link>
        </HStack>
      </Stack>
    </Container>
      
     
    </Container>
  )
}

export default Login