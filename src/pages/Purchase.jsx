import { Box, Container, Heading, NumberDecrementStepper, NumberIncrementStepper, NumberInput, NumberInputField, NumberInputStepper, Radio, RadioGroup, Text, Stack, Button } from '@chakra-ui/react'
import React, { useState } from 'react'
import { RadioButton, RadioButtonGroup } from './RadioButtonGroup'
import axios from 'axios';

function Purchase({token}) {
  const [term, setTerm] = useState('monthly');
  const [quantity, setQuantity] = useState(1);

  const purchaseCredits = () => {
    const request = {
      url: `https://admin.instantchatbot.net:6200/purchaseCredits`,
      method: 'post',
      data: {
        userToken: token,
        quantity
      }
    }
    axios(request)
    .then(response => window.location = response.data)
    .catch(error => {
      console.error(error);
    })
  }

  return (
    <Container>
      <Heading textAlign="center" marginBottom="1rem">Purchase</Heading>
      <Button colorScheme="blue" display='block' margin='0 auto' onClick={purchaseCredits}>Buy</Button>
      <Text fontSize=".75rem" fontStyle={'italic'} margin='.25rem auto' display={'block'} width="fit-content">Protected by Stripe</Text>
    </Container>
  )
}

export default Purchase