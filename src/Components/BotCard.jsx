import { Box, Heading, Image, Text } from '@chakra-ui/react'
import React from 'react';
import deleteIcon from '../assets/images/delete.svg';
import editIcon from '../assets/images/edit.svg';


function BotCard({bot, userToken}) {

  const editBot = id => {
    console.log('editBot', id, userToken);
  }

  const deleteBot = id => {
    console.log('deleteBot', id, userToken);

  }

  return (
    <Box className= 'bot-card' height="fit-content" padding=".5rem 1rem" margin="1rem .5rem" border="1px solid navy" borderRadius="4px" maxWidth="30%">
        <Heading as="h6" size="xs" textAlign={"center"}>{bot.botName}</Heading>
        <Text>{bot.websites.replaceAll("\n", ", ")}</Text>
        <Box width="100%" display="flex" justifyContent={"space-between"} margin="0" padding="0">
          <Image className='edit-icon' src={editIcon} height="1.25rem" width="1.25rem" onClick={() => editBot(bot.botId)}/>
          <Image className='delete-icon' src={deleteIcon} height="1.25rem" width="1.25rem" marginLeft="-.25rem" onClick={() => deleteBot(bot.botId)}/>
        
        </Box>

    </Box>
  )
}

export default BotCard