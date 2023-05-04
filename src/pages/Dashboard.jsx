import React, { useEffect, useState } from 'react'
import { Alert, AlertIcon, Box, Button, Container, Heading, Image } from '@chakra-ui/react'
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import BotCard from '../Components/BotCard';
import _ from 'lodash';
import deleteIcon from '../assets/images/delete.svg';

function Dashboard({userName, queryTokens, storageTokens, token, hasKey}) {
  console.log('Dashboard', userName);
  const navigate = useNavigate();
  const [bots, setBots] = useState([]);
  const [editBot, setEditBot] = useState('');
  const {id} = useParams();
  const [alertStatus, setAlertStatus] = useState('success');
  const [alertMessage, setAlertMessage] = useState('');

  const curBot = id && bots.length && bots.find(bot => bot.botId === id) ? bots.find(bot => bot.botId === id) : null;

  console.log('curBot', curBot);

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

  const deleteBot = async () => {
    console.log('deleteBot', id, token);

    const request = {
      url: 'https://admin.instantchatbot.net:6200/deleteBot',
      method: 'post',
      data: {
        botId: id,
        userToken: token
      }
    }

    let response;

    try {
      response = await axios(request);
    } catch (err) {
      console.error(err);
      setAlertStatus('error');
      setAlertMessage('Could not delete bot. Please try again later.');
      return;
    }

    console.log(response.data);
    navigate('/dashboard'); 
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
    <>    
    {!curBot && <Container backgroundColor='white'>
        <Heading textAlign="center" marginBottom='12px' color='navy'>Bots</Heading>
        <Link to='/create' ><Button margin="0 auto 1rem auto" display="block">Create New Bot</Button></Link>
      
        <Box display="flex" justifyContent={"space-between"} flexWrap="wrap" height="60vh" overflow={"auto"} padding=".5rem 1rem" border='1px solid navy' borderRadius='8px'>
          {bots.map(bot => {
            return <BotCard key={bot.botId} bot={bot} userToken={token} setEditBot={setEditBot}/>
          })}
        </Box>
      </Container> 
    }
    {curBot && <Container backgroundColor='white'>
      <Alert status={alertStatus} marginBottom={'0'} visibility={alertStatus && alertMessage ? 'visible' : 'hidden'}>
          <AlertIcon />
          {alertMessage}
      </Alert>
      <Box position='relative'>
        <Image className='delete-icon' src={deleteIcon} height="1.5rem" width="1.5rem" marginRight='-.25rem' position='absolute' right='.5rem' top='.5rem' onClick={() => deleteBot()}/>
        <Heading textAlign="center" marginBottom='12px' color='navy'>{curBot.botName}</Heading>
        <Link to='/create' ><Button margin="0 auto 1rem auto" display="block">Add Content</Button></Link>
      </Box>
     
   
      </Container> }  
    </>

  )
}

export default Dashboard