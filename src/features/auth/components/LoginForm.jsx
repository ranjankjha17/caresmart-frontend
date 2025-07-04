// import React, { useState } from 'react';
// import { useFormik } from 'formik';
// import * as Yup from 'yup';
// import { toast } from 'react-toastify';
// import { useNavigate, Link } from 'react-router-dom';
// import axios from 'axios';
// import { 
//   Box,
//   Button,
//   Container,
//   CssBaseline,
//   FormControl,
//   FormHelperText,
//   Grid,
//   InputAdornment,
//   Link as MuiLink,
//   Paper,
//   TextField,
//   Typography,
//   useMediaQuery,
//   useTheme
// } from '@mui/material';
// import { Phone, Lock, Login } from '@mui/icons-material';

// export const LoginForm = () => {
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();
//   const theme = useTheme();
//   const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

//   const validationSchema = Yup.object().shape({
//     mobileNumber: Yup.string()
//       .required('Mobile number is required')
//       .matches(/^(\+91|0)?[6-9]\d{9}$/, 'Invalid Indian mobile number'),
//     password: Yup.string()
//       .required('Password is required')
//   });

//   const formik = useFormik({
//     initialValues: {
//       mobileNumber: '',
//       password: ''
//     },
//     validationSchema,
//     onSubmit: async (values) => {
//       setLoading(true);
//       try {
//         const response = await axios.post('http://localhost:5000/api/auth/login', {
//           mobileNumber: values.mobileNumber,
//           password: values.password
//         });

//         if (response.data.success) {
//           toast.success('Login successful!');
//           localStorage.setItem('token', response.data.token);
//           localStorage.setItem('user', JSON.stringify(response.data.user));

//           setTimeout(() => {
//             navigate('/dashboard');
//           }, 1000);
//         } else {
//           toast.error(response.data.message);
//         }
//       } catch (error) {
//         toast.error(error.response?.data?.message || 'Login failed');
//       } finally {
//         setLoading(false);
//       }
//     }
//   });

//   return (
//     <Container component="main" maxWidth="xs">
//       <CssBaseline />
//       <Box
//         sx={{
//           marginTop: isMobile ? 2 : 8,
//           display: 'flex',
//           flexDirection: 'column',
//           alignItems: 'center',
//         }}
//       >
//         <Paper
//           elevation={isMobile ? 0 : 3}
//           sx={{
//             p: 4,
//             width: '100%',
//             border: isMobile ? 'none' : '1px solid #e0e0e0',
//             borderRadius: 2
//           }}
//         >
//           <Box sx={{ textAlign: 'center', mb: 3 }}>
//             <Login color="primary" sx={{ fontSize: 40 }} />
//             <Typography component="h1" variant="h5">
//               Login with Mobile Number
//             </Typography>
//           </Box>

//           <Box 
//             component="form" 
//             onSubmit={formik.handleSubmit}
//             sx={{ mt: 1 }}
//           >
//             <FormControl fullWidth margin="normal">
//               <TextField
//                 fullWidth
//                 id="mobileNumber"
//                 name="mobileNumber"
//                 label="Mobile Number"
//                 variant="outlined"
//                 value={formik.values.mobileNumber}
//                 onChange={formik.handleChange}
//                 onBlur={formik.handleBlur}
//                 error={formik.touched.mobileNumber && Boolean(formik.errors.mobileNumber)}
//                 InputProps={{
//                   startAdornment: (
//                     <InputAdornment position="start">
//                       <Phone />
//                     </InputAdornment>
//                   ),
//                 }}
//                 placeholder="9176543210"
//               />
//               {formik.touched.mobileNumber && formik.errors.mobileNumber && (
//                 <FormHelperText error>
//                   {formik.errors.mobileNumber}
//                 </FormHelperText>
//               )}
//             </FormControl>

//             <FormControl fullWidth margin="normal">
//               <TextField
//                 fullWidth
//                 id="password"
//                 name="password"
//                 label="Password"
//                 type="password"
//                 variant="outlined"
//                 value={formik.values.password}
//                 onChange={formik.handleChange}
//                 onBlur={formik.handleBlur}
//                 error={formik.touched.password && Boolean(formik.errors.password)}
//                 InputProps={{
//                   startAdornment: (
//                     <InputAdornment position="start">
//                       <Lock />
//                     </InputAdornment>
//                   ),
//                 }}
//                 placeholder="Enter your password"
//               />
//               {formik.touched.password && formik.errors.password && (
//                 <FormHelperText error>
//                   {formik.errors.password}
//                 </FormHelperText>
//               )}
//             </FormControl>

//             <Button
//               type="submit"
//               fullWidth
//               variant="contained"
//               disabled={loading}
//               sx={{ mt: 3, mb: 2, py: 1.5 }}
//               startIcon={<Login />}
//             >
//               {loading ? 'Logging in...' : 'Login'}
//             </Button>

