import React from 'react'

import {
    Avatar,
    Box,
    Button,
    ButtonGroup,
    Container,
    Flex,
    HStack,
    IconButton,
    Text,
    useBreakpointValue,
  } from '@chakra-ui/react'
  import { FiHelpCircle, FiMenu, FiSearch, FiSettings } from 'react-icons/fi'
  import { Logo } from './Logo'
  import { useLocation } from 'react-router-dom';
  import { Link } from 'react-router-dom';
  import InstantChatBotIcon from '../../assets/images/instantChatBotoLogo.svg'
  import * as qs from 'qs';
  import { GiHamburgerMenu } from 'react-icons/gi';

  export const MobileHeader = ({userName}) => {
    let location = useLocation();
    let {pathname} = location;
  
    let login = false;
    let signup = false;
  
    const query = qs.parse(window.location.search.substring(1));
    
    if (pathname === '/login') {
      if (typeof query.signup !== 'undefined') signup = true;
      else login = true;
    }
  
    return (
      <Box
        as="section"
        pb={{
          base: '4',
          md: '4',
        }}
      >
        <Box as="nav" bg="bg-surface" boxShadow="sm">
          <Container
            py={{
              base: '3',
              lg: '4',
            }}
          >
            <Flex flexDirection={'row'} marginRight="64px" alignItems='center' justifyContent='center' width="100%">
                <img src={InstantChatBotIcon} height="64px" width="64px"/>
                <Box margin="none" padding="none" textAlign="center" fontWeight='700' fontSize='2rem' lineHeight='1.2'>Instant ChatBot</Box>
            </Flex>
            <GiHamburgerMenu fontSize={"2rem"} style={{position: 'fixed', top: '.5rem', right: '.5rem'}}/>
            
          </Container>
        </Box>
      </Box>
    )
  }
export default MobileHeader