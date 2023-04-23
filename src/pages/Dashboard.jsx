import React, { useEffect } from 'react'
import { Button, Container, Heading } from '@chakra-ui/react'
import { Link, useNavigate } from 'react-router-dom'

function Dashboard({userName, queryTokens, storageTokens, token, hasKey}) {
  console.log('Dashboard', userName);
  const navigate = useNavigate();

  useEffect(() => {
    if (!userName) {
      console.log('navigate signup');
      navigate('/login');
    }
  })
  return (
    <Container backgroundColor='white'>
      <Heading textAlign="center" marginBottom='0px'>Dashboard</Heading>
      <Heading as='h2' size='md' noOfLines={1} textAlign={'center'} marginTop='0' marginBottom='36px' color='navy'>
        {userName}
      </Heading>
      <Link to='/create'><Button margin="auto" display="block">Create New Bot</Button></Link>
    </Container>
  )
}

export default Dashboard