import logo from './logo.svg';
import './App.css';
import { Container, Heading } from '@chakra-ui/react';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Purchase from './pages/Purchase';
import Dashboard from './pages/Dashboard';
import ChatBot from './pages/ChatBot';
import { Header } from './Components/Header/Header';

function App() {
  return (
    <div>
     
        <Header/>
        <Routes>
          <Route path="/" element={<Home />}/>
          <Route path="/login" element={<Login />} />
          <Route path="/purchase" element={<Purchase />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/chatbot" element={<ChatBot />} />
          
        </Routes>
      
   </div>
  );
}

export default App;
