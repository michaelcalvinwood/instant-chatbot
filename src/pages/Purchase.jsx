import { Box, Container, Heading, NumberDecrementStepper, NumberIncrementStepper, NumberInput, NumberInputField, NumberInputStepper, Radio, RadioGroup, Text, Stack, Button, Input, Alert, AlertIcon, Spinner } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { RadioButton, RadioButtonGroup } from './RadioButtonGroup'
import axios from 'axios';
import { isInteger } from 'lodash';

function Purchase({token}) {
  const [quantity, setQuantity] = useState(2000);
  const [cost, setCost] = useState(20);
  const [discount, setDiscount] = useState(0);
  const [alertStatus, setAlertStatus] = useState('success');
  const [alertMessage, setAlertMessage] = useState('');
  const [showSpinner, setShowSpinner] = useState(false);

  const purchaseCredits = () => {
    const request = {
      url: `https://admin.instantchatbot.net:6200/purchaseCredits`,
      method: 'post',
      data: {
        userToken: token,
        quantity, cost, discount
      }
    }
    axios(request)
    .then(response => window.location = response.data)
    .catch(error => {
      console.error(error);
    })
  }

  useEffect(() => {
    let amount = quantity / 100;
    if (amount >= 1000) {
      amount *= .85;
      if (discount !== 15) setDiscount(15);
    }
    else if (amount >= 500) {
      amount *= .90;
      if (discount !== 10) setDiscount(10);
    }
    else if (amount >= 100) {
      amount *= .95;
      if (discount !== 5) setDiscount(5);
    } else if (discount !== 0) setDiscount(0);

    if (amount !== cost) {
      setCost(amount);
    }
  })

  return (
    <Container>
      <Heading textAlign="center" marginBottom="1rem">Purchase</Heading>
      <Alert status={alertStatus} marginBottom={'0'} visibility={alertStatus && alertMessage ? 'visible' : 'hidden'}>
          <AlertIcon />
          {alertMessage}
      </Alert>
      <Text><b>Instructions:</b> Each token costs one penny. Minimum purchase is 2,000 tokens ($20). The purhcase of tokens is non-refundable. Purchases greater than $100 receive a discount based on the amount of purchase.</Text>
      <Text marginTop=".75rem">
          <b>Monthly Charges:</b><br/>&emsp;<b>275 tokens:</b> per Mb of storage (based upon the month's highest storage amount rounded up)<br/>
          &emsp;<b>25 tokens:</b> per Mb of data upload (including upload data from URLs crawled rounded up)<br />
          &emsp;<b>100 tokens:</b> per 100 queries (rounded up, minimum monthly query charge of $1)
      </Text>
      <Text textAlign={"center"} marginTop="1.5rem">Num Tokens</Text>
      <Input type="number" min={2000} step={500} value={quantity} width="10rem" display='block' margin="auto" textAlign={"center"}
      onChange={(e) => {
        let test = e.target.value;
        if (isNaN(test)) return;
        test = Number(test);
        if (!isInteger) return;
        if (test < 2000) return setQuantity(2000);
        setQuantity(test);
      }} />
      <Text textAlign='center' fontStyle='italic' visibility={discount ? 'visible' : 'hidden'}>{discount}% discount</Text>
      <Text fontSize="2rem" fontWeight="bold" textAlign="center" marginTop=".5rem">{cost.toLocaleString("en-US", {style:"currency", currency:"USD"})}</Text>
      <Button colorScheme="blue" display='block' margin='0 auto' onClick={purchaseCredits}>Buy</Button>
     
      <Text fontSize=".75rem" fontStyle={'italic'} margin='.25rem auto' display={'block'} width="fit-content">Protected by Stripe</Text>
      {showSpinner && <Box height='100vh' width="100vw" position='fixed' top='0' left='0' display='flex' justifyContent={'center'} alignItems={'center'}>
        <Spinner size='xl' color='navy'/>
    </Box> }
    </Container>
  )
}

export default Purchase