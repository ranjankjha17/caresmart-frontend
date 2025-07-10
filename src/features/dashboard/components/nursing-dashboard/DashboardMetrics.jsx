// import React from 'react';
// import { Grid, Card, CardContent, Typography, Box, Skeleton } from '@mui/material';
// import {
//   People,
//   Today,
//   Schedule,
//   ArrowUpward,
//   ArrowDownward
// } from '@mui/icons-material';

// const MetricCard = ({ title, value, change, icon, loading }) => {
//   const isPositive = change >= 0;
//   const isLoading = loading || value === undefined;
  
//   return (
//     <Card sx={{ 
//       height: '100%', 
//       borderRadius: 2,
//       boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.05)',
//       transition: 'transform 0.2s',
//       '&:hover': {
//         transform: 'translateY(-4px)'
//       }
//     }}>
//       <CardContent>
//         <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
//           <Box sx={{ flex: 1 }}>
//             <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 1 }}>
//               {title}
//             </Typography>
            
//             {isLoading ? (
//               <Skeleton variant="text" width="60%" height={40} />
//             ) : (
//               <Typography variant="h4" sx={{ fontWeight: 700 }}>
//                 {value.toLocaleString()}
//               </Typography>
//             )}
            
//             {isLoading ? (
//               <Skeleton variant="text" width="40%" height={24} sx={{ mt: 1 }} />
//             ) : (
//               <Box sx={{ 
//                 display: 'flex', 
//                 alignItems: 'center', 
//                 mt: 1,
//                 color: isPositive ? 'success.main' : 'error.main'
//               }}>
//                 {isPositive ? (
//                   <ArrowUpward fontSize="small" />
//                 ) : (
//                   <ArrowDownward fontSize="small" />
//                 )}
//                 <Typography variant="body2" sx={{ ml: 0.5 }}>
//                   {Math.abs(change)}% {isPositive ? 'increase' : 'decrease'}
//                 </Typography>
//               </Box>
//             )}
//           </Box>
          
//           <Box sx={{
//             display: 'flex',
//             alignItems: 'center',
//             justifyContent: 'center',
//             width: 56,
//             height: 56,
//             borderRadius: '50%',
//             bgcolor: 'primary.light',
//             color: 'primary.main'
//           }}>
//             {icon}
//           </Box>
//         </Box>
//       </CardContent>
//     </Card>
//   );
// };

// const DashboardMetrics = ({ 
//   totalPatients = {}, 
//   patientsToday = {}, 
//   appointmentsToday = {},
//   loading 
// }) => {
//   return (
//     <Grid container spacing={3}>
//       <Grid item xs={12} sm={6} md={4}>
//         <MetricCard
//           title="Total Patients"
//           value={totalPatients.count}
//           change={totalPatients.change}
//           icon={<People fontSize="large" />}
//           loading={loading}
//         />
//       </Grid>
//       <Grid item xs={12} sm={6} md={4}>
//         <MetricCard
//           title="Patients Today"
//           value={patientsToday.count}
//           change={patientsToday.change}
//           icon={<Today fontSize="large" />}
//           loading={loading}
//         />
//       </Grid>
//       <Grid item xs={12} sm={6} md={4}>
//         <MetricCard
//           title="Appointments Today"
//           value={appointmentsToday.count}
//           change={appointmentsToday.change}
//           icon={<Schedule fontSize="large" />}
//           loading={loading}
//         />
//       </Grid>
//     </Grid>
//   );
// };

// export default DashboardMetrics;





import React from 'react';
import { Grid, Card, CardContent, Typography, Box, Skeleton } from '@mui/material';
import {
  People,
  Today,
  Schedule,
  LocalHospital,
  ArrowUpward,
  ArrowDownward
} from '@mui/icons-material';
import { useTheme } from '@mui/material/styles';

