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
import { useState } from 'react';
import Signup from './pages/Signup';
function App() {
  const [storageTokens, setStorageTokens] = useState(0);
  const [queryTokens, setQueryTokens] = useState(0);
  const [hasKey, setHasKey] = useState(false);
  const [userName, setUserName] = useState('');
  const [token, setToken] = useState(null);

  console.log('App', userName);

  return (
    <Box backgroundColor='white' height="100vh">
     
        <Header/>
        <Routes>
          <Route path="/" element={<Home />}/>
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
          <Route path="/purchase" element={<Purchase />} />
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
          <Route path="/chatbot" element={<ChatBot />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/create" element={<Create />} />
          
        </Routes>
      
   </Box>
  );
}

export default App;
