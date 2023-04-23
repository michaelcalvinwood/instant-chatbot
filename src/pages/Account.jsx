import { Container, Heading } from "@chakra-ui/react";
import React from "react";

const Account = ({userName}) => {

    return (
        <Container>
            <Heading textAlign="center" marginBottom='0px'>Dashboard</Heading>
            <Heading as='h2' size='md' noOfLines={1} textAlign={'center'} marginTop='0' marginBottom='36px' color='navy'>
                {userName}
            </Heading>
            
        </Container>
    )

}

export default Account;