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
  const [storageTokens, setStorageTokens] = useState(0);
  const [queryTokens, setQueryTokens] = useState(0);
  const [hasKey, setHasKey] = useState(localStorage.getItem('hasKey') ? JSON.parse(localStorage.getItem('hasKey')) : false);
  const [userName, setUserName] = useState(localStorage.getItem('userName') || '');
  const [token, setToken] = useState(localStorage.getItem('token') ? JSON.parse(localStorage.getItem('token')) : null);

  console.log('App', userName, hasKey, token);


  

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
                setUserName={setUserName}
                setStorageTokens={setStorageTokens}
                setQueryTokens={setQueryTokens}
                setHasKey={setHasKey}
                setToken={setToken}
              />
            } 
          />
          <Route path="/signup" element={<Signup />} />
          <Route path="/purchase" element={!userName ? <Login /> : <Purchase token={token} userName={userName}/>} />
          <Route path="/dashboard" 
            element={
              <Dashboard 
                userName={userName}
                storageTokens={storageTokens}
                queryTokens={queryTokens}
                hasKey={hasKey}
                token={token}
              />
            } 
          
          />
          <Route path="/dashboard/:id" 
            element={
              <Dashboard 
                userName={userName}
                storageTokens={storageTokens}
                queryTokens={queryTokens}
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
                storageTokens={storageTokens}
                queryTokens={queryTokens}
                hasKey={hasKey}
                token={token}
                setHasKey={setHasKey}
                setToken={setToken}
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