const MetricCard = ({ title, value, change, icon, loading }) => {
  const theme = useTheme();
  const isPositive = change >= 0;
  const isLoading = loading || value === undefined;
  
  return (
    <Card sx={{ 
      height: '100%',
      borderRadius: 3,
      boxShadow: '0 6px 20px rgba(0, 0, 0, 0.08)',
      transition: 'all 0.3s ease',
      '&:hover': {
        transform: 'translateY(-5px)',
        boxShadow: '0 12px 24px rgba(0, 0, 0, 0.12)'
      },
      background: theme.palette.mode === 'dark' 
        ? 'linear-gradient(135deg, #2C3E50 0%, #1A1A1A 100%)'
        : 'linear-gradient(135deg, #FFFFFF 0%, #F8F9FA 100%)'
    }}>
      <CardContent sx={{ p: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Box sx={{ flex: 1 }}>
            <Typography 
              variant="subtitle2" 
              sx={{ 
                mb: 1,
                color: theme.palette.text.secondary,
                fontWeight: 500
              }}
            >
              {title}
            </Typography>
            
            {isLoading ? (
              <Skeleton 
                variant="text" 
                width="60%" 
                height={40} 
                sx={{ bgcolor: theme.palette.mode === 'dark' ? '#444' : '#eee' }}
              />
            ) : (
              <Typography 
                variant="h3" 
                sx={{ 
                  fontWeight: 700,
                  color: theme.palette.text.primary
                }}
              >
                {value.toLocaleString()}
              </Typography>
            )}
            
            {isLoading ? (
              <Skeleton 
                variant="text" 
                width="40%" 
                height={24} 
                sx={{ 
                  mt: 1,
                  bgcolor: theme.palette.mode === 'dark' ? '#444' : '#eee'
                }} 
              />
            ) : (
              <Box sx={{ 
                display: 'flex', 
                alignItems: 'center', 
                mt: 1.5,
                color: isPositive ? theme.palette.success.main : theme.palette.error.main
              }}>
                {isPositive ? (
                  <ArrowUpward fontSize="small" />
                ) : (
                  <ArrowDownward fontSize="small" />
                )}
                <Typography 
                  variant="body2" 
                  sx={{ 
                    ml: 0.5,
                    fontWeight: 500
                  }}
                >
                  {Math.abs(change)}% {isPositive ? 'increase' : 'decrease'}
                </Typography>
              </Box>
            )}
          </Box>
          
          <Box sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: 60,
            height: 60,
            borderRadius: '50%',
            background: theme.palette.mode === 'dark'
              ? 'rgba(255, 255, 255, 0.1)'
              : 'rgba(63, 81, 181, 0.1)',
            color: theme.palette.primary.main
          }}>
            {React.cloneElement(icon, { fontSize: 'large' })}
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

const DashboardMetrics = ({ loading, metrics = {} }) => {
  return (
    <Grid container spacing={3}>
      <Grid item xs={12} sm={6} lg={3}>
        <MetricCard
          title="Total Patients"
          value={metrics?.totalPatients?.count || 0}
          change={metrics?.totalPatients?.change || 0}
          icon={<People />}
          loading={loading}
        />
      </Grid>
      <Grid item xs={12} sm={6} lg={3}>
        <MetricCard
          title="Patients Today"
          value={metrics?.patientsToday?.count || 0}
          change={metrics?.patientsToday?.change || 0}
          icon={<Today />}
          loading={loading}
        />
      </Grid>
      <Grid item xs={12} sm={6} lg={3}>
        <MetricCard
          title="Appointments"
          value={metrics?.appointmentsToday?.count || 0}
          change={metrics?.appointmentsToday?.change || 0}
          icon={<Schedule />}
          loading={loading}
        />
      </Grid>
      <Grid item xs={12} sm={6} lg={3}>
        <MetricCard
          title="Critical Cases"
          value={metrics?.criticalCases?.count || 0}
          change={metrics?.criticalCases?.change || 0}
          icon={<LocalHospital />}
          loading={loading}
        />
      </Grid>
    </Grid>
  );
};

export default DashboardMetrics;