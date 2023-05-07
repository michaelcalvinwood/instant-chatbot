
import React, { useState, useCallback, useEffect, useRef } from 'react'
import { Box, Container, Heading, FormControl, FormLabel, Input, Stack, Text, Flex, Select, Button, Textarea, Alert, AlertIcon, UnorderedList, ListItem, Spinner } from '@chakra-ui/react'
import {useDropzone} from 'react-dropzone'
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import {v4 as uuidv4} from 'uuid';

function Create({storageTokens, queryTokens, userName, hasKey, token, setHasKey, setToken}) {
    const [contentType, setContentType] = useState('pdf');
    const [botId, setBotId] = useState('');
    const [bytes, setBytes] = useState(0);
    const [openAIKeys, _setOpenAiKeys] =  useState([]);
    const [alertStatus, setAlertStatus] = useState('success');
    const [alertMessage, setAlertMessage] = useState('');
    const [dataAdded, setDataAdded] = useState(false);
    const [deployable, setDeployable] = useState(false);
    const [botName, _setBotName] = useState('');
    const [infoUploaded, setInfoUploaded] = useState(false);
    const [showSpinner, setShowSpinner] = useState(false);

    const navigate = useNavigate();

    //console.log('openAIKeys', openAIKeys, websites);

    const openAIKeysRef = useRef('');
    const websitesRef = useRef('');
    const botNameRef = useRef('');

    const setOpenAiKeys = value => {
        openAIKeysRef.current = value;
        _setOpenAiKeys(value);
    }



    const setBotName = value => {
        botNameRef.current = value;
        _setBotName(value);
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

        console.log('update bot config at config.instantchatbot.net', openAIKeysRef.current, websitesRef.current);

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
                ingestServer, qdrantServer, appServer, botId, openAIKeys, websites: '', userName
            }
        }

    }

    const setOpenAIKey = async () => {
        const debug = true;

        if (!openAIKeys.length || !openAIKeys[0]) return;
        setAlertMessage('');
        
        // test the key
        let request = {
            url: `https://api.openai.com/v1/moderations`,
            method: 'post',
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${openAIKeys[0]}`
            },
            data: {
                input: 'Who is Julio Iglesius?'
            }
        }

       
        let response;
        try {
            console.log('trying now');
            response = await axios(request);
            console.log(response.data);
        } catch (err) {
            console.error('the error', err);
            setAlertStatus('error');
            setAlertMessage('Could not validate your OpenAI Key. Please make sure that it is correct.');
            return;
        }

        request = {
            url: `https://admin.instantchatbot.net:6200/setKey`,
            method: 'post',
            data: {
                token, key: openAIKeys[0]
            }
        }

        try {
            response = await axios(request);
        } catch (err) {
            setAlertStatus('error');
            setAlertMessage('Database Error: Could not store OpenAI Key. Please try again later.');
            return;
        }

        const info = response.data;
        console.log('setting token and hasKey');
        localStorage.setItem('token', JSON.stringify(info.token));
        localStorage.setItem('hasKey', JSON.stringify(true));
        setToken(info.token);
        setHasKey(true);

    }

    const onDrop = useCallback( async acceptedFiles => {
        setAlertMessage('');

        if (!botNameRef.current) {
            setAlertStatus('error');
            setAlertMessage('Please enter a name for your bot before uploading files.');
            return;
        }

        if (!websitesRef.current) {
            setAlertStatus('error');
            setAlertMessage('Please provide at least one website name before uploading files.');
            return;
        }

        if (contentType === 'pdf' && acceptedFiles[0].type !== 'application/pdf') {
            setAlertStatus('error');
            setAlertMessage('Please submit a PDF file.');
            return;
        }

        setShowSpinner(true);

        let request = {
            url: 'https://admin.instantchatbot.net:6200/newBot',
            method: 'post',
            data: {
                token,
                botName: botNameRef.current,
                websites: websitesRef.current
            }
        }

        let response;

        try {
            response = await axios(request)
        } catch (err) {
            console.error(err);
            setAlertStatus('error');
            setAlertMessage('Server error. Unable to assign new bot. Please try again later.');
            setShowSpinner(false);
            return;
        }

        const {botToken, serverSeries} = response.data;
        const theBotId = response.data.botId;
      

        console.log(`upload files to: https://ingest-${serverSeries}.instantchatbot.net`);
        console.log('files', acceptedFiles[0].name, acceptedFiles);

        const newFileName =  `${uuidv4()}--${acceptedFiles[0].name.replaceAll('--', '-')}`;

        request = {
            url: `https://ingest-${serverSeries}.instantchatbot.net:6201/presignedUrl?bt=${botToken}`,
            method: 'post',
            data: {
                fileName: newFileName
            }
        }

        try {
            response = await axios(request);
        } catch(err) {
            console.error(err);
            setAlertStatus('error');
            setAlertMessage('Server error. Unable to get authorization to upload file. Please try again later');
            setShowSpinner(false);
            return;
        }

        const url = response.data;

        var file = acceptedFiles[0];
        
        var options = {
            headers: {
            'Content-Type': file.type,
            'x-amz-acl': 'public-read'
                }
            };

            try {
                response = await axios.put(url, file, options);
            }
            catch(err) {
                console.error(err);
                setAlertStatus('error');
                setAlertMessage('Server error. Unable to upload pdf. Please try again later.');
                setShowSpinner(false);
                return;
            }
        
        console.log('url',url);

        request = {
            url: `https://ingest-${serverSeries}.instantchatbot.net:6201/ingestS3Pdf?bt=${botToken}`,
            method: 'post',
            data: {
                url: `https://instantchatbot.nyc3.digitaloceanspaces.com/${theBotId}/${newFileName}`
            }
        }

        try {
            response = await axios(request);
        } catch(err) {
            console.error(err);
            setAlertStatus('error');
            setAlertMessage('Server error. Unable to process pdf. Please try again later.');
            setShowSpinner(false);
            return;
        }

        setShowSpinner(false);
        setBotName('');
        

        //setBotId(theBotId);

        navigate(`/bots/${theBotId}`)
        return;
      })
    const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})



    if (!hasKey) {
        return (
            <Container backgroundColor='white'>
                <Heading as='h1' textAlign="center">Create Bot</Heading>
                <Heading as='h2' size='md' color='navy' textAlign='center'>OpenAI Key Needed</Heading>
                <Alert status={alertStatus} marginBottom={'0'} visibility={alertStatus && alertMessage ? 'visible' : 'hidden'}>
                    <AlertIcon />
                        {alertMessage}
                    </Alert>
                <Text>The Instant Chatbot service requires each customer to provide their own OpenAI Key for savings, security, and stability.</Text>
                <UnorderedList paddingLeft="1rem">
                    <ListItem>
                        <strong>Savings:</strong> Our service converts your content into neurological strands to be stored in our neural network. When your visitors ask questions, our servers find the matching information on the neural network and serve that information to OpenAI so that it can provide a response. Therefore, you only pay us for storing your content in our neural network, and pay for the queries used to extract information from our neural network. With this model, many companies can run state-of-the-art chatbots for only $5/month (excluding OpenAI fees).</ListItem>
                    <ListItem> <strong>Security:</strong> If another customer makes unallowed requests (such as hate speech), OpenAI will terminate their access. In this case, only their API key is terminated. Your access remains secure. Please note that we have safeguards to protect your API key from being used for unallowed requests. Providing your own API key protects you against another company who disables our safeguards.
                    </ListItem>
                    <ListItem><strong>Stability:</strong> OpenAI limits the rate at which each API key can access their service. By providing your own key, your access cannot be reduced by another customer's excessive traffic.</ListItem>
                </UnorderedList>
                <Text>You can <Link to="https://platform.openai.com/signup" target="_blank"><span style={{color: 'navy', textDecoration: 'underline'}}>get an OpenAI key for free</span>.</Link> OpenAI also gifts an initial credit so that you can starting using their service free of charge as well.</Text>
                <FormControl>
                    <Text marginTop='1.25rem' textAlign='center'>
                        <strong>Your OpenAI Key</strong>
                    </Text>
                    <Input id="medium" size="md" placeholder=" " data-peer width='35rem' display='block' margin='.25rem auto' 
                        onChange={(e) => {
                            setAlertMessage('');
                            setOpenAiKeys([`${e.target.value}`])
                        }}
                            
                    />
            </FormControl>
            <Button display="block" margin="1rem auto" variant="primary" onClick={setOpenAIKey}>Submit</Button>
            </Container>
        )
    }

  return (
    
    <Container backgroundColor='white'>
        <Heading as='h1' textAlign="center">Create Bot</Heading>
        
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
        { !botId && <Flex flexDirection={'column'}>
            <FormControl>
                <Text>
                    Give your bot a name:
                </Text>
                <Input id="medium" size="md" placeholder=" " data-peer  value={botName}
                    onChange={(e) => {
                        setAlertMessage('');
                        setBotName(e.target.value)
                        updateBotConfig();
                    }}
                        
                />
            </FormControl>
           
            <Text marginTop="24px">Load Content:</Text>
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
        </Flex> }
        {/* {botId && <>
            <Box border='1px solid navy' borderRadius='8px' padding='.25rem 1rem'>       
                <Text marginTop="12px" textAlign={'center'} fontWeight={'bold'}>head</Text>
                <Text marginBottom="6px">{`<link rel="stylesheet" href="https://instantchatbot.net/bot/${botId}/instantchatbot.css?v=1">`}</Text>
                <Text textAlign={'center'} fontWeight={'bold'}>body</Text>
                <Text>{`<script src="https://instantchatbot.net/bot/${botId}/instantchatbot.js?v=1"><script>`}</Text>
            </Box>
            <Link to={`/bots/${botId}/?add=true`}>
                <Button colorScheme="blue" display='block' margin='0 auto'>Add More Data</Button>
            </Link>
        </>
        } */}
        </Container>
    </Box>
    {showSpinner && <Box height='100vh' width="100vw" position='fixed' top='0' left='0' display='flex' justifyContent={'center'} alignItems={'center'}>
        <Spinner size='xl' color='navy'/>
    </Box> }
    </Container>
    

  )
}

export default Create