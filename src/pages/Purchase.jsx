import { Box, Container, Heading, NumberDecrementStepper, NumberIncrementStepper, NumberInput, NumberInputField, NumberInputStepper, Radio, RadioGroup, Text, Stack } from '@chakra-ui/react'
import React, { useState } from 'react'
import { RadioButton, RadioButtonGroup } from './RadioButtonGroup'

function Purchase() {
  const [term, setTerm] = useState('monthly');
  const [storageSize, setStorageSize] = useState(100);
  const [storageUnits, setStorageUnits] = useState('MB');
  const [storagePrice, setStoragePrice] = useState(5);
  const [questionsPerMonth, setQuestionsPerMonth] = useState(1000);

  console.log(term, storageSize);



  return (
    <Container>
      <Heading textAlign="center" marginBottom="1rem">Purchase</Heading>
      <RadioButtonGroup  defaultValue="left" size='md' value={term} display='block' margin="auto" width="fit-content">
            <RadioButton value="monthly" onClick={() => setTerm('monthly')}>Monthly</RadioButton>
            <RadioButton value="annual" onClick={() => setTerm('annual')}>Annual</RadioButton>
      </RadioButtonGroup>
      <Box marginTop="1rem">
        <Text textAlign="center">Maximum Data Storage</Text>
        <Text textAlign="center" fontSize='.75rem'>(${storagePrice} per 100MB)</Text>
        <Box display="flex" justifyContent={"center"} alignItems={'center'} marginTop=".5rem">
          <NumberInput width="8rem" step={1} precision={0} value={storageSize} onChange={(valueStr) => {
            if (isNaN(valueStr)) return;
              setStorageSize(Number(valueStr))
            }}
          >
              <NumberInputField />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
          </NumberInput>
          <RadioGroup onChange={(e) => setStorageUnits(e)} value={storageUnits} marginLeft=".5rem">
            <Stack direction='row'>
              <Radio value='MB'>MB</Radio>
              <Radio value='GB'>GB</Radio>
            </Stack>
          </RadioGroup>
        </Box>
        <Text textAlign="center" marginTop="1rem">Questions per Month</Text>
        <Text textAlign="center" fontSize=".75rem">($12 per 1,000)</Text>
         <Box display="flex" justifyContent={"center"}>
          <NumberInput width="8rem" step={1000} precision={0} value={questionsPerMonth} onChange={(valueStr) => {
                if (isNaN(valueStr)) return;
                  setQuestionsPerMonth(Number(valueStr))
                }}
              >
                  <NumberInputField />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
            </NumberInput>
         </Box>
      </Box>
    </Container>
  )
}

export default Purchase