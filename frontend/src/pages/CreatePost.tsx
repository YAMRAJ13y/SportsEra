import React, { useState } from 'react';
import {
  Container,
  Paper,
  TextField,
  Button,
  Typography,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Alert,
  Card,
  CardMedia,
  IconButton,
} from '@mui/material';
import { PhotoCamera, Delete, ArrowBack } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useMutation } from '@tanstack/react-query';
import { postService } from '../services/postService';
import { CreatePostData, SPORT_CATEGORIES } from '../types';
import toast from 'react-hot-toast';

const schema = yup.object({
  title: yup.string().required('Title is required').max(100, 'Title must be less than 100 characters'),
  content: yup.string().required('Content is required').max(2000, 'Content must be less than 2000 characters'),
  sportCategory: yup.string(),
});

const CreatePost: React.FC = () => {
  const navigate = useNavigate();
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>('');
  const [error, setError] = useState('');

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<CreatePostData>({
    resolver: yupResolver(schema),
  });

  const createPostMutation = useMutation({
    mutationFn: (data: CreatePostData) => postService.createPost(data),
    onSuccess: (response) => {
      if (response.success) {
        toast.success('Post created successfully!');
        navigate('/posts');
      } else {
        setError(response.message || 'Failed to create post');
      }
    },
    onError: () => {
      setError('Failed to create post. Please try again.');
    },
  });

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Check file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        toast.error('Image size must be less than 5MB');
        return;
      }

      // Check file type
      if (!file.type.startsWith('image/')) {
        toast.error('Please select a valid image file');
        return;
      }

      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setImage(null);
    setImagePreview('');
  };

  const onSubmit = async (data: CreatePostData) => {
    setError('');
    const formData = {
      ...data,
      image: image || undefined,
    };
    createPostMutation.mutate(formData);
  };

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
        <Typography variant="h4" gutterBottom>
          Create New Post
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
          Share your sports experiences, tips, or stories with the community
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {error}
          </Alert>
        )}

        <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
          <TextField
            {...register('title')}
            fullWidth
            label="Post Title"
            placeholder="Enter an engaging title for your post"
            error={!!errors.title}
            helperText={errors.title?.message}
            sx={{ mb: 3 }}
          />

          <Controller
            name="sportCategory"
            control={control}
            render={({ field }) => (
              <FormControl fullWidth sx={{ mb: 3 }}>
                <InputLabel>Sport Category (Optional)</InputLabel>
                <Select {...field} label="Sport Category (Optional)">
                  <MenuItem value="">No specific sport</MenuItem>
                  {SPORT_CATEGORIES.map((sport) => (
                    <MenuItem key={sport} value={sport}>
                      {sport}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            )}
          />

          <TextField
            {...register('content')}
            fullWidth
            multiline
            rows={8}
            label="Post Content"
            placeholder="Share your thoughts, experiences, tips, or stories..."
            error={!!errors.content}
            helperText={errors.content?.message}
            sx={{ mb: 3 }}
          />

          {/* Image Upload */}
          <Box sx={{ mb: 3 }}>
            <Typography variant="h6" gutterBottom>
              Add Image (Optional)
            </Typography>
            
            {!imagePreview ? (
              <Box
                sx={{
                  border: '2px dashed',
                  borderColor: 'grey.300',
                  borderRadius: 2,
                  p: 4,
                  textAlign: 'center',
                  cursor: 'pointer',
                  '&:hover': {
                    borderColor: 'primary.main',
                    backgroundColor: 'grey.50',
                  },
                }}
                component="label"
              >
                <input
                  type="file"
                  hidden
                  accept="image/*"
                  onChange={handleImageChange}
                />
                <PhotoCamera sx={{ fontSize: 48, color: 'grey.400', mb: 2 }} />
                <Typography variant="body1" color="text.secondary">
                  Click to upload an image
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Maximum file size: 5MB
                </Typography>
              </Box>
            ) : (
              <Card sx={{ position: 'relative', maxWidth: 400 }}>
                <CardMedia
                  component="img"
                  height="200"
                  image={imagePreview}
                  alt="Post preview"
                />
                <IconButton
                  sx={{
                    position: 'absolute',
                    top: 8,
                    right: 8,
                    backgroundColor: 'rgba(0,0,0,0.5)',
                    color: 'white',
                    '&:hover': {
                      backgroundColor: 'rgba(0,0,0,0.7)',
                    },
                  }}
                  onClick={handleRemoveImage}
                >
                  <Delete />
                </IconButton>
              </Card>
            )}
          </Box>

          <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
            <Button
              variant="outlined"
              onClick={() => navigate('/posts')}
              disabled={createPostMutation.isPending}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="contained"
              disabled={createPostMutation.isPending}
            >
              {createPostMutation.isPending ? 'Creating...' : 'Create Post'}
            </Button>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
};

export default CreatePost;