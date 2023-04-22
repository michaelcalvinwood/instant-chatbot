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


  return (
    <Box backgroundColor='white' height="100vh">
     
        <Header/>
        <Routes>
          <Route path="/" element={<Home />}/>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/purchase" element={<Purchase />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/chatbot" element={<ChatBot />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/create" element={<Create />} />
          
        </Routes>
      
   </Box>
  );
}

export default App;
