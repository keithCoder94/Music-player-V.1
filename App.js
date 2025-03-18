import React from 'react';
import LogOut from './components/LogOut';
import './App.css';
import ErrorBoundary from './components/ErrorBoundary';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginForm from './components/LoginForm';
import SignUpForm from './components/SignUpForm';
import ResetPassword from './components/ResetPassword';
import MusicPlayer from "./components/MusicPlayer"
function App() {
  return (
    <ErrorBoundary>
    <Router>
      <Routes>
        <Route path="/" element={<SignUpForm />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/MusicPlayer" element={<MusicPlayer />} />
        <Route path="/SignUp" element={<SignUpForm/>}/>
        <Route path='/ResetPassword' element={<ResetPassword/>}/>
        
        
        
        
        <Route path="/LogOut" element={<LogOut />} />
        
      </Routes>
    </Router>
  </ErrorBoundary>
  );
}

export default App;
