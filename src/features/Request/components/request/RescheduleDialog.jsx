// import React, { useState } from 'react';
// import {
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
//   Button,
//   Box,
//   Typography,
//   IconButton
// } from '@mui/material';
// import { LocalizationProvider } from '@mui/x-date-pickers';
// import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
// import { DatePicker, TimePicker } from '@mui/x-date-pickers';
// import { Close } from '@mui/icons-material';

// const RescheduleDialog = ({ 
//   open, 
//   onClose, 
//   appointment, 
//   onReschedule 
// }) => {
//   const [newDate, setNewDate] = useState(null);
//   const [newTime, setNewTime] = useState(null);

//   const handleSubmit = () => {
//     if (newDate && newTime) {
//       const combinedDateTime = new Date(
//         newDate.getFullYear(),
//         newDate.getMonth(),
//         newDate.getDate(),
//         newTime.getHours(),
//         newTime.getMinutes()
//       );
//       onReschedule(combinedDateTime);
//     }
//   };

//   return (
//     <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
//       <DialogTitle sx={{ 
//         display: 'flex', 
//         justifyContent: 'space-between', 
//         alignItems: 'center',
//         backgroundColor: (theme) => theme.palette.primary.main,
//         color: 'white'
//       }}>
//         <Box sx={{ display: 'flex', alignItems: 'center' }}>
//           Reschedule Appointment
//         </Box>
//         <IconButton onClick={onClose} sx={{ color: 'white' }}>
//           <Close />
//         </IconButton>
//       </DialogTitle>
      
//       <DialogContent sx={{ mt: 2 }}>
//         {appointment && (
//           <>
//             <Typography variant="subtitle1" gutterBottom color="text.primary">
//               Rescheduling for <strong>{appointment.patientName}</strong>
//             </Typography>
//             <Typography variant="body1" gutterBottom color="text.primary">
//               Service: <strong>{appointment.serviceType}</strong>
//             </Typography>
//             <Typography variant="body1" gutterBottom color="text.primary">
//               Current schedule: <strong>{appointment.scheduledTime}</strong>
//             </Typography>
            
//             <LocalizationProvider dateAdapter={AdapterDateFns}>
//               <Box sx={{ mt: 3 }}>
//                 <Typography variant="h6" gutterBottom color="text.primary">
//                   Select New Date and Time
//                 </Typography>
                
//                 <Box sx={{ 
//                   display: 'flex', 
//                   flexDirection: { xs: 'column', sm: 'row' },
//                   gap: 2,
//                   mb: 2
//                 }}>
//                   <DatePicker
//                     label="New Date"
//                     value={newDate}
//                     onChange={(newValue) => setNewDate(newValue)}
//                     sx={{ flex: 1 }}
//                     disablePast
//                   />
//                   <TimePicker
//                     label="New Time"
//                     value={newTime}
//                     onChange={(newValue) => setNewTime(newValue)}
//                     sx={{ flex: 1 }}
//                   />
//                 </Box>
//               </Box>
//             </LocalizationProvider>
//           </>
//         )}
//       </DialogContent>
      
//       <DialogActions sx={{ p: 3 }}>
//         <Button 
//           onClick={onClose} 
//           variant="outlined" 
//           color="secondary"
//           sx={{ mr: 2, color: 'text.primary' }}
//         >
//           Cancel
//         </Button>
//         <Button
//           onClick={handleSubmit}
//           variant="contained"
//           color="primary"
//           disabled={!newDate || !newTime}
//         >
//           Confirm Reschedule
//         </Button>
//       </DialogActions>
//     </Dialog>
//   );
// };

// export default RescheduleDialog;






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
        backgroundColor: '#3f51b5',
        color: 'white',
        padding: '16px 24px'
      }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          Reschedule Appointment
        </Box>
        <IconButton 
          onClick={onClose} 
          sx={{ 
            color: 'white',
            '&:hover': {
              backgroundColor: 'rgba(255, 255, 255, 0.1)'
            }
          }}
        >
          <Close />
        </IconButton>
      </DialogTitle>
      
      <DialogContent sx={{ mt: 2, padding: '24px' }}>
        {appointment && (
          <>
            <Typography variant="subtitle1" gutterBottom color="#212529" fontWeight={500}>
              Rescheduling for <span style={{ color: '#3f51b5' }}>{appointment.patientName}</span>
            </Typography>
            <Typography variant="body1" gutterBottom color="#495057">
              Service: <span style={{ fontWeight: 500 }}>{appointment.serviceType}</span>
            </Typography>
            <Typography variant="body1" gutterBottom color="#495057">
              Current schedule: <span style={{ fontWeight: 500 }}>{appointment.scheduledTime}</span>
            </Typography>
            
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <Box sx={{ mt: 3 }}>
                <Typography variant="h6" gutterBottom color="#212529" fontWeight={500}>
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
      
      <DialogActions sx={{ 
        padding: '16px 24px',
        borderTop: '1px solid #e9ecef'
      }}>
        <Button 
          onClick={onClose} 
          variant="outlined" 
          sx={{ 
            color: '#6c757d',
            borderColor: '#dee2e6',
            '&:hover': {
              borderColor: '#adb5bd',
              backgroundColor: '#f8f9fa'
            }
          }}
        >
          Cancel
        </Button>
        <Button
          onClick={handleSubmit}
          variant="contained"
          sx={{
            backgroundColor: '#3f51b5',
            color: 'white',
            '&:hover': {
              backgroundColor: '#303f9f'
            },
            '&:disabled': {
              backgroundColor: '#e9ecef',
              color: '#adb5bd'
            }
          }}
          disabled={!newDate || !newTime}
        >
          Confirm Reschedule
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default RescheduleDialog;