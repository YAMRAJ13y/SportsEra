import React, { useState } from 'react';
import {
  Container,
  Paper,
  Typography,
  Box,
  TextField,
  Button,
  Grid,
  Alert,
  Card,
  CardContent,
} from '@mui/material';
import { Email, Phone, LocationOn, Send } from '@mui/icons-material';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useMutation } from '@tanstack/react-query';
import { contactService } from '../services/contactService';
import { ContactFormData } from '../types';
import toast from 'react-hot-toast';

const schema = yup.object({
  email: yup.string().email('Invalid email').required('Email is required'),
  subject: yup.string().required('Subject is required'),
  message: yup.string().required('Message is required').min(10, 'Message must be at least 10 characters'),
});

const Contact: React.FC = () => {
  const [success, setSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: yupResolver(schema),
  });

  const contactMutation = useMutation({
    mutationFn: (data: ContactFormData) => contactService.createMessage(data),
    onSuccess: (response) => {
      if (response.success) {
        setSuccess(true);
        reset();
        toast.success('Message sent successfully!');
      } else {
        toast.error(response.message || 'Failed to send message');
      }
    },
    onError: () => {
      toast.error('Failed to send message. Please try again.');
    },
  });

  const onSubmit = (data: ContactFormData) => {
    setSuccess(false);
    contactMutation.mutate(data);
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ textAlign: 'center', mb: 6 }}>
        <Typography variant="h3" component="h1" gutterBottom>
          Contact Us
        </Typography>
        <Typography variant="h6" color="text.secondary">
          Get in touch with our team. We'd love to hear from you!
        </Typography>
      </Box>

      <Grid container spacing={4}>
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 4 }}>
            <Typography variant="h5" gutterBottom>
              Send us a Message
            </Typography>
            
            {success && (
              <Alert severity="success" sx={{ mb: 3 }}>
                Thank you for your message! We'll get back to you soon.
              </Alert>
            )}

            <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
              <TextField
                {...register('email')}
                fullWidth
                label="Email Address"
                type="email"
                error={!!errors.email}
                helperText={errors.email?.message}
                sx={{ mb: 3 }}
              />

              <TextField
                {...register('subject')}
                fullWidth
                label="Subject"
                error={!!errors.subject}
                helperText={errors.subject?.message}
                sx={{ mb: 3 }}
              />

              <TextField
                {...register('message')}
                fullWidth
                label="Message"
                multiline
                rows={6}
                error={!!errors.message}
                helperText={errors.message?.message}
                sx={{ mb: 3 }}
              />

              <Button
                type="submit"
                variant="contained"
                size="large"
                endIcon={<Send />}
                disabled={contactMutation.isPending}
                sx={{ px: 4 }}
              >
                {contactMutation.isPending ? 'Sending...' : 'Send Message'}
              </Button>
            </Box>
          </Paper>
        </Grid>

        <Grid item xs={12} md={4}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Email color="primary" sx={{ mr: 2 }} />
                  <Typography variant="h6">Email</Typography>
                </Box>
                <Typography variant="body1" color="text.secondary">
                  info@sportsera.com
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  We'll respond within 24 hours
                </Typography>
              </CardContent>
            </Card>

            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Phone color="primary" sx={{ mr: 2 }} />
                  <Typography variant="h6">Phone</Typography>
                </Box>
                <Typography variant="body1" color="text.secondary">
                  +1 (555) 123-4567
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Mon-Fri 9AM-6PM EST
                </Typography>
              </CardContent>
            </Card>

            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <LocationOn color="primary" sx={{ mr: 2 }} />
                  <Typography variant="h6">Office</Typography>
                </Box>
                <Typography variant="body1" color="text.secondary">
                  123 Sports Street
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  Athletic City, AC 12345
                </Typography>
              </CardContent>
            </Card>

            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Frequently Asked Questions
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Before reaching out, check our FAQ section for quick answers to common questions.
                </Typography>
              </CardContent>
            </Card>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Contact;