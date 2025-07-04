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
//   Menu,
//   MenuItem,
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
//   Button,
//   TextField,
//   InputAdornment
// } from '@mui/material';
// import {
//   MedicalServices,
//   CalendarMonth,
//   MoreVert,
//   Edit,
//   DoneAll,
//   Cancel,
//   LocationOn,
//   Search,
//   Person
// } from '@mui/icons-material';
// import RescheduleDialog from './RescheduleDialog';

// const AppointmentForm = () => {
//   const theme = useTheme();
//   const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
//   const [anchorEl, setAnchorEl] = useState(null);
//   const [currentAppointment, setCurrentAppointment] = useState(null);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [rescheduleOpen, setRescheduleOpen] = useState(false);
//   const [completeDialogOpen, setCompleteDialogOpen] = useState(false);
//   const [cancelDialogOpen, setCancelDialogOpen] = useState(false);

//   // Sample appointment data
//   const [appointments, setAppointments] = useState([
//     {
//       id: 'APT-1001',
//       patientName: 'Sarah Johnson',
//       serviceType: 'IV Fluid Change',
//       date: '2023-06-15 09:30 AM',
//       status: 'Scheduled',
//       nurse: 'Nurse Emily',
//       location: 'Room 304-B'
//     },
//     {
//       id: 'APT-1002',
//       patientName: 'Robert Williams',
//       serviceType: 'Wound Dressing',
//       date: '2023-06-15 11:15 AM',
//       status: 'Scheduled',
//       nurse: 'Nurse Emily',
//       location: 'Room 205-A'
//     },
//     {
//       id: 'APT-1003',
//       patientName: 'Emma Davis',
//       serviceType: 'Medication Injection',
//       date: '2023-06-15 02:00 PM',
//       status: 'Completed',
//       nurse: 'Nurse Emily',
//       location: 'Room 102-C'
//     },
//     {
//       id: 'APT-1004',
//       patientName: 'Michael Brown',
//       serviceType: 'Blood Draw',
//       date: '2023-06-16 10:45 AM',
//       status: 'Cancelled',
//       nurse: 'Nurse Emily',
//       location: 'Room 107-D'
//     }
//   ]);

//   // Status color mapping
//   const statusColors = {
//     Scheduled: 'primary',
//     Completed: 'success',
//     Missed: 'error',
//     Cancelled: 'warning',
//     Rescheduled: 'info'
//   };

//   // Filter appointments based on search term
//   const filteredAppointments = appointments.filter(appt =>
//     appt.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
//     appt.serviceType.toLowerCase().includes(searchTerm.toLowerCase()) ||
//     appt.id.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   // Menu handlers
//   const handleMenuOpen = (event, appointment) => {
//     setAnchorEl(event.currentTarget);
//     setCurrentAppointment(appointment);
//   };

//   const handleMenuClose = () => {
//     setAnchorEl(null);
//   };

//   // Action handlers
//   const handleReschedule = (newDateTime) => {
//     console.log("new date time",newDateTime)
//     const formattedDate = newDateTime.toLocaleString('en-US', {
//       month: 'short',
//       day: 'numeric',
//       year: 'numeric',
//       hour: '2-digit',
//       minute: '2-digit'
//     });
//       console.log("current appointmwnt",currentAppointment)

//     setAppointments(prev => 
//       prev.map(appt => 
//         appt.id === currentAppointment.id
//           ? { ...appt, date: formattedDate, status: 'Rescheduled' } 
//           : appt
//       )
//     );
//     setRescheduleOpen(false);
//   };

//   const handleComplete = () => {
//     setAppointments(prev => 
//       prev.map(appt => 
//         appt.id === currentAppointment.id 
//           ? { ...appt, status: 'Completed' } 
//           : appt
//       )
//     );
//     setCompleteDialogOpen(false);
//   };

//   const handleCancel = () => {
//     setAppointments(prev => 
//       prev.map(appt => 
//         appt.id === currentAppointment.id 
//           ? { ...appt, status: 'Cancelled' } 
//           : appt
//       )
//     );
//     setCancelDialogOpen(false);
//   };

