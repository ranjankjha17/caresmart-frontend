// import React from 'react';
// import { Box, Grid, Typography } from '@mui/material';
// import DashboardMetrics from './DashboardMetrics';
// import AppointmentsTable from './AppointmentsTable';
// import ClinicsAvailability from './ClinicsAvailability';
// import DashboardFilters from './DashboardFilters';
// // import {useNursingDashboard} from '../../hooks/useNusingDashboard';
//  import useDashboardData from '../../hooks/useDashboardData';

// const NursingDashboard = () => {
//   const {
//     dashboardData,
//     appointments,
//     clinics,
//     loading,
//     error,
//     filters,
//     handleFilterChange
//   } = useDashboardData();

//   return (
//     <Box sx={{ p: { xs: 2, md: 3 }, backgroundColor: '#f8f9fa', minHeight: '100vh' }}>
//       <Typography variant="h4" component="h1" sx={{ 
//         fontWeight: 700,
//         mb: 3,
//         color: 'primary.main',
//         fontSize: { xs: '1.5rem', sm: '2rem' }
//       }}>
//         Nursing Dashboard
//       </Typography>
      
//       <DashboardFilters filters={filters} onFilterChange={handleFilterChange} />
      
//       <DashboardMetrics 
//         loading={loading}
//         totalPatients={dashboardData?.totalPatients}
//         patientsToday={dashboardData?.patientsToday}
//         appointmentsToday={dashboardData?.appointmentsToday}
//       />
      
//       <Grid container spacing={3} sx={{ mt: 2 }}>
//         <Grid item xs={12} lg={8}>
//           <AppointmentsTable 
//             appointments={appointments} 
//             loading={loading}
//           />
//         </Grid>
//         <Grid item xs={12} lg={4}>
//           <ClinicsAvailability 
//             clinics={clinics} 
//             loading={loading}
//           />
//         </Grid>
//       </Grid>
//     </Box>
//   );
// };

// export default NursingDashboard;


import React from 'react';
import { Box, Grid, useTheme } from '@mui/material';
import DashboardHeader from './DashboardHeader';
import DashboardMetrics from './DashboardMetrics';
import AppointmentsTable from './AppointmentsTable';
import ClinicsAvailability from './ClinicsAvailability';
import useDashboardData from '../../hooks/useDashboardData';

const NursingDashboard = () => {
  const theme = useTheme();
  const {
    dashboardData,
    appointments,
    clinics,
    loading,
    filters,
    handleFilterChange
  } = useDashboardData();

  return (
    <Box sx={{
      p: { xs: 2, sm: 3 },
      minHeight: '100vh',
      backgroundColor: theme.palette.background.default
    }}>
      <DashboardHeader 
        title="Nursing Dashboard"
        filters={filters}
        onFilterChange={handleFilterChange}
      />
      
      <Box sx={{ 
        maxWidth: 1800,
        mx: 'auto',
        mt: { xs: 2, md: 3 }
      }}>
        <DashboardMetrics 
          loading={loading}
          metrics={dashboardData}
        />
        
        <Grid container spacing={3} sx={{ mt: 0.5 }}>
          <Grid item xs={12} lg={8}>
            <AppointmentsTable 
              appointments={appointments} 
              loading={loading}
            />
          </Grid>
          <Grid item xs={12} lg={4}>
            <ClinicsAvailability 
              clinics={clinics} 
              loading={loading}
            />
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default NursingDashboard;