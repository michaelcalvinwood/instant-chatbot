import logo from './logo.svg';
import './App.css';
import { Box, Container, Heading } from '@chakra-ui/react';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Purchase from './pages/Purchase';
import Dashboard from './pages/Dashboard';
import ChatBot from './pages/ChatBot';
import { Header } from './Components/Header/Header2';
import Settings from './pages/Settings';
import FAQ from './pages/FAQ';
import Create from './pages/Create';
import { useEffect, useState } from 'react';
import Signup from './pages/Signup';
import Account from './pages/Account';
function App() {
  const [hasKey, setHasKey] = useState(localStorage.getItem('hasKey') ? JSON.parse(localStorage.getItem('hasKey')) : false);
  const [userName, setUserName] = useState(localStorage.getItem('userName') || '');
  const [userId, setUserId] = useState(localStorage.getItem('userId') || '');
  const [token, setToken] = useState(localStorage.getItem('token') ? JSON.parse(localStorage.getItem('token')) : null);
  const [serverSeries, setServerSeries] = useState(1);
  const [availableCredits, setAvailableCredits] = useState(0);

  console.log('App', userName, hasKey, token);

  const setAll = (theUserId, theUserName, theToken, theHasKey, serverSeries) => {
    console.log('App setAll');
    setUserId(theUserId);
    setUserName(theUserName);
    setToken(theToken);
    setHasKey(theHasKey);
    setServerSeries(serverSeries);
  }

  return (
    <Box backgroundColor='white' height="100vh">
     
        <Header 
          userName={userName}
        />
        <Routes>
          <Route path="/login" 
            element={
              <Login 
                userName={userName}
                setAll={setAll}
              />
            } 
          />
          <Route path="/signup" element={<Signup setAll={setAll} />} />
          <Route path="/purchase" element={!userName ? <Login /> : <Purchase token={token} userName={userName}/>} />
          <Route path="/bots" 
            element={
              <Dashboard 
                userName={userName}
                hasKey={hasKey}
                token={token}
              />
            } 
          
          />
          <Route path="/bots/:id" 
            element={
              <Dashboard 
                userName={userName}
                
                hasKey={hasKey}
                token={token}
              />
            } 
          
          />
          <Route path="/chatbot" element={<ChatBot />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/create" 
            element={ !userName ? <Login /> :
              <Create 
                userName={userName}
                hasKey={hasKey}
                token={token}
                setHasKey={setHasKey}
                setToken={setToken}
                serverSeries={serverSeries}
                availableCredits={availableCredits}
                setAvailableCredits={setAvailableCredits}
              />
            } 
          
          />
          <Route path="/account" element={!userName ? <Login /> : <Account userName={userName} token={token}/>} />
          <Route path="/" element={<Home />}/>
          
        </Routes>
      
   </Box>
  );
}

export default App;
