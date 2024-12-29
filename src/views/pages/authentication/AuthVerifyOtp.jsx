import { useState } from 'react';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import Box from '@mui/material/Box';
import { Button, Snackbar, Alert, FormHelperText } from '@mui/material';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import AuthWrapper1 from '../AuthWrapper1';
import AuthCardWrapper from '../AuthCardWrapper';
import Stack from '@mui/material/Stack';
import { Link } from 'react-router-dom';
import * as Yup from 'yup';
import { Formik } from 'formik';
import AnimateButton from 'ui-component/extended/AnimateButton';
import logoImage from 'assets/images/PureCipher-PrimaryLogo-BlackBlue.png';
import { verifyOtp } from 'services/authService';

const AuthVerifyOtp = ({ ...others }) => {
    const theme = useTheme();
    const matchDownSM = useMediaQuery(theme.breakpoints.down('md'));
    
    // States for Snackbar
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState('error');

    // Snackbar close handler
    const handleCloseSnackbar = () => {
        setSnackbarOpen(false);
    };

    return (
        <AuthWrapper1>
            <Grid container direction="column" justifyContent="flex-end" sx={{ minHeight: '100vh' }}>
                <Grid item xs={12}>
                    <Grid container justifyContent="center" alignItems="center" sx={{ minHeight: 'calc(100vh - 68px)' }}>
                        <Grid item sx={{ m: { xs: 1, sm: 3 }, mb: 0 }}>
                            <AuthCardWrapper>
                                <Grid container spacing={2} alignItems="center" justifyContent="center">
                                    {/* Logo */}
                                    <Grid item sx={{ mb: 3 }}>
                                        <Link to="#" aria-label="theme logo">
                                            <img src={logoImage} alt="Logo" style={{ width: '150px', height: 'auto' }} />
                                        </Link>
                                    </Grid>

                                    {/* Title */}
                                    <Grid item xs={12}>
                                        <Stack alignItems="center" justifyContent="center" spacing={1}>
                                            <Typography color="secondary.main" gutterBottom variant={matchDownSM ? 'h3' : 'h2'}>
                                                Sign up
                                            </Typography>
                                            <Typography variant="caption" fontSize="16px" textAlign={{ xs: 'center', md: 'inherit' }}>
                                                Enter your information
                                            </Typography>
                                        </Stack>
                                    </Grid>

                                    {/* OTP Form */}
                                    <Grid item xs={12}>
                                        <Box sx={{ mb: 2 }}>
                                            <Typography variant="subtitle1">Verify OTP</Typography>
                                        </Box>

                                        <Formik
                                            initialValues={{
                                                otp_value: '',
                                                email: '',
                                                submit: null
                                            }}
                                            validationSchema={Yup.object().shape({
                                                otp_value: Yup.string().required('OTP is required'),
                                                email: Yup.string().email('Must be a valid email').max(255).required('Email is required')
                                            })}
                                            onSubmit={async (values, { setErrors, setStatus, setSubmitting, resetForm }) => {
                                                try {
                                                    const response = await verifyOtp(values);
                                                    setSnackbarMessage(response.message);
                                                    setSnackbarSeverity('success');
                                                    setSnackbarOpen(true);
                                                    resetForm();
                                                } catch (error) {
                                                    setSubmitting(false);
                                                    setStatus({ success: false });
                                                    const errorMessage = error?.detail?.map(e => e.msg).join(', ') || 'Error verifying OTP';
                                                    setErrors({ submit: errorMessage });
                                                    setSnackbarMessage(errorMessage);
                                                    setSnackbarSeverity('error');
                                                    setSnackbarOpen(true);
                                                }
                                            }}
                                        >
                                            {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values, status }) => (
                                                <form noValidate onSubmit={handleSubmit} {...others}>
                                                    <Grid container spacing={matchDownSM ? 0 : 2}>
                                                        <Grid item xs={12}>
                                                            <TextField
                                                                fullWidth
                                                                label="Email Address"
                                                                margin="normal"
                                                                name="email"
                                                                type="email"
                                                                value={values.email}
                                                                onBlur={handleBlur}
                                                                onChange={handleChange}
                                                                error={Boolean(touched.email && errors.email)}
                                                                helperText={touched.email && errors.email}
                                                                sx={{ ...theme.typography.customInput }}
                                                            />
                                                        </Grid>

                                                        <Grid item xs={12}>
                                                            <TextField
                                                                fullWidth
                                                                label="OTP Value"
                                                                margin="normal"
                                                                name="otp_value"
                                                                type="text"
                                                                value={values.otp_value}
                                                                onBlur={handleBlur}
                                                                onChange={handleChange}
                                                                error={Boolean(touched.otp_value && errors.otp_value)}
                                                                helperText={touched.otp_value && errors.otp_value}
                                                                sx={{ ...theme.typography.customInput }}
                                                            />
                                                        </Grid>
                                                    </Grid>

                                                    {/* Submit Button */}
                                                    <Box sx={{ mt: 2 }}>
                                                        <AnimateButton>
                                                            <Button
                                                                disableElevation
                                                                disabled={isSubmitting}
                                                                fullWidth
                                                                size="large"
                                                                type="submit"
                                                                variant="contained"
                                                                color="secondary"
                                                            >
                                                                Verify OTP
                                                            </Button>
                                                        </AnimateButton>
                                                    </Box>

                                                    {/* Error Message */}
                                                    {status?.submit && (
                                                        <Box sx={{ mt: 3 }}>
                                                            <FormHelperText error>{status.submit}</FormHelperText>
                                                        </Box>
                                                    )}
                                                </form>
                                            )}
                                        </Formik>

                                        {/* Snackbar */}
                                        <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleCloseSnackbar}>
                                            <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity} sx={{ width: '100%' }}>
                                                {snackbarMessage}
                                            </Alert>
                                        </Snackbar>
                                    </Grid>
                                </Grid>
                            </AuthCardWrapper>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </AuthWrapper1>
    );
};

export default AuthVerifyOtp;
