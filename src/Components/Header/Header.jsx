import {
    Avatar,
    Box,
    Button,
    ButtonGroup,
    Container,
    Flex,
    HStack,
    IconButton,
    useBreakpointValue,
    Image
  } from '@chakra-ui/react'
  import { FiHelpCircle, FiMenu, FiSearch, FiSettings } from 'react-icons/fi'
  import InstantChatBotIcon from '../../assets/images/instantChatBotoLogo.svg'
  import { Link } from 'react-router-dom'
  
  export const Header = () => {
    const isDesktop = useBreakpointValue({
      base: false,
      lg: true,
    })
    return (
      <Box
        as="section"
        pb={{
          base: '3',
          md: '3',
        }}
        width="100%"
      >
        <Box as="nav" bg="bg-accent" color="on-accent">
          <Container
            py={{
              base: '3',
              lg: '4',
            }}
          > 
            <Flex flexDirection={{
                sm: 'row',
                lg: 'column'
            }}>
                <Flex marginRight="64px" alignItems='center' justifyContent='center' width="100%">
                        <img src={InstantChatBotIcon} height="64px" width="64px"/>
                        <Box margin="none" padding="none" textAlign="center" fontWeight='700' fontSize='2rem' lineHeight='1.2'>Instant ChatBot</Box>
                </Flex>
                <Flex justify="space-between" >
                <HStack spacing="4">
                    {isDesktop && (
                    <ButtonGroup variant="ghost-on-accent" spacing="1">
                        <Link to="./"><Button>Home</Button></Link>
                        <Link to="./dashboard"><Button>Dashboard</Button></Link>
                        <Link to="./purchase"><Button>Credits</Button></Link>
                        
                        <Link to="./login"><Button>Login</Button></Link>
                        <Link to="./login"><Button>Sign Up</Button></Link>
                    </ButtonGroup>
                    )}
                </HStack>
                {isDesktop ? (
                    <HStack spacing="4">
                    <ButtonGroup variant="ghost-on-accent" spacing="1">
                        <IconButton icon={<FiSearch fontSize="1.25rem" />} aria-label="Search" />
                        <IconButton icon={<FiSettings fontSize="1.25rem" />} aria-label="Settings" />
                        <IconButton icon={<FiHelpCircle fontSize="1.25rem" />} aria-label="Help Center" />
                    </ButtonGroup>
                    
                    </HStack>
                ) : (
                    <IconButton
                    variant="ghost-on-accent"
                    icon={<FiMenu fontSize="1.25rem" />}
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
  