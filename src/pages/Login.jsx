
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
} from '@chakra-ui/react'
import InstantChatBotIcon from '../assets/images/instantChatBotoLogo.svg';

const signup = () => {
  return (
    <Container
    maxW="md"
    py={{
      base: '9',
      md: '9',
    }}
  >
    <Stack spacing="8">
      
      <Stack spacing="6">
        <Stack spacing="5">
          <FormControl isRequired>
            <FormLabel htmlFor="name">Name</FormLabel>
            <Input id="name" type="text" />
          </FormControl>
          <FormControl isRequired>
            <FormLabel htmlFor="email">Email</FormLabel>
            <Input id="email" type="email" />
          </FormControl>
          <FormControl isRequired>
            <FormLabel htmlFor="password">Password</FormLabel>
            <Input id="password" type="password" />
            <FormHelperText color="muted">At least 8 characters long</FormHelperText>
          </FormControl>
        </Stack>
        <Stack spacing="4">
          <Button variant="primary">Create account</Button>
         
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

function Login() {
  const [intention, setIntention] = useState('Login');
  
  const query = qs.parse(window.location.search.substring(1));
  
  if (typeof query.signup !== 'undefined' && intention !== 'Sign Up') setIntention('Sign Up');

  return (
    <Container>
      <Heading textAlign="center">{intention}</Heading>
      {intention === 'Sign Up' && signup()}
    </Container>
  )
}

export default Login