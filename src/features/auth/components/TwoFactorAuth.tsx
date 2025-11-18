import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  Typography,
  Alert,
  CircularProgress,
  Container,
  Divider,
  List,
  ListItem,
  ListItemText,
} from '@mui/material';

/**
 * 2FA verification form validation schema
 */
const twoFactorSchema = z.object({
  code: z
    .string()
    .min(6, 'Code must be 6 digits')
    .max(6, 'Code must be 6 digits')
    .regex(/^\d+$/, 'Code must contain only numbers'),
});

type TwoFactorFormData = z.infer<typeof twoFactorSchema>;

interface TwoFactorAuthProps {
  userId: string;
  qrCode?: string;
  backupCodes?: string[];
  isSetup?: boolean;
  onSuccess: () => void;
}

/**
 * TwoFactorAuth Component
 * Handles 2FA verification and setup
 */
export const TwoFactorAuth = ({
  userId,
  qrCode,
  backupCodes,
  isSetup = false,
  onSuccess,
}: TwoFactorAuthProps) => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showBackupCodes, setShowBackupCodes] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TwoFactorFormData>({
    resolver: zodResolver(twoFactorSchema),
    defaultValues: {
      code: '',
    },
  });

  /**
   * Handle 2FA code verification
   */
  const onSubmit = async (data: TwoFactorFormData) => {
    try {
      setIsLoading(true);
      setError(null);

      // TODO: Call 2FA verification API endpoint
      // Example: const response = await verify2FA({ userId, code: data.code });
      console.log('Verifying 2FA for user:', userId, 'with code:', data.code);

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // On success, call the onSuccess callback
      onSuccess();
    } catch (err: any) {
      const errorMessage =
        err?.data?.detail ||
        err?.data?.message ||
        'Verification failed. Please check your code and try again.';
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Handle cancel action
   */
  const handleCancel = () => {
    navigate('/login');
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
        <Card sx={{ width: '100%', maxWidth: 500 }}>
          <CardContent sx={{ p: 4 }}>
            {/* Title */}
            <Box sx={{ textAlign: 'center', mb: 4 }}>
              <Typography variant="h5" component="h1" gutterBottom>
                {isSetup ? 'Set Up Two-Factor Authentication' : 'Two-Factor Authentication'}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {isSetup
                  ? 'Scan the QR code with your authenticator app'
                  : 'Enter the 6-digit code from your authenticator app'}
              </Typography>
            </Box>

            {/* QR Code Display (Setup Mode) */}
            {isSetup && qrCode && (
              <Box sx={{ textAlign: 'center', mb: 3 }}>
                <img
                  src={qrCode}
                  alt="2FA QR Code"
                  style={{ maxWidth: '200px', height: 'auto' }}
                />
                <Typography variant="caption" display="block" sx={{ mt: 1 }}>
                  Scan this code with Google Authenticator or similar app
                </Typography>
              </Box>
            )}

            {/* Error Alert */}
            {error && (
              <Alert severity="error" sx={{ mb: 3 }}>
                {error}
              </Alert>
            )}

            {/* Verification Form */}
            <form onSubmit={handleSubmit(onSubmit)} noValidate>
              <TextField
                {...register('code')}
                label="Verification Code"
                type="text"
                fullWidth
                margin="normal"
                autoComplete="off"
                autoFocus
                placeholder="000000"
                error={!!errors.code}
                helperText={errors.code?.message}
                disabled={isLoading}
                inputProps={{
                  maxLength: 6,
                  pattern: '[0-9]*',
                  inputMode: 'numeric',
                }}
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
                    Verifying...
                  </>
                ) : (
                  'Verify'
                )}
              </Button>

              <Button
                fullWidth
                variant="outlined"
                size="large"
                onClick={handleCancel}
                disabled={isLoading}
              >
                Cancel
              </Button>
            </form>

            {/* Backup Codes Section (Setup Mode) */}
            {isSetup && backupCodes && backupCodes.length > 0 && (
              <>
                <Divider sx={{ my: 3 }} />
                <Box>
                  <Typography variant="subtitle2" gutterBottom>
                    Backup Codes
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                    Save these backup codes in a safe place. You can use them to access your
                    account if you lose your device.
                  </Typography>

                  {showBackupCodes ? (
                    <List dense sx={{ bgcolor: 'background.paper', borderRadius: 1 }}>
                      {backupCodes.map((code, index) => (
                        <ListItem key={index}>
                          <ListItemText
                            primary={code}
                            primaryTypographyProps={{
                              fontFamily: 'monospace',
                              fontSize: '0.9rem',
                            }}
                          />
                        </ListItem>
                      ))}
                    </List>
                  ) : (
                    <Button
                      variant="text"
                      size="small"
                      onClick={() => setShowBackupCodes(true)}
                    >
                      Show Backup Codes
                    </Button>
                  )}
                </Box>
              </>
            )}

            {/* Help Text */}
            {!isSetup && (
              <Box sx={{ mt: 3, textAlign: 'center' }}>
                <Typography variant="body2" color="text.secondary">
                  Lost your device? Contact your administrator for assistance.
                </Typography>
              </Box>
            )}
          </CardContent>
        </Card>
      </Box>
    </Container>
  );
};
