import React from 'react';
import {
  Container,
  Typography,
  Box,
  Grid,
  Card,
  CardContent,
  Avatar,
  Paper,
} from '@mui/material';
import {
  Sports,
  People,
  EmojiEvents,
  TrendingUp,
  Favorite,
  Security,
} from '@mui/icons-material';

const About: React.FC = () => {
  const features = [
    {
      icon: <Sports sx={{ fontSize: 40 }} />,
      title: 'Sports Community',
      description: 'Connect with fellow sports enthusiasts from around the world and share your passion for athletics.',
    },
    {
      icon: <People sx={{ fontSize: 40 }} />,
      title: 'Team Building',
      description: 'Find teammates, create teams, and participate in group activities and competitions.',
    },
    {
      icon: <EmojiEvents sx={{ fontSize: 40 }} />,
      title: 'Events & Tournaments',
      description: 'Participate in exciting sports events, tournaments, and competitions organized by the community.',
    },
    {
      icon: <TrendingUp sx={{ fontSize: 40 }} />,
      title: 'Track Progress',
      description: 'Monitor your sports journey, achievements, and connect with others who share your goals.',
    },
    {
      icon: <Favorite sx={{ fontSize: 40 }} />,
      title: 'Passion Driven',
      description: 'Built by sports lovers for sports lovers. We understand what drives athletic communities.',
    },
    {
      icon: <Security sx={{ fontSize: 40 }} />,
      title: 'Safe Environment',
      description: 'Enjoy a secure and moderated platform where sportsmanship and respect are our top priorities.',
    },
  ];

  const team = [
    {
      name: 'Alex Johnson',
      role: 'Founder & CEO',
      description: 'Former professional athlete with 15+ years in sports management.',
      avatar: '/api/placeholder/150/150',
    },
    {
      name: 'Sarah Chen',
      role: 'Head of Community',
      description: 'Sports psychologist passionate about building inclusive athletic communities.',
      avatar: '/api/placeholder/150/150',
    },
    {
      name: 'Mike Rodriguez',
      role: 'Technical Lead',
      description: 'Full-stack developer and weekend warrior in multiple sports.',
      avatar: '/api/placeholder/150/150',
    },
  ];

  const stats = [
    { number: '10,000+', label: 'Active Users' },
    { number: '500+', label: 'Events Hosted' },
    { number: '50+', label: 'Sports Categories' },
    { number: '25+', label: 'Countries' },
  ];

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Hero Section */}
      <Box sx={{ textAlign: 'center', mb: 8 }}>
        <Typography variant="h2" component="h1" gutterBottom fontWeight="bold">
          About SportsEra
        </Typography>
        <Typography variant="h5" color="text.secondary" sx={{ maxWidth: 800, mx: 'auto' }}>
          We're building the world's largest community of sports enthusiasts, 
          connecting athletes, fans, and organizers in one unified platform.
        </Typography>
      </Box>

      {/* Mission Section */}
      <Paper sx={{ p: 6, mb: 8, background: 'linear-gradient(135deg, #f5f5f5 0%, #e0e0e0 100%)' }}>
        <Grid container spacing={4} alignItems="center">
          <Grid item xs={12} md={6}>
            <Typography variant="h3" gutterBottom>
              Our Mission
            </Typography>
            <Typography variant="h6" color="text.secondary" sx={{ mb: 3 }}>
              To democratize sports participation and create meaningful connections 
              through shared athletic experiences.
            </Typography>
            <Typography variant="body1" sx={{ lineHeight: 1.8 }}>
              At SportsEra, we believe that sports have the power to bring people together, 
              build character, and create lasting friendships. Our platform is designed to 
              break down barriers and make sports accessible to everyone, regardless of 
              skill level or background.
            </Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box sx={{ textAlign: 'center' }}>
              <Sports sx={{ fontSize: 200, color: 'primary.main', opacity: 0.7 }} />
            </Box>
          </Grid>
        </Grid>
      </Paper>

      {/* Stats Section */}
      <Box sx={{ mb: 8 }}>
        <Typography variant="h3" textAlign="center" gutterBottom>
          Our Impact
        </Typography>
        <Grid container spacing={4} sx={{ mt: 2 }}>
          {stats.map((stat, index) => (
            <Grid item xs={6} md={3} key={index}>
              <Box sx={{ textAlign: 'center' }}>
                <Typography variant="h3" color="primary.main" fontWeight="bold">
                  {stat.number}
                </Typography>
                <Typography variant="h6" color="text.secondary">
                  {stat.label}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Features Section */}
      <Box sx={{ mb: 8 }}>
        <Typography variant="h3" textAlign="center" gutterBottom>
          What We Offer
        </Typography>
        <Typography variant="h6" textAlign="center" color="text.secondary" sx={{ mb: 6 }}>
          Everything you need to connect, compete, and grow in your sports journey
        </Typography>
        
        <Grid container spacing={4}>
          {features.map((feature, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card sx={{ height: '100%', textAlign: 'center', p: 2 }}>
                <CardContent>
                  <Box sx={{ color: 'primary.main', mb: 2 }}>
                    {feature.icon}
                  </Box>
                  <Typography variant="h6" gutterBottom>
                    {feature.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {feature.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Team Section */}
      <Box sx={{ mb: 8 }}>
        <Typography variant="h3" textAlign="center" gutterBottom>
          Meet Our Team
        </Typography>
        <Typography variant="h6" textAlign="center" color="text.secondary" sx={{ mb: 6 }}>
          Passionate individuals dedicated to building the future of sports communities
        </Typography>
        
        <Grid container spacing={4}>
          {team.map((member, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card sx={{ textAlign: 'center', p: 3 }}>
                <Avatar
                  src={member.avatar}
                  alt={member.name}
                  sx={{ width: 120, height: 120, mx: 'auto', mb: 2 }}
                >
                  {member.name.charAt(0)}
                </Avatar>
                <Typography variant="h6" gutterBottom>
                  {member.name}
                </Typography>
                <Typography variant="subtitle1" color="primary.main" gutterBottom>
                  {member.role}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {member.description}
                </Typography>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Values Section */}
      <Paper sx={{ p: 6, textAlign: 'center' }}>
        <Typography variant="h3" gutterBottom>
          Our Values
        </Typography>
        <Grid container spacing={4} sx={{ mt: 2 }}>
          <Grid item xs={12} md={4}>
            <Typography variant="h6" gutterBottom color="primary.main">
              Inclusivity
            </Typography>
            <Typography variant="body1">
              Sports are for everyone. We welcome athletes of all backgrounds, 
              skill levels, and abilities.
            </Typography>
          </Grid>
          <Grid item xs={12} md={4}>
            <Typography variant="h6" gutterBottom color="primary.main">
              Community
            </Typography>
            <Typography variant="body1">
              We believe in the power of community to inspire, motivate, 
              and support each other's goals.
            </Typography>
          </Grid>
          <Grid item xs={12} md={4}>
            <Typography variant="h6" gutterBottom color="primary.main">
              Excellence
            </Typography>
            <Typography variant="body1">
              We strive for excellence in everything we do, from our platform 
              to our community support.
            </Typography>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};

export default About;