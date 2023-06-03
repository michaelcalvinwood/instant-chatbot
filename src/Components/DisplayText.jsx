import { Box } from '@chakra-ui/react';
import React from 'react';
import { BsTrash3 } from 'react-icons/bs';

const DisplayText = ({text, setText, textRef}) => {
    const deleteText = () => {
        const { id } = text;
        let curText = textRef.current;
        console.log('deleteText curText', curText);
        const newText = curText.filter(el => el.id !== id);
        console.log('newText', newText);
        textRef.current = newText;
        setText(newText);
    }
  return (
    <Box width='100%' display='flex' justifyContent={'space-between'} alignItems={'center'} marginBottom='.25rem'>
        <Box width='calc(100% - 11rem)'>{text.name}</Box>
        <Box width='8rem' textAlign={'right'}>{text.text.length.toLocaleString()}</Box>
        <BsTrash3 width='2rem' color='red' style={{cursor: 'pointer'}} onClick={deleteText}/>
    </Box>
  )
}

export default DisplayText