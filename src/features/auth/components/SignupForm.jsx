import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { sendOTP, verifyOTPAndRegister } from '../services/otpService';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  Container,
  CssBaseline,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
  CircularProgress,
  IconButton,
  InputAdornment
} from '@mui/material';
import {
  Phone,
  Email,
  Lock,
  Person,
  Home,
  AssignmentInd,
  Visibility,
  VisibilityOff,
  VerifiedUser,
  Timer,
  Send,
  HowToReg
} from '@mui/icons-material';

export const SignupForm = () => {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  // const handleTogglePassword = () => {
  //   setShowPassword((prev) => !prev);
  // };
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  // Countdown effect
  React.useEffect(() => {
    let timer;
    if (countdown > 0) {
      timer = setTimeout(() => setCountdown(countdown - 1), 1000);
    }
    return () => clearTimeout(timer);
  }, [countdown]);

  // Form validation schema
  const validationSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    mobileNumber: Yup.string()
      .required('Mobile number is required')
      .matches(/^(\+91|0)?[6-9]\d{9}$/, 'Invalid Indian mobile number'),
    email: Yup.string()
      .email('Invalid email'),
    password: Yup.string()
      .required('Password is required')
      .min(8, 'Password must be at least 8 characters'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Passwords must match')
      .required('Confirm Password is required'),
    address: Yup.string().required('Address is required'),
    role: Yup.string()
      .required('Role is required')
      .oneOf(['nursing', 'doctor', 'others'], 'Invalid role selected'),
  });

  const formik = useFormik({
    initialValues: {
      name: '',
      mobileNumber: '',
      email: '',
      password: '',
      confirmPassword: '',
      address: '',
      role: '',
      otp: ''
    },
    validationSchema,
    onSubmit: async (values) => {
      if (step === 1) {
        await handleSendOTP(values.mobileNumber);
      } else {
        await handleVerifyAndRegister(values);
      }
    },
  });

  const handleSendOTP = async (mobileNumber) => {
    setLoading(true);
    try {
      const result = await sendOTP(mobileNumber);
      if (result.success) {
        toast.success('OTP sent to your mobile number');
        setStep(2);
        setCountdown(300); // 5 minutes in seconds
      } else {
        toast.error(result.message || 'Failed to send OTP');
      }
    } catch (error) {
      toast.error(error.message || 'Failed to send OTP');
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyAndRegister = async (values) => {
    setLoading(true);
    try {
      const result = await verifyOTPAndRegister({
        mobileNumber: values.mobileNumber,
        otp: values.otp,
        name: values.name,
        email: values.email,
        password: values.password,
        address: values.address,
        role: values.role,
      });

      if (result.success) {
        toast.success('Registration successful! Mobile number verified');
        setTimeout(() => {
          navigate('/login');
        }, 2000);
      } else {
        toast.error(result.message || 'Registration failed');
      }
    } catch (error) {
      toast.error(error.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  const handleResendOTP = async () => {
    setLoading(true);
    try {
      const result = await sendOTP(formik.values.mobileNumber);
      if (result.success) {
        toast.success('OTP resent to your mobile number');
        setCountdown(300); // Reset countdown
      } else {
        toast.error(result.message || 'Failed to resend OTP');
      }
    } catch (error) {
      toast.error(error.message || 'Failed to resend OTP');
    } finally {
      setLoading(false);
    }
  };

  // Required field label with red star
  const RequiredLabel = ({ label }) => (
    <Box component="span" sx={{ display: 'flex', alignItems: 'center' }}>
      {label}
      <Box component="span" sx={{ color: 'error.main', ml: 0.5 }}>*</Box>
    </Box>
  );

  return (
    <Container component="main" maxWidth="sm">
      <CssBaseline />
      <Box
        sx={{
          marginTop: isMobile ? 2 : 4,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Paper
          elevation={isMobile ? 0 : 3}
          sx={{
            p: isMobile ? 2 : 4,
            width: '100%',
            border: isMobile ? 'none' : '1px solid #e0e0e0',
            borderRadius: 2
          }}
        >
          <Typography component="h1" variant="h4" align="center" gutterBottom sx={{ fontWeight: 'bold' }}>
            Register Now
          </Typography>

          {/* <Typography variant="h5" align="center" gutterBottom sx={{ mb: 4 }}>
            CHEF CARESMART
          </Typography> */}

          <Box component="form" onSubmit={formik.handleSubmit} sx={{ mt: 1 }}>
            {step === 1 ? (
              <>
                <TextField
                  fullWidth
                  id="name"
                  name="name"
                  label={<RequiredLabel label="Name" />}
                  value={formik.values.name}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.name && Boolean(formik.errors.name)}
                  helperText={formik.touched.name && formik.errors.name}
                  placeholder="Enter your name"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Person />
                      </InputAdornment>
                    ),
                  }}
                  sx={{ mb: 3 }}
                />

                <TextField
                  fullWidth
                  id="mobileNumber"
                  name="mobileNumber"
                  label={<RequiredLabel label="Mobile Number" />}
                  value={formik.values.mobileNumber}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.mobileNumber && Boolean(formik.errors.mobileNumber)}
                  helperText={formik.touched.mobileNumber && formik.errors.mobileNumber}
                  placeholder="Enter your mobile number"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Phone />
                      </InputAdornment>
                    ),
                  }}
                  sx={{ mb: 3 }}
                />

                <TextField
                  fullWidth
                  id="email"
                  name="email"
                  label="Email Address"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.email && Boolean(formik.errors.email)}
                  helperText={formik.touched.email && formik.errors.email}
                  placeholder="Enter your email"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Email />
                      </InputAdornment>
                    ),
                  }}
                  sx={{ mb: 3 }}
                />

                <TextField
                  fullWidth
                  id="password"
                  name="password"
                  label={<RequiredLabel label="Password" />}
                  type={showPassword ? 'text' : 'password'}
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.password && Boolean(formik.errors.password)}
                  helperText={formik.touched.password && formik.errors.password}
                  placeholder="Enter your password"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Lock />
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          // onClick={handleTogglePassword}
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  sx={{ mb: 3 }}
                />

                {/* <TextField
                  fullWidth
                  id="confirmPassword"
                  name="confirmPassword"
                  label={<RequiredLabel label="Confirm Password" />}
                  type="password"
                  value={formik.values.confirmPassword}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword)}
                  helperText={formik.touched.confirmPassword && formik.errors.confirmPassword}
                  placeholder="Confirm your password"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Lock />
                      </InputAdornment>
                    ),
                  }}
                  sx={{ mb: 3 }}
                />
 */}
                <TextField
                  fullWidth
                  id="address"
                  name="address"
                  label={<RequiredLabel label="Address" />}
                  multiline
                  rows={3}
                  value={formik.values.address}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.address && Boolean(formik.errors.address)}
                  helperText={formik.touched.address && formik.errors.address}
                  placeholder="Enter your address"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Home />
                      </InputAdornment>
                    ),
                  }}
                  sx={{ mb: 3 }}
                />

                <FormControl fullWidth error={formik.touched.role && Boolean(formik.errors.role)} sx={{ mb: 3 }}>
                  <InputLabel id="role-label"><RequiredLabel label="Choose Role" /></InputLabel>
                  <Select
                    labelId="role-label"
                    id="role"
                    name="role"
                    value={formik.values.role}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    label={<RequiredLabel label="Choose Role" />}
                  >
                    <MenuItem value=""><em>Select your role</em></MenuItem>
                    <MenuItem value="doctor">Doctor</MenuItem>
                    <MenuItem value="nursing">Nursing</MenuItem>
                    <MenuItem value="others">Others</MenuItem>
                  </Select>
                  {formik.touched.role && formik.errors.role && (
                    <FormHelperText>{formik.errors.role}</FormHelperText>
                  )}
                </FormControl>
              </>
            ) : (
              <Box>
                <Box sx={{ textAlign: 'center', mb: 3 }}>
                  <VerifiedUser color="primary" sx={{ fontSize: 50 }} />
                  <Typography variant="body1" sx={{ mt: 1 }}>
                    We've sent a 4-digit OTP to <strong>{formik.values.mobileNumber}</strong>
                  </Typography>
                </Box>

                <TextField
                  fullWidth
                  id="otp"
                  name="otp"
                  label="Verification Code"
                  value={formik.values.otp}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Lock />
                      </InputAdornment>
                    ),
                  }}
                  placeholder="Enter 6-digit OTP"
                  inputProps={{ maxLength: 6 }}
                  sx={{ mb: 2 }}
                />

                <Box sx={{ textAlign: 'center', mb: 3 }}>
                  {countdown > 0 ? (
                    <Typography color="primary">
                      <Timer sx={{ verticalAlign: 'middle', mr: 1 }} />
                      OTP expires in {Math.floor(countdown / 60)}:{String(countdown % 60).padStart(2, '0')}
                    </Typography>
                  ) : (
                    <Typography color="error">
                      OTP has expired
                    </Typography>
                  )}
                </Box>

                <Button
                  fullWidth
                  variant="outlined"
                  onClick={handleResendOTP}
                  disabled={loading || countdown > 0}
                  startIcon={<Send />}
                  sx={{ mb: 2 }}
                >
                  Resend OTP
                </Button>
              </Box>
            )}

            <Button
              type="submit"
              fullWidth
              variant="contained"
              disabled={loading}
              startIcon={loading ? <CircularProgress size={20} /> :
                step === 1 ? <null /> : <HowToReg />}
              sx={{
                mt: 3,
                mb: 2,
                py: 1.5,
                backgroundColor: '#1976d2',
                '&:hover': {
                  backgroundColor: '#1565c0',
                }
              }}
            >
              {loading ? 'Processing...' : step === 1 ? 'Signup' : 'Complete Registration'}
            </Button>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
};