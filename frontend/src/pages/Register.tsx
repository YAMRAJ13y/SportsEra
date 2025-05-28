import React, { useState } from 'react';
import {
  Container,
  Paper,
  TextField,
  Button,
  Typography,
  Box,
  Link,
  Alert,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  OutlinedInput,
  Avatar,
  IconButton,
  InputAdornment,
} from '@mui/material';
import { Visibility, VisibilityOff, PhotoCamera } from '@mui/icons-material';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useAuth } from '../contexts/AuthContext';
import { RegisterData, SPORT_CATEGORIES, SKILL_LEVELS, DAYS_OF_WEEK } from '../types';

const schema = yup.object({
  fullName: yup.string().required('Full name is required'),
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
  gender: yup.string().oneOf(['male', 'female', 'other']).required('Gender is required'),
  contactNumber: yup.string(),
  address: yup.string(),
  dateOfBirth: yup.string(),
  primarySport: yup.string().required('Primary sport is required'),
  skillLevel: yup.string().oneOf(['Beginner', 'Intermediate', 'Advanced']).required('Skill level is required'),
  favoriteSports: yup.array().of(yup.string()),
  activeDays: yup.array().of(yup.string()),
  achievements: yup.string(),
  bio: yup.string(),
});

const Register: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>('');
  const { register: registerUser } = useAuth();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<RegisterData>({
    resolver: yupResolver(schema),
    defaultValues: {
      favoriteSports: [],
      activeDays: [],
    },
  });

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setProfileImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const onSubmit = async (data: RegisterData) => {
    try {
      setError('');
      const formData = {
        ...data,
        profilePicture: profileImage,
      };
      const success = await registerUser(formData);
      if (success) {
        navigate('/');
      }
    } catch (err) {
      setError('Registration failed. Please try again.');
    }
  };

  return (
    <Container component="main" maxWidth="md" sx={{ py: 8 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Box sx={{ textAlign: 'center', mb: 3 }}>
          <Typography component="h1" variant="h4" gutterBottom>
            Join SportsEra
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Create your account and start your sports journey
          </Typography>
        </Box>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
          {/* Profile Picture */}
          <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}>
            <Box sx={{ position: 'relative' }}>
              <Avatar
                src={imagePreview}
                sx={{ width: 100, height: 100 }}
              />
              <IconButton
                color="primary"
                aria-label="upload picture"
                component="label"
                sx={{
                  position: 'absolute',
                  bottom: 0,
                  right: 0,
                  backgroundColor: 'background.paper',
                }}
              >
                <input
                  hidden
                  accept="image/*"
                  type="file"
                  onChange={handleImageChange}
                />
                <PhotoCamera />
              </IconButton>
            </Box>
          </Box>

          <Grid container spacing={2}>
            {/* Basic Information */}
            <Grid item xs={12} sm={6}>
              <TextField
                {...register('fullName')}
                required
                fullWidth
                label="Full Name"
                error={!!errors.fullName}
                helperText={errors.fullName?.message}
              />
            </Grid>
            
            <Grid item xs={12} sm={6}>
              <TextField
                {...register('email')}
                required
                fullWidth
                label="Email Address"
                type="email"
                error={!!errors.email}
                helperText={errors.email?.message}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                {...register('password')}
                required
                fullWidth
                label="Password"
                type={showPassword ? 'text' : 'password'}
                error={!!errors.password}
                helperText={errors.password?.message}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowPassword(!showPassword)}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <Controller
                name="gender"
                control={control}
                render={({ field }) => (
                  <FormControl fullWidth required error={!!errors.gender}>
                    <InputLabel>Gender</InputLabel>
                    <Select {...field} label="Gender">
                      <MenuItem value="male">Male</MenuItem>
                      <MenuItem value="female">Female</MenuItem>
                      <MenuItem value="other">Other</MenuItem>
                    </Select>
                  </FormControl>
                )}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                {...register('contactNumber')}
                fullWidth
                label="Contact Number"
                type="tel"
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                {...register('address')}
                fullWidth
                label="Address"
                multiline
                rows={2}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                {...register('dateOfBirth')}
                fullWidth
                label="Date of Birth"
                type="date"
                InputLabelProps={{ shrink: true }}
              />
            </Grid>

            {/* Sports Information */}
            <Grid item xs={12} sm={6}>
              <Controller
                name="primarySport"
                control={control}
                render={({ field }) => (
                  <FormControl fullWidth required error={!!errors.primarySport}>
                    <InputLabel>Primary Sport</InputLabel>
                    <Select {...field} label="Primary Sport">
                      {SPORT_CATEGORIES.map((sport) => (
                        <MenuItem key={sport} value={sport}>
                          {sport}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                )}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <Controller
                name="skillLevel"
                control={control}
                render={({ field }) => (
                  <FormControl fullWidth required error={!!errors.skillLevel}>
                    <InputLabel>Skill Level</InputLabel>
                    <Select {...field} label="Skill Level">
                      {SKILL_LEVELS.map((level) => (
                        <MenuItem key={level} value={level}>
                          {level}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                )}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <Controller
                name="favoriteSports"
                control={control}
                render={({ field }) => (
                  <FormControl fullWidth>
                    <InputLabel>Favorite Sports</InputLabel>
                    <Select
                      {...field}
                      multiple
                      input={<OutlinedInput label="Favorite Sports" />}
                      renderValue={(selected) => (
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                          {(selected as string[]).map((value) => (
                            <Chip key={value} label={value} size="small" />
                          ))}
                        </Box>
                      )}
                    >
                      {SPORT_CATEGORIES.map((sport) => (
                        <MenuItem key={sport} value={sport}>
                          {sport}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                )}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <Controller
                name="activeDays"
                control={control}
                render={({ field }) => (
                  <FormControl fullWidth>
                    <InputLabel>Active Days</InputLabel>
                    <Select
                      {...field}
                      multiple
                      input={<OutlinedInput label="Active Days" />}
                      renderValue={(selected) => (
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                          {(selected as string[]).map((value) => (
                            <Chip key={value} label={value} size="small" />
                          ))}
                        </Box>
                      )}
                    >
                      {DAYS_OF_WEEK.map((day) => (
                        <MenuItem key={day} value={day}>
                          {day}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                )}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                {...register('achievements')}
                fullWidth
                label="Achievements"
                multiline
                rows={2}
                placeholder="Share your sports achievements..."
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                {...register('bio')}
                fullWidth
                label="Bio"
                multiline
                rows={3}
                placeholder="Tell us about yourself..."
              />
            </Grid>
          </Grid>

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2, py: 1.5 }}
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Creating Account...' : 'Create Account'}
          </Button>

          <Box sx={{ textAlign: 'center' }}>
            <Typography variant="body2">
              Already have an account?{' '}
              <Link component={RouterLink} to="/login" variant="body2">
                Sign in here
              </Link>
            </Typography>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
};

export default Register;