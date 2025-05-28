import React, { useEffect, useState } from 'react';
import {
  Container,
  Paper,
  Typography,
  Box,
  CircularProgress,
  Alert,
  Button,
} from '@mui/material';
import { CheckCircle, Error } from '@mui/icons-material';
import { useParams, Link } from 'react-router-dom';
import { authService } from '../services/authService';

const VerifyEmail: React.FC = () => {
  const { token } = useParams<{ token: string }>();
  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const verifyEmail = async () => {
      if (!token) {
        setError('Invalid verification link');
        setLoading(false);
        return;
      }

      try {
        const response = await authService.verifyEmail(token);
        if (response.success) {
          setSuccess(true);
        } else {
          setError(response.message || 'Email verification failed');
        }
      } catch (err) {
        setError('Email verification failed. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    verifyEmail();
  }, [token]);

  return (
    <Container component="main" maxWidth="sm" sx={{ py: 8 }}>
      <Paper elevation={3} sx={{ p: 4, textAlign: 'center' }}>
        {loading ? (
          <Box>
            <CircularProgress sx={{ mb: 2 }} />
            <Typography variant="h6">
              Verifying your email...
            </Typography>
          </Box>
        ) : success ? (
          <Box>
            <CheckCircle sx={{ fontSize: 64, color: 'success.main', mb: 2 }} />
            <Typography variant="h5" gutterBottom>
              Email Verified Successfully!
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
              Your email has been verified. You can now access all features of SportsEra.
            </Typography>
            <Button
              variant="contained"
              component={Link}
              to="/login"
              size="large"
            >
              Continue to Login
            </Button>
          </Box>
        ) : (
          <Box>
            <Error sx={{ fontSize: 64, color: 'error.main', mb: 2 }} />
            <Typography variant="h5" gutterBottom>
              Verification Failed
            </Typography>
            <Alert severity="error" sx={{ mb: 3 }}>
              {error}
            </Alert>
            <Button
              variant="outlined"
              component={Link}
              to="/login"
              size="large"
            >
              Back to Login
            </Button>
          </Box>
        )}
      </Paper>
    </Container>
  );
};

export default VerifyEmail;