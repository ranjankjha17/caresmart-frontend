// import React from 'react';
// import {
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
//   Button,
//   Grid,
//   TextField,
//   InputAdornment,
//   Box
// } from '@mui/material';
// import {
//   MonitorHeart,
//   Thermostat,
//   Favorite,
//   Close,
//   EditNote
// } from '@mui/icons-material';

// const UpdateVitalsDialog = ({ open, onClose, vitalsData, onVitalsChange, onSubmit, patientName }) => {
//   return (
//     <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
//       <DialogTitle sx={{ 
//         bgcolor: 'primary.main',
//         color: 'white',
//         display: 'flex',
//         justifyContent: 'space-between',
//         alignItems: 'center'
//       }}>
//         <Box display="flex" alignItems="center">
//           <MonitorHeart sx={{ mr: 1 }} />
//           Update Vitals for {patientName}
//         </Box>
//       </DialogTitle>
//       <DialogContent sx={{ pt: 3 }}>
//         <Box sx={{ mt: 2 }}>
//           <Grid container spacing={2}>
//             <Grid item xs={12} sm={6}>
//               <TextField
//                 fullWidth
//                 label="Blood Pressure"
//                 name="bloodPressure"
//                 value={vitalsData.bloodPressure}
//                 onChange={onVitalsChange}
//                 placeholder="e.g., 120/80"
//                 variant="outlined"
//                 InputProps={{
//                   startAdornment: (
//                     <InputAdornment position="start">
//                       <MonitorHeart color="action" />
//                     </InputAdornment>
//                   )
//                 }}
//               />
//             </Grid>
//             {/* Other fields... */}
//           </Grid>
//         </Box>
//       </DialogContent>
//       <DialogActions sx={{ p: 2 }}>
//         <Button 
//           variant="outlined" 
//           onClick={onClose}
//           sx={{ mr: 1 }}
//         >
//           Cancel
//         </Button>
//         <Button 
//           variant="contained" 
//           color="primary"
//           onClick={onSubmit}
//           startIcon={<EditNote />}
//         >
//           Save Vitals
//         </Button>
//       </DialogActions>
//     </Dialog>
//   );
// };

// export default UpdateVitalsDialog;








import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Grid,
  TextField,
  InputAdornment,
  Box,
  useMediaQuery,
  useTheme,
  Typography,
  IconButton,
  Divider
} from '@mui/material';
import {
  MonitorHeart,
  Thermostat,
  Favorite,
  Close,
  EditNote,
  Opacity
} from '@mui/icons-material';

const UpdateVitalsDialog = ({ open, onClose, vitalsData, onVitalsChange, onSubmit, patientName }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      fullScreen={isMobile}
    >
      <DialogTitle sx={{ 
        bgcolor: 'primary.main',
        color: 'white',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        p: isMobile ? 1.5 : 2
      }}>
        <Box display="flex" alignItems="center">
          <MonitorHeart sx={{ mr: 1, fontSize: isMobile ? '1.5rem' : 'inherit' }} />
          <Typography variant={isMobile ? 'h6' : 'h5'}>
            Update Vitals for {patientName}
          </Typography>
        </Box>
        <IconButton onClick={onClose} sx={{ color: 'white' }}>
          <Close />
        </IconButton>
      </DialogTitle>
      
      <DialogContent sx={{ pt: 3, p: isMobile ? 1 : 3 }}>
        <Box sx={{ mt: isMobile ? 0 : 2 }}>
          <Grid container spacing={isMobile ? 1 : 2}>
            {/* Blood Pressure */}
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Blood Pressure"
                name="bloodPressure"
                value={vitalsData.bloodPressure || ''}
                onChange={onVitalsChange}
                placeholder="e.g., 120/80"
                variant="outlined"
                size={isMobile ? 'small' : 'medium'}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <MonitorHeart color="action" />
                    </InputAdornment>
                  ),
                  sx: {
                    fontSize: isMobile ? '0.875rem' : '1rem'
                  }
                }}
              />
            </Grid>

            {/* Temperature */}
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Temperature (°C)"
                name="temperature"
                value={vitalsData.temperature || ''}
                onChange={onVitalsChange}
                type="number"
                variant="outlined"
                size={isMobile ? 'small' : 'medium'}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Thermostat color="action" />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">°C</InputAdornment>
                  ),
                  sx: {
                    fontSize: isMobile ? '0.875rem' : '1rem'
                  }
                }}
              />
            </Grid>

            {/* Oxygen Level */}
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Oxygen Level"
                name="oxygenLevel"
                value={vitalsData.oxygenLevel || ''}
                onChange={onVitalsChange}
                type="number"
                variant="outlined"
                size={isMobile ? 'small' : 'medium'}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Opacity color="action" />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">%</InputAdornment>
                  ),
                  sx: {
                    fontSize: isMobile ? '0.875rem' : '1rem'
                  }
                }}
              />
            </Grid>

            {/* Pulse Rate */}
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Pulse Rate (bpm)"
                name="pulse"
                value={vitalsData.pulse || ''}
                onChange={onVitalsChange}
                type="number"
                variant="outlined"
                size={isMobile ? 'small' : 'medium'}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Favorite color="action" />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">bpm</InputAdornment>
                  ),
                  sx: {
                    fontSize: isMobile ? '0.875rem' : '1rem'
                  }
                }}
              />
            </Grid>

            {/* Additional Fields for Mobile */}
            {isMobile && (
              <>
                <Grid item xs={12}>
                  <Divider sx={{ my: 1 }} />
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="body2" color="textSecondary">
                    Enter all vital signs to complete the update
                  </Typography>
                </Grid>
              </>
            )}
          </Grid>
        </Box>
      </DialogContent>

      <DialogActions sx={{ 
        p: isMobile ? 1 : 2,
        flexDirection: isMobile ? 'column' : 'row',
        gap: isMobile ? 1 : 0
      }}>
        <Button 
          variant={isMobile ? 'outlined' : 'contained'}
          color={isMobile ? 'primary' : 'inherit'}
          onClick={onClose}
          fullWidth={isMobile}
          sx={isMobile ? {} : { mr: 1 }}
        >
          {isMobile ? 'Cancel Update' : 'Cancel'}
        </Button>
        <Button 
          variant="contained" 
          color="primary"
          onClick={onSubmit}
          startIcon={!isMobile && <EditNote />}
          fullWidth={isMobile}
          size={isMobile ? 'large' : 'medium'}
        >
          {isMobile ? 'Save All Vitals' : 'Save Vitals'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default UpdateVitalsDialog;