import React from 'react';
import { Grid, Card, CardContent, Typography, Box, Skeleton } from '@mui/material';
import {
  People,
  Today,
  Schedule,
  ArrowUpward,
  ArrowDownward
} from '@mui/icons-material';

const MetricCard = ({ title, value, change, icon, loading }) => {
  const isPositive = change >= 0;
  const isLoading = loading || value === undefined;
  
  return (
    <Card sx={{ 
      height: '100%', 
      borderRadius: 2,
      boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.05)',
      transition: 'transform 0.2s',
      '&:hover': {
        transform: 'translateY(-4px)'
      }
    }}>
      <CardContent>
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Box sx={{ flex: 1 }}>
            <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 1 }}>
              {title}
            </Typography>
            
            {isLoading ? (
              <Skeleton variant="text" width="60%" height={40} />
            ) : (
              <Typography variant="h4" sx={{ fontWeight: 700 }}>
                {value.toLocaleString()}
              </Typography>
            )}
            
            {isLoading ? (
              <Skeleton variant="text" width="40%" height={24} sx={{ mt: 1 }} />
            ) : (
              <Box sx={{ 
                display: 'flex', 
                alignItems: 'center', 
                mt: 1,
                color: isPositive ? 'success.main' : 'error.main'
              }}>
                {isPositive ? (
                  <ArrowUpward fontSize="small" />
                ) : (
                  <ArrowDownward fontSize="small" />
                )}
                <Typography variant="body2" sx={{ ml: 0.5 }}>
                  {Math.abs(change)}% {isPositive ? 'increase' : 'decrease'}
                </Typography>
              </Box>
            )}
          </Box>
          
          <Box sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: 56,
            height: 56,
            borderRadius: '50%',
            bgcolor: 'primary.light',
            color: 'primary.main'
          }}>
            {icon}
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

const DashboardMetrics = ({ 
  totalPatients = {}, 
  patientsToday = {}, 
  appointmentsToday = {},
  loading 
}) => {
  return (
    <Grid container spacing={3}>
      <Grid item xs={12} sm={6} md={4}>
        <MetricCard
          title="Total Patients"
          value={totalPatients.count}
          change={totalPatients.change}
          icon={<People fontSize="large" />}
          loading={loading}
        />
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <MetricCard
          title="Patients Today"
          value={patientsToday.count}
          change={patientsToday.change}
          icon={<Today fontSize="large" />}
          loading={loading}
        />
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <MetricCard
          title="Appointments Today"
          value={appointmentsToday.count}
          change={appointmentsToday.change}
          icon={<Schedule fontSize="large" />}
          loading={loading}
        />
      </Grid>
    </Grid>
  );
};

export default DashboardMetrics;