//   return (
//     <Box sx={{ p: isMobile ? 1 : 3 }}>
//       <Card elevation={3} sx={{ borderRadius: 3, overflow: 'hidden' }}>
//         <CardContent sx={{ p: 0 }}>
//           {/* Header Section */}
//           <Box sx={{
//             bgcolor: theme.palette.primary.main,
//             color: 'white',
//             p: isMobile ? 1.5 : 2,
//             display: 'flex',
//             alignItems: 'center',
//             justifyContent: 'space-between'
//           }}>
//             <Box sx={{ display: 'flex', alignItems: 'center' }}>
//               <MedicalServices sx={{ mr: 1.5, fontSize: isMobile ? '1.5rem' : '2rem' }} />
//               <Typography variant={isMobile ? 'h6' : 'h5'} fontWeight="bold">
//                 Nurse Appointments
//               </Typography>
//             </Box>

//             <TextField
//               size="small"
//               placeholder="Search appointments..."
//               variant="outlined"
//               InputProps={{
//                 startAdornment: (
//                   <InputAdornment position="start">
//                     <Search sx={{ color: 'white' }} />
//                   </InputAdornment>
//                 ),
//                 sx: {
//                   color: 'white',
//                   '& .MuiOutlinedInput-notchedOutline': {
//                     borderColor: 'rgba(255, 255, 255, 0.5)'
//                   },
//                   '&:hover .MuiOutlinedInput-notchedOutline': {
//                     borderColor: 'white'
//                   }
//                 }
//               }}
//               sx={{
//                 width: isMobile ? 150 : 250,
//                 '& .MuiInputBase-input::placeholder': {
//                   color: 'white',
//                   opacity: 0.8
//                 }
//               }}
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//             />
//           </Box>

//           <Divider />

