
import React, { useState } from 'react'
import { Box, Container, Heading, FormControl, FormLabel, Input, Stack, Text } from '@chakra-ui/react'
import { RadioButton, RadioButtonGroup } from './RadioButtonGroup'
function Create() {
    const [contentType, setContentType] = useState('document');
    console.log('contentType', contentType)
  return (
    
    <Container>
        <Heading textAlign="center">Create</Heading>
            <Box
            as="section"
            bg="bg-surface"
            pt="12"
            pb={{
            base: '4',
            md: '8',
            }}
        >
        <Container maxW="lg">
        <Stack spacing="10">
          
            <FormControl>
                <FormLabel htmlFor="medium" variant="floating" size="md">
                    OpenAI API Key
                </FormLabel>
                <Input id="medium" size="md" placeholder=" " data-peer />
            </FormControl>
            <Box>
                <Box as="section" bg="bg-surface" py={{ base: '4', md: '8' }}>
                    <Text>Add Content</Text>
                    <RadioButtonGroup key={'md'} defaultValue="left" size={'md'} paddingTop="6px" onChange={setContentType} value={contentType}>
                        <RadioButton value="document" backgroundColor={contentType === 'document' ? 'rgb(237, 242, 247)' : 'white'}>Document</RadioButton>
                        <RadioButton value="url"  backgroundColor={contentType === 'url' ? 'rgb(237, 242, 247)' : 'white'}>URL</RadioButton>
                        <RadioButton value="text"  backgroundColor={contentType === 'text' ? 'rgb(237, 242, 247)' : 'white'}>Text</RadioButton>
                    </RadioButtonGroup>
                        
                    
                </Box>
            </Box>
           
        </Stack>
        </Container>
    </Box>
    </Container>

  )
}

export default Create