import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
  Typography,
  IconButton
} from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DatePicker, TimePicker } from '@mui/x-date-pickers';
import { Close } from '@mui/icons-material';
import { format } from 'date-fns';

const RescheduleDialog = ({ 
  open, 
  onClose, 
  appointment, 
  onReschedule 
}) => {
  const [newDate, setNewDate] = useState(null);
  const [newTime, setNewTime] = useState(null);

  const handleSubmit = () => {
    if (newDate && newTime) {
      // Combine date and time
      const combinedDateTime = new Date(
        newDate.getFullYear(),
        newDate.getMonth(),
        newDate.getDate(),
        newTime.getHours(),
        newTime.getMinutes()
      );

      onReschedule(combinedDateTime);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle sx={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        backgroundColor: (theme) => theme.palette.primary.main,
        color: 'white'
      }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          Reschedule Appointment
        </Box>
        <IconButton onClick={onClose} sx={{ color: 'white' }}>
          <Close />
        </IconButton>
      </DialogTitle>
      
      <DialogContent sx={{ mt: 2 }}>
        {appointment && (
          <>
            <Typography variant="subtitle1" gutterBottom>
              Rescheduling for <strong>{appointment.patientName}</strong>
            </Typography>
            <Typography variant="body1" gutterBottom>
              Service: <strong>{appointment.serviceType}</strong>
            </Typography>
            <Typography variant="body1" gutterBottom>
              Current schedule: <strong>{appointment.scheduledTime}</strong>
            </Typography>
            
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <Box sx={{ mt: 3 }}>
                <Typography variant="h6" gutterBottom>
                  Select New Date and Time
                </Typography>
                
                <Box sx={{ 
                  display: 'flex', 
                  flexDirection: { xs: 'column', sm: 'row' },
                  gap: 2,
                  mb: 2
                }}>
                  <DatePicker
                    label="New Date"
                    value={newDate}
                    onChange={(newValue) => setNewDate(newValue)}
                    sx={{ flex: 1 }}
                    disablePast
                  />
                  <TimePicker
                    label="New Time"
                    value={newTime}
                    onChange={(newValue) => setNewTime(newValue)}
                    sx={{ flex: 1 }}
                  />
                </Box>
              </Box>
            </LocalizationProvider>
          </>
        )}
      </DialogContent>
      
      <DialogActions sx={{ p: 3 }}>
        <Button 
          onClick={onClose} 
          variant="outlined" 
          color="secondary"
          sx={{ mr: 2 }}
        >
          Cancel
        </Button>
        <Button
          onClick={handleSubmit}
          variant="contained"
          color="primary"
          disabled={!newDate || !newTime}
        >
          Confirm Reschedule
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default RescheduleDialog;