//           {/* Appointments Table */}
//           <TableContainer component={Paper} elevation={0}>
//             <Table>
//               <TableHead sx={{ bgcolor: theme.palette.grey[100] }}>
//                 <TableRow>
//                   <TableCell sx={{ fontWeight: 'bold' }}>Appt ID</TableCell>
//                   <TableCell sx={{ fontWeight: 'bold' }}>Patient</TableCell>
//                   {!isMobile && (
//                     <>
//                       <TableCell sx={{ fontWeight: 'bold' }}>Service</TableCell>
//                       <TableCell sx={{ fontWeight: 'bold' }}>Date & Time</TableCell>
//                       <TableCell sx={{ fontWeight: 'bold' }}>Status</TableCell>
//                       <TableCell sx={{ fontWeight: 'bold' }}>Location</TableCell>
//                     </>
//                   )}
//                   <TableCell sx={{ fontWeight: 'bold' }}>Actions</TableCell>
//                 </TableRow>
//               </TableHead>
//               <TableBody>
//                 {filteredAppointments.map((appt) => (
//                   <TableRow key={appt.id} hover>
//                     <TableCell>
//                       <Chip
//                         label={appt.id}
//                         size="small"
//                         color="secondary"
//                         variant="outlined"
//                       />
//                     </TableCell>
//                     <TableCell>
//                       <Box sx={{ display: 'flex', alignItems: 'center' }}>
//                         <Avatar sx={{
//                           width: isMobile ? 32 : 40,
//                           height: isMobile ? 32 : 40,
//                           mr: 1,
//                           bgcolor: theme.palette.secondary.light
//                         }}>
//                           {appt.patientName.charAt(0)}
//                         </Avatar>
//                         {isMobile ? appt.patientName.split(' ')[0] : appt.patientName}
//                       </Box>
//                     </TableCell>
//                     {!isMobile && (
//                       <>
//                         <TableCell>
//                           <Chip
//                             label={appt.serviceType}
//                             size="small"
//                             icon={<MedicalServices fontSize="small" />}
//                           />
//                         </TableCell>
//                         <TableCell>
//                           <Box sx={{ display: 'flex', alignItems: 'center' }}>
//                             <CalendarMonth
//                               fontSize="small"
//                               color="action"
//                               sx={{ mr: 0.5 }}
//                             />
//                             {appt.date}
//                           </Box>
//                         </TableCell>
//                         <TableCell>
//                           <Chip
//                             label={appt.status}
//                             color={statusColors[appt.status]}
//                             size="small"
//                           />
//                         </TableCell>
//                         <TableCell>
//                           <Box sx={{ display: 'flex', alignItems: 'center' }}>
//                             <LocationOn
//                               fontSize="small"
//                               color="action"
//                               sx={{ mr: 0.5 }}
//                             />
//                             {appt.location}
//                           </Box>
//                         </TableCell>
//                       </>
//                     )}
//                     <TableCell>
//                       {isMobile ? (
//                         <>
//                           <IconButton
//                             size="small"
//                             onClick={(e) => handleMenuOpen(e, appt)}
//                           >
//                             <MoreVert />
//                           </IconButton>
//                           <Menu
//                             anchorEl={anchorEl}
//                             open={Boolean(anchorEl) && currentAppointment?.id === appt.id}
//                             onClose={handleMenuClose}
//                           >
//                             <MenuItem onClick={() => {
//                               setCurrentAppointment(appt);
//                               setRescheduleOpen(true);
//                               handleMenuClose();
//                             }}>
//                               <Edit fontSize="small" sx={{ mr: 1 }} /> Reschedule
//                             </MenuItem>
//                             <MenuItem onClick={() => {
//                               setCurrentAppointment(appt);
//                               setCompleteDialogOpen(true);
//                               handleMenuClose();
//                             }}>
//                               <DoneAll fontSize="small" sx={{ mr: 1 }} /> Mark as Done
//                             </MenuItem>
//                             <MenuItem onClick={() => {
//                               setCurrentAppointment(appt);
//                               setCancelDialogOpen(true);
//                               handleMenuClose();
//                             }}>
//                               <Cancel fontSize="small" sx={{ mr: 1 }} /> Cancel
//                             </MenuItem>
//                           </Menu>
//                         </>
//                       ) : (
//                         <Box sx={{ display: 'flex', gap: 1 }}>
//                           <Tooltip title="Reschedule">
//                             <IconButton
//                               color="info"
//                               size="small"
//                               onClick={() => {
//                                 setCurrentAppointment(appt);
//                                 setRescheduleOpen(true);
//                               }}
//                             >
//                               <Edit fontSize="small" />
//                             </IconButton>
//                           </Tooltip>
//                           <Tooltip title="Mark as Done">
//                             <IconButton
//                               color="success"
//                               size="small"
//                               onClick={() => {
//                                 setCurrentAppointment(appt);
//                                 setCompleteDialogOpen(true);
//                               }}
//                             >
//                               <DoneAll fontSize="small" />
//                             </IconButton>
//                           </Tooltip>
//                           <Tooltip title="Cancel Appointment">
//                             <IconButton
//                               color="error"
//                               size="small"
//                               onClick={() => {
//                                 setCurrentAppointment(appt);
//                                 setCancelDialogOpen(true);
//                               }}
//                             >
//                               <Cancel fontSize="small" />
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

//       {/* Reschedule Dialog */}
//       <RescheduleDialog
//         open={rescheduleOpen}
//         onClose={() => setRescheduleOpen(false)}
//         appointment={currentAppointment}
//         onReschedule={handleReschedule}
//       />

//       {/* Complete Dialog */}
//       <Dialog open={completeDialogOpen} onClose={() => setCompleteDialogOpen(false)}>
//         <DialogTitle>Confirm Completion</DialogTitle>
//         <DialogContent>
//           <Typography>
//             Mark appointment <strong>{currentAppointment?.id}</strong> as completed?
//           </Typography>
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={() => setCompleteDialogOpen(false)}>Cancel</Button>
//           <Button 
//             onClick={handleComplete}
//             color="success"
//             variant="contained"
//           >
//             Mark as Done
//           </Button>
//         </DialogActions>
//       </Dialog>

//       {/* Cancel Dialog */}
//       <Dialog open={cancelDialogOpen} onClose={() => setCancelDialogOpen(false)}>
//         <DialogTitle>Confirm Cancellation</DialogTitle>
//         <DialogContent>
//           <Typography>
//             Cancel appointment <strong>{currentAppointment?.id}</strong>?
//           </Typography>
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={() => setCancelDialogOpen(false)}>Back</Button>
//           <Button 
//             onClick={handleCancel}
//             color="error"
//             variant="contained"
//           >
//             Confirm Cancel
//           </Button>
//         </DialogActions>
//       </Dialog>
//     </Box>
//   );
// };

