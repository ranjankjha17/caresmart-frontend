import React from 'react';
import { Box, Typography, useTheme } from '@mui/material';
import DashboardFilters from './DashboardFilters';

const DashboardHeader = ({ title, filters, onFilterChange }) => {
  const theme = useTheme();

  return (
    <Box sx={{
      mb: 3,
      display: 'flex',
      flexDirection: { xs: 'column', sm: 'row' },
      alignItems: { xs: 'flex-start', sm: 'center' },
      justifyContent: 'space-between',
      gap: 2
    }}>
      <Typography variant="h4" sx={{
        fontWeight: 700,
        background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        fontSize: { xs: '1.8rem', sm: '2.2rem' }
      }}>
        {title}
      </Typography>
      
      <DashboardFilters 
        filters={filters} 
        onFilterChange={onFilterChange}
      />
    </Box>
  );
};

export default DashboardHeader;