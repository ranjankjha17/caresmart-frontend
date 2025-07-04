// src/App.jsx
import React from 'react';
import { 
  Box, 
  Typography, 
  Grid, 
  Card, 
  CardContent, 
  Button, 
  Container, 
  useTheme, 
  useMediaQuery 
} from '@mui/material';
import { styled } from '@mui/system';

// Import your images - make sure they exist in the specified paths
// import patientImg from './assets/patient.png';
// import doctorImg from './assets/doctor.png';
// import pharmacyImg from './assets/pharmacy.png';
// import pathologyImg from './assets/pathology.png';
// import diagnosisImg from './assets/diagnosis.png';
// import ambulanceImg from './assets/ambulance.png';
// import nursingImg from './assets/nursing.png';
// import biomedicalImg from './assets/biomedical.png';
// import hospitalImg from './assets/hospital.png';

const HealthcareDashboard = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const services = [
    { 
      name: 'Patient', 
      icon: <img src={''} alt="Patient" style={{ width: 40, height: 40 }} />,
      link: '/patient-registration' 
    },
    { 
      name: 'Doctor', 
      icon: <img src={''} alt="Doctor" style={{ width: 40, height: 40 }} />,
      link: '/doctor-registration' 
    },
    { 
      name: 'Pharmacy Retailers', 
      icon: <img src={''} alt="Pharmacy" style={{ width: 40, height: 40 }} />,
      link: '/pharmacy-registration' 
    },
    { 
      name: 'Pathology', 
      icon: <img src={''} alt="Pathology" style={{ width: 40, height: 40 }} />,
      link: '/pathology-registration' 
    },
    { 
      name: 'Diagnosis', 
      icon: <img src={''} alt="Diagnosis" style={{ width: 40, height: 40 }} />,
      link: '/diagnosis-registration' 
    },
    { 
      name: 'Ambulance', 
      icon: <img src={''} alt="Ambulance" style={{ width: 40, height: 40 }} />,
      link: '/ambulance-registration' 
    },
    { 
      name: 'Nursing', 
      icon: <img src={''} alt="Nursing" style={{ width: 40, height: 40 }} />,
      link: '/nursing-registration' 
    },
    { 
      name: 'Biomedical', 
      icon: <img src={''} alt="Biomedical" style={{ width: 40, height: 40 }} />,
      link: '/biomedical-registration' 
    },
    { 
      name: 'Hospital', 
      icon: <img src={''} alt="Hospital" style={{ width: 40, height: 40 }} />,
      link: '/hospital-registration' 
    },
  ];

  const StyledCard = styled(Card)({
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    transition: 'transform 0.3s, box-shadow 0.3s',
    '&:hover': {
      transform: 'translateY(-5px)',
      boxShadow: theme.shadows[6],
    },
  });

  const handleButtonClick = (link) => {
    // In a real app, you would use react-router or similar for navigation
    window.location.href = link;
    // Alternatively with React Router:
    // navigate(link);
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* <Box textAlign="center" mb={4}>
        <Typography variant="h3" component="h1" gutterBottom sx={{ 
          fontWeight: 700, 
          color: theme.palette.primary.main,
          fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' }
        }}>
          Healthcare Management System
        </Typography>
        <Typography variant="subtitle1" color="text.secondary">
          Connect with all healthcare services in one place
        </Typography>
      </Box> */}

      <Grid container spacing={3}>
        {services.map((service, index) => (
          <Grid key={index} item xs={12} sm={6} md={4}>
            <StyledCard>
              <CardContent sx={{ 
                flexGrow: 1, 
                textAlign: 'center',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center'
              }}>
                <Box
                  sx={{
                    width: 80,
                    height: 80,
                    borderRadius: '50%',
                    bgcolor: theme.palette.primary.light, // Consistent light blue background
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 16px',
                  }}
                >
                  {service.icon}
                </Box>
                <Typography variant="h6" gutterBottom>
                  {service.name}
                </Typography>
                <Button
                  variant="contained"
                  color="primary" // Consistent blue color for all buttons
                  fullWidth
                  size={isMobile ? 'small' : 'medium'}
                  sx={{ fontWeight: 'bold', mt: 2 }}
                  onClick={() => handleButtonClick(service.link)}
                >
                  Register
                </Button>
              </CardContent>
            </StyledCard>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default HealthcareDashboard;