// export default AppointmentForm;





import React from 'react';
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
  Menu,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  InputAdornment,
  CircularProgress,
  Alert
} from '@mui/material';
import {
  MedicalServices,
  CalendarMonth,
  MoreVert,
  Edit,
  DoneAll,
  Cancel,
  LocationOn,
  Search,
  Person
} from '@mui/icons-material';
import RescheduleDialog from './RescheduleDialog';
import useAppointments from '../hooks/useAppointments';
import useAppointmentActions from '../hooks/useAppointmentActions';

const AppointmentForm = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  
  const {
    appointments,
    loading,
    error,
    searchTerm,
    setSearchTerm,
    statusColors,
    handleReschedule,
    handleComplete,
    handleCancel
  } = useAppointments();
  
  const {
    anchorEl,
    currentAppointment,
    rescheduleOpen,
    completeDialogOpen,
    cancelDialogOpen,
    handleMenuOpen,
    handleMenuClose,
    openRescheduleDialog,
    openCompleteDialog,
    openCancelDialog,
    closeRescheduleDialog,
    closeCompleteDialog,
    closeCancelDialog
  } = useAppointmentActions();

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Alert severity="error" sx={{ margin: 2 }}>
        Error loading appointments: {error}
      </Alert>
    );
  }

  return (
    <Box sx={{ p: isMobile ? 1 : 3 }}>
      <Card elevation={3} sx={{ borderRadius: 3, overflow: 'hidden' }}>
        <CardContent sx={{ p: 0 }}>
          {/* Header Section */}
          <Box sx={{
            bgcolor: theme.palette.primary.main,
            color: 'white',
            p: isMobile ? 1.5 : 2,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <MedicalServices sx={{ mr: 1.5, fontSize: isMobile ? '1.5rem' : '2rem' }} />
              <Typography variant={isMobile ? 'h6' : 'h5'} fontWeight="bold">
                Nurse Appointments
              </Typography>
            </Box>

            <TextField
              size="small"
              placeholder="Search appointments..."
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
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </Box>

          <Divider />

          {/* Appointments Table */}
          <TableContainer component={Paper} elevation={0}>
            <Table>
              <TableHead sx={{ bgcolor: theme.palette.grey[100] }}>
                <TableRow>
                  {/* <TableCell sx={{ fontWeight: 'bold' }}>Appt ID</TableCell> */}
                  <TableCell sx={{ fontWeight: 'bold' }}>Patient</TableCell>
                  {!isMobile && (
                    <>
                      <TableCell sx={{ fontWeight: 'bold' }}>Service</TableCell>
                      <TableCell sx={{ fontWeight: 'bold' }}>Date & Time</TableCell>
                      <TableCell sx={{ fontWeight: 'bold' }}>Status</TableCell>
                      <TableCell sx={{ fontWeight: 'bold' }}>Location</TableCell>
                    </>
                  )}
                  <TableCell sx={{ fontWeight: 'bold' }}>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {appointments.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={isMobile ? 3 : 7} align="center">
                      <Typography variant="body2" color="textSecondary">
                        No appointments found
                      </Typography>
                    </TableCell>
                  </TableRow>
                ) : (
                  appointments.map((appt) => (
                    <TableRow key={appt._id} hover>
                      {/* <TableCell>
                        <Chip
                          label={appt._id}
                          size="small"
                          color="secondary"
                          variant="outlined"
                        />
                      </TableCell> */}
                      <TableCell>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <Avatar sx={{
                            width: isMobile ? 32 : 40,
                            height: isMobile ? 32 : 40,
                            mr: 1,
                            bgcolor: theme.palette.secondary.light
                          }}>
                            {appt.patientName.charAt(0)}
                          </Avatar>
                          {isMobile ? appt.patientName.split(' ')[0] : appt.patientName}
                        </Box>
                      </TableCell>
                      {!isMobile && (
                        <>
                          <TableCell>
                            <Chip
                              label={appt.serviceType}
                              size="small"
                              icon={<MedicalServices fontSize="small" />}
                            />
                          </TableCell>
                          <TableCell>
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                              <CalendarMonth
                                fontSize="small"
                                color="action"
                                sx={{ mr: 0.5 }}
                              />
                              {appt.date}
                            </Box>
                          </TableCell>
                          <TableCell>
                            <Chip
                              label={appt.status}
                              color={statusColors[appt.status]}
                              size="small"
                            />
                          </TableCell>
                          <TableCell>
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                              <LocationOn
                                fontSize="small"
                                color="action"
                                sx={{ mr: 0.5 }}
                              />
                              {appt.location}
                            </Box>
                          </TableCell>
                        </>
                      )}
                      <TableCell>
                        {isMobile ? (
                          <>
                            <IconButton
                              size="small"
                              onClick={(e) => handleMenuOpen(e, appt)}
                            >
                              <MoreVert />
                            </IconButton>
                            <Menu
                              anchorEl={anchorEl}
                              open={Boolean(anchorEl) && currentAppointment?._id === appt._id}
                              onClose={handleMenuClose}
                            >
                              <MenuItem onClick={() => openRescheduleDialog(appt)}>
                                <Edit fontSize="small" sx={{ mr: 1 }} /> Reschedule
                              </MenuItem>
                              <MenuItem onClick={() => openCompleteDialog(appt)}>
                                <DoneAll fontSize="small" sx={{ mr: 1 }} /> Mark as Done
                              </MenuItem>
                              <MenuItem onClick={() => openCancelDialog(appt)}>
                                <Cancel fontSize="small" sx={{ mr: 1 }} /> Cancel
                              </MenuItem>
                            </Menu>
                          </>
                        ) : (
                          <Box sx={{ display: 'flex', gap: 1 }}>
                            <Tooltip title="Reschedule">
                              <IconButton
                                color="info"
                                size="small"
                                onClick={() => openRescheduleDialog(appt)}
                              >
                                <Edit fontSize="small" />
                              </IconButton>
                            </Tooltip>
                            <Tooltip title="Mark as Done">
                              <IconButton
                                color="success"
                                size="small"
                                onClick={() => openCompleteDialog(appt)}
                              >
                                <DoneAll fontSize="small" />
                              </IconButton>
                            </Tooltip>
                            <Tooltip title="Cancel Appointment">
                              <IconButton
                                color="error"
                                size="small"
                                onClick={() => openCancelDialog(appt)}
                              >
                                <Cancel fontSize="small" />
                              </IconButton>
                            </Tooltip>
                          </Box>
                        )}
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>

      {/* Reschedule Dialog */}
      <RescheduleDialog
        open={rescheduleOpen}
        onClose={closeRescheduleDialog}
        appointment={currentAppointment}
        onReschedule={(newDateTime) => {
          handleReschedule(currentAppointment._id, newDateTime);
          closeRescheduleDialog();
        }}
      />

      {/* Complete Dialog */}
      <Dialog open={completeDialogOpen} onClose={closeCompleteDialog}>
        <DialogTitle>Confirm Completion</DialogTitle>
        <DialogContent>
          <Typography>
            Mark appointment <strong>{currentAppointment?._id}</strong> as completed?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeCompleteDialog}>Cancel</Button>
          <Button 
            onClick={() => {
              handleComplete(currentAppointment._id);
              closeCompleteDialog();
            }}
            color="success"
            variant="contained"
          >
            Mark as Done
          </Button>
        </DialogActions>
      </Dialog>

      {/* Cancel Dialog */}
      <Dialog open={cancelDialogOpen} onClose={closeCancelDialog}>
        <DialogTitle>Confirm Cancellation</DialogTitle>
        <DialogContent>
          <Typography>
            Cancel appointment <strong>{currentAppointment?._id}</strong>?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeCancelDialog}>Back</Button>
          <Button 
            onClick={() => {
              handleCancel(currentAppointment._id);
              closeCancelDialog();
            }}
            color="error"
            variant="contained"
          >
            Confirm Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default AppointmentForm;