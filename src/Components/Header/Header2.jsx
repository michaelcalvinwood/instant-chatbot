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

export const Header = ({userName}) => {
  let location = useLocation();
  let {pathname} = location;

  let login = false;
  let signup = false;

  const query = qs.parse(window.location.search.substring(1));
  
  if (pathname === '/login') {
    if (typeof query.signup !== 'undefined') signup = true;
    else login = true;
  }



  const isDesktop = window.innerWidth > 600 ? true : false;
  console.log('window.innerWidth', window.innerWidth)

  console.log('isDesktop',isDesktop)
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
        <Flex flexDirection={'column'}>
          <Flex flexDirection={'row'} marginRight="64px" alignItems='center' justifyContent='center' width="100%">
                        <img src={InstantChatBotIcon} height="64px" width="64px"/>
                        <Box margin="none" padding="none" textAlign="center" fontWeight='700' fontSize='2rem' lineHeight='1.2'>Instant ChatBot</Box>
                </Flex>
       
          <Text fontSize={'.75rem'} fontStyle='italic' textAlign={'center'}>by Michael Wood</Text>
          <Flex justify="space-between" >
            <HStack spacing="4">
              
              {isDesktop && (
                <ButtonGroup variant="ghost" spacing="1" >
                  <Link to="./"><Button aria-current={pathname === '/' ? 'page' : ''}>Home</Button></Link>
                  <Link to={userName ? "./bots" : '/login'}><Button aria-current={pathname === '/bots' ? 'page' : ''}>Bots</Button></Link>
                  <Link to={userName ? "./create" : '/login'}><Button aria-current={pathname === '/create' ? 'page' : ''}>Create</Button></Link>
              
                  <Link to={userName ? "./purchase" : '/login'}><Button aria-current={pathname === '/purchase' ? 'page' : ''}>Purchase</Button></Link>
                  <Link to="./signup"><Button aria-current={pathname === '/signup' ? 'page' : ''}>Signup</Button></Link>
                  <Link to="./login"><Button aria-current={pathname === '/login' ? 'page' : ''}>Login</Button></Link>
                </ButtonGroup>
              )}
            </HStack>
            {isDesktop ? (
              <HStack spacing="4">
                <ButtonGroup variant="ghost" spacing="1">
                  {/* <IconButton icon={<FiSearch fontSize="1.25rem" />} aria-label="Search" /> */}
                  <Link to={userName ? '/account' : '/login'}><IconButton icon={<FiSettings fontSize="1.25rem" />} aria-label="Settings" /></Link>
                  {/* <Link to='./faq'><IconButton icon={<FiHelpCircle fontSize="1.25rem" />} aria-label="Help Center" /></Link> */}
                </ButtonGroup>
              </HStack>
            ) : (
              <IconButton
                variant="ghost"
                icon={<FiMenu fontSize="1.25rem" color="black"/>}
                aria-label="Open Menu"
              />
            )}
          </Flex>
        </Flex>
        </Container>
      </Box>
    </Box>
  )
}