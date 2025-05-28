import React from 'react';
import {
  Container,
  Typography,
  Box,
  Grid,
  Card,
  CardContent,
  Paper,
  List,
  ListItem,
  ListItemText,
  Chip,
  Button,
} from '@mui/material';
import {
  People,
  PostAdd,
  Event,
  Message,
  TrendingUp,
  Warning,
} from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { adminService } from '../../services/adminService';

const AdminDashboard: React.FC = () => {
  const { data: stats } = useQuery({
    queryKey: ['admin-stats'],
    queryFn: () => adminService.getStats(),
  });

  const { data: recentActivity } = useQuery({
    queryKey: ['admin-recent-activity'],
    queryFn: () => adminService.getRecentActivity(),
  });

  const statsData = stats?.data || {
    totalUsers: 0,
    totalPosts: 0,
    totalEvents: 0,
    pendingMessages: 0,
    newUsersThisMonth: 0,
    activeEvents: 0,
  };

  const statCards = [
    {
      title: 'Total Users',
      value: statsData.totalUsers,
      icon: <People sx={{ fontSize: 40 }} />,
      color: 'primary.main',
      link: '/admin/users',
    },
    {
      title: 'Total Posts',
      value: statsData.totalPosts,
      icon: <PostAdd sx={{ fontSize: 40 }} />,
      color: 'success.main',
      link: '/admin/posts',
    },
    {
      title: 'Total Events',
      value: statsData.totalEvents,
      icon: <Event sx={{ fontSize: 40 }} />,
      color: 'info.main',
      link: '/admin/events',
    },
    {
      title: 'Pending Messages',
      value: statsData.pendingMessages,
      icon: <Message sx={{ fontSize: 40 }} />,
      color: 'warning.main',
      link: '/admin/messages',
    },
  ];

  const quickStats = [
    {
      label: 'New Users This Month',
      value: statsData.newUsersThisMonth,
      icon: <TrendingUp />,
    },
    {
      label: 'Active Events',
      value: statsData.activeEvents,
      icon: <Event />,
    },
  ];

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>
        Admin Dashboard
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
        Welcome to the SportsEra admin panel. Here's an overview of your platform.
      </Typography>

      {/* Main Stats */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {statCards.map((stat, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Card
              component={Link}
              to={stat.link}
              sx={{
                textDecoration: 'none',
                transition: 'transform 0.2s',
                '&:hover': { transform: 'translateY(-4px)' },
              }}
            >
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Box sx={{ color: stat.color, mr: 2 }}>
                    {stat.icon}
                  </Box>
                  <Box>
                    <Typography variant="h4" fontWeight="bold">
                      {stat.value}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {stat.title}
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Grid container spacing={3}>
        {/* Quick Stats */}
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Quick Stats
            </Typography>
            {quickStats.map((stat, index) => (
              <Box key={index} sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Box sx={{ color: 'primary.main', mr: 2 }}>
                  {stat.icon}
                </Box>
                <Box>
                  <Typography variant="h6">{stat.value}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    {stat.label}
                  </Typography>
                </Box>
              </Box>
            ))}
          </Paper>
        </Grid>

        {/* Recent Activity */}
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Recent Activity
            </Typography>
            {recentActivity?.data?.length > 0 ? (
              <List>
                {recentActivity.data.slice(0, 5).map((activity: any, index: number) => (
                  <ListItem key={index} divider>
                    <ListItemText
                      primary={activity.description}
                      secondary={activity.timestamp}
                    />
                    <Chip
                      label={activity.type}
                      size="small"
                      color={
                        activity.type === 'user' ? 'primary' :
                        activity.type === 'post' ? 'success' :
                        activity.type === 'event' ? 'info' : 'default'
                      }
                    />
                  </ListItem>
                ))}
              </List>
            ) : (
              <Typography variant="body2" color="text.secondary">
                No recent activity
              </Typography>
            )}
          </Paper>
        </Grid>
      </Grid>

      {/* Quick Actions */}
      <Paper sx={{ p: 3, mt: 3 }}>
        <Typography variant="h6" gutterBottom>
          Quick Actions
        </Typography>
        <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
          <Button
            variant="contained"
            component={Link}
            to="/admin/events/create"
            startIcon={<Event />}
          >
            Create Event
          </Button>
          <Button
            variant="outlined"
            component={Link}
            to="/admin/users"
            startIcon={<People />}
          >
            Manage Users
          </Button>
          <Button
            variant="outlined"
            component={Link}
            to="/admin/posts"
            startIcon={<PostAdd />}
          >
            Moderate Posts
          </Button>
          <Button
            variant="outlined"
            component={Link}
            to="/admin/messages"
            startIcon={<Message />}
            color={statsData.pendingMessages > 0 ? 'warning' : 'primary'}
          >
            View Messages
            {statsData.pendingMessages > 0 && (
              <Chip
                label={statsData.pendingMessages}
                size="small"
                color="error"
                sx={{ ml: 1 }}
              />
            )}
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default AdminDashboard;