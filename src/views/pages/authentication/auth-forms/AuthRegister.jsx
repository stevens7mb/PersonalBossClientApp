import { useState } from 'react';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import Box from '@mui/material/Box';
import { Button, IconButton, InputLabel, Snackbar, Alert, FormHelperText } from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import FormControl from '@mui/material/FormControl';
import Grid from '@mui/material/Grid';
import InputAdornment from '@mui/material/InputAdornment';
import OutlinedInput from '@mui/material/OutlinedInput';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import * as Yup from 'yup';
import { Formik } from 'formik';
import AnimateButton from 'ui-component/extended/AnimateButton';
import { registerUser } from 'services/authService';
import { Link } from 'react-router-dom';

const AuthRegister = ({ ...others }) => {
    const theme = useTheme();
    const matchDownSM = useMediaQuery(theme.breakpoints.down('md'));
    const [showPassword, setShowPassword] = useState(false);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState('error');

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const handleCloseSnackbar = () => {
        setSnackbarOpen(false);
    };

    return (
        <>
            <Grid container direction="column" justifyContent="center" spacing={2}>
                <Grid item xs={12} container alignItems="center" justifyContent="center">
                    <Box sx={{ mb: 2 }}>
                        <Typography variant="subtitle1">Register Form</Typography>
                    </Box>
                </Grid>
            </Grid>

            <Formik
                initialValues={{
                    email: '',
                    password: '',
                    firstname: '',
                    middlename: '',
                    lastname: '',
                    company_name: '',
                    submit: null
                }}
                validationSchema={Yup.object().shape({
                    email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
                    password: Yup.string().max(255).required('Password is required'),
                    firstname: Yup.string().required('First name is required'),
                    middlename: Yup.string(),
                    lastname: Yup.string().required('Last name is required'),
                    company_name: Yup.string()
                })}
                onSubmit={async (values, { setErrors, setStatus, setSubmitting, resetForm }) => {
                    try {
                        const response = await registerUser(values);
                        setSnackbarMessage(response.message);
                        setSnackbarSeverity('success');
                        setSnackbarOpen(true);
                        resetForm();
                    } catch (error) {
                        setSubmitting(false);
                        setStatus({ success: false });

                        // Verificar si hay errores en el formato de detalle
                        if (error?.detail) {
                            const errorDetail = error.detail; // Aquí accedemos al array "detail"

                            // Recorremos los detalles del error
                            errorDetail.forEach((e) => {
                                const field = e.loc[1]; // Obtiene el campo que tiene el error (por ejemplo, 'password')
                                const message = e.msg || 'Error registering user';

                                // Si el error es específico de un campo, lo mostramos en el formulario
                                setErrors({ [field]: message });
                            });

                            // Para mostrar los mensajes de error en el Snackbar
                            const generalErrorMessage = errorDetail.map((e) => e.msg).join(', ');
                            setSnackbarMessage(generalErrorMessage);
                        } else {
                            // Si el error no tiene detalle o tiene otro tipo de mensaje
                            setErrors({ submit: 'Error registering user' });
                            setSnackbarMessage('Error registering user');
                        }

                        setSnackbarSeverity('error');
                        setSnackbarOpen(true);
                    }
                }}
            >
                {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values, status }) => (
                    <form noValidate onSubmit={handleSubmit} {...others}>
                        <Grid container spacing={matchDownSM ? 0 : 2}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    label="First Name"
                                    margin="normal"
                                    name="firstname"
                                    type="text"
                                    value={values.firstname}
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    error={Boolean(touched.firstname && errors.firstname)}
                                    helperText={touched.firstname && errors.firstname}
                                    sx={{ ...theme.typography.customInput }}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    label="Middle Name"
                                    margin="normal"
                                    name="middlename"
                                    type="text"
                                    value={values.middlename}
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    sx={{ ...theme.typography.customInput }}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    label="Last Name"
                                    margin="normal"
                                    name="lastname"
                                    type="text"
                                    value={values.lastname}
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    error={Boolean(touched.lastname && errors.lastname)}
                                    helperText={touched.lastname && errors.lastname}
                                    sx={{ ...theme.typography.customInput }}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    label="Company Name"
                                    margin="normal"
                                    name="company_name"
                                    type="text"
                                    value={values.company_name}
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    sx={{ ...theme.typography.customInput }}
                                />
                            </Grid>
                        </Grid>

                        <FormControl fullWidth error={Boolean(touched.email && errors.email)} sx={{ ...theme.typography.customInput }}>
                            <InputLabel htmlFor="outlined-adornment-email-register">Email Address</InputLabel>
                            <OutlinedInput
                                id="outlined-adornment-email-register"
                                type="email"
                                value={values.email}
                                name="email"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                inputProps={{}}
                            />
                            {touched.email && errors.email && (
                                <FormHelperText error id="standard-weight-helper-text--register">
                                    {errors.email}
                                </FormHelperText>
                            )}
                        </FormControl>

                        <FormControl
                            fullWidth
                            error={Boolean(touched.password && errors.password)}
                            sx={{ ...theme.typography.customInput }}
                        >
                            <InputLabel htmlFor="outlined-adornment-password-register">Password</InputLabel>
                            <OutlinedInput
                                id="outlined-adornment-password-register"
                                type={showPassword ? 'text' : 'password'}
                                value={values.password}
                                name="password"
                                label="Password"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowPassword}
                                            onMouseDown={handleMouseDownPassword}
                                            edge="end"
                                            size="large"
                                        >
                                            {showPassword ? <Visibility /> : <VisibilityOff />}
                                        </IconButton>
                                    </InputAdornment>
                                }
                                inputProps={{}}
                            />
                            {touched.password && errors.password && (
                                <FormHelperText error id="standard-weight-helper-text-password-register">
                                    {errors.password}
                                </FormHelperText>
                            )}
                        </FormControl>

                        {status?.submit && (
                            <Box sx={{ mt: 3 }}>
                                <FormHelperText error>{status.submit}</FormHelperText>
                            </Box>
                        )}

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
                                    Register
                                </Button>
                            </AnimateButton>
                        </Box>
                        <Box sx={{ mt: 2, textAlign: 'right' }}>
                            <Typography variant="body2">
                                <Link
                                    to="/pages/authentication/verify-otp"
                                    style={{ textDecoration: 'none', color: theme.palette.primary.main }}
                                >
                                    Verify OTP
                                </Link>
                            </Typography>
                        </Box>
                    </form>
                )}
            </Formik>

            {/* Snackbar para mostrar errores o éxitos */}
            <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleCloseSnackbar}>
                <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity} sx={{ width: '100%' }}>
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </>
    );
};

export default AuthRegister;