//             <Grid container justifyContent="space-between">
//               <Grid item>
//                 <MuiLink 
//                   component={Link} 
//                   to="/signup" 
//                   variant="body2"
//                   sx={{ textDecoration: 'none' }}
//                 >
//                   Don't have an account? Register
//                 </MuiLink>
//               </Grid>
//               {/* <Grid item>
//                 <MuiLink 
//                   component={Link} 
//                   to="/forgot-password" 
//                   variant="body2"
//                   sx={{ textDecoration: 'none' }}
//                 >
//                   Forgot password?
//                 </MuiLink>
//               </Grid> */}
//             </Grid>
//           </Box>
//         </Paper>
//       </Box>
//     </Container>
//   );
// };



import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import {
  Box,
  Button,
  Container,
  CssBaseline,
  FormControl,
  FormHelperText,
  Grid,
  IconButton,
  InputAdornment,
  Link as MuiLink,
  Paper,
  TextField,
  Typography,
  useMediaQuery,
  useTheme
} from '@mui/material';
import { Phone, Lock, Login, Visibility, VisibilityOff } from '@mui/icons-material';

export const LoginForm = () => {
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const validationSchema = Yup.object().shape({
    mobileNumber: Yup.string()
      .required('Mobile number is required')
      .matches(/^(\+91|0)?[6-9]\d{9}$/, 'Invalid Indian mobile number'),
    password: Yup.string()
      .required('Password is required')
  });

  const formik = useFormik({
    initialValues: {
      mobileNumber: '',
      password: ''
    },
    validationSchema,
    onSubmit: async (values) => {
      setLoading(true);
      try {
        const response = await axios.post('https://caresmart-backend.vercel.app/api/auth/login', {
          mobileNumber: values.mobileNumber,
          password: values.password
        });

        if (response.data.success) {
          toast.success('Login successful!');
          localStorage.setItem('token', response.data.token);
          localStorage.setItem('user', JSON.stringify(response.data.user));

          setTimeout(() => {
            navigate('/dashboard');
          }, 1000);
        } else {
          toast.error(response.data.message);
        }
      } catch (error) {
        toast.error(error.response?.data?.message || 'Login failed');
      } finally {
        setLoading(false);
      }
    }
  });

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      navigate('/dashboard')
    }

  })
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: isMobile ? 2 : 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Paper
          elevation={isMobile ? 0 : 3}
          sx={{
            p: 4,
            width: '100%',
            border: isMobile ? 'none' : '1px solid #e0e0e0',
            borderRadius: 2
          }}
        >
          <Box sx={{ textAlign: 'center', mb: 3 }}>
            <Login color="primary" sx={{ fontSize: 40 }} />
            <Typography component="h1" variant="h5">
              Login with Mobile Number
            </Typography>
          </Box>

          <Box
            component="form"
            onSubmit={formik.handleSubmit}
            sx={{ mt: 1 }}
          >
            <FormControl fullWidth margin="normal">
              <TextField
                fullWidth
                id="mobileNumber"
                name="mobileNumber"
                label={
                  <span>
                    Mobile Number <span style={{ color: 'red' }}>*</span>
                  </span>
                }
                variant="outlined"
                value={formik.values.mobileNumber}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.mobileNumber && Boolean(formik.errors.mobileNumber)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Phone />
                    </InputAdornment>
                  ),
                }}
                placeholder="9176543210"
              />
              {formik.touched.mobileNumber && formik.errors.mobileNumber && (
                <FormHelperText error>
                  {formik.errors.mobileNumber}
                </FormHelperText>
              )}
            </FormControl>

            <FormControl fullWidth margin="normal">
              <TextField
                fullWidth
                id="password"
                name="password"
                label={
                  <span>
                    Password <span style={{ color: 'red' }}>*</span>
                  </span>
                }
                type={showPassword ? 'text' : 'password'}
                variant="outlined"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.password && Boolean(formik.errors.password)}
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
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  )
                }}
                placeholder="Enter your password"
              />
              {formik.touched.password && formik.errors.password && (
                <FormHelperText error>
                  {formik.errors.password}
                </FormHelperText>
              )}
            </FormControl>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              disabled={loading}
              sx={{ mt: 3, mb: 2, py: 1.5 }}
              startIcon={<Login />}
            >
              {loading ? 'Logging in...' : 'Login'}
            </Button>

            <Grid container justifyContent="space-between">
              <Grid item>
                <MuiLink
                  component={Link}
                  to="/signup"
                  variant="body2"
                  sx={{ textDecoration: 'none' }}
                >
                  Don't have an account? Register
                </MuiLink>
              </Grid>
              {/* <Grid item>
                <MuiLink 
                  component={Link} 
                  to="/forgot-password" 
                  variant="body2"
                  sx={{ textDecoration: 'none' }}
                >
                  Forgot password?
                </MuiLink>
              </Grid> */}
            </Grid>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
};