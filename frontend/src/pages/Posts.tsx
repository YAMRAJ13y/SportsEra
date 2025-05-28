import React, { useState } from 'react';
import {
  Container,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Box,
  Avatar,
  IconButton,
  Chip,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Pagination,
  CircularProgress,
} from '@mui/material';
import {
  Favorite,
  FavoriteBorder,
  Comment,
  Share,
  Search,
  Add,
} from '@mui/icons-material';
import { Link, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { format } from 'date-fns';
import { postService } from '../services/postService';
import { useAuth } from '../contexts/AuthContext';
import { SPORT_CATEGORIES } from '../types';

const Posts: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [sportCategory, setSportCategory] = useState('');
  const [sortBy, setSortBy] = useState('createdAt');

  const { data, isLoading, error } = useQuery({
    queryKey: ['posts', page, search, sportCategory, sortBy],
    queryFn: () => postService.getPosts({
      page,
      limit: 12,
      search: search || undefined,
      sportCategory: sportCategory || undefined,
      sortBy,
      sortOrder: 'desc',
    }),
  });

  const handleLike = async (postId: string) => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    
    try {
      await postService.toggleLike(postId);
      // Refetch posts to update like status
    } catch (error) {
      console.error('Failed to toggle like:', error);
    }
  };

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
        <Typography color="error" textAlign="center">
          Failed to load posts. Please try again.
        </Typography>
      </Container>
    );
  }

  const posts = data?.data?.posts || [];
  const pagination = data?.data?.pagination;

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Header */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Typography variant="h4" component="h1">
          Sports Posts
        </Typography>
        {isAuthenticated && (
          <Button
            variant="contained"
            startIcon={<Add />}
            component={Link}
            to="/create-post"
          >
            Create Post
          </Button>
        )}
      </Box>

      {/* Filters */}
      <Box sx={{ mb: 4 }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} sm={6} md={4}>
            <TextField
              fullWidth
              placeholder="Search posts..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              InputProps={{
                startAdornment: <Search sx={{ mr: 1, color: 'text.secondary' }} />,
              }}
            />
          </Grid>
          
          <Grid item xs={12} sm={3} md={2}>
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

          <Grid item xs={12} sm={3} md={2}>
            <FormControl fullWidth>
              <InputLabel>Sort By</InputLabel>
              <Select
                value={sortBy}
                label="Sort By"
                onChange={(e) => setSortBy(e.target.value)}
              >
                <MenuItem value="createdAt">Latest</MenuItem>
                <MenuItem value="likeCount">Most Liked</MenuItem>
                <MenuItem value="commentCount">Most Commented</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </Box>

      {/* Posts Grid */}
      <Grid container spacing={3}>
        {posts.map((post) => (
          <Grid item xs={12} sm={6} md={4} key={post.id}>
            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
              {post.image && (
                <CardMedia
                  component="img"
                  height="200"
                  image={post.image}
                  alt={post.title}
                  sx={{ cursor: 'pointer' }}
                  onClick={() => navigate(`/posts/${post.id}`)}
                />
              )}
              
              <CardContent sx={{ flexGrow: 1 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Avatar
                    src={post.author.profilePicture}
                    alt={post.author.fullName}
                    sx={{ width: 32, height: 32, mr: 1 }}
                  >
                    {post.author.fullName.charAt(0)}
                  </Avatar>
                  <Box>
                    <Typography variant="body2" fontWeight="medium">
                      {post.author.fullName}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {format(new Date(post.createdAt), 'MMM dd, yyyy')}
                    </Typography>
                  </Box>
                </Box>

                <Typography
                  variant="h6"
                  gutterBottom
                  sx={{
                    cursor: 'pointer',
                    '&:hover': { color: 'primary.main' },
                  }}
                  onClick={() => navigate(`/posts/${post.id}`)}
                >
                  {post.title}
                </Typography>

                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    display: '-webkit-box',
                    WebkitLineClamp: 3,
                    WebkitBoxOrient: 'vertical',
                    mb: 2,
                  }}
                >
                  {post.content}
                </Typography>

                {post.sportCategory && (
                  <Chip
                    label={post.sportCategory}
                    size="small"
                    color="primary"
                    variant="outlined"
                    sx={{ mb: 2 }}
                  />
                )}

                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Box sx={{ display: 'flex', gap: 1 }}>
                    <IconButton
                      size="small"
                      onClick={() => handleLike(post.id)}
                      color={post.isLikedByUser ? 'error' : 'default'}
                    >
                      {post.isLikedByUser ? <Favorite /> : <FavoriteBorder />}
                    </IconButton>
                    <Typography variant="body2" sx={{ alignSelf: 'center' }}>
                      {post.likeCount}
                    </Typography>

                    <IconButton
                      size="small"
                      component={Link}
                      to={`/posts/${post.id}`}
                    >
                      <Comment />
                    </IconButton>
                    <Typography variant="body2" sx={{ alignSelf: 'center' }}>
                      {post.commentCount}
                    </Typography>
                  </Box>

                  <IconButton size="small">
                    <Share />
                  </IconButton>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* No posts message */}
      {posts.length === 0 && (
        <Box sx={{ textAlign: 'center', py: 8 }}>
          <Typography variant="h6" color="text.secondary">
            No posts found
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            Try adjusting your search criteria
          </Typography>
          {isAuthenticated && (
            <Button
              variant="contained"
              component={Link}
              to="/create-post"
              startIcon={<Add />}
            >
              Create First Post
            </Button>
          )}
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

export default Posts;