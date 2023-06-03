import { Box } from '@chakra-ui/react';
import React from 'react';
import { BsTrash3 } from 'react-icons/bs';

const DisplayText = ({text, setText}) => {
  return (
    <Box width='100%' display='flex' justifyContent={'space-between'} alignItems={'center'} marginBottom='.25rem'>
        <Box width='calc(100% - 11rem)'>{text.name}</Box>
        <Box width='8rem' textAlign={'right'}>{text.text.length.toLocaleString()}</Box>
        <BsTrash3 width='2rem' color='red' style={{cursor: 'pointer'}}/>
    </Box>
  )
}

export default DisplayText