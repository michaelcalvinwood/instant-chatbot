import React, { useState } from 'react'
import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
} from '@chakra-ui/react'
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
    const { isOpen, onOpen, onClose } = useDisclosure()
    const btnRef = React.useRef()
  

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
            <GiHamburgerMenu fontSize={"2rem"} style={{position: 'fixed', top: '.5rem', right: '.5rem', cursor:'pointer'}} ref={btnRef} onClick={onOpen}/>
            <Drawer
        isOpen={isOpen}
        placement='right'
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader textAlign={'center'}>Instant Chatbot</DrawerHeader>

          <DrawerBody>
          <ButtonGroup variant="ghost" spacing="1" display='flex' flexDirection={'column'} alignItems={'center'}>
            <Link to="./"><Button aria-current={pathname === '/' ? 'page' : ''}  onClick={onClose}>Home</Button></Link>
            <Link to={userName ? "./bots" : '/login'}><Button aria-current={pathname === '/bots' ? 'page' : ''} onClick={onClose}>Bots</Button></Link>
            <Link to={userName ? "./create" : '/login'}><Button aria-current={pathname === '/create' ? 'page' : ''} onClick={onClose}>Create</Button></Link>
        
            <Link to={userName ? "./purchase" : '/login'}><Button aria-current={pathname === '/purchase' ? 'page' : ''} onClick={onClose}>Purchase</Button></Link>
            <Link to="./signup"><Button aria-current={pathname === '/signup' ? 'page' : ''} onClick={onClose}>Signup</Button></Link>
            <Link to="./login"><Button aria-current={pathname === '/login' ? 'page' : ''} onClick={onClose}>Login</Button></Link>
            <Link to={userName ? '/account' : '/login'} onClick={onClose}>Settings</Link>
          </ButtonGroup>
          </DrawerBody>

          {/* <DrawerFooter>
            <Button colorScheme='blue' onClick={onClose}>Close</Button>
          </DrawerFooter> */}
        </DrawerContent>
      </Drawer>
            
          </Container>
        </Box>
      </Box>
    )
  }
export default MobileHeader