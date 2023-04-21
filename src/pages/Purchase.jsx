import { Container, Heading } from '@chakra-ui/react'
import React, { useState } from 'react'
import { RadioButton, RadioButtonGroup } from './RadioButtonGroup'

function Purchase() {
  const [term, setTerm] = useState('monthly');

  return (
    <Container>
      <Heading textAlign="center" marginBottom="1rem">Purchase</Heading>
      <RadioButtonGroup  defaultValue="left" size='md' value={term} display='block' margin="auto" width="fit-content">
            <RadioButton value="monthly" onClick={() => setTerm('monthly')}>Monthly</RadioButton>
            <RadioButton value="annual" onClick={() => setTerm('annual')}>Annual</RadioButton>
          </RadioButtonGroup>
    </Container>
  )
}

export default Purchase