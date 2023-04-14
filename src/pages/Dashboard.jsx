import React from 'react'
import { Button, Container, Heading } from '@chakra-ui/react'

function Dashboard() {
  return (
    <Container>
      <Heading textAlign="center" marginBottom='24px'>Dashboard</Heading>
      <Button margin="auto" display="block">Create New Bot</Button>
    </Container>
  )
}

export default Dashboard