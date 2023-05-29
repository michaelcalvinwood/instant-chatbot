import { Box, Container, Heading, NumberDecrementStepper, NumberIncrementStepper, NumberInput, NumberInputField, NumberInputStepper, Radio, RadioGroup, Text, Stack, Button, Input, Alert, AlertIcon, Spinner } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { RadioButton, RadioButtonGroup } from './RadioButtonGroup'
import axios from 'axios';
import { isInteger } from 'lodash';

function Purchase({token, serverSeries, availableCredits, setAvailableCredits}) {
  const [quantity, setQuantity] = useState(2000);
  const [cost, setCost] = useState(20);
  const [discount, setDiscount] = useState(0);
  const [alertStatus, setAlertStatus] = useState('success');
  const [alertMessage, setAlertMessage] = useState('');
  const [showSpinner, setShowSpinner] = useState(false);

  const setMessage = (status, msg) => {
    setAlertStatus(status);
    setAlertMessage(msg);
  }

  const purchaseCredits = () => {
    const request = {
      url: `https://app-${serverSeries}.instantchatbot.net:6250/purchaseCredits`,
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

  const updateAvailableCredits = async () => {
    let request = {
        url: `https://app-${serverSeries}.instantchatbot.net:6250/availableCredits`,
        method: 'post',
        data: {
            token
        }
    }

    console.log('Create useEffect request', request);
    let response;
    
    try {
        response = await axios(request);
        if (availableCredits !== response.data) setAvailableCredits(response.data);
    } catch (err) {
        console.error('Create useEffect error', err);
        
    }
  }

  const handleQueryParams = () => {
    const url = new URL(window.location.href);

    console.log(url);

    const status = url.searchParams.get('status');
    const msg = url.searchParams.get('msg');
    
    console.log('url status ', status);
    if (!status || !msg) return;

    setMessage(status, msg);
    


  }

  useEffect(() => {
    updateAvailableCredits();
    handleQueryParams();
    let amount = quantity;
    if (amount >= 100000) {
      amount *= .85;
      if (discount !== 15) setDiscount(15);
    }
    else if (amount >= 50000) {
      amount *= .90;
      if (discount !== 10) setDiscount(10);
    }
    else if (amount >= 10000) {
      amount *= .95;
      if (discount !== 5) setDiscount(5);
    } else if (discount !== 0) setDiscount(0);

    if (amount !== cost) {
      setCost(amount);
    }
  })

  return (
    <Container>
      <Text color='navy' textAlign={'right'}>Available Credits: {availableCredits}</Text>   
      <Heading textAlign="center" marginBottom="1rem">Purchase</Heading>
      <Alert status={alertStatus} marginBottom={'0'} visibility={alertStatus && alertMessage ? 'visible' : 'hidden'}>
          <AlertIcon />
          {alertMessage}
      </Alert>
      <Text><b>Instructions:</b> Each token costs one penny. Minimum purchase is 2,000 tokens ($20). The purhcase of tokens is non-refundable. Purchases greater than $100 receive a discount based on the amount of purchase.</Text>
      <Text marginTop=".75rem"><b>Monthly Charges:</b><br/></Text>
            
      <div>
          <div style={{paddingLeft:"1rem"}}>
            <b>275 tokens:</b> per Mb of storage (based upon the month's highest storage amount rounded up)<br />
            <b>25 tokens:</b> per Mb of data upload (including upload data from URLs crawled rounded up)<br />
            <b>100 tokens:</b> per 100 queries (rounded up, minimum monthly query charge of $1)
          </div>
      </div>
      <Text textAlign={"center"} marginTop="1.5rem">Tokens</Text>
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
      <Text fontSize="2rem" fontWeight="bold" textAlign="center" marginTop=".5rem">{(cost/100).toLocaleString("en-US", {style:"currency", currency:"USD"})}</Text>
      <Button colorScheme="blue" display='block' margin='0 auto' onClick={purchaseCredits}>Buy</Button>
     
      <Text fontSize=".75rem" fontStyle={'italic'} margin='.25rem auto' display={'block'} width="fit-content" textAlign={'center'}>A Michael Wood Creation<br />Protected by Stripe</Text>
      {showSpinner && <Box height='100vh' width="100vw" position='fixed' top='0' left='0' display='flex' justifyContent={'center'} alignItems={'center'}>
        <Spinner size='xl' color='navy'/>
    </Box> }
    </Container>
  )
}

export default Purchase