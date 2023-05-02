import React, { useEffect, useState } from 'react'
import { Box, Button, Container, Heading } from '@chakra-ui/react'
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import BotCard from '../Components/BotCard';
import _ from 'lodash';

function Dashboard({userName, queryTokens, storageTokens, token, hasKey}) {
  console.log('Dashboard', userName);
  const navigate = useNavigate();
  const [bots, setBots] = useState([]);

  var arrayIsEqual = function(x, y) {
    return _(x).differenceWith(y, _.isEqual).isEmpty();
  };

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
    if (!arrayIsEqual(response.data, bots)) setBots(response.data);
  }

  useEffect(() => {
    if (!userName && !bots.length) {
      console.log('navigate signup');
      navigate('/login');
    } else {
      getBots();

    }
  })
  return (
    <Container backgroundColor='white'>
      <Heading textAlign="center" marginBottom='0px'>Dashboard</Heading>
      <Heading as='h2' size='md' noOfLines={1} textAlign={'center'} marginTop='0' marginBottom='18px' color='navy'>
        Bots
      </Heading>
      <Link to='/create'><Button margin="auto" display="block">Create New Bot</Button></Link>
     
      <Box display="flex" justifyContent={"space-between"} flexWrap="wrap" height="50vh" overflow={"auto"} padding=".5rem 1rem">
        {bots.map(bot => {
          return <BotCard key={bot.botId} bot={bot} userToken={token}/>
        })}
      </Box>
    </Container>
  )
}

export default Dashboard