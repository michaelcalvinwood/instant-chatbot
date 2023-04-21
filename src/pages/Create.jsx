
import React, { useState, useCallback, useEffect, useRef } from 'react'
import { Box, Container, Heading, FormControl, FormLabel, Input, Stack, Text, Flex, Select, Button, Textarea, Alert, AlertIcon } from '@chakra-ui/react'
import {useDropzone} from 'react-dropzone'
//import {uuid as uuidv4} from 'uuid';

function Create({accountId}) {
    const [contentType, setContentType] = useState('pdf');
    const [websites, _setWebsites] = useState('');
    const [botId, setBotId] = useState('');
    const [bytes, setBytes] = useState(0);
    const [openAIKeys, _setOpenAiKeys] =  useState([]);
    const [alertStatus, setAlertStatus] = useState('success');
    const [alertMessage, setAlertMessage] = useState('');
    const [dataAdded, setDataAdded] = useState(false);

    //console.log('openAIKeys', openAIKeys, websites);

    const openAIKeysRef = useRef('');
    const websitesRef = useRef('');

    const setOpenAiKeys = value => {
        openAIKeysRef.current = value;
        _setOpenAiKeys(value);
    }

    const setWebsites = value => {
        websitesRef.current = value;
        _setWebsites(value);
    }

    function bytesToSize() {
        const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB']
        if (bytes === 0) return ''
        const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)), 10)
        if (i === 0) return `${bytes} ${sizes[i]}`
        return `${(bytes / (1024 ** i)).toFixed(1)} ${sizes[i]}`
      }

    const handleDeployment = () => {
       
    }

    const updateBotConfig = () => {
        if (!dataAdded) return;

        console.log('update bot config at config.instantchatbot.net', openAIKeysRef.current, websitesRef.current, accountId);

    }

    const setConfig = async botId => {

        /*
         * TODO: Dynamically get available server info
         */

        const ingestServer = 'ingest-1.instantchatbot.net';
        const qdrantServer = 'qdrant-1.instantchatbot.net';
        const appServer = 'app-1.instantchatbot.net';
        
        const request = {
            url: '',
            method: 'post',
            data: {
                ingestServer, qdrantServer, appServer, botId, openAIKeys, websites, accountId
            }
        }

    }

    const onDrop = useCallback( async acceptedFiles => {
        if (!openAIKeysRef.current.length) {
            setAlertStatus('error');
            setAlertMessage('Please enter OpenAI Key before uploading files.');
            return;
        }

        if (!websitesRef.current) {
            setAlertStatus('error');
            setAlertMessage('Please provide at least one website name before uploading files.');
            return;
        }

        /*
         * TODO: Validate that file is an accepted type here
         */

        let workingBotId;

        if (!dataAdded) {
            //workingBotId = uuidv4();
            // await setConfig()
            
        } else workingBotId = botId;

        // get assigned ingestor
        // await submit file to assigned ingestor
        // report ingestor message

        console.log('files', acceptedFiles);

        if (!botId) setBotId(workingBotId);
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
        <Alert status={alertStatus} marginBottom='8px' visibility={alertStatus && alertMessage ? 'visible' : 'hidden'}>
            <AlertIcon />
             {alertMessage}
        </Alert>
        <Container maxW="lg">
        <Flex flexDirection={'column'}>
            <FormControl>
                <Text>
                    OpenAI API Key
                </Text>
                <Input id="medium" size="md" placeholder=" " data-peer 
                    onChange={(e) => {
                        setAlertMessage('');
                        setOpenAiKeys([`${e.target.value}`])
                        updateBotConfig();
                    }}
                        
                />
            </FormControl>
            <Text marginTop="24px">Websites</Text>
            <Textarea value={websites}  color='black' 
                onChange={(e) => {
                    setAlertMessage('');
                    setWebsites(e.target.value);
                    updateBotConfig();
                }}
                  
            />

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