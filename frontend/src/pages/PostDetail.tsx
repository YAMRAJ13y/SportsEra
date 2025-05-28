import React, { useState } from 'react';
import {
  Container,
  Paper,
  Typography,
  Box,
  Avatar,
  IconButton,
  Chip,
  TextField,
  Button,
  Divider,
  CircularProgress,
  Alert,
} from '@mui/material';
import {
  Favorite,
  FavoriteBorder,
  Comment,
  Share,
  Send,
  ArrowBack,
} from '@mui/icons-material';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { format } from 'date-fns';
import { postService } from '../services/postService';
import { useAuth } from '../contexts/AuthContext';
import toast from 'react-hot-toast';

const PostDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();
  const queryClient = useQueryClient();
  const [comment, setComment] = useState('');

  const { data, isLoading, error } = useQuery({
    queryKey: ['post', id],
    queryFn: () => postService.getPost(id!),
    enabled: !!id,
  });

  const likeMutation = useMutation({
    mutationFn: () => postService.toggleLike(id!),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['post', id] });
    },
    onError: () => {
      toast.error('Failed to update like');
    },
  });

  const commentMutation = useMutation({
    mutationFn: (content: string) => postService.addComment(id!, content),
    onSuccess: () => {
      setComment('');
      queryClient.invalidateQueries({ queryKey: ['post', id] });
      toast.success('Comment added successfully');
    },
    onError: () => {
      toast.error('Failed to add comment');
    },
  });

  const handleLike = () => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    likeMutation.mutate();
  };

  const handleComment = () => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    if (comment.trim()) {
      commentMutation.mutate(comment.trim());
    }
  };

  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error || !data?.data?.post) {
    return (
      <Container sx={{ py: 8 }}>
        <Alert severity="error">
          Post not found or failed to load.
        </Alert>
      </Container>
    );
  }

  const post = data.data.post;

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Button
        startIcon={<ArrowBack />}
        onClick={() => navigate('/posts')}
        sx={{ mb: 3 }}
      >
        Back to Posts
      </Button>

      <Paper sx={{ p: 4 }}>
        {/* Post Header */}
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
          <Avatar
            src={post.author.profilePicture}
            alt={post.author.fullName}
            sx={{ width: 48, height: 48, mr: 2 }}
          >
            {post.author.fullName.charAt(0)}
          </Avatar>
          <Box sx={{ flexGrow: 1 }}>
            <Typography variant="h6" fontWeight="medium">
              {post.author.fullName}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {format(new Date(post.createdAt), 'MMMM dd, yyyy • h:mm a')}
            </Typography>
          </Box>
          {post.sportCategory && (
            <Chip
              label={post.sportCategory}
              color="primary"
              variant="outlined"
            />
          )}
        </Box>

        {/* Post Title */}
        <Typography variant="h4" gutterBottom fontWeight="bold">
          {post.title}
        </Typography>

        {/* Post Image */}
        {post.image && (
          <Box sx={{ mb: 3 }}>
            <img
              src={post.image}
              alt={post.title}
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

        {/* Post Content */}
        <Typography variant="body1" sx={{ mb: 3, lineHeight: 1.7 }}>
          {post.content}
        </Typography>

        {/* Post Actions */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 4 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <IconButton
              onClick={handleLike}
              color={post.isLikedByUser ? 'error' : 'default'}
              disabled={likeMutation.isPending}
            >
              {post.isLikedByUser ? <Favorite /> : <FavoriteBorder />}
            </IconButton>
            <Typography variant="body2">
              {post.likeCount} {post.likeCount === 1 ? 'like' : 'likes'}
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Comment />
            <Typography variant="body2">
              {post.commentCount} {post.commentCount === 1 ? 'comment' : 'comments'}
            </Typography>
          </Box>

          <IconButton>
            <Share />
          </IconButton>
        </Box>

        <Divider sx={{ mb: 3 }} />

        {/* Add Comment */}
        {isAuthenticated ? (
          <Box sx={{ mb: 4 }}>
            <Box sx={{ display: 'flex', gap: 2 }}>
              <Avatar
                src={user?.profilePicture}
                alt={user?.fullName}
                sx={{ width: 40, height: 40 }}
              >
                {user?.fullName?.charAt(0)}
              </Avatar>
              <Box sx={{ flexGrow: 1 }}>
                <TextField
                  fullWidth
                  multiline
                  rows={3}
                  placeholder="Write a comment..."
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  variant="outlined"
                />
                <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 1 }}>
                  <Button
                    variant="contained"
                    endIcon={<Send />}
                    onClick={handleComment}
                    disabled={!comment.trim() || commentMutation.isPending}
                  >
                    {commentMutation.isPending ? 'Posting...' : 'Post Comment'}
                  </Button>
                </Box>
              </Box>
            </Box>
          </Box>
        ) : (
          <Box sx={{ textAlign: 'center', mb: 4 }}>
            <Typography variant="body2" color="text.secondary">
              <Button onClick={() => navigate('/login')}>Login</Button> to comment
            </Typography>
          </Box>
        )}

        {/* Comments */}
        <Box>
          <Typography variant="h6" gutterBottom>
            Comments ({post.commentCount})
          </Typography>
          
          {post.comments.length === 0 ? (
            <Typography variant="body2" color="text.secondary" sx={{ py: 4, textAlign: 'center' }}>
              No comments yet. Be the first to comment!
            </Typography>
          ) : (
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
              {post.comments.map((comment) => (
                <Box key={comment.id} sx={{ display: 'flex', gap: 2 }}>
                  <Avatar
                    src={comment.author.profilePicture}
                    alt={comment.author.fullName}
                    sx={{ width: 40, height: 40 }}
                  >
                    {comment.author.fullName.charAt(0)}
                  </Avatar>
                  <Box sx={{ flexGrow: 1 }}>
                    <Box sx={{ backgroundColor: 'grey.100', borderRadius: 2, p: 2 }}>
                      <Typography variant="body2" fontWeight="medium" gutterBottom>
                        {comment.author.fullName}
                      </Typography>
                      <Typography variant="body2">
                        {comment.content}
                      </Typography>
                    </Box>
                    <Typography variant="caption" color="text.secondary" sx={{ ml: 2 }}>
                      {format(new Date(comment.createdAt), 'MMM dd, yyyy • h:mm a')}
                    </Typography>
                  </Box>
                </Box>
              ))}
            </Box>
          )}
        </Box>
      </Paper>
    </Container>
  );
};

export default PostDetail;