import React from 'react';
import {
  Container,
  Paper,
  Typography,
  Box,
  Button,
  Chip,
  Grid,
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  CircularProgress,
  Alert,
  Divider,
} from '@mui/material';
import {
  Event,
  LocationOn,
  People,
  AttachMoney,
  EmojiEvents,
  ArrowBack,
  PersonAdd,
  PersonRemove,
} from '@mui/icons-material';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { format } from 'date-fns';
import { eventService } from '../services/eventService';
import { useAuth } from '../contexts/AuthContext';
import toast from 'react-hot-toast';

const EventDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();
  const queryClient = useQueryClient();

  const { data, isLoading, error } = useQuery({
    queryKey: ['event', id],
    queryFn: () => eventService.getEvent(id!),
    enabled: !!id,
  });

  const applyMutation = useMutation({
    mutationFn: () => eventService.applyForEvent(id!),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['event', id] });
      toast.success('Application submitted successfully!');
    },
    onError: () => {
      toast.error('Failed to apply for event');
    },
  });

  const withdrawMutation = useMutation({
    mutationFn: () => eventService.withdrawFromEvent(id!),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['event', id] });
      toast.success('Withdrawn from event successfully');
    },
    onError: () => {
      toast.error('Failed to withdraw from event');
    },
  });

  const handleApply = () => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    applyMutation.mutate();
  };

  const handleWithdraw = () => {
    withdrawMutation.mutate();
  };

  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error || !data?.data?.event) {
    return (
      <Container sx={{ py: 8 }}>
        <Alert severity="error">
          Event not found or failed to load.
        </Alert>
      </Container>
    );
  }

  const event = data.data.event;
  const canApply = isAuthenticated && 
    !event.isPast && 
    !event.isFull && 
    !event.userParticipationStatus;
  
  const canWithdraw = isAuthenticated && 
    event.userParticipationStatus === 'pending';

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Button
        startIcon={<ArrowBack />}
        onClick={() => navigate('/events')}
        sx={{ mb: 3 }}
      >
        Back to Events
      </Button>

      <Grid container spacing={4}>
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 4 }}>
            {/* Event Header */}
            <Box sx={{ mb: 3 }}>
              <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
                <Chip label={event.sportCategory} color="primary" />
                {event.isPast && <Chip label="Past Event" color="default" />}
                {event.isFull && !event.isPast && <Chip label="Full" color="error" />}
              </Box>
              
              <Typography variant="h4" gutterBottom fontWeight="bold">
                {event.title}
              </Typography>
              
              <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
                Organized by {event.createdBy.fullName}
              </Typography>
            </Box>

            {/* Event Image */}
            {event.eventImage && (
              <Box sx={{ mb: 3 }}>
                <img
                  src={event.eventImage}
                  alt={event.title}
                  style={{
                    width: '100%',
                    height: 'auto',
                    borderRadius: 8,
                    maxHeight: 400,
                    objectFit: 'cover',
                  }}
                />
              </Box>
            )}

            {/* Event Description */}
            <Typography variant="h6" gutterBottom>
              About This Event
            </Typography>
            <Typography variant="body1" sx={{ mb: 4, lineHeight: 1.7 }}>
              {event.description}
            </Typography>

            {/* Event Details */}
            <Typography variant="h6" gutterBottom>
              Event Details
            </Typography>
            <Grid container spacing={2} sx={{ mb: 4 }}>
              <Grid item xs={12} sm={6}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                  <Event color="primary" />
                  <Box>
                    <Typography variant="body2" color="text.secondary">
                      Date & Time
                    </Typography>
                    <Typography variant="body1">
                      {format(new Date(event.dateTime), 'EEEE, MMMM dd, yyyy')}
                    </Typography>
                    <Typography variant="body1">
                      {format(new Date(event.dateTime), 'h:mm a')}
                    </Typography>
                  </Box>
                </Box>
              </Grid>

              <Grid item xs={12} sm={6}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                  <LocationOn color="primary" />
                  <Box>
                    <Typography variant="body2" color="text.secondary">
                      Location
                    </Typography>
                    <Typography variant="body1">
                      {event.location}
                    </Typography>
                  </Box>
                </Box>
              </Grid>

              <Grid item xs={12} sm={6}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                  <People color="primary" />
                  <Box>
                    <Typography variant="body2" color="text.secondary">
                      Participants
                    </Typography>
                    <Typography variant="body1">
                      {event.approvedParticipantsCount} / {event.maxParticipants}
                    </Typography>
                  </Box>
                </Box>
              </Grid>

              {event.entryFee > 0 && (
                <Grid item xs={12} sm={6}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                    <AttachMoney color="primary" />
                    <Box>
                      <Typography variant="body2" color="text.secondary">
                        Entry Fee
                      </Typography>
                      <Typography variant="body1">
                        ₹{event.entryFee}
                      </Typography>
                    </Box>
                  </Box>
                </Grid>
              )}

              {event.prizeMoney > 0 && (
                <Grid item xs={12} sm={6}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                    <EmojiEvents color="primary" />
                    <Box>
                      <Typography variant="body2" color="text.secondary">
                        Prize Money
                      </Typography>
                      <Typography variant="body1">
                        ₹{event.prizeMoney}
                      </Typography>
                    </Box>
                  </Box>
                </Grid>
              )}
            </Grid>
          </Paper>
        </Grid>

        <Grid item xs={12} md={4}>
          {/* Action Card */}
          <Paper sx={{ p: 3, mb: 3 }}>
            <Typography variant="h6" gutterBottom>
              Participation
            </Typography>
            
            {event.userParticipationStatus && (
              <Alert 
                severity={
                  event.userParticipationStatus === 'approved' ? 'success' :
                  event.userParticipationStatus === 'pending' ? 'info' : 'error'
                }
                sx={{ mb: 2 }}
              >
                Your application is {event.userParticipationStatus}
              </Alert>
            )}

            {canApply && (
              <Button
                fullWidth
                variant="contained"
                startIcon={<PersonAdd />}
                onClick={handleApply}
                disabled={applyMutation.isPending}
                sx={{ mb: 2 }}
              >
                {applyMutation.isPending ? 'Applying...' : 'Apply to Participate'}
              </Button>
            )}

            {canWithdraw && (
              <Button
                fullWidth
                variant="outlined"
                color="error"
                startIcon={<PersonRemove />}
                onClick={handleWithdraw}
                disabled={withdrawMutation.isPending}
                sx={{ mb: 2 }}
              >
                {withdrawMutation.isPending ? 'Withdrawing...' : 'Withdraw Application'}
              </Button>
            )}

            {!isAuthenticated && !event.isPast && (
              <Button
                fullWidth
                variant="contained"
                onClick={() => navigate('/login')}
                sx={{ mb: 2 }}
              >
                Login to Participate
              </Button>
            )}

            {event.isPast && (
              <Alert severity="info">
                This event has ended
              </Alert>
            )}

            {event.isFull && !event.isPast && (
              <Alert severity="warning">
                This event is full
              </Alert>
            )}
          </Paper>

          {/* Participants */}
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Participants ({event.approvedParticipantsCount})
            </Typography>
            
            {event.participants.length === 0 ? (
              <Typography variant="body2" color="text.secondary">
                No participants yet
              </Typography>
            ) : (
              <List dense>
                {event.participants
                  .filter(p => p.status === 'approved')
                  .map((participant) => (
                    <ListItem key={participant.id} sx={{ px: 0 }}>
                      <ListItemAvatar>
                        <Avatar
                          src={participant.user.profilePicture}
                          alt={participant.user.fullName}
                        >
                          {participant.user.fullName.charAt(0)}
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        primary={participant.user.fullName}
                        secondary={`Joined ${format(new Date(participant.appliedAt), 'MMM dd')}`}
                      />
                    </ListItem>
                  ))}
              </List>
            )}
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default EventDetail;