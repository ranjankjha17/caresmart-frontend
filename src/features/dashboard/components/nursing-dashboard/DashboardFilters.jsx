import React from 'react';
import {
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  useMediaQuery,
  useTheme
} from '@mui/material';
import { FilterList } from '@mui/icons-material';

const DashboardFilters = ({ filters, onFilterChange }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleTimeRangeChange = (e) => {
    onFilterChange({ timeRange: e.target.value });
  };

  const handleStatusChange = (e) => {
    onFilterChange({ appointmentStatus: e.target.value });
  };

  return (
    <Box sx={{ 
      display: 'flex', 
      gap: 2,
      flexDirection: isMobile ? 'column' : 'row',
      mb: 3
    }}>
      <FormControl size="small" sx={{ minWidth: isMobile ? '100%' : 180 }}>
        <InputLabel>Time Range</InputLabel>
        <Select
          value={filters.timeRange}
          onChange={handleTimeRangeChange}
          label="Time Range"
          startAdornment={<FilterList sx={{ mr: 1, color: 'action.active' }} />}
        >
          <MenuItem value="today">Today</MenuItem>
          <MenuItem value="week">This Week</MenuItem>
          <MenuItem value="month">This Month</MenuItem>
        </Select>
      </FormControl>
      
      <FormControl size="small" sx={{ minWidth: isMobile ? '100%' : 180 }}>
        <InputLabel>Appointment Status</InputLabel>
        <Select
          value={filters.appointmentStatus}
          onChange={handleStatusChange}
          label="Appointment Status"
        >
          <MenuItem value="all">All Appointments</MenuItem>
          <MenuItem value="confirmed">Confirmed</MenuItem>
          <MenuItem value="pending">Pending</MenuItem>
          <MenuItem value="cancelled">Cancelled</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
};

export default DashboardFilters;