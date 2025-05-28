import React, { useState } from 'react';
import {
  Container,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Box,
  Chip,
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Pagination,
  CircularProgress,
  Alert,
} from '@mui/material';
import {
  Event,
  LocationOn,
  People,
  AttachMoney,
  EmojiEvents,
  Search,
} from '@mui/icons-material';
import { Link, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { format } from 'date-fns';
import { eventService } from '../services/eventService';
import { useAuth } from '../contexts/AuthContext';
import { SPORT_CATEGORIES } from '../types';

const Events: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [sportCategory, setSportCategory] = useState('');
  const [location, setLocation] = useState('');
  const [upcoming, setUpcoming] = useState(true);

  const { data, isLoading, error } = useQuery({
    queryKey: ['events', page, search, sportCategory, location, upcoming],
    queryFn: () => eventService.getEvents({
      page,
      limit: 12,
      sportCategory: sportCategory || undefined,
      location: location || undefined,
      upcoming,
      sortBy: 'dateTime',
      sortOrder: 'asc',
    }),
  });

  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Container sx={{ py: 8 }}>
        <Alert severity="error">
          Failed to load events. Please try again.
        </Alert>
      </Container>
    );
  }

  const events = data?.data?.events || [];
  const pagination = data?.data?.pagination;

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Header */}
      <Box sx={{ textAlign: 'center', mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Sports Events
        </Typography>
        <Typography variant="h6" color="text.secondary">
          Discover and participate in exciting sports events
        </Typography>
      </Box>

      {/* Filters */}
      <Box sx={{ mb: 4 }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} sm={6} md={3}>
            <TextField
              fullWidth
              placeholder="Search events..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              InputProps={{
                startAdornment: <Search sx={{ mr: 1, color: 'text.secondary' }} />,
              }}
            />
          </Grid>
          
          <Grid item xs={12} sm={6} md={2}>
            <FormControl fullWidth>
              <InputLabel>Sport</InputLabel>
              <Select
                value={sportCategory}
                label="Sport"
                onChange={(e) => setSportCategory(e.target.value)}
              >
                <MenuItem value="">All Sports</MenuItem>
                {SPORT_CATEGORIES.map((sport) => (
                  <MenuItem key={sport} value={sport}>
                    {sport}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={6} md={2}>
            <TextField
              fullWidth
              placeholder="Location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={2}>
            <FormControl fullWidth>
              <InputLabel>Time</InputLabel>
              <Select
                value={upcoming ? 'upcoming' : 'all'}
                label="Time"
                onChange={(e) => setUpcoming(e.target.value === 'upcoming')}
              >
                <MenuItem value="upcoming">Upcoming</MenuItem>
                <MenuItem value="all">All Events</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </Box>

      {/* Events Grid */}
      <Grid container spacing={3}>
        {events.map((event) => (
          <Grid item xs={12} sm={6} md={4} key={event.id}>
            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
              {event.eventImage && (
                <CardMedia
                  component="img"
                  height="200"
                  image={event.eventImage}
                  alt={event.title}
                />
              )}
              
              <CardContent sx={{ flexGrow: 1 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                  <Chip
                    label={event.sportCategory}
                    color="primary"
                    size="small"
                  />
                  {event.isPast && (
                    <Chip
                      label="Past Event"
                      color="default"
                      size="small"
                    />
                  )}
                  {event.isFull && !event.isPast && (
                    <Chip
                      label="Full"
                      color="error"
                      size="small"
                    />
                  )}
                </Box>

                <Typography variant="h6" gutterBottom>
                  {event.title}
                </Typography>

                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    mb: 2,
                  }}
                >
                  {event.description}
                </Typography>

                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, mb: 2 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Event fontSize="small" color="action" />
                    <Typography variant="body2">
                      {format(new Date(event.dateTime), 'MMM dd, yyyy • h:mm a')}
                    </Typography>
                  </Box>

                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <LocationOn fontSize="small" color="action" />
                    <Typography variant="body2">
                      {event.location}
                    </Typography>
                  </Box>

                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <People fontSize="small" color="action" />
                    <Typography variant="body2">
                      {event.approvedParticipantsCount}/{event.maxParticipants} participants
                    </Typography>
                  </Box>

                  {event.entryFee > 0 && (
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <AttachMoney fontSize="small" color="action" />
                      <Typography variant="body2">
                        Entry Fee: ₹{event.entryFee}
                      </Typography>
                    </Box>
                  )}

                  {event.prizeMoney > 0 && (
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <EmojiEvents fontSize="small" color="action" />
                      <Typography variant="body2">
                        Prize: ₹{event.prizeMoney}
                      </Typography>
                    </Box>
                  )}
                </Box>

                <Button
                  fullWidth
                  variant="contained"
                  component={Link}
                  to={`/events/${event.id}`}
                  disabled={event.isPast}
                >
                  {event.isPast ? 'Event Ended' : 'View Details'}
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* No events message */}
      {events.length === 0 && (
        <Box sx={{ textAlign: 'center', py: 8 }}>
          <Typography variant="h6" color="text.secondary">
            No events found
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Try adjusting your search criteria
          </Typography>
        </Box>
      )}

      {/* Pagination */}
      {pagination && pagination.totalPages > 1 && (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
          <Pagination
            count={pagination.totalPages}
            page={page}
            onChange={(_, value) => setPage(value)}
            color="primary"
          />
        </Box>
      )}
    </Container>
  );
};

export default Events;