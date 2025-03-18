import React, { useState } from 'react';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../config/firebase';
import { useNavigate } from 'react-router-dom';
import { Container, TextField, Button, Typography, Box, CircularProgress } from '@mui/material';

const ResetPassword = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

  const handleResetPassword = async () => {
    if (!email) {
      setErrorMessage('Please enter your email address.');
      return;
    }

    setLoading(true);
    setErrorMessage('');
    setSuccessMessage('');

    try {
      await sendPasswordResetEmail(auth, email);
      setSuccessMessage('Password reset email sent! Please check your inbox.');
      setEmail('');
    } catch (error) {
      console.error('Error resetting password: ', error);
      setErrorMessage('Failed to send reset email. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container
      maxWidth="sm"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        background: 'linear-gradient(to right, #ff7e5f, #feb47b)',
        padding: 4,
        borderRadius: 2,
      }}
    >
      <Typography variant="h4" gutterBottom sx={{ color: '#fff' }}>
        Reset Your Password
      </Typography>
      <Typography variant="body1" sx={{ color: '#fff', marginBottom: 2 }}>
        Enter your email address to receive a password reset link.
      </Typography>

      {/* Success or Error Message */}
      {successMessage && (
        <Box sx={{ marginBottom: 2, color: 'green', fontWeight: 'bold' }}>
          {successMessage}
        </Box>
      )}
      {errorMessage && (
        <Box sx={{ marginBottom: 2, color: 'red', fontWeight: 'bold' }}>
          {errorMessage}
        </Box>
      )}

      {/* Email Input */}
      <TextField
        label="Email Address"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        variant="outlined"
        fullWidth
        margin="normal"
        sx={{ backgroundColor: '#fff', borderRadius: 1 }}
      />

      {/* Reset Button */}
      <Button
        onClick={handleResetPassword}
        variant="contained"
        color="primary"
        fullWidth
        sx={{ marginTop: 2 }}
        disabled={loading}
      >
        {loading ? <CircularProgress size={24} color="inherit" /> : 'Reset Password'}
      </Button>

      {/* Back to Login */}
      <Box sx={{ marginTop: 3, textAlign: 'center' }}>
        <Button onClick={() => navigate('/LoginForm')} sx={{ color: '#fff' }}>
          Back to Login
        </Button>
      </Box>
    </Container>
  );
};

export default ResetPassword;
