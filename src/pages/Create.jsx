
import React, { useState, useCallback, useEffect } from 'react'
import { Box, Container, Heading, FormControl, FormLabel, Input, Stack, Text, Flex, Select, Button, Textarea, Alert, AlertIcon } from '@chakra-ui/react'
import {useDropzone} from 'react-dropzone'

function Create() {
    const [contentType, setContentType] = useState('pdf');
    const [websites, setWebsites] = useState('');
    const [botId, setBotId] = useState('');
    const [bytes, setBytes] = useState(0);
    const [openAIKeys, setOpenAiKeys] =  useState([]);
    const [alertStatus, setAlertStatus] = useState('success');
    const [alertMessage, setAlertMessage] = useState('');

    //console.log('contentType', contentType, websites)

    function bytesToSize() {
        const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB']
        if (bytes === 0) return ''
        const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)), 10)
        if (i === 0) return `${bytes} ${sizes[i]}`
        return `${(bytes / (1024 ** i)).toFixed(1)} ${sizes[i]}`
      }

    const handleDeployment = () => {
        console.log('handle deployment')
    }

    const onDrop = useCallback(acceptedFiles => {
        
       
        console.log('files', acceptedFiles);
      }, [])
    const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})

    useEffect(() => {
       
    })

  return (
    
    <Container backgroundColor='white'>
        <Heading as='h1' textAlign="center">Create Bot</Heading>
        <Heading as='h2' size='xs' textAlign='center'>{bytesToSize()}</Heading>
            <Box
            as="section"
            bg="bg-surface"
            pt="8"
            mb='0'
        >
        <Alert status={alertStatus} visibility={alertStatus && alertMessage ? 'visible' : 'hidden'}>
            <AlertIcon />
             {alertMessage}
        </Alert>
        <Container maxW="lg">
        <Flex flexDirection={'column'}>
            <FormControl>
                <Text>
                    OpenAI API Key
                </Text>
                <Input id="medium" size="md" placeholder=" " data-peer onChange={(e) => setOpenAiKeys([`${e.target.value}`])}/>
            </FormControl>
            <Text marginTop="24px">Websites</Text>
            <Textarea value={websites} onChange={(e) => setWebsites(e.target.value)} color='black' />

            <Text marginTop="24px">Content</Text>
            <Select value={contentType} onChange={(e) => console.log(setContentType(e.target.value))}>
                <option value='pdf'>PDF</option>
                <option value='scanned'>Scanned PDF</option>
                <option value='docx'>DOCX</option>
            </Select>
            <Box marginTop="8px" height="96px" padding='.5rem' border='1px solid var(--chakra-colors-gray-200)' borderRadius='8px' cursor='pointer'>
                <div {...getRootProps()}>
                    <input {...getInputProps()} />
                    {
                        <p style={{height:'6rem', width:'100%'}}>&nbsp;Drag 'n' drop some files here, or click to select files</p>
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