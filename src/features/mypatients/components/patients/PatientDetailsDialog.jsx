// import React from 'react';
// import {
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
//   Button,
//   Grid,
//   List,
//   ListItem,
//   ListItemAvatar,
//   ListItemText,
//   Avatar,
//   Typography,
//   Paper,
//   Divider,
//   useTheme,
//   Box
// } from '@mui/material';
// import {
//   Person,
//   MedicalInformation,
//   LocalHospital,
//   CalendarToday,
//   Medication,
//   Warning,
//   MonitorHeart,
//   Thermostat,
//   Favorite,
//   Scale,
//   Height,
//   Notes,
//   EditNote
// } from '@mui/icons-material';

// const PatientDetailsDialog = ({ open, onClose, patient, onUpdateVitals }) => {
//   const theme = useTheme();

//   if (!patient) return null;

//   return (
//     <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
//       <DialogTitle sx={{ 
//         bgcolor: 'primary.main',
//         color: 'white',
//         display: 'flex',
//         justifyContent: 'space-between',
//         alignItems: 'center'
//       }}>
//         <Box display="flex" alignItems="center">
//           <Person sx={{ mr: 1 }} />
//           Patient Details: {patient.name}
//         </Box>
//       </DialogTitle>
//       <DialogContent dividers sx={{ pt: 3 }}>
//         <Grid container spacing={3}>
//           <Grid item xs={12} md={6}>
//             <Typography variant="subtitle1" gutterBottom sx={{ 
//               fontWeight: 'bold',
//               color: 'primary.main',
//               display: 'flex',
//               alignItems: 'center'
//             }}>
//               <Person sx={{ mr: 1 }} />
//               Basic Information
//             </Typography>
//             <List dense>
//               <ListItem>
//                 <ListItemAvatar>
//                   <Avatar sx={{ bgcolor: 'primary.light' }}>
//                     <MedicalInformation />
//                   </Avatar>
//                 </ListItemAvatar>
//                 <ListItemText 
//                   primary="Patient ID" 
//                   secondary={patient.patientId} 
//                   secondaryTypographyProps={{ color: 'textPrimary' }}
//                 />
//               </ListItem>
//               {/* Other list items... */}
//             </List>
//           </Grid>

//           {/* Other sections... */}
//         </Grid>
//       </DialogContent>
//       <DialogActions sx={{ p: 2 }}>
//         <Button 
//           variant="outlined" 
//           onClick={onClose}
//           sx={{ mr: 1 }}
//         >
//           Close
//         </Button>
//         <Button 
//           variant="contained" 
//           color="primary"
//           onClick={onUpdateVitals}
//           startIcon={<EditNote />}
//         >
//           Update Vitals
//         </Button>
//       </DialogActions>
//     </Dialog>
//   );
// };

// export default PatientDetailsDialog;


import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Grid,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
  Typography,
  Paper,
  Divider,
  useTheme,
  Box
} from '@mui/material';
import {
  Person,
  MedicalInformation,
  LocalHospital,
  CalendarToday,
  Medication,
  Warning,
  MonitorHeart,
  Thermostat,
  Favorite,
  Scale,
  Notes,
  EditNote,
  Opacity,
  Female,
  Male
} from '@mui/icons-material';

