import { Button, Container, Heading, ListItem, Text, UnorderedList } from '@chakra-ui/react'
import React from 'react'
import { Link } from 'react-router-dom'

function Home() {
  return (
    <Container backgroundColor='white'>
        <Heading textAlign='center'>
          Add AI Chatbots To Your Website<br></br><span style={{color: 'navy'}}>In Less Than Five Minutes!</span>
        </Heading>
        <Text paddingTop=".75rem">
          In less than five minutes, you can:
        </Text>
          <UnorderedList paddingLeft="1rem">
            <ListItem> <strong>Create a chatbot:</strong> To be displayed on as many websites as you want.</ListItem>
            <ListItem><strong>Load your content:</strong> Including PDFs, Word Documents, webpages, or even entire websites.</ListItem>
            <ListItem><strong>Deploy it to your website:</strong> Using only two lines of code.</ListItem>
          </UnorderedList>
   
        <Text paddingTop=".75rem">
        You can even create <strong>different chatbots for different webpages</strong>. For example:
        <UnorderedList paddingLeft='1rem'>
          <ListItem><strong>About:</strong> Display a chatbot loaded with your company information (such as contact information).</ListItem>
          <ListItem><strong>Support:</strong> Display a chatbot loaded with your support documents and FAQs to provide your customers instant, intelligent answers to their questions.
          <ListItem><strong>Products:</strong> Display a chatbot loaded with information regarding your products and services to turn your chatbot into an intelligent sales assistant.</ListItem>
          </ListItem>
          <ListItem> <strong>Home:</strong> Display a chatbot loaded with the content of your entire site; allowing visitors to ask questions regarding anything and everything published on your website.</ListItem>
        </UnorderedList>
        </Text>
        <Text paddingTop=".75rem">
            You can create as many chatbots for your website as you want, and you can <strong>get started for free.</strong></Text>
        <Text paddingTop=".75rem">
            Questions? Our chatbot will be happy to assist you. Just click the "Instant Chatbot AI" in the bottom-right corner.
        </Text>
        <Link to="./login?signup=gs">
            <Button display="block" margin="1rem auto" variant="primary">Get Started</Button>
        </Link>
        
         
    </Container>
  )
}

export default Home