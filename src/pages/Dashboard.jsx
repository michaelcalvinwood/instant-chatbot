import React, { useEffect } from 'react'
import { Box, Button, Container, Heading } from '@chakra-ui/react'
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function Dashboard({userName, queryTokens, storageTokens, token, hasKey}) {
  console.log('Dashboard', userName);
  const navigate = useNavigate();


  const getBots = async () => {
    const request = {
      url: 'https://admin.instantchatbot.net:6200/listBots',
      method: 'post',
      data: {
        token
      }
    }

    let response;

    try {
      response = await axios(request);
    } catch (err) {
      console.error(err);
      return;
    }

    console.log(response.data);
  }

  useEffect(() => {
    if (!userName) {
      console.log('navigate signup');
      navigate('/login');
    } else {
      getBots();

    }
  })
  return (
    <Container backgroundColor='white'>
      <Heading textAlign="center" marginBottom='0px'>Dashboard</Heading>
      <Heading as='h2' size='md' noOfLines={1} textAlign={'center'} marginTop='0' marginBottom='36px' color='navy'>
        {userName}
      </Heading>
      <Link to='/create'><Button margin="auto" display="block">Create New Bot</Button></Link>
      <Box>

      </Box>
    </Container>
  )
}

export default Dashboard