const PatientDetailsDialog = ({ open, onClose, patient, onUpdateVitals }) => {
  const theme = useTheme();

  if (!patient) return null;

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle sx={{ 
        bgcolor: 'primary.main',
        color: 'white',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <Box display="flex" alignItems="center">
          <Person sx={{ mr: 1 }} />
          Patient Details: {patient.name}
        </Box>
      </DialogTitle>
      <DialogContent dividers sx={{ pt: 3 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Typography variant="subtitle1" gutterBottom sx={{ 
              fontWeight: 'bold',
              color: 'primary.main',
              display: 'flex',
              alignItems: 'center'
            }}>
              <Person sx={{ mr: 1 }} />
              Basic Information
            </Typography>
            <List dense>
              <ListItem>
                <ListItemAvatar>
                  <Avatar sx={{ bgcolor: 'primary.light' }}>
                    <MedicalInformation />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText 
                  primary="Patient ID" 
                  secondary={patient.patientId} 
                  secondaryTypographyProps={{ color: 'textPrimary' }}
                />
              </ListItem>
              <ListItem>
                <ListItemAvatar>
                  <Avatar sx={{ bgcolor: 'secondary.light' }}>
                    <CalendarToday />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText 
                  primary="Age" 
                  secondary={`${patient.age} years`} 
                />
              </ListItem>
              <ListItem>
                <ListItemAvatar>
                  <Avatar sx={{ 
                    bgcolor: patient.gender === 'Male' ? 
                      'primary.light' : 
                      'secondary.light'
                  }}>
                    {patient.gender === 'Male' ? <Male /> : <Female />}
                  </Avatar>
                </ListItemAvatar>
                <ListItemText 
                  primary="Gender" 
                  secondary={patient.gender} 
                />
              </ListItem>
              <ListItem>
                <ListItemAvatar>
                  <Avatar sx={{ bgcolor: 'info.light' }}>
                    <LocalHospital />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText 
                  primary="Room/Ward" 
                  secondary={patient.room} 
                />
              </ListItem>
              <ListItem>
                <ListItemAvatar>
                  <Avatar sx={{ bgcolor: 'warning.light' }}>
                    <MedicalInformation />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText 
                  primary="Diagnosis" 
                  secondary={patient.diagnosis || 'Not specified'} 
                />
              </ListItem>
              <ListItem>
                <ListItemAvatar>
                  <Avatar sx={{ bgcolor: 'success.light' }}>
                    <Person />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText 
                  primary="Attending Physician" 
                  secondary={patient.doctor || 'Not assigned'} 
                />
              </ListItem>
              <ListItem>
                <ListItemAvatar>
                  <Avatar sx={{ 
                    bgcolor: patient.status === 'Active' ? 
                      'success.light' : 
                      'error.light'
                  }}>
                    {patient.status === 'Active' ? 'A' : 'I'}
                  </Avatar>
                </ListItemAvatar>
                <ListItemText 
                  primary="Status" 
                  secondary={patient.status} 
                />
              </ListItem>
            </List>
          </Grid>

          <Grid item xs={12} md={6}>
            <Typography variant="subtitle1" gutterBottom sx={{ 
              fontWeight: 'bold',
              color: 'primary.main',
              display: 'flex',
              alignItems: 'center'
            }}>
              <MedicalInformation sx={{ mr: 1 }} />
              Medical Information
            </Typography>
            <List dense>
              <ListItem>
                <ListItemAvatar>
                  <Avatar sx={{ bgcolor: 'error.light' }}>
                    <Medication />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText 
                  primary="Medications" 
                  secondary={patient.medications?.join(', ') || 'None prescribed'} 
                  secondaryTypographyProps={{ sx: { wordBreak: 'break-word' } }}
                />
              </ListItem>
              <ListItem>
                <ListItemAvatar>
                  <Avatar sx={{ bgcolor: 'warning.light' }}>
                    <Warning />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText 
                  primary="Allergies" 
                  secondary={patient.allergies?.join(', ') || 'None reported'} 
                />
              </ListItem>
              <ListItem>
                <ListItemAvatar>
                  <Avatar sx={{ bgcolor: 'info.light' }}>
                    <CalendarToday />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText 
                  primary="Next Checkup" 
                  secondary={patient.nextCheckup || 'Not scheduled'} 
                />
              </ListItem>
            </List>
          </Grid>

          {patient.vitalSigns && (
            <Grid item xs={12}>
              <Typography variant="subtitle1" gutterBottom sx={{ 
                fontWeight: 'bold',
                color: 'primary.main',
                display: 'flex',
                alignItems: 'center'
              }}>
                <MonitorHeart sx={{ mr: 1 }} />
                Vital Signs
              </Typography>
              <Grid container spacing={2} sx={{ px: 2 }}>
                <Grid item xs={6} sm={4} md={2}>
                  <Paper elevation={2} sx={{ p: 2, textAlign: 'center' }}>
                    <MonitorHeart color="error" sx={{ fontSize: 40, mb: 1 }} />
                    <Typography variant="subtitle2">Blood Pressure</Typography>
                    <Typography variant="h6" fontWeight="bold">
                      {patient.vitalSigns.bloodPressure || '--/--'}
                    </Typography>
                    <Typography variant="caption">mmHg</Typography>
                  </Paper>
                </Grid>
                <Grid item xs={6} sm={4} md={2}>
                  <Paper elevation={2} sx={{ p: 2, textAlign: 'center' }}>
                    <Thermostat color="warning" sx={{ fontSize: 40, mb: 1 }} />
                    <Typography variant="subtitle2">Temperature</Typography>
                    <Typography variant="h6" fontWeight="bold">
                      {patient.vitalSigns.temperature || '--'}
                    </Typography>
                    <Typography variant="caption">°C</Typography>
                  </Paper>
                </Grid>
                <Grid item xs={6} sm={4} md={2}>
                  <Paper elevation={2} sx={{ p: 2, textAlign: 'center' }}>
                    <Favorite color="error" sx={{ fontSize: 40, mb: 1 }} />
                    <Typography variant="subtitle2">Pulse Rate</Typography>
                    <Typography variant="h6" fontWeight="bold">
                      {patient.vitalSigns.pulse || '--'}
                    </Typography>
                    <Typography variant="caption">bpm</Typography>
                  </Paper>
                </Grid>
                <Grid item xs={6} sm={4} md={2}>
                  <Paper elevation={2} sx={{ p: 2, textAlign: 'center' }}>
                    <Opacity color="info" sx={{ fontSize: 40, mb: 1 }} />
                    <Typography variant="subtitle2">Oxygen Level</Typography>
                    <Typography variant="h6" fontWeight="bold">
                      {patient.vitalSigns.oxygenLevel || '--'}
                    </Typography>
                    <Typography variant="caption">%</Typography>
                  </Paper>
                </Grid>
              </Grid>
            </Grid>
          )}

          <Grid item xs={12}>
            <Typography variant="subtitle1" gutterBottom sx={{ 
              fontWeight: 'bold',
              color: 'primary.main',
              display: 'flex',
              alignItems: 'center'
            }}>
              <Notes sx={{ mr: 1 }} />
              Clinical Notes
            </Typography>
            <Paper elevation={0} sx={{ 
              p: 2,
              backgroundColor: 'grey.50',
              borderRadius: 2,
              maxHeight: 200,
              overflow: 'auto'
            }}>
              {patient.notes ? (
                <Typography variant="body2" whiteSpace="pre-wrap">
                  {patient.notes}
                </Typography>
              ) : (
                <Typography variant="body2" color="textSecondary">
                  No notes available for this patient
                </Typography>
              )}
            </Paper>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions sx={{ p: 2 }}>
        <Button 
          variant="outlined" 
          onClick={onClose}
          sx={{ mr: 1 }}
        >
          Close
        </Button>
        <Button 
          variant="contained" 
          color="primary"
          onClick={onUpdateVitals}
          startIcon={<EditNote />}
        >
          Update Vitals
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default PatientDetailsDialog;









// import React from 'react';
// import {
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
//   Button,
//   Grid,
//   List,
//   ListItem,
//   ListItemAvatar,
//   ListItemText,
//   Avatar,
//   Typography,
//   Paper,
//   Divider,
//   useTheme,
//   Box
// } from '@mui/material';
// import {
//   Person,
//   MedicalInformation,
//   LocalHospital,
//   CalendarToday,
//   Medication,
//   Warning,
//   MonitorHeart,
//   Thermostat,
//   Favorite,
//   Scale,
//   Notes,
//   EditNote,
//   Opacity,
//   Female,
//   Male
// } from '@mui/icons-material';

// const PatientDetailsDialog = ({ open, onClose, patient, onUpdateVitals }) => {
//   const theme = useTheme();

//   if (!patient) return null;

//   // Safely access nested properties
//   const vitalSigns = patient.vitalSigns || {};
//   const notes = patient.notes || 'No notes available';

//   return (
//     <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
//       <DialogTitle sx={{
//         bgcolor: 'primary.main',
//         color: 'white',
//         display: 'flex',
//         justifyContent: 'space-between',
//         alignItems: 'center'
//       }}>
//         <Box display="flex" alignItems="center">
//           <Person sx={{ mr: 1 }} />
//           Patient Details: {patient.name}
//         </Box>
//       </DialogTitle>
//       <DialogContent dividers sx={{ pt: 3 }}>
//         <Grid container spacing={3}>
//           {/* Basic Information Section - unchanged */}

//           <Grid item xs={12} md={6}>
//             <Typography variant="subtitle1" gutterBottom sx={{
//               fontWeight: 'bold',
//               color: 'primary.main',
//               display: 'flex',
//               alignItems: 'center'
//             }}>
//               <Person sx={{ mr: 1 }} />
//               Basic Information
//             </Typography>
//             <List dense>
//               <ListItem>
//                 <ListItemAvatar>
//                   <Avatar sx={{ bgcolor: 'primary.light' }}>
//                     <MedicalInformation />
//                   </Avatar>
//                 </ListItemAvatar>
//                 <ListItemText
//                   primary="Patient ID"
//                   secondary={patient.patientId}
//                   secondaryTypographyProps={{ color: 'textPrimary' }}
//                 />
//               </ListItem>
//               <ListItem>
//                 <ListItemAvatar>
//                   <Avatar sx={{ bgcolor: 'secondary.light' }}>
//                     <CalendarToday />
//                   </Avatar>
//                 </ListItemAvatar>
//                 <ListItemText
//                   primary="Age"
//                   secondary={`${patient.age} years`}
//                 />
//               </ListItem>
//               <ListItem>
//                 <ListItemAvatar>
//                   <Avatar sx={{
//                     bgcolor: patient.gender === 'Male' ?
//                       'primary.light' :
//                       'secondary.light'
//                   }}>
//                     {patient.gender === 'Male' ? <Male /> : <Female />}
//                   </Avatar>
//                 </ListItemAvatar>
//                 <ListItemText
//                   primary="Gender"
//                   secondary={patient.gender}
//                 />
//               </ListItem>
//               <ListItem>
//                 <ListItemAvatar>
//                   <Avatar sx={{ bgcolor: 'info.light' }}>
//                     <LocalHospital />
//                   </Avatar>
//                 </ListItemAvatar>
//                 <ListItemText
//                   primary="Room/Ward"
//                   secondary={patient.room}
//                 />
//               </ListItem>
//               <ListItem>
//                 <ListItemAvatar>
//                   <Avatar sx={{ bgcolor: 'warning.light' }}>
//                     <MedicalInformation />
//                   </Avatar>
//                 </ListItemAvatar>
//                 <ListItemText
//                   primary="Diagnosis"
//                   secondary={patient.diagnosis || 'Not specified'}
//                 />
//               </ListItem>
//               <ListItem>
//                 <ListItemAvatar>
//                   <Avatar sx={{ bgcolor: 'success.light' }}>
//                     <Person />
//                   </Avatar>
//                 </ListItemAvatar>
//                 <ListItemText
//                   primary="Attending Physician"
//                   secondary={patient.doctor || 'Not assigned'}
//                 />
//               </ListItem>
//               <ListItem>
//                 <ListItemAvatar>
//                   <Avatar sx={{
//                     bgcolor: patient.status === 'Active' ?
//                       'success.light' :
//                       'error.light'
//                   }}>
//                     {patient.status === 'Active' ? 'A' : 'I'}
//                   </Avatar>
//                 </ListItemAvatar>
//                 <ListItemText
//                   primary="Status"
//                   secondary={patient.status}
//                 />
//               </ListItem>
//             </List>
//           </Grid>

//           <Grid item xs={12} md={6}>
//             <Typography variant="subtitle1" gutterBottom sx={{
//               fontWeight: 'bold',
//               color: 'primary.main',
//               display: 'flex',
//               alignItems: 'center'
//             }}>
//               <MedicalInformation sx={{ mr: 1 }} />
//               Medical Information
//             </Typography>
//             <List dense>
//               <ListItem>
//                 <ListItemAvatar>
//                   <Avatar sx={{ bgcolor: 'error.light' }}>
//                     <Medication />
//                   </Avatar>
//                 </ListItemAvatar>
//                 <ListItemText
//                   primary="Medications"
//                   secondary={patient.medications?.join(', ') || 'None prescribed'}
//                   secondaryTypographyProps={{ sx: { wordBreak: 'break-word' } }}
//                 />
//               </ListItem>
//               <ListItem>
//                 <ListItemAvatar>
//                   <Avatar sx={{ bgcolor: 'warning.light' }}>
//                     <Warning />
//                   </Avatar>
//                 </ListItemAvatar>
//                 <ListItemText
//                   primary="Allergies"
//                   secondary={patient.allergies?.join(', ') || 'None reported'}
//                 />
//               </ListItem>
//               <ListItem>
//                 <ListItemAvatar>
//                   <Avatar sx={{ bgcolor: 'info.light' }}>
//                     <CalendarToday />
//                   </Avatar>
//                 </ListItemAvatar>
//                 <ListItemText
//                   primary="Next Checkup"
//                   secondary={patient.nextCheckup || 'Not scheduled'}
//                 />
//               </ListItem>
//             </List>
//           </Grid>


//           {/* Medical Information Section - unchanged */}

//           {/* Vital Signs Section - fixed */}
//           <Grid item xs={12}>
//             <Typography variant="subtitle1" gutterBottom sx={{
//               fontWeight: 'bold',
//               color: 'primary.main',
//               display: 'flex',
//               alignItems: 'center'
//             }}>
//               <MonitorHeart sx={{ mr: 1 }} />
//               Vital Signs
//             </Typography>
//             <Grid container spacing={2} sx={{ px: 2 }}>
//               <Grid item xs={6} sm={4} md={2}>
//                 <Paper elevation={2} sx={{ p: 2, textAlign: 'center' }}>
//                   <MonitorHeart color="error" sx={{ fontSize: 40, mb: 1 }} />
//                   <Typography variant="subtitle2">Blood Pressure</Typography>
//                   <Typography variant="h6" fontWeight="bold">
//                     {vitalSigns.bloodPressure || '--/--'}
//                   </Typography>
//                   <Typography variant="caption">mmHg</Typography>
//                 </Paper>
//               </Grid>
//               <Grid item xs={6} sm={4} md={2}>
//                 <Paper elevation={2} sx={{ p: 2, textAlign: 'center' }}>
//                   <Thermostat color="warning" sx={{ fontSize: 40, mb: 1 }} />
//                   <Typography variant="subtitle2">Temperature</Typography>
//                   <Typography variant="h6" fontWeight="bold">
//                     {vitalSigns.temperature || '--'}
//                   </Typography>
//                   <Typography variant="caption">°C</Typography>
//                 </Paper>
//               </Grid>
//               <Grid item xs={6} sm={4} md={2}>
//                 <Paper elevation={2} sx={{ p: 2, textAlign: 'center' }}>
//                   <Favorite color="error" sx={{ fontSize: 40, mb: 1 }} />
//                   <Typography variant="subtitle2">Pulse Rate</Typography>
//                   <Typography variant="h6" fontWeight="bold">
//                     {vitalSigns.pulse || '--'}
//                   </Typography>
//                   <Typography variant="caption">bpm</Typography>
//                 </Paper>
//               </Grid>
//               <Grid item xs={6} sm={4} md={2}>
//                 <Paper elevation={2} sx={{ p: 2, textAlign: 'center' }}>
//                   <Opacity color="info" sx={{ fontSize: 40, mb: 1 }} />
//                   <Typography variant="subtitle2">Oxygen Level</Typography>
//                   <Typography variant="h6" fontWeight="bold">
//                     {vitalSigns.oxygenLevel || '--'}
//                   </Typography>
//                   <Typography variant="caption">%</Typography>
//                 </Paper>
//               </Grid>
//             </Grid>
//           </Grid>

//           {/* Notes Section - fixed */}
//           <Grid item xs={12}>
//             <Typography variant="subtitle1" gutterBottom sx={{
//               fontWeight: 'bold',
//               color: 'primary.main',
//               display: 'flex',
//               alignItems: 'center'
//             }}>
//               <Notes sx={{ mr: 1 }} />
//               Clinical Notes
//             </Typography>
//             <Paper elevation={0} sx={{
//               p: 2,
//               backgroundColor: 'grey.50',
//               borderRadius: 2,
//               maxHeight: 200,
//               overflow: 'auto'
//             }}>
//               <Typography variant="body2" whiteSpace="pre-wrap">
//                 {notes}
//               </Typography>
//             </Paper>
//           </Grid>
//         </Grid>
//       </DialogContent>
//       <DialogActions sx={{ p: 2 }}>
//         <Button
//           variant="outlined"
//           onClick={onClose}
//           sx={{ mr: 1 }}
//         >
//           Close
//         </Button>
//         <Button
//           variant="contained"
//           color="primary"
//           onClick={onUpdateVitals}
//           startIcon={<EditNote />}
//         >
//           Update Vitals
//         </Button>
//       </DialogActions>
//     </Dialog>
//   );
// };

// export default PatientDetailsDialog;