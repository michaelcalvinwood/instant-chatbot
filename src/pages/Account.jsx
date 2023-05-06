import { Alert, AlertIcon, Button, Container, Heading } from "@chakra-ui/react";
import React, {useState} from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";

const Account = ({userName, token}) => {
    const navigate = useNavigate();
    const [alertStatus, setAlertStatus] = useState('success');
    const [alertMessage, setAlertMessage] = useState('');

    const deleteAccount = () => {
        const request = {
            url: `https://admin.instantchatbot.net:6200/deleteAccount`,
            method: 'post',
            data: {
                userToken: token
            }
        }
        setAlertMessage('');

        axios(request)
        .then(response => {
            console.log(response.data);
            navigate('/');
        })
        .catch(error => {
            console.error(error);
            setAlertStatus('error');
            setAlertMessage('Could not delete account. Please try again later.');
        })
    }

    return (
        <Container>
            <Alert status={alertStatus} marginBottom={'0'} visibility={alertStatus && alertMessage ? 'visible' : 'hidden'}>
            <AlertIcon />
                {alertMessage}
            </Alert>
            <Heading textAlign="center" marginBottom='0px'>Account</Heading>
            <Heading as='h2' size='md' noOfLines={1} textAlign={'center'} marginTop='0' marginBottom='36px' color='navy'>
                {userName}
            </Heading>
            <Button margin='auto' display='block' onClick={deleteAccount}>Delete Account</Button>
            
        </Container>
    )

}

export default Account;