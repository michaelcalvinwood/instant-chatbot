import { Box, Heading, Image, Text } from '@chakra-ui/react'
import React from 'react';
import deleteIcon from '../assets/images/delete.svg';
import editIcon from '../assets/images/edit.svg';
import { Link } from 'react-router-dom';

function BotCard({bot, userToken, setEditBot}) {

  const editBot = id => {
    setEditBot(id);
  }

  return (
    <Link to={`/dashboard/${bot.botId}`} >
      <Box className= 'bot-card' height="fit-content" padding=".5rem 1rem" margin="1rem .5rem" border="1px solid navy" borderRadius="4px" width="25vw" minWidth="14rem" boxShadow='0 4px 8px 0 rgba(0,0,0,0.2)' >
          <Heading as="h6" size="xs" textAlign={"center"} color="navy">{bot.botName} </Heading>
          <Text>{bot.websites.replaceAll("\n", ", ")}</Text>
          {/* <Box width="100%" display="flex" justifyContent={"space-between"} margin="0" padding="0">
            <Image className='edit-icon' src={editIcon} height="1.25rem" width="1.25rem" marginLeft="-.15rem" onClick={() => editBot(bot.botId)}/>
            <Image className='delete-icon' src={deleteIcon} height="1.25rem" width="1.25rem" marginRight='-.25rem' onClick={() => deleteBot(bot.botId)}/>
          
          </Box> */}

      </Box>
    </Link>
  )
}

export default BotCard