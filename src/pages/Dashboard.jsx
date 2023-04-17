import React from 'react'
import { Button, Container, Heading } from '@chakra-ui/react'
import { Link } from 'react-router-dom'
function Dashboard() {
  return (
    <Container backgroundColor='white'>
      <Heading textAlign="center" marginBottom='24px'>Dashboard</Heading>
      <Link to='/create'><Button margin="auto" display="block">Create New Bot</Button></Link>
    </Container>
  )
}

export default Dashboard