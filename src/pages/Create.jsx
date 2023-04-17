
import React, { useState, useCallback } from 'react'
import { Box, Container, Heading, FormControl, FormLabel, Input, Stack, Text, Flex, Select, Button, Textarea } from '@chakra-ui/react'
import {useDropzone} from 'react-dropzone'

function Create() {
    const [contentType, setContentType] = useState('pdf');
    const [websites, setWebsites] = useState('');

    //console.log('contentType', contentType, websites)

    const handleDeployment = () => {
        console.log('handle deployment')
    }

    const onDrop = useCallback(acceptedFiles => {
        console.log('files', acceptedFiles);
      }, [])
    const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})
    
  return (
    
    <Container backgroundColor='white'>
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
        <Flex flexDirection={'column'}>
            <FormControl>
                <Text>
                    OpenAI API Key
                </Text>
                <Input id="medium" size="md" placeholder=" " data-peer />
            </FormControl>
            <Text marginTop="24px">Websites</Text>
            <Textarea value={websites} onChange={(e) => setWebsites(e.target.value)} color='black' />

            <Text marginTop="24px">Content</Text>
            <Select value={contentType} onChange={(e) => console.log(setContentType(e.target.value))}>
                <option value='pdf'>PDF</option>
                <option value='scanned'>Scanned PDF</option>
                <option value='docx'>DOCX</option>
            </Select>
            <Box marginTop="8px" height="96px" padding='1.5rem 1rem .5rem 1rem' border='1px solid var(--chakra-colors-gray-200)' borderRadius='8px' cursor='pointer'>
                <div {...getRootProps()}>
                    <input {...getInputProps()} />
                    {
                        isDragActive ?
                        <p>Drop the files here ...</p> :
                        <p>Drag 'n' drop some files here, or click to select files</p>
                    }
                </div>
            </Box>
            <Button marginTop='32px' onClick={handleDeployment}>Deploy</Button>
           
        </Flex>
        </Container>
    </Box>
    </Container>

  )
}

export default Create