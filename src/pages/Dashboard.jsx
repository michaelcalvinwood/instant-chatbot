import React, { useEffect, useState } from 'react'
import { Alert, AlertIcon, Box, Button, Container, Heading, Image, Text, Textarea } from '@chakra-ui/react'
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
  const [addMore, setAddMore] = useState(false);
  const [deploy, setDeploy] = useState(false);
  const [websites, setWebsites] = useState('');

  const curBot = id && bots.length && bots.find(bot => bot.botId === id) ? bots.find(bot => bot.botId === id) : null;

  console.log('curBot', curBot);

  var arrayIsEqual = function(x, y) {
    return _(x).differenceWith(y, _.isEqual).isEmpty() && x.length === y.length;
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

    console.log('db  bots', response.data);
    console.log('cur bots', bots)
    if (!arrayIsEqual(response.data, bots)) {
      console.log('setBots');
      setBots(response.data);
    }
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

    setAlertMessage('');
    console.log(response.data);
    navigate('/bots'); 
  }

  useEffect(() => {
    if (!userName && !bots.length) {
      console.log('navigate signup');
      navigate('/login');
    } else {
      setAlertMessage('');
      getBots();

    }
  })
  return (
    <>    
    {!curBot && <Container backgroundColor='white'>
      <Alert status={alertStatus} marginBottom={'0'} visibility={alertStatus && alertMessage ? 'visible' : 'hidden'}>
          <AlertIcon />
          {alertMessage}
      </Alert>
        <Heading size='md'  textAlign="center" marginBottom='12px' color='navy'>Bots</Heading>
        <Link to='/create' ><Button colorScheme="blue" margin="0 auto 1rem auto" display="block">Create</Button></Link>
      
        <Box display="flex" justifyContent={"space-between"} flexWrap="wrap" height="60vh" overflow={"auto"} padding=".5rem 1rem" border='1px solid navy' borderRadius='8px' width={"100%"}>
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
      <Box position='relative' width="100%">
        <Image className='delete-icon' src={deleteIcon} height="1.5rem" width="1.5rem" marginRight='-.25rem' position='absolute' right='.5rem' top='.5rem' onClick={() => deleteBot()}/>
        <Heading textAlign="center" marginBottom='12px' color='navy'>{curBot.botName}</Heading>
        { !deploy && !addMore && <Box>
          
          <Text marginTop="24px">Websites (e.g. example.com, www.example.com):</Text>
            <Textarea value={websites}  color='black' 
                onChange={(e) => {
                    setAlertMessage('');
                    setWebsites(e.target.value);
                }}
            />
            <Button colorScheme="blue" margin=".5rem auto 1rem auto" display="block" width="8rem" onClick={() => setAddMore(true)}>Set Websites</Button>
            <Box width="100%" display="flex" justifyContent={"space-between"}>
              <Button colorScheme="blue" width="8rem" onClick={() => setAddMore(true)}>Add Content</Button>
              <Button colorScheme="blue" width="8rem" onClick={() => setDeploy(true)}>Deploy</Button>
              
          
            </Box>
        </Box>

        }
      </Box>
     
      </Container> }  
    </>

  )
}

export default Dashboard