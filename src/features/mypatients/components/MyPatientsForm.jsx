import React, { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Chip,
  Divider,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Avatar,
  Tooltip,
  useMediaQuery,
  useTheme,
  CircularProgress,
  Alert,
  TextField,
  InputAdornment,
  Snackbar,
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
  Button,
  DialogActions
} from '@mui/material';
import {
  Person,
  Female,
  Male,
  MedicalInformation,
  LocalHospital,
  CalendarToday,
  Medication,
  Visibility,
  EditNote,
  AddComment,
  MoreVert,
  Search,
  Close,
  MonitorHeart,
  Thermostat,
  Scale,
  Height
} from '@mui/icons-material';
import usePatients from '../hooks/usePatients'
import { addPatientNote } from '../services/patientService';
const MyPatientForm = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
    const [viewDetailsOpen, setViewDetailsOpen] = useState(false);
  const [updateVitalsOpen, setUpdateVitalsOpen] = useState(false);
  const [vitalsData, setVitalsData] = useState({
    bloodPressure: '',
    temperature: '',
    pulse: '',
    oxygenLevel:''
  });

const {patients,loading,error,refreshPatients,updatePatient,selectedPatient,setSelectedPatient,fetchPatientById}=usePatients()
  const [searchTerm, setSearchTerm] = useState('');
  const [mobileSelectedPatient, setMobileSelectedPatient] = useState(null);

  const filteredPatients = patients.filter(appt =>
    appt.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    // appt.serviceType.toLowerCase().includes(searchTerm.toLowerCase()) 
    appt.patientId.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const renderGenderIcon = (gender) => {
    return gender === 'Male' ? <Male color="primary" /> : <Female color="secondary" />;
  };
  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

    const handleAddNotes = async (patientId) => {
    try {
      const note = prompt('Enter your note:');
      if (note) {
        await addPatientNote(patientId, note);
        await refreshPatients()
        setSnackbarMessage('Note added successfully');
        setSnackbarOpen(true);
      }
    } catch (err) {
      setSnackbarMessage('Failed to add note');
      setSnackbarOpen(true);
    }
  };
  // Open update vitals dialog
  const handleOpenUpdateVitals = (patient) => {
    console.log("patient",patient)
    setSelectedPatient(patient);
    setVitalsData({
      bloodPressure: patient.vitalSigns?.bloodPressure || '',
      temperature: patient.vitalSigns?.temperature || '',
      oxygenLevel: patient.vitalSigns?.oxygenLevel || '',
      pulse: patient.vitalSigns?.pulse || ''

    });
    setUpdateVitalsOpen(true);
  };

  // Submit vitals update
  const handleSubmitVitals = async () => {
    try {
      console.log(selectedPatient._id,vitalsData)
      await updatePatient(selectedPatient._id, vitalsData);
      await refreshPatients()
      setSnackbarMessage('Vitals updated successfully');
      setSnackbarOpen(true);
      setUpdateVitalsOpen(false);
    } catch (err) {
      setSnackbarMessage('Failed to update vitals');
      setSnackbarOpen(true);
    }
  };

  // Handle vitals input change
  const handleVitalsChange = (e) => {
    const { name, value } = e.target;
    setVitalsData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  // Close details dialog
  const handleCloseDetails = () => {
    setViewDetailsOpen(false);
  };
  // View details handler
  const handleViewDetails = async (patientId) => {
    console.log("patid",patientId)
    try {
      const patient = await fetchPatientById(patientId);
      console.log("new",patient)
      if (isMobile) {
        setMobileSelectedPatient(patient);
      } else {
        setSelectedPatient(patient);
        setViewDetailsOpen(true);
      }
    } catch (err) {
      setSnackbarMessage('Failed to load patient details');
      setSnackbarOpen(true);
    }
  };

  // Close mobile details view
  const handleCloseMobileDetails = () => {
    setMobileSelectedPatient(null);
  };

if(loading){
  return(
    <Box display='flex' justifyContent='center' alignItems='center' minHeight={'200px'} >
      <CircularProgress/>
    </Box>
  )
}

if(error){
  return(
    <Alert severity='error' sx={{margin:2}}>
      Error loading patients: {error}
    </Alert>
  )
}
  return (
    <Box sx={{ p: isMobile ? 1 : 3 }}>
        <Snackbar
       open={snackbarOpen}
       autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        message={snackbarMessage}
      />

      <Card elevation={3} sx={{ borderRadius: 3, overflow: 'hidden' }}>
        <CardContent sx={{ p: 0 }}>
                    <Box sx={{
                      bgcolor: theme.palette.primary.main,
                      color: 'white',
                      p: isMobile ? 1.5 : 2,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between'
                    }}>
          
          <Box sx={{ 
            bgcolor: theme.palette.primary.main, 
            color: 'white',
            p: isMobile ? 1.5 : 2,
            display: 'flex',
            alignItems: 'center'
          }}>
            <MedicalInformation sx={{ mr: 1.5, fontSize: isMobile ? '1.5rem' : '2rem' }} />
            <Typography variant={isMobile ? 'h6' : 'h5'} fontWeight="bold">
              My Patients
            </Typography>
          </Box>
            <TextField
              size="small"
              placeholder="Search patients..."
              variant="outlined"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search sx={{ color: 'white' }} />
                  </InputAdornment>
                ),
                sx: {
                  color: 'white',
                  '& .MuiOutlinedInput-notchedOutline': {
                    borderColor: 'rgba(255, 255, 255, 0.5)'
                  },
                  '&:hover .MuiOutlinedInput-notchedOutline': {
                    borderColor: 'white'
                  }
                }
              }}
              sx={{
                width: isMobile ? 150 : 250,
                '& .MuiInputBase-input::placeholder': {
                  color: 'white',
                  opacity: 0.8
                }
              }}
              value={searchTerm}
              onChange={(e)=>setSearchTerm(e.target.value)}
            />
          </Box>
          <Divider />

          <TableContainer component={Paper} elevation={0}>
            <Table>
              <TableHead sx={{ bgcolor: theme.palette.grey[100] }}>
                <TableRow>
                  <TableCell sx={{ fontWeight: 'bold' }}>Patient ID</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>Name</TableCell>
                  {!isMobile && (
                    <>
                      <TableCell sx={{ fontWeight: 'bold' }}>Age/Gender</TableCell>
                      <TableCell sx={{ fontWeight: 'bold' }}>Room/Ward</TableCell>
                      <TableCell sx={{ fontWeight: 'bold' }}>Diagnosis</TableCell>
                      <TableCell sx={{ fontWeight: 'bold' }}>Doctor</TableCell>
                    </>
                  )}
                  <TableCell sx={{ fontWeight: 'bold' }}>Next Checkup</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {
                  filteredPatients.length==0?(
                    <TableRow>
                      <TableCell colSpan={isMobile?3:7} align='center'>
                        <Typography variant='body2' color='textSecondary'>
                            No Patients Found
                        </Typography>
                      </TableCell>
                    </TableRow>
                  ):
                
                filteredPatients.map((patient) => (
                  <TableRow key={patient._id} hover>
                    <TableCell>
                      <Chip 
                        label={patient.patientId} 
                        size="small" 
                        color="primary"
                        variant="outlined"
                      />
                    </TableCell>
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Avatar sx={{ 
                          width: isMobile ? 32 : 40, 
                          height: isMobile ? 32 : 40, 
                          mr: 1,
                          bgcolor: theme.palette.primary.light
                        }}>
                          {patient.name.charAt(0)}
                        </Avatar>
                        {isMobile ? patient.name.split(' ')[0] : patient.name}
                      </Box>
                    </TableCell>
                    {!isMobile && (
                      <>
                        <TableCell>
                          <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            {renderGenderIcon(patient.gender)}
                            <Typography sx={{ ml: 1 }}>
                              {patient.age} yrs
                            </Typography>
                          </Box>
                        </TableCell>
                        <TableCell>
                          <Chip 
                            label={patient.room} 
                            size="small" 
                            icon={<LocalHospital fontSize="small" />}
                          />
                        </TableCell>
                        <TableCell>
                          <Typography variant="body2">
                            {patient.diagnosis}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography variant="body2">
                            {patient.doctor}
                          </Typography>
                        </TableCell>
                      </>
                    )}
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <CalendarToday 
                          fontSize="small" 
                          color="action" 
                          sx={{ mr: 0.5 }} 
                        />
                        {isMobile ? 
                          patient.nextCheckup.split(' ')[1] : 
                          patient.nextCheckup
                        }
                      </Box>
                    </TableCell>
                    <TableCell>
                      {isMobile ? (
                        <IconButton size="small">
                          <MoreVert />
                        </IconButton>
                      ) : (
                        <Box sx={{ display: 'flex', gap: 1 }}>
                          <Tooltip title="View Details">
                            <IconButton color="info" size="small" onClick={()=>handleViewDetails(patient._id)}>
                              <Visibility fontSize="small" />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="Update Vitals">
                            <IconButton color="success" size="small">
                              <EditNote fontSize="small" onClick={()=>handleOpenUpdateVitals(patient)}/>
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="Add Notes">
                            <IconButton color="primary" size="small" onClick={() => handleAddNotes(patient._id)}
>
                              <AddComment fontSize="small" />
                            </IconButton>
                          </Tooltip>
                        </Box>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>

      {/* View Details Dialog (Desktop) */}
      <Dialog open={viewDetailsOpen} onClose={handleCloseDetails} maxWidth="md" fullWidth>
        <DialogTitle>
          <Box display="flex" justifyContent="space-between" alignItems="center">
            Patient Details: {selectedPatient?.name}
            <IconButton onClick={handleCloseDetails}>
              <Close />
            </IconButton>
          </Box>
        </DialogTitle>
        <DialogContent dividers>
          {selectedPatient && (
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <Typography variant="subtitle1" gutterBottom>
                  <strong>Basic Information</strong>
                </Typography>
                <Box sx={{ pl: 2 }}>
                  <Typography>
                    <strong>ID:</strong> {selectedPatient.patientId}
                  </Typography>
                  <Typography>
                    <strong>Age:</strong> {selectedPatient.age} years
                  </Typography>
                  <Typography>
                    <strong>Gender:</strong> {selectedPatient.gender}
                  </Typography>
                  <Typography>
                    <strong>Room:</strong> {selectedPatient.room}
                  </Typography>
                  <Typography>
                    <strong>Diagnosis:</strong> {selectedPatient.diagnosis}
                  </Typography>
                  <Typography>
                    <strong>Attending Physician:</strong> {selectedPatient.doctor}
                  </Typography>
                    <Typography>
                    <strong>Status:</strong> {selectedPatient.status}
                  </Typography>

                </Box>
              </Grid>
              
              <Grid item xs={12} md={6}>
                <Typography variant="subtitle1" gutterBottom>
                  <strong>Medical Information</strong>
                </Typography>
                <Box sx={{ pl: 2 }}>
                  <Typography>
                    <strong>Medications:</strong> {selectedPatient.medications?.join(', ') || 'None'}
                  </Typography>
                  <Typography>
                    <strong>Allergies:</strong> {selectedPatient.allergies?.join(', ') || 'None reported'}
                  </Typography>
                  <Typography>
                    <strong>Next Checkup:</strong> {selectedPatient.nextCheckup}
                  </Typography>

                </Box>
              </Grid>

              {selectedPatient.vitalSigns && (
                <Grid item xs={12}>
                  <Typography variant="subtitle1" gutterBottom>
                    <strong>Vital Signs</strong>
                  </Typography>
                  <Grid container spacing={2} sx={{ pl: 2 }}>
                    <Grid item xs={6} md={3}>
                      <Typography>
                        <MonitorHeart fontSize="small" color="action" sx={{ mr: 1 }} />
                        <strong>Blood Pressure:</strong> {selectedPatient.vitalSigns.bloodPressure || '--'}
                      </Typography>
                    </Grid>
                    <Grid item xs={6} md={3}>
                      <Typography>
                        <Thermostat fontSize="small" color="action" sx={{ mr: 1 }} />
                        <strong>Temperature:</strong> {selectedPatient.vitalSigns.temperature || '--'}°C
                      </Typography>
                    </Grid>
                    <Grid item xs={6} md={3}>
                      <Typography>
                        <strong>Pulse Rate:</strong> {selectedPatient.vitalSigns.pulse || '--'} bpm
                      </Typography>
                    </Grid>
                    <Grid item xs={6} md={3}>
                      <Typography>
                        <strong>Oxygen Saturation:</strong> {selectedPatient.vitalSigns.oxygenLevel || '--'}%
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
              )}

                <Grid item xs={12}>
                  <Typography variant="subtitle1" gutterBottom>
                    <strong>Clinical Notes</strong>
                  </Typography>
                  <Box sx={{ 
                    maxHeight: 200, 
                    overflow: 'auto',
                    p: 1,
                    backgroundColor: theme.palette.grey[100],
                    borderRadius: 1
                  }}>
                      <Box sx={{ mb: 1, pb: 1, borderBottom: '1px solid rgba(0,0,0,0.12)' }}>
                        <Typography variant="body2">
                          <strong>{selectedPatient.notes}:</strong>
                        </Typography>
                      </Box>
                  </Box>
                </Grid>
            </Grid>
          )}
        </DialogContent>
        <DialogActions>
          <Button 
            variant="contained" 
            color="primary"
            onClick={() => {
              handleCloseDetails();
              handleOpenUpdateVitals(selectedPatient);
            }}
            startIcon={<EditNote />}
          >
            Update Vitals
          </Button>
          <Button 
            variant="outlined" 
            onClick={handleCloseDetails}
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>

            {/* Update Vitals Dialog */}
      <Dialog open={updateVitalsOpen} onClose={() => setUpdateVitalsOpen(false)}>
        <DialogTitle>

          <Box display="flex" justifyContent="space-between" alignItems="center">
            Update Vitals for {selectedPatient?.name}
            <IconButton onClick={() => setUpdateVitalsOpen(false)}>
              <Close />
            </IconButton>
          </Box>
        </DialogTitle>
        <DialogContent>
          <Box sx={{ mt: 2 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Blood Pressure"
                  name="bloodPressure"
                  value={vitalsData.bloodPressure}
                  onChange={handleVitalsChange}
                  placeholder="e.g., 120/80"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <MonitorHeart color="action" />
                      </InputAdornment>
                    )
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Temperature (°C)"
                  name="temperature"
                  value={vitalsData.temperature}
                  onChange={handleVitalsChange}
                  type="number"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Thermostat color="action" />
                      </InputAdornment>
                    )
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="OxygenLevel"
                  name="oxygenLevel"
                  value={vitalsData.oxygenLevel}
                  onChange={handleVitalsChange}
                  type="number"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Thermostat color="action" />
                      </InputAdornment>
                    )
                  }}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Pulse (bpm)"
                  name="pulse"
                  value={vitalsData.pulse}
                  onChange={handleVitalsChange}
                  type="number"
                />
              </Grid>
            </Grid>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button 
            variant="outlined" 
            onClick={() => setUpdateVitalsOpen(false)}
          >
            Cancel
          </Button>
          <Button 
            variant="contained" 
            color="primary"
            onClick={handleSubmitVitals}
          >
            Save Vitals
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default MyPatientForm





// import React, { useState } from 'react';
// import {
//   Box,
//   Card,
//   CardContent,
//   Chip,
//   Divider,
//   IconButton,
//   Paper,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Typography,
//   Avatar,
//   Tooltip,
//   useMediaQuery,
//   useTheme,
//   CircularProgress,
//   Alert,
//   Snackbar
// } from '@mui/material';
// import {
//   Person,
//   Female,
//   Male,
//   MedicalInformation,
//   LocalHospital,
//   CalendarToday,
//   Medication,
//   Visibility,
//   EditNote,
//   AddComment,
//   MoreVert
// } from '@mui/icons-material';
// import usePatients from '../hooks/usePatients';

// const MyPatientForm = () => {
//   const theme = useTheme();
//   const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
//   const {
//     patients,
//     loading,
//     error,
//     fetchPatientById,
//     updatePatient,
//     addPatientNote
//   } = usePatients();
//   const [mobileSelectedPatient, setMobileSelectedPatient] = useState(null);
//   const [snackbarOpen, setSnackbarOpen] = useState(false);
//   const [snackbarMessage, setSnackbarMessage] = useState('');
// console.log("patients",patients)
//   const renderGenderIcon = (gender) => {
//     return gender === 'Male' ? <Male color="primary" /> : <Female color="secondary" />;
//   };

//   const handleViewDetails = (patientId) => {
//     if (isMobile) {
//       fetchPatientById(patientId).then(patient => {
//         setMobileSelectedPatient(patient);
//       });
//     } else {
//       // Implement desktop view details logic
//       console.log('View details for:', patientId);
//     }
//   };

//   const handleUpdateVitals = (patientId) => {
//     // Implement update vitals logic
//     console.log('Update vitals for:', patientId);
//   };

//   const handleAddNotes = async (patientId) => {
//     try {
//       const note = prompt('Enter your note:');
//       if (note) {
//         await addPatientNote(patientId, note);
//         setSnackbarMessage('Note added successfully');
//         setSnackbarOpen(true);
//       }
//     } catch (err) {
//       setSnackbarMessage('Failed to add note');
//       setSnackbarOpen(true);
//     }
//   };

//   const handleCloseSnackbar = () => {
//     setSnackbarOpen(false);
//   };

//   if (loading && !patients.length) {
//     return (
//       <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
//         <CircularProgress />
//       </Box>
//     );
//   }

//   if (error) {
//     return (
//       <Box sx={{ p: 2 }}>
//         <Alert severity="error">{error}</Alert>
//       </Box>
//     );
//   }

//   return (
//     <Box sx={{ p: isMobile ? 1 : 3 }}>
//       <Snackbar
//         open={snackbarOpen}
//         autoHideDuration={6000}
//         onClose={handleCloseSnackbar}
//         message={snackbarMessage}
//       />
      
//       <Card elevation={3} sx={{ borderRadius: 3, overflow: 'hidden' }}>
//         <CardContent sx={{ p: 0 }}>
//           <Box sx={{ 
//             bgcolor: theme.palette.primary.main, 
//             color: 'white',
//             p: isMobile ? 1.5 : 2,
//             display: 'flex',
//             alignItems: 'center'
//           }}>
//             <MedicalInformation sx={{ mr: 1.5, fontSize: isMobile ? '1.5rem' : '2rem' }} />
//             <Typography variant={isMobile ? 'h6' : 'h5'} fontWeight="bold">
//               My Patients
//             </Typography>
//           </Box>

//           <Divider />

//           <TableContainer component={Paper} elevation={0}>
//             <Table>
//               <TableHead sx={{ bgcolor: theme.palette.grey[100] }}>
//                 <TableRow>
//                   <TableCell sx={{ fontWeight: 'bold' }}>Patient ID</TableCell>
//                   <TableCell sx={{ fontWeight: 'bold' }}>Name</TableCell>
//                   {!isMobile && (
//                     <>
//                       <TableCell sx={{ fontWeight: 'bold' }}>Age/Gender</TableCell>
//                       <TableCell sx={{ fontWeight: 'bold' }}>Room/Ward</TableCell>
//                       <TableCell sx={{ fontWeight: 'bold' }}>Diagnosis</TableCell>
//                       <TableCell sx={{ fontWeight: 'bold' }}>Doctor</TableCell>
//                     </>
//                   )}
//                   <TableCell sx={{ fontWeight: 'bold' }}>Next Checkup</TableCell>
//                   <TableCell sx={{ fontWeight: 'bold' }}>Actions</TableCell>
//                 </TableRow>
//               </TableHead>
//               <TableBody>
//                 {patients.map((patient) => (
//                   <TableRow key={patient._id} hover>
//                     <TableCell>
//                       <Chip 
//                         label={patient.patientId} 
//                         size="small" 
//                         color="primary"
//                         variant="outlined"
//                       />
//                     </TableCell>
//                     <TableCell>
//                       <Box sx={{ display: 'flex', alignItems: 'center' }}>
//                         <Avatar sx={{ 
//                           width: isMobile ? 32 : 40, 
//                           height: isMobile ? 32 : 40, 
//                           mr: 1,
//                           bgcolor: theme.palette.primary.light
//                         }}>
//                           {patient.name.charAt(0)}
//                         </Avatar>
//                         {isMobile ? patient.name.split(' ')[0] : patient.name}
//                       </Box>
//                     </TableCell>
//                     {!isMobile && (
//                       <>
//                         <TableCell>
//                           <Box sx={{ display: 'flex', alignItems: 'center' }}>
//                             {renderGenderIcon(patient.gender)}
//                             <Typography sx={{ ml: 1 }}>
//                               {patient.age} yrs
//                             </Typography>
//                           </Box>
//                         </TableCell>
//                         <TableCell>
//                           <Chip 
//                             label={patient.room} 
//                             size="small" 
//                             icon={<LocalHospital fontSize="small" />}
//                           />
//                         </TableCell>
//                         <TableCell>
//                           <Typography variant="body2">
//                             {patient.diagnosis}
//                           </Typography>
//                         </TableCell>
//                         <TableCell>
//                           <Typography variant="body2">
//                             {patient.doctor}
//                           </Typography>
//                         </TableCell>
//                       </>
//                     )}
//                     <TableCell>
//                       <Box sx={{ display: 'flex', alignItems: 'center' }}>
//                         <CalendarToday 
//                           fontSize="small" 
//                           color="action" 
//                           sx={{ mr: 0.5 }} 
//                         />
//                         {isMobile ? 
//                           patient.nextCheckup.split(' ')[1] : 
//                           patient.nextCheckup
//                         }
//                       </Box>
//                     </TableCell>
//                     <TableCell>
//                       {isMobile ? (
//                         <IconButton 
//                           size="small"
//                           onClick={() => handleViewDetails(patient._id)}
//                         >
//                           <MoreVert />
//                         </IconButton>
//                       ) : (
//                         <Box sx={{ display: 'flex', gap: 1 }}>
//                           <Tooltip title="View Details">
//                             <IconButton 
//                               color="info" 
//                               size="small"
//                               onClick={() => handleViewDetails(patient._id)}
//                             >
//                               <Visibility fontSize="small" />
//                             </IconButton>
//                           </Tooltip>
//                           <Tooltip title="Update Vitals">
//                             <IconButton 
//                               color="success" 
//                               size="small"
//                               onClick={() => handleUpdateVitals(patient._id)}
//                             >
//                               <EditNote fontSize="small" />
//                             </IconButton>
//                           </Tooltip>
//                           <Tooltip title="Add Notes">
//                             <IconButton 
//                               color="primary" 
//                               size="small"
//                               onClick={() => handleAddNotes(patient._id)}
//                             >
//                               <AddComment fontSize="small" />
//                             </IconButton>
//                           </Tooltip>
//                         </Box>
//                       )}
//                     </TableCell>
//                   </TableRow>
//                 ))}
//               </TableBody>
//             </Table>
//           </TableContainer>
//         </CardContent>
//       </Card>

//       {/* Mobile Detail View */}
//       {mobileSelectedPatient && isMobile && (
//         <Box sx={{ mt: 2 }}>
//           <Card elevation={3}>
//             <CardContent>
//               <Typography variant="h6" gutterBottom>
//                 {mobileSelectedPatient.name}
//               </Typography>
//               <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
//                 {renderGenderIcon(mobileSelectedPatient.gender)}
//                 <Typography sx={{ ml: 1 }}>
//                   {mobileSelectedPatient.age} years old
//                 </Typography>
//               </Box>
//               <Typography variant="body2" color="text.secondary">
//                 <strong>Room:</strong> {mobileSelectedPatient.room}
//               </Typography>
//               <Typography variant="body2" color="text.secondary">
//                 <strong>Diagnosis:</strong> {mobileSelectedPatient.diagnosis}
//               </Typography>
//               <Typography variant="body2" color="text.secondary">
//                 <strong>Doctor:</strong> {mobileSelectedPatient.doctor}
//               </Typography>
//               <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
//                 <strong>Medications:</strong> {mobileSelectedPatient.medications.join(', ')}
//               </Typography>
//               <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
//                 <IconButton onClick={() => setMobileSelectedPatient(null)}>
//                   <Visibility fontSize="small" />
//                 </IconButton>
//                 <IconButton onClick={() => handleUpdateVitals(mobileSelectedPatient._id)}>
//                   <EditNote fontSize="small" />
//                 </IconButton>
//                 <IconButton onClick={() => handleAddNotes(mobileSelectedPatient._id)}>
//                   <AddComment fontSize="small" />
//                 </IconButton>
//               </Box>
//             </CardContent>
//           </Card>
//         </Box>
//       )}
//     </Box>
//   );
// };

// export default MyPatientForm;







// import React, { useState } from 'react';
// import {
//   Box,
//   Card,
//   CardContent,
//   Chip,
//   Divider,
//   IconButton,
//   Paper,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Typography,
//   Avatar,
//   Tooltip,
//   useMediaQuery,
//   useTheme,
//   CircularProgress,
//   Alert,
//   Snackbar,
//   TextField,
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
//   Button,
//   Grid,
//   InputAdornment
// } from '@mui/material';
// import {
//   Female,
//   Male,
//   MedicalInformation,
//   LocalHospital,
//   CalendarToday,
//   Visibility,
//   EditNote,
//   AddComment,
//   MoreVert,
//   Search,
//   Close,
//   MonitorHeart,
//   Height,
//   Scale,
//   Thermometer
// } from '@mui/icons-material';
// import usePatients from '../hooks/usePatients';

// const MyPatientForm = () => {
//   const theme = useTheme();
//   const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
//   const {
//     patients,
//     loading,
//     error,
//     selectedPatient,
//     searchQuery,
//     setSearchQuery,
//     fetchPatientById,
//     updateVitals,
//     addPatientNote
//   } = usePatients();
  
//   const [mobileSelectedPatient, setMobileSelectedPatient] = useState(null);
//   const [snackbarOpen, setSnackbarOpen] = useState(false);
//   const [snackbarMessage, setSnackbarMessage] = useState('');
//   const [viewDetailsOpen, setViewDetailsOpen] = useState(false);
//   const [updateVitalsOpen, setUpdateVitalsOpen] = useState(false);
//   const [vitalsData, setVitalsData] = useState({
//     bloodPressure: '',
//     temperature: '',
//     weight: '',
//     height: '',
//     pulse: ''
//   });

//   // Handle search input change
//   const handleSearchChange = (e) => {
//     setSearchQuery(e.target.value);
//   };

//   // Clear search
//   const handleClearSearch = () => {
//     setSearchQuery('');
//   };

//   // View details handler
//   const handleViewDetails = async (patientId) => {
//     try {
//       const patient = await fetchPatientById(patientId);
//       if (isMobile) {
//         setMobileSelectedPatient(patient);
//       } else {
//         setSelectedPatient(patient);
//         setViewDetailsOpen(true);
//       }
//     } catch (err) {
//       setSnackbarMessage('Failed to load patient details');
//       setSnackbarOpen(true);
//     }
//   };

//   // Open update vitals dialog
//   const handleOpenUpdateVitals = (patient) => {
//     setSelectedPatient(patient);
//     setVitalsData({
//       bloodPressure: patient.vitals?.bloodPressure || '',
//       temperature: patient.vitals?.temperature || '',
//       weight: patient.vitals?.weight || '',
//       height: patient.vitals?.height || '',
//       pulse: patient.vitals?.pulse || ''
//     });
//     setUpdateVitalsOpen(true);
//   };

//   // Submit vitals update
//   const handleSubmitVitals = async () => {
//     try {
//       await updateVitals(selectedPatient.id, vitalsData);
//       setSnackbarMessage('Vitals updated successfully');
//       setSnackbarOpen(true);
//       setUpdateVitalsOpen(false);
//     } catch (err) {
//       setSnackbarMessage('Failed to update vitals');
//       setSnackbarOpen(true);
//     }
//   };

//   // Handle vitals input change
//   const handleVitalsChange = (e) => {
//     const { name, value } = e.target;
//     setVitalsData(prev => ({
//       ...prev,
//       [name]: value
//     }));
//   };

//   // Close snackbar
//   const handleCloseSnackbar = () => {
//     setSnackbarOpen(false);
//   };

//   // Close details dialog
//   const handleCloseDetails = () => {
//     setViewDetailsOpen(false);
//   };

//   // Close mobile details view
//   const handleCloseMobileDetails = () => {
//     setMobileSelectedPatient(null);
//   };

//   // Render gender icon
//   const renderGenderIcon = (gender) => {
//     return gender === 'Male' ? <Male color="primary" /> : <Female color="secondary" />;
//   };

//   // Loading state
//   if (loading && (!patients || patients.length === 0)) {
//     return (
//       <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
//         <CircularProgress />
//       </Box>
//     );
//   }

//   // Error state
//   if (error) {
//     return (
//       <Box sx={{ p: 2 }}>
//         <Alert severity="error">{error}</Alert>
//       </Box>
//     );
//   }

//   // Empty state
//   if (!Array.isArray(patients) || patients.length === 0) {
//     return (
//       <Box sx={{ p: 2 }}>
//         <Alert severity="info">
//           {searchQuery ? 'No patients match your search' : 'No patients found'}
//         </Alert>
//       </Box>
//     );
//   }

//   return (
//     <Box sx={{ p: isMobile ? 1 : 3 }}>
//       {/* Snackbar for notifications */}
//       <Snackbar
//         open={snackbarOpen}
//         autoHideDuration={6000}
//         onClose={handleCloseSnackbar}
//         message={snackbarMessage}
//       />

//       {/* Main Card */}
//       <Card elevation={3} sx={{ borderRadius: 3, overflow: 'hidden' }}>
//         <CardContent sx={{ p: 0 }}>
//           {/* Header with Search */}
//           <Box sx={{ 
//             bgcolor: theme.palette.primary.main, 
//             color: 'white',
//             p: isMobile ? 1.5 : 2,
//             display: 'flex',
//             alignItems: 'center',
//             flexWrap: 'wrap'
//           }}>
//             <MedicalInformation sx={{ mr: 1.5, fontSize: isMobile ? '1.5rem' : '2rem' }} />
//             <Typography variant={isMobile ? 'h6' : 'h5'} fontWeight="bold" sx={{ flexGrow: 1 }}>
//               Patient Dashboard
//             </Typography>
            
//             <TextField
//               size="small"
//               placeholder="Search patients..."
//               value={searchQuery}
//               onChange={handleSearchChange}
//               sx={{ 
//                 backgroundColor: 'white',
//                 borderRadius: 1,
//                 minWidth: isMobile ? '100%' : 300,
//                 mt: isMobile ? 1 : 0,
//                 '& .MuiOutlinedInput-root': {
//                   pr: 1
//                 }
//               }}
//               InputProps={{
//                 startAdornment: (
//                   <InputAdornment position="start">
//                     <Search color="action" />
//                   </InputAdornment>
//                 ),
//                 endAdornment: searchQuery && (
//                   <InputAdornment position="end">
//                     <IconButton size="small" onClick={handleClearSearch}>
//                       <Close fontSize="small" />
//                     </IconButton>
//                   </InputAdornment>
//                 )
//               }}
//             />
//           </Box>

//           <Divider />

//           {/* Patients Table */}
//           <TableContainer component={Paper} elevation={0}>
//             <Table>
//               <TableHead sx={{ bgcolor: theme.palette.grey[100] }}>
//                 <TableRow>
//                   <TableCell sx={{ fontWeight: 'bold' }}>Patient ID</TableCell>
//                   <TableCell sx={{ fontWeight: 'bold' }}>Name</TableCell>
//                   {!isMobile && (
//                     <>
//                       <TableCell sx={{ fontWeight: 'bold' }}>Age/Gender</TableCell>
//                       <TableCell sx={{ fontWeight: 'bold' }}>Room/Ward</TableCell>
//                       <TableCell sx={{ fontWeight: 'bold' }}>Diagnosis</TableCell>
//                     </>
//                   )}
//                   <TableCell sx={{ fontWeight: 'bold' }}>Next Checkup</TableCell>
//                   <TableCell sx={{ fontWeight: 'bold' }}>Actions</TableCell>
//                 </TableRow>
//               </TableHead>
//               <TableBody>
//                 {patients.map((patient) => (
//                   <TableRow key={patient.id} hover>
//                     <TableCell>
//                       <Chip 
//                         label={patient.id} 
//                         size="small" 
//                         color="primary"
//                         variant="outlined"
//                       />
//                     </TableCell>
//                     <TableCell>
//                       <Box sx={{ display: 'flex', alignItems: 'center' }}>
//                         <Avatar sx={{ 
//                           width: isMobile ? 32 : 40, 
//                           height: isMobile ? 32 : 40, 
//                           mr: 1,
//                           bgcolor: theme.palette.primary.light
//                         }}>
//                           {patient.name.charAt(0)}
//                         </Avatar>
//                         {isMobile ? patient.name.split(' ')[0] : patient.name}
//                       </Box>
//                     </TableCell>
//                     {!isMobile && (
//                       <>
//                         <TableCell>
//                           <Box sx={{ display: 'flex', alignItems: 'center' }}>
//                             {renderGenderIcon(patient.gender)}
//                             <Typography sx={{ ml: 1 }}>
//                               {patient.age} yrs
//                             </Typography>
//                           </Box>
//                         </TableCell>
//                         <TableCell>
//                           <Chip 
//                             label={patient.room} 
//                             size="small" 
//                             icon={<LocalHospital fontSize="small" />}
//                           />
//                         </TableCell>
//                         <TableCell>
//                           <Typography variant="body2">
//                             {patient.diagnosis}
//                           </Typography>
//                         </TableCell>
//                       </>
//                     )}
//                     <TableCell>
//                       <Box sx={{ display: 'flex', alignItems: 'center' }}>
//                         <CalendarToday 
//                           fontSize="small" 
//                           color="action" 
//                           sx={{ mr: 0.5 }} 
//                         />
//                         {isMobile ? 
//                           patient.nextCheckup.split(' ')[1] : 
//                           patient.nextCheckup
//                         }
//                       </Box>
//                     </TableCell>
//                     <TableCell>
//                       {isMobile ? (
//                         <IconButton 
//                           size="small"
//                           onClick={() => handleViewDetails(patient.id)}
//                         >
//                           <MoreVert />
//                         </IconButton>
//                       ) : (
//                         <Box sx={{ display: 'flex', gap: 1 }}>
//                           <Tooltip title="View Details">
//                             <IconButton 
//                               color="info" 
//                               size="small"
//                               onClick={() => handleViewDetails(patient.id)}
//                             >
//                               <Visibility fontSize="small" />
//                             </IconButton>
//                           </Tooltip>
//                           <Tooltip title="Update Vitals">
//                             <IconButton 
//                               color="success" 
//                               size="small"
//                               onClick={() => handleOpenUpdateVitals(patient)}
//                             >
//                               <EditNote fontSize="small" />
//                             </IconButton>
//                           </Tooltip>
//                           <Tooltip title="Add Notes">
//                             <IconButton 
//                               color="primary" 
//                               size="small"
//                               onClick={() => {
//                                 const note = prompt('Enter your note:');
//                                 if (note) {
//                                   addPatientNote(patient.id, note);
//                                   setSnackbarMessage('Note added successfully');
//                                   setSnackbarOpen(true);
//                                 }
//                               }}
//                             >
//                               <AddComment fontSize="small" />
//                             </IconButton>
//                           </Tooltip>
//                         </Box>
//                       )}
//                     </TableCell>
//                   </TableRow>
//                 ))}
//               </TableBody>
//             </Table>
//           </TableContainer>
//         </CardContent>
//       </Card>

//       {/* Mobile Detail View */}
//       {mobileSelectedPatient && isMobile && (
//         <Box sx={{ mt: 2 }}>
//           <Card elevation={3}>
//             <CardContent>
//               <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
//                 <Typography variant="h6" gutterBottom>
//                   {mobileSelectedPatient.name}
//                 </Typography>
//                 <IconButton onClick={handleCloseMobileDetails}>
//                   <Close />
//                 </IconButton>
//               </Box>
              
//               <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
//                 {renderGenderIcon(mobileSelectedPatient.gender)}
//                 <Typography sx={{ ml: 1 }}>
//                   {mobileSelectedPatient.age} years old
//                 </Typography>
//               </Box>
              
//               <Grid container spacing={2} sx={{ mb: 2 }}>
//                 <Grid item xs={6}>
//                   <Typography variant="body2">
//                     <strong>Patient ID:</strong> {mobileSelectedPatient.id}
//                   </Typography>
//                 </Grid>
//                 <Grid item xs={6}>
//                   <Typography variant="body2">
//                     <strong>Room:</strong> {mobileSelectedPatient.room}
//                   </Typography>
//                 </Grid>
//                 <Grid item xs={12}>
//                   <Typography variant="body2">
//                     <strong>Diagnosis:</strong> {mobileSelectedPatient.diagnosis}
//                   </Typography>
//                 </Grid>
//                 <Grid item xs={12}>
//                   <Typography variant="body2">
//                     <strong>Doctor:</strong> {mobileSelectedPatient.doctor}
//                   </Typography>
//                 </Grid>
//                 <Grid item xs={12}>
//                   <Typography variant="body2">
//                     <strong>Medications:</strong> {mobileSelectedPatient.medications?.join(', ') || 'None'}
//                   </Typography>
//                 </Grid>
//                 <Grid item xs={12}>
//                   <Typography variant="body2">
//                     <strong>Next Checkup:</strong> {mobileSelectedPatient.nextCheckup}
//                   </Typography>
//                 </Grid>
//               </Grid>

//               {mobileSelectedPatient.vitals && (
//                 <Box sx={{ mt: 2, p: 2, backgroundColor: theme.palette.grey[100], borderRadius: 1 }}>
//                   <Typography variant="subtitle2" gutterBottom>
//                     Latest Vitals
//                   </Typography>
//                   <Grid container spacing={2}>
//                     <Grid item xs={6}>
//                       <Typography variant="body2">
//                         <MonitorHeart fontSize="small" color="action" sx={{ mr: 1 }} />
//                         BP: {mobileSelectedPatient.vitals.bloodPressure || '--'}
//                       </Typography>
//                     </Grid>
//                     <Grid item xs={6}>
//                       <Typography variant="body2">
//                         <Thermometer fontSize="small" color="action" sx={{ mr: 1 }} />
//                         Temp: {mobileSelectedPatient.vitals.temperature || '--'}°C
//                       </Typography>
//                     </Grid>
//                     <Grid item xs={6}>
//                       <Typography variant="body2">
//                         <Scale fontSize="small" color="action" sx={{ mr: 1 }} />
//                         Weight: {mobileSelectedPatient.vitals.weight || '--'} kg
//                       </Typography>
//                     </Grid>
//                     <Grid item xs={6}>
//                       <Typography variant="body2">
//                         <Height fontSize="small" color="action" sx={{ mr: 1 }} />
//                         Height: {mobileSelectedPatient.vitals.height || '--'} cm
//                       </Typography>
//                     </Grid>
//                   </Grid>
//                 </Box>
//               )}

//               <Box sx={{ mt: 2, display: 'flex', justifyContent: 'space-between' }}>
//                 <Button
//                   variant="outlined"
//                   color="primary"
//                   startIcon={<EditNote />}
//                   onClick={() => {
//                     setVitalsData({
//                       bloodPressure: mobileSelectedPatient.vitals?.bloodPressure || '',
//                       temperature: mobileSelectedPatient.vitals?.temperature || '',
//                       weight: mobileSelectedPatient.vitals?.weight || '',
//                       height: mobileSelectedPatient.vitals?.height || '',
//                       pulse: mobileSelectedPatient.vitals?.pulse || ''
//                     });
//                     setUpdateVitalsOpen(true);
//                   }}
//                 >
//                   Update Vitals
//                 </Button>
//                 <Button
//                   variant="outlined"
//                   color="secondary"
//                   startIcon={<AddComment />}
//                   onClick={() => {
//                     const note = prompt('Enter your note:');
//                     if (note) {
//                       addPatientNote(mobileSelectedPatient.id, note);
//                       setSnackbarMessage('Note added successfully');
//                       setSnackbarOpen(true);
//                     }
//                   }}
//                 >
//                   Add Note
//                 </Button>
//               </Box>
//             </CardContent>
//           </Card>
//         </Box>
//       )}

//       {/* View Details Dialog (Desktop) */}
//       <Dialog open={viewDetailsOpen} onClose={handleCloseDetails} maxWidth="md" fullWidth>
//         <DialogTitle>
//           <Box display="flex" justifyContent="space-between" alignItems="center">
//             Patient Details: {selectedPatient?.name}
//             <IconButton onClick={handleCloseDetails}>
//               <Close />
//             </IconButton>
//           </Box>
//         </DialogTitle>
//         <DialogContent dividers>
//           {selectedPatient && (
//             <Grid container spacing={3}>
//               <Grid item xs={12} md={6}>
//                 <Typography variant="subtitle1" gutterBottom>
//                   <strong>Basic Information</strong>
//                 </Typography>
//                 <Box sx={{ pl: 2 }}>
//                   <Typography>
//                     <strong>ID:</strong> {selectedPatient.id}
//                   </Typography>
//                   <Typography>
//                     <strong>Age:</strong> {selectedPatient.age} years
//                   </Typography>
//                   <Typography>
//                     <strong>Gender:</strong> {selectedPatient.gender}
//                   </Typography>
//                   <Typography>
//                     <strong>Room:</strong> {selectedPatient.room}
//                   </Typography>
//                   <Typography>
//                     <strong>Diagnosis:</strong> {selectedPatient.diagnosis}
//                   </Typography>
//                   <Typography>
//                     <strong>Attending Physician:</strong> {selectedPatient.doctor}
//                   </Typography>
//                 </Box>
//               </Grid>
              
//               <Grid item xs={12} md={6}>
//                 <Typography variant="subtitle1" gutterBottom>
//                   <strong>Medical Information</strong>
//                 </Typography>
//                 <Box sx={{ pl: 2 }}>
//                   <Typography>
//                     <strong>Medications:</strong> {selectedPatient.medications?.join(', ') || 'None'}
//                   </Typography>
//                   <Typography>
//                     <strong>Allergies:</strong> {selectedPatient.allergies?.join(', ') || 'None reported'}
//                   </Typography>
//                   <Typography>
//                     <strong>Next Checkup:</strong> {selectedPatient.nextCheckup}
//                   </Typography>
//                 </Box>
//               </Grid>

//               {selectedPatient.vitals && (
//                 <Grid item xs={12}>
//                   <Typography variant="subtitle1" gutterBottom>
//                     <strong>Vital Signs</strong>
//                   </Typography>
//                   <Grid container spacing={2} sx={{ pl: 2 }}>
//                     <Grid item xs={6} md={3}>
//                       <Typography>
//                         <MonitorHeart fontSize="small" color="action" sx={{ mr: 1 }} />
//                         <strong>Blood Pressure:</strong> {selectedPatient.vitals.bloodPressure || '--'}
//                       </Typography>
//                     </Grid>
//                     <Grid item xs={6} md={3}>
//                       <Typography>
//                         <Thermometer fontSize="small" color="action" sx={{ mr: 1 }} />
//                         <strong>Temperature:</strong> {selectedPatient.vitals.temperature || '--'}°C
//                       </Typography>
//                     </Grid>
//                     <Grid item xs={6} md={3}>
//                       <Typography>
//                         <Scale fontSize="small" color="action" sx={{ mr: 1 }} />
//                         <strong>Weight:</strong> {selectedPatient.vitals.weight || '--'} kg
//                       </Typography>
//                     </Grid>
//                     <Grid item xs={6} md={3}>
//                       <Typography>
//                         <Height fontSize="small" color="action" sx={{ mr: 1 }} />
//                         <strong>Height:</strong> {selectedPatient.vitals.height || '--'} cm
//                       </Typography>
//                     </Grid>
//                     <Grid item xs={6} md={3}>
//                       <Typography>
//                         <strong>Pulse Rate:</strong> {selectedPatient.vitals.pulse || '--'} bpm
//                       </Typography>
//                     </Grid>
//                     <Grid item xs={6} md={3}>
//                       <Typography>
//                         <strong>Respiratory Rate:</strong> {selectedPatient.vitals.respiratoryRate || '--'} breaths/min
//                       </Typography>
//                     </Grid>
//                     <Grid item xs={6} md={3}>
//                       <Typography>
//                         <strong>Oxygen Saturation:</strong> {selectedPatient.vitals.oxygenSaturation || '--'}%
//                       </Typography>
//                     </Grid>
//                   </Grid>
//                 </Grid>
//               )}

//               {selectedPatient.notes?.length > 0 && (
//                 <Grid item xs={12}>
//                   <Typography variant="subtitle1" gutterBottom>
//                     <strong>Clinical Notes</strong>
//                   </Typography>
//                   <Box sx={{ 
//                     maxHeight: 200, 
//                     overflow: 'auto',
//                     p: 1,
//                     backgroundColor: theme.palette.grey[100],
//                     borderRadius: 1
//                   }}>
//                     {selectedPatient.notes.map((note, index) => (
//                       <Box key={index} sx={{ mb: 1, pb: 1, borderBottom: '1px solid rgba(0,0,0,0.12)' }}>
//                         <Typography variant="body2">
//                           <strong>{note.date}:</strong> {note.text}
//                         </Typography>
//                       </Box>
//                     ))}
//                   </Box>
//                 </Grid>
//               )}
//             </Grid>
//           )}
//         </DialogContent>
//         <DialogActions>
//           <Button 
//             variant="contained" 
//             color="primary"
//             onClick={() => {
//               handleCloseDetails();
//               handleOpenUpdateVitals(selectedPatient);
//             }}
//             startIcon={<EditNote />}
//           >
//             Update Vitals
//           </Button>
//           <Button 
//             variant="outlined" 
//             onClick={handleCloseDetails}
//           >
//             Close
//           </Button>
//         </DialogActions>
//       </Dialog>

//       {/* Update Vitals Dialog */}
//       <Dialog open={updateVitalsOpen} onClose={() => setUpdateVitalsOpen(false)}>
//         <DialogTitle>
//           <Box display="flex" justifyContent="space-between" alignItems="center">
//             Update Vitals for {selectedPatient?.name}
//             <IconButton onClick={() => setUpdateVitalsOpen(false)}>
//               <Close />
//             </IconButton>
//           </Box>
//         </DialogTitle>
//         <DialogContent>
//           <Box sx={{ mt: 2 }}>
//             <Grid container spacing={2}>
//               <Grid item xs={12} sm={6}>
//                 <TextField
//                   fullWidth
//                   label="Blood Pressure"
//                   name="bloodPressure"
//                   value={vitalsData.bloodPressure}
//                   onChange={handleVitalsChange}
//                   placeholder="e.g., 120/80"
//                   InputProps={{
//                     startAdornment: (
//                       <InputAdornment position="start">
//                         <MonitorHeart color="action" />
//                       </InputAdornment>
//                     )
//                   }}
//                 />
//               </Grid>
//               <Grid item xs={12} sm={6}>
//                 <TextField
//                   fullWidth
//                   label="Temperature (°C)"
//                   name="temperature"
//                   value={vitalsData.temperature}
//                   onChange={handleVitalsChange}
//                   type="number"
//                   InputProps={{
//                     startAdornment: (
//                       <InputAdornment position="start">
//                         <Thermometer color="action" />
//                       </InputAdornment>
//                     )
//                   }}
//                 />
//               </Grid>
//               <Grid item xs={12} sm={6}>
//                 <TextField
//                   fullWidth
//                   label="Weight (kg)"
//                   name="weight"
//                   value={vitalsData.weight}
//                   onChange={handleVitalsChange}
//                   type="number"
//                   InputProps={{
//                     startAdornment: (
//                       <InputAdornment position="start">
//                         <Scale color="action" />
//                       </InputAdornment>
//                     )
//                   }}
//                 />
//               </Grid>
//               <Grid item xs={12} sm={6}>
//                 <TextField
//                   fullWidth
//                   label="Height (cm)"
//                   name="height"
//                   value={vitalsData.height}
//                   onChange={handleVitalsChange}
//                   type="number"
//                   InputProps={{
//                     startAdornment: (
//                       <InputAdornment position="start">
//                         <Height color="action" />
//                       </InputAdornment>
//                     )
//                   }}
//                 />
//               </Grid>
//               <Grid item xs={12} sm={6}>
//                 <TextField
//                   fullWidth
//                   label="Pulse (bpm)"
//                   name="pulse"
//                   value={vitalsData.pulse}
//                   onChange={handleVitalsChange}
//                   type="number"
//                 />
//               </Grid>
//             </Grid>
//           </Box>
//         </DialogContent>
//         <DialogActions>
//           <Button 
//             variant="outlined" 
//             onClick={() => setUpdateVitalsOpen(false)}
//           >
//             Cancel
//           </Button>
//           <Button 
//             variant="contained" 
//             color="primary"
//             onClick={handleSubmitVitals}
//           >
//             Save Vitals
//           </Button>
//         </DialogActions>
//       </Dialog>
//     </Box>
//   );
// };

// export default MyPatientForm;
