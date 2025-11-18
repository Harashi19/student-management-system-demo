import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
  Box,
  Button,
  Card,
  CardContent,
  Checkbox,
  FormControlLabel,
  TextField,
  Typography,
  Alert,
  CircularProgress,
  Container,
  Divider,
  Chip,
  Stack,
} from '@mui/material';
import { useLoginMutation } from '@/api/auth.api';
import { useAppDispatch } from '@/store';
import { login as loginAction } from '@/features/auth';
import type { LoginCredentials, User, Role } from '@/types';

/**
 * Login form validation schema
 */
const loginSchema = z.object({
  email: z.string().email('Invalid email address').min(1, 'Email is required'),
  password: z.string().min(1, 'Password is required'),
  remember_me: z.boolean().optional(),
});

type LoginFormData = z.infer<typeof loginSchema>;

/**
 * Demo user credentials for testing without backend
 */
const DEMO_USERS = [
  {
    email: 'admin@school.com',
    password: 'admin123',
    user: {
      id: '1',
      email: 'admin@school.com',
      first_name: 'Admin',
      last_name: 'User',
      roles: [
        {
          id: '1',
          name: 'ADMIN',
          permissions: [],
          description: 'Administrator',
        } as Role,
      ],
      is_active: true,
      date_joined: new Date().toISOString(),
    } as User,
  },
  {
    email: 'teacher@school.com',
    password: 'teacher123',
    user: {
      id: '2',
      email: 'teacher@school.com',
      first_name: 'John',
      last_name: 'Teacher',
      roles: [
        {
          id: '2',
          name: 'TEACHER',
          permissions: [],
          description: 'Teacher',
        } as Role,
      ],
      is_active: true,
      date_joined: new Date().toISOString(),
    } as User,
  },
  {
    email: 'student@school.com',
    password: 'student123',
    user: {
      id: '3',
      email: 'student@school.com',
      first_name: 'Jane',
      last_name: 'Student',
      roles: [
        {
          id: '3',
          name: 'STUDENT',
          permissions: [],
          description: 'Student',
        } as Role,
      ],
      is_active: true,
      date_joined: new Date().toISOString(),
    } as User,
  },
  {
    email: 'parent@school.com',
    password: 'parent123',
    user: {
      id: '4',
      email: 'parent@school.com',
      first_name: 'Mary',
      last_name: 'Parent',
      roles: [
        {
          id: '4',
          name: 'PARENT',
          permissions: [],
          description: 'Parent',
        } as Role,
      ],
      is_active: true,
      date_joined: new Date().toISOString(),
    } as User,
  },
];

/**
 * Login Page Component
 * Handles user authentication with email and password
 * Supports demo mode for testing without backend
 */
export const LoginPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useAppDispatch();
  const [login, { isLoading }] = useLoginMutation();
  const [serverError, setServerError] = useState<string | null>(null);
  const [demoMode, setDemoMode] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
      remember_me: false,
    },
  });

  /**
   * Handle demo login
   */
  const handleDemoLogin = (demoUser: typeof DEMO_USERS[0]) => {
    // Simulate login with demo credentials
    dispatch(
      loginAction({
        user: demoUser.user,
        token: 'demo-access-token',
        refreshToken: 'demo-refresh-token',
      })
    );

    // Navigate to dashboard
    const from = (location.state as any)?.from?.pathname || '/';
    navigate(from, { replace: true });
  };

  /**
   * Handle form submission
   */
  const onSubmit = async (data: LoginFormData) => {
    try {
      setServerError(null);

      // Check if using demo credentials
      const demoUser = DEMO_USERS.find(
        (u) => u.email === data.email && u.password === data.password
      );

      if (demoUser) {
        // Use demo mode
        handleDemoLogin(demoUser);
        return;
      }

      // Try real API login
      const credentials: LoginCredentials = {
        email: data.email,
        password: data.password,
        remember_me: data.remember_me,
      };

      await login(credentials).unwrap();

      // Get the return URL from location state or default to dashboard
      const from = (location.state as any)?.from?.pathname || '/';
      navigate(from, { replace: true });
    } catch (err: any) {
      // Handle error
      const errorMessage =
        err?.data?.detail ||
        err?.data?.message ||
        'Login failed. Please check your credentials and try again.';
      setServerError(errorMessage);
    }
  };

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Card sx={{ width: '100%', maxWidth: 450 }}>
          <CardContent sx={{ p: 4 }}>
            {/* Logo and Title */}
            <Box sx={{ textAlign: 'center', mb: 4 }}>
              <Typography variant="h4" component="h1" gutterBottom>
                School Management System
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Sign in to your account
              </Typography>
            </Box>

            {/* Error Alert */}
            {serverError && (
              <Alert severity="error" sx={{ mb: 3 }}>
                {serverError}
              </Alert>
            )}

            {/* Login Form */}
            <form onSubmit={handleSubmit(onSubmit)} noValidate>
              <TextField
                {...register('email')}
                label="Email Address"
                type="email"
                fullWidth
                margin="normal"
                autoComplete="email"
                autoFocus
                error={!!errors.email}
                helperText={errors.email?.message}
                disabled={isLoading}
              />

              <TextField
                {...register('password')}
                label="Password"
                type="password"
                fullWidth
                margin="normal"
                autoComplete="current-password"
                error={!!errors.password}
                helperText={errors.password?.message}
                disabled={isLoading}
              />

              <FormControlLabel
                control={<Checkbox {...register('remember_me')} disabled={isLoading} />}
                label="Remember me"
                sx={{ mt: 1 }}
              />

              <Button
                type="submit"
                fullWidth
                variant="contained"
                size="large"
                disabled={isLoading}
                sx={{ mt: 3, mb: 2 }}
              >
                {isLoading ? (
                  <>
                    <CircularProgress size={20} sx={{ mr: 1 }} />
                    Signing in...
                  </>
                ) : (
                  'Sign In'
                )}
              </Button>
            </form>

            {/* Demo Mode Toggle */}
            <Box sx={{ mt: 3, textAlign: 'center' }}>
              <Button
                variant="text"
                size="small"
                onClick={() => setDemoMode(!demoMode)}
                sx={{ textTransform: 'none' }}
              >
                {demoMode ? 'Hide' : 'Show'} Demo Credentials
              </Button>
            </Box>

            {/* Demo Credentials */}
            {demoMode && (
              <>
                <Divider sx={{ my: 3 }}>
                  <Chip label="Demo Accounts" size="small" />
                </Divider>

                <Alert severity="info" sx={{ mb: 2 }}>
                  Click any demo account below to login instantly (no backend required)
                </Alert>

                <Stack spacing={1}>
                  {DEMO_USERS.map((demoUser) => (
                    <Button
                      key={demoUser.email}
                      variant="outlined"
                      fullWidth
                      onClick={() => handleDemoLogin(demoUser)}
                      sx={{
                        justifyContent: 'flex-start',
                        textTransform: 'none',
                        py: 1.5,
                      }}
                    >
                      <Box sx={{ textAlign: 'left', width: '100%' }}>
                        <Typography variant="body2" fontWeight="bold">
                          {demoUser.user.first_name} {demoUser.user.last_name} (
                          {demoUser.user.roles[0].name})
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {demoUser.email} / {demoUser.password}
                        </Typography>
                      </Box>
                    </Button>
                  ))}
                </Stack>
              </>
            )}

            {/* Footer Links */}
            <Box sx={{ mt: 3, textAlign: 'center' }}>
              <Typography variant="body2" color="text.secondary">
                Forgot your password? Contact your administrator.
              </Typography>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Container>
  );
};
