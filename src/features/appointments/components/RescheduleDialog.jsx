// import React, { useState } from 'react';
// import {
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
//   Button,
//   Box,
//   Typography,
//   IconButton,
//   Tooltip
// } from '@mui/material';
// import { DatePicker, TimePicker } from '@mui/x-date-pickers';
// import { Edit, Close } from '@mui/icons-material';

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
//       // Combine date and time into a single datetime object
//       const rescheduledDateTime = new Date(
//         newDate.getFullYear(),
//         newDate.getMonth(),
//         newDate.getDate(),
//         newTime.getHours(),
//         newTime.getMinutes()
//       );
      
//       onReschedule(appointment.id, rescheduledDateTime);
//       onClose();
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
//           <Edit sx={{ mr: 1 }} />
//           Reschedule Appointment
//         </Box>
//         <IconButton onClick={onClose} sx={{ color: 'white' }}>
//           <Close />
//         </IconButton>
//       </DialogTitle>
      
//       <DialogContent sx={{ mt: 2 }}>
//         {appointment && (
//           <>
//             <Typography variant="subtitle1" gutterBottom>
//               Current appointment for <strong>{appointment.patientName}</strong>
//             </Typography>
//             <Typography variant="body1" gutterBottom>
//               Service: {appointment.serviceType}
//             </Typography>
//             <Typography variant="body1" gutterBottom>
//               Current Date/Time: {appointment.date}
//             </Typography>
            
//             <Box sx={{ mt: 3 }}>
//               <Typography variant="h6" gutterBottom>
//                 Select New Date and Time
//               </Typography>
              
//               <Box sx={{ 
//                 display: 'flex', 
//                 flexDirection: { xs: 'column', sm: 'row' },
//                 gap: 2,
//                 mb: 2
//               }}>
//                 <DatePicker
//                   label="New Date"
//                   value={newDate}
//                   onChange={(newValue) => setNewDate(newValue)}
//                   sx={{ flex: 1 }}
//                   disablePast
//                 />
//                 <TimePicker
//                   label="New Time"
//                   value={newTime}
//                   onChange={(newValue) => setNewTime(newValue)}
//                   sx={{ flex: 1 }}
//                 />
//               </Box>
//             </Box>
//           </>
//         )}
//       </DialogContent>
      
//       <DialogActions sx={{ p: 3 }}>
//         <Button 
//           onClick={onClose} 
//           variant="outlined" 
//           color="secondary"
//           sx={{ mr: 2 }}
//         >
//           Cancel
//         </Button>
//         <Button
//           onClick={handleSubmit}
//           variant="contained"
//           color="primary"
//           disabled={!newDate || !newTime}
//           startIcon={<Edit />}
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
      // Combine date and time
      const combinedDateTime = new Date(
        newDate.getFullYear(),
        newDate.getMonth(),
        newDate.getDate(),
        newTime.getHours(),
        newTime.getMinutes()
      );
      console.log("appointment",appointment)
      console.log("combine date time",combinedDateTime)
      onReschedule(combinedDateTime);
      onClose();
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
              Current: {appointment.serviceType} at {appointment.date}
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