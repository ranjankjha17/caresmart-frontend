// import React, { useState } from 'react';
// import {
//   Box,
//   Button,
//   Card,
//   CardContent,
//   Chip,
//   Divider,
//   Grid,
//   MenuItem,
//   Paper,
//   Select,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Typography,
//   TextField,
//   InputLabel,
//   FormControl,
//   Avatar,
//   IconButton,
//   Tooltip
// } from '@mui/material';
// import {
//   AccessTime,
//   Assignment,
//   CheckCircle,
//   Cancel,
//   Schedule,
//   LocalHospital,
//   Person,
//   Emergency,
//   LowPriority,
//   KeyboardArrowDown
// } from '@mui/icons-material';

// const statusColors = {
//   Pending: 'warning',
//   Approved: 'info',
//   Rejected: 'error',
//   Completed: 'success'
// };

// const priorityIcons = {
//   Low: <KeyboardArrowDown color="action" />,
//   Medium: <KeyboardArrowDown color="primary" />,
//   High: <Emergency color="warning" />,
//   Emergency: <Emergency color="error" />
// };

// const RequestForm = () => {
//   const [requests, setRequests] = useState([
//     {
//       id: 'REQ-1001',
//       patientName: 'John Smith',
//       serviceType: 'Blood Test',
//       requestedBy: 'Dr. Sarah Johnson',
//       status: 'Pending',
//       priority: 'Medium',
//       scheduledTime: '2023-06-15 10:00 AM'
//     },
//     {
//       id: 'REQ-1002',
//       patientName: 'Maria Garcia',
//       serviceType: 'Wound Care',
//       requestedBy: 'Self',
//       status: 'Approved',
//       priority: 'High',
//       scheduledTime: '2023-06-15 02:30 PM'
//     },
//     {
//       id: 'REQ-1003',
//       patientName: 'Robert Chen',
//       serviceType: 'IV Therapy',
//       requestedBy: 'Dr. Michael Brown',
//       status: 'Completed',
//       priority: 'Low',
//       scheduledTime: '2023-06-14 09:00 AM'
//     },
//     {
//       id: 'REQ-1004',
//       patientName: 'Emma Wilson',
//       serviceType: 'Post-Op Check',
//       requestedBy: 'Dr. Sarah Johnson',
//       status: 'Rejected',
//       priority: 'Emergency',
//       scheduledTime: '2023-06-16 11:15 AM'
//     }
//   ]);

//   const [filter, setFilter] = useState('All');
//   const [priorityFilter, setPriorityFilter] = useState('All');

//   const handleStatusChange = (id, newStatus) => {
//     setRequests(requests.map(req => 
//       req.id === id ? {...req, status: newStatus} : req
//     ));
//   };

//   return (
//     <Box sx={{ p: 3 }}>
//       <Card elevation={3} sx={{ mb: 3, borderRadius: 3 }}>
//         <CardContent>
//           <Box sx={{ 
//             display: 'flex', 
//             justifyContent: 'space-between', 
//             alignItems: 'center',
//             mb: 3
//           }}>
//             <Typography variant="h5" fontWeight="bold">
//               <LocalHospital sx={{ verticalAlign: 'middle', mr: 1 }} />
//               Nursing Service Requests
//             </Typography>
            
//             <Box sx={{ display: 'flex', gap: 2 }}>
//               <FormControl size="small" sx={{ minWidth: 150 }}>
//                 <InputLabel>Status</InputLabel>
//                 <Select
//                   value={filter}
//                   onChange={(e) => setFilter(e.target.value)}
//                   label="Status"
//                 >
//                   <MenuItem value="All">All Statuses</MenuItem>
//                   <MenuItem value="Pending">Pending</MenuItem>
//                   <MenuItem value="Approved">Approved</MenuItem>
//                   <MenuItem value="Rejected">Rejected</MenuItem>
//                   <MenuItem value="Completed">Completed</MenuItem>
//                 </Select>
//               </FormControl>
              
//               <FormControl size="small" sx={{ minWidth: 150 }}>
//                 <InputLabel>Priority</InputLabel>
//                 <Select
//                   value={priorityFilter}
//                   onChange={(e) => setPriorityFilter(e.target.value)}
//                   label="Priority"
//                 >
//                   <MenuItem value="All">All Priorities</MenuItem>
//                   <MenuItem value="Low">Low</MenuItem>
//                   <MenuItem value="Medium">Medium</MenuItem>
//                   <MenuItem value="High">High</MenuItem>
//                   <MenuItem value="Emergency">Emergency</MenuItem>
//                 </Select>
//               </FormControl>
//             </Box>
//           </Box>
          
//           <Divider sx={{ mb: 2 }} />
          
//           <TableContainer component={Paper} elevation={0} sx={{ borderRadius: 2 }}>
//             <Table>
//               <TableHead sx={{ bgcolor: 'background.default' }}>
//                 <TableRow>
//                   <TableCell sx={{ fontWeight: 'bold' }}>Request ID</TableCell>
//                   <TableCell sx={{ fontWeight: 'bold' }}>Patient</TableCell>
//                   <TableCell sx={{ fontWeight: 'bold' }}>Service Type</TableCell>
//                   <TableCell sx={{ fontWeight: 'bold' }}>Requested By</TableCell>
//                   <TableCell sx={{ fontWeight: 'bold' }}>Status</TableCell>
//                   <TableCell sx={{ fontWeight: 'bold' }}>Priority</TableCell>
//                   <TableCell sx={{ fontWeight: 'bold' }}>Scheduled Time</TableCell>
//                   <TableCell sx={{ fontWeight: 'bold' }}>Actions</TableCell>
//                 </TableRow>
//               </TableHead>
//               <TableBody>
//                 {requests
//                   .filter(req => filter === 'All' || req.status === filter)
//                   .filter(req => priorityFilter === 'All' || req.priority === priorityFilter)
//                   .map((request) => (
//                     <TableRow key={request.id} hover>
//                       <TableCell>
//                         <Chip 
//                           label={request.id} 
//                           size="small" 
//                           icon={<Assignment fontSize="small" />}
//                         />
//                       </TableCell>
//                       <TableCell>
//                         <Box sx={{ display: 'flex', alignItems: 'center' }}>
//                           <Avatar sx={{ width: 32, height: 32, mr: 1.5 }}>
//                             {request.patientName.charAt(0)}
//                           </Avatar>
//                           {request.patientName}
//                         </Box>
//                       </TableCell>
//                       <TableCell>{request.serviceType}</TableCell>
//                       <TableCell>
//                         {request.requestedBy === 'Self' ? (
//                           <Chip label="Self" size="small" color="default" />
//                         ) : (
//                           <Box sx={{ display: 'flex', alignItems: 'center' }}>
//                             <Person sx={{ mr: 0.5, color: 'text.secondary' }} />
//                             {request.requestedBy}
//                           </Box>
//                         )}
//                       </TableCell>
//                       <TableCell>
//                         <Chip 
//                           label={request.status} 
//                           color={statusColors[request.status]} 
//                           size="small"
//                         />
//                       </TableCell>
//                       <TableCell>
//                         <Tooltip title={request.priority}>
//                           <IconButton size="small">
//                             {priorityIcons[request.priority]}
//                           </IconButton>
//                         </Tooltip>
//                       </TableCell>
//                       <TableCell>
//                         <Box sx={{ display: 'flex', alignItems: 'center' }}>
//                           <AccessTime sx={{ mr: 0.5, color: 'text.secondary' }} />
//                           {request.scheduledTime}
//                         </Box>
//                       </TableCell>
//                       <TableCell>
//                         <Box sx={{ display: 'flex', gap: 1 }}>
//                           {request.status === 'Pending' && (
//                             <>
//                               <Tooltip title="Approve">
//                                 <IconButton 
//                                   color="success" 
//                                   size="small"
//                                   onClick={() => handleStatusChange(request.id, 'Approved')}
//                                 >
//                                   <CheckCircle fontSize="small" />
//                                 </IconButton>
//                               </Tooltip>
//                               <Tooltip title="Reject">
//                                 <IconButton 
//                                   color="error" 
//                                   size="small"
//                                   onClick={() => handleStatusChange(request.id, 'Rejected')}
//                                 >
//                                   <Cancel fontSize="small" />
//                                 </IconButton>
//                               </Tooltip>
//                             </>
//                           )}
//                           <Tooltip title="Reschedule">
//                             <IconButton color="info" size="small">
//                               <Schedule fontSize="small" />
//                             </IconButton>
//                           </Tooltip>
//                         </Box>
//                       </TableCell>
//                     </TableRow>
//                   ))}
//               </TableBody>
//             </Table>
//           </TableContainer>
//         </CardContent>
//       </Card>
//     </Box>
//   );
// };

// export default RequestForm










// import React, { useState } from 'react';
// import {
//   Box,
//   Button,
//   Card,
//   CardContent,
//   Chip,
//   Divider,
//   Grid,
//   MenuItem,
//   Paper,
//   Select,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Typography,
//   TextField,
//   InputLabel,
//   FormControl,
//   Avatar,
//   IconButton,
//   Tooltip,
//   CircularProgress,
//   Snackbar,
//   Alert
// } from '@mui/material';
// import {
//   AccessTime,
//   Assignment,
//   CheckCircle,
//   Cancel,
//   Schedule,
//   LocalHospital,
//   Person,
//   Emergency,
//   LowPriority,
//   KeyboardArrowDown
// } from '@mui/icons-material';
// import { useNursingRequests } from '../hooks/useRequest';

// const statusColors = {
//   Pending: 'warning',
//   Approved: 'info',
//   Rejected: 'error',
//   Completed: 'success'
// };

// const priorityIcons = {
//   Low: <KeyboardArrowDown color="action" />,
//   Medium: <KeyboardArrowDown color="primary" />,
//   High: <Emergency color="warning" />,
//   Emergency: <Emergency color="error" />
// };

// const RequestForm = () => {
//   const {
//     requests,
//     loading,
//     error,
//     handleStatusChange,
//     handleReschedule
//   } = useNursingRequests();

//   const [filter, setFilter] = useState('All');
//   const [priorityFilter, setPriorityFilter] = useState('All');
//   const [snackbarOpen, setSnackbarOpen] = useState(false);
//   const [snackbarMessage, setSnackbarMessage] = useState('');
//   const [snackbarSeverity, setSnackbarSeverity] = useState('success');

//   const handleStatusUpdate = async (id, newStatus) => {
//     try {
//       await handleStatusChange(id, newStatus);
//       setSnackbarMessage(`Request status updated to ${newStatus}`);
//       setSnackbarSeverity('success');
//       setSnackbarOpen(true);
//     } catch (err) {
//       setSnackbarMessage('Failed to update request status');
//       setSnackbarSeverity('error');
//       setSnackbarOpen(true);
//     }
//   };

//   const handleRescheduleRequest = async (id) => {
//     // You might want to implement a dialog to select new time
//     const newTime = prompt('Enter new scheduled time:');
//     if (newTime) {
//       try {
//         await handleReschedule(id, newTime);
//         setSnackbarMessage('Request rescheduled successfully');
//         setSnackbarSeverity('success');
//         setSnackbarOpen(true);
//       } catch (err) {
//         setSnackbarMessage('Failed to reschedule request');
//         setSnackbarSeverity('error');
//         setSnackbarOpen(true);
//       }
//     }
//   };

//   const handleCloseSnackbar = () => {
//     setSnackbarOpen(false);
//   };

//   if (loading && !requests.length) {
//     return (
//       <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
//         <CircularProgress />
//       </Box>
//     );
//   }

//   if (error) {
//     return (
//       <Box sx={{ p: 3 }}>
//         <Alert severity="error">
//           Failed to load nursing requests: {error.message}
//         </Alert>
//       </Box>
//     );
//   }

//   return (
//     <Box sx={{ p: 3 }}>
//       <Snackbar
//         open={snackbarOpen}
//         autoHideDuration={6000}
//         onClose={handleCloseSnackbar}
//       >
//         <Alert
//           onClose={handleCloseSnackbar}
//           severity={snackbarSeverity}
//           sx={{ width: '100%' }}
//         >
//           {snackbarMessage}
//         </Alert>
//       </Snackbar>

//       <Card elevation={3} sx={{ mb: 3, borderRadius: 3 }}>
//         <CardContent>
//           <Box sx={{ 
//             display: 'flex', 
//             justifyContent: 'space-between', 
//             alignItems: 'center',
//             mb: 3
//           }}>
//             <Typography variant="h5" fontWeight="bold">
//               <LocalHospital sx={{ verticalAlign: 'middle', mr: 1 }} />
//               Nursing Service Requests
//             </Typography>
            
//             <Box sx={{ display: 'flex', gap: 2 }}>
//               <FormControl size="small" sx={{ minWidth: 150 }}>
//                 <InputLabel>Status</InputLabel>
//                 <Select
//                   value={filter}
//                   onChange={(e) => setFilter(e.target.value)}
//                   label="Status"
//                 >
//                   <MenuItem value="All">All Statuses</MenuItem>
//                   <MenuItem value="Pending">Pending</MenuItem>
//                   <MenuItem value="Approved">Approved</MenuItem>
//                   <MenuItem value="Rejected">Rejected</MenuItem>
//                   <MenuItem value="Completed">Completed</MenuItem>
//                 </Select>
//               </FormControl>
              
//               <FormControl size="small" sx={{ minWidth: 150 }}>
//                 <InputLabel>Priority</InputLabel>
//                 <Select
//                   value={priorityFilter}
//                   onChange={(e) => setPriorityFilter(e.target.value)}
//                   label="Priority"
//                 >
//                   <MenuItem value="All">All Priorities</MenuItem>
//                   <MenuItem value="Low">Low</MenuItem>
//                   <MenuItem value="Medium">Medium</MenuItem>
//                   <MenuItem value="High">High</MenuItem>
//                   <MenuItem value="Emergency">Emergency</MenuItem>
//                 </Select>
//               </FormControl>
//             </Box>
//           </Box>
          
//           <Divider sx={{ mb: 2 }} />
          
//           <TableContainer component={Paper} elevation={0} sx={{ borderRadius: 2 }}>
//             <Table>
//               <TableHead sx={{ bgcolor: 'background.default' }}>
//                 <TableRow>
//                   <TableCell sx={{ fontWeight: 'bold' }}>Request ID</TableCell>
//                   <TableCell sx={{ fontWeight: 'bold' }}>Patient</TableCell>
//                   <TableCell sx={{ fontWeight: 'bold' }}>Service Type</TableCell>
//                   <TableCell sx={{ fontWeight: 'bold' }}>Requested By</TableCell>
//                   <TableCell sx={{ fontWeight: 'bold' }}>Status</TableCell>
//                   <TableCell sx={{ fontWeight: 'bold' }}>Priority</TableCell>
//                   <TableCell sx={{ fontWeight: 'bold' }}>Scheduled Time</TableCell>
//                   <TableCell sx={{ fontWeight: 'bold' }}>Actions</TableCell>
//                 </TableRow>
//               </TableHead>
//               <TableBody>
//                 {requests
//                   .filter(req => filter === 'All' || req.status === filter)
//                   .filter(req => priorityFilter === 'All' || req.priority === priorityFilter)
//                   .map((request) => (
//                     <TableRow key={request.id} hover>
//                       <TableCell>
//                         <Chip 
//                           label={request.id} 
//                           size="small" 
//                           icon={<Assignment fontSize="small" />}
//                         />
//                       </TableCell>
//                       <TableCell>
//                         <Box sx={{ display: 'flex', alignItems: 'center' }}>
//                           <Avatar sx={{ width: 32, height: 32, mr: 1.5 }}>
//                             {request.patientName.charAt(0)}
//                           </Avatar>
//                           {request.patientName}
//                         </Box>
//                       </TableCell>
//                       <TableCell>{request.serviceType}</TableCell>
//                       <TableCell>
//                         {request.requestedBy === 'Self' ? (
//                           <Chip label="Self" size="small" color="default" />
//                         ) : (
//                           <Box sx={{ display: 'flex', alignItems: 'center' }}>
//                             <Person sx={{ mr: 0.5, color: 'text.secondary' }} />
//                             {request.requestedBy}
//                           </Box>
//                         )}
//                       </TableCell>
//                       <TableCell>
//                         <Chip 
//                           label={request.status} 
//                           color={statusColors[request.status]} 
//                           size="small"
//                         />
//                       </TableCell>
//                       <TableCell>
//                         <Tooltip title={request.priority}>
//                           <IconButton size="small">
//                             {priorityIcons[request.priority]}
//                           </IconButton>
//                         </Tooltip>
//                       </TableCell>
//                       <TableCell>
//                         <Box sx={{ display: 'flex', alignItems: 'center' }}>
//                           <AccessTime sx={{ mr: 0.5, color: 'text.secondary' }} />
//                           {request.scheduledTime}
//                         </Box>
//                       </TableCell>
//                       <TableCell>
//                         <Box sx={{ display: 'flex', gap: 1 }}>
//                           {request.status === 'Pending' && (
//                             <>
//                               <Tooltip title="Approve">
//                                 <IconButton 
//                                   color="success" 
//                                   size="small"
//                                   onClick={() => handleStatusUpdate(request.id, 'Approved')}
//                                 >
//                                   <CheckCircle fontSize="small" />
//                                 </IconButton>
//                               </Tooltip>
//                               <Tooltip title="Reject">
//                                 <IconButton 
//                                   color="error" 
//                                   size="small"
//                                   onClick={() => handleStatusUpdate(request.id, 'Rejected')}
//                                 >
//                                   <Cancel fontSize="small" />
//                                 </IconButton>
//                               </Tooltip>
//                             </>
//                           )}
//                           <Tooltip title="Reschedule">
//                             <IconButton 
//                               color="info" 
//                               size="small"
//                               onClick={() => handleRescheduleRequest(request.id)}
//                             >
//                               <Schedule fontSize="small" />
//                             </IconButton>
//                           </Tooltip>
//                         </Box>
//                       </TableCell>
//                     </TableRow>
//                   ))}
//               </TableBody>
//             </Table>
//           </TableContainer>
//         </CardContent>
//       </Card>
//     </Box>
//   );
// };

// export default RequestForm;











import React, { useState } from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Divider,
  MenuItem,
  Paper,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  InputLabel,
  FormControl,
  Avatar,
  IconButton,
  Tooltip,
  CircularProgress,
  Snackbar,
  Alert
} from '@mui/material';
import {
  AccessTime,
  Assignment,
  CheckCircle,
  Cancel,
  Schedule,
  LocalHospital,
  Person,
  Emergency,
  KeyboardArrowDown
} from '@mui/icons-material';
import RescheduleDialog from './RescheduleDialog';
import { format } from 'date-fns';
import { useNursingRequests } from '../hooks/useNursingRequest';

const statusColors = {
  Pending: 'warning',
  Approved: 'info',
  Rejected: 'error',
  Completed: 'success'
};

const priorityIcons = {
  Low: <KeyboardArrowDown color="action" />,
  Medium: <KeyboardArrowDown color="primary" />,
  High: <Emergency color="warning" />,
  Emergency: <Emergency color="error" />
};

const RequestForm = () => {
  const {
    requests,
    loading,
    error,
    handleStatusChange,
    handleReschedule
  } = useNursingRequests();

  const [filter, setFilter] = useState('All');
  const [priorityFilter, setPriorityFilter] = useState('All');
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');
  const [rescheduleDialogOpen, setRescheduleDialogOpen] = useState(false);
  const [currentRequest, setCurrentRequest] = useState(null);

  const handleStatusUpdate = async (id, newStatus) => {
    try {
      await handleStatusChange(id, newStatus);
      setSnackbarMessage(`Request status updated to ${newStatus}`);
      setSnackbarSeverity('success');
      setSnackbarOpen(true);
    } catch (err) {
      setSnackbarMessage('Failed to update request status');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
    }
  };

  const openRescheduleDialog = (request) => {
    setCurrentRequest(request);
    setRescheduleDialogOpen(true);
  };

  const closeRescheduleDialog = () => {
    setRescheduleDialogOpen(false);
    setCurrentRequest(null);
  };

  const handleRescheduleRequest = async (newDateTime) => {
    try {
      // Format the date to match your API requirements
      const formattedDateTime = format(newDateTime, "yyyy-MM-dd hh:mm a");
      await handleReschedule(currentRequest.id, formattedDateTime);
      setSnackbarMessage('Request rescheduled successfully');
      setSnackbarSeverity('success');
      setSnackbarOpen(true);
    } catch (err) {
      setSnackbarMessage('Failed to reschedule request');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
    }
    closeRescheduleDialog();
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  if (loading && !requests.length) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ p: 3 }}>
        <Alert severity="error">
          Failed to load nursing requests: {error.message}
        </Alert>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3 }}>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbarSeverity}
          sx={{ width: '100%' }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>

      <RescheduleDialog
        open={rescheduleDialogOpen}
        onClose={closeRescheduleDialog}
        appointment={currentRequest}
        onReschedule={handleRescheduleRequest}
      />

      <Card elevation={3} sx={{ mb: 3, borderRadius: 3 }}>
        <CardContent>
          <Box sx={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center',
            mb: 3
          }}>
            <Typography variant="h5" fontWeight="bold">
              <LocalHospital sx={{ verticalAlign: 'middle', mr: 1 }} />
              Nursing Service Requests
            </Typography>
            
            <Box sx={{ display: 'flex', gap: 2 }}>
              <FormControl size="small" sx={{ minWidth: 150 }}>
                <InputLabel>Status</InputLabel>
                <Select
                  value={filter}
                  onChange={(e) => setFilter(e.target.value)}
                  label="Status"
                >
                  <MenuItem value="All">All Statuses</MenuItem>
                  <MenuItem value="Pending">Pending</MenuItem>
                  <MenuItem value="Approved">Approved</MenuItem>
                  <MenuItem value="Rejected">Rejected</MenuItem>
                  <MenuItem value="Completed">Completed</MenuItem>
                </Select>
              </FormControl>
              
              <FormControl size="small" sx={{ minWidth: 150 }}>
                <InputLabel>Priority</InputLabel>
                <Select
                  value={priorityFilter}
                  onChange={(e) => setPriorityFilter(e.target.value)}
                  label="Priority"
                >
                  <MenuItem value="All">All Priorities</MenuItem>
                  <MenuItem value="Low">Low</MenuItem>
                  <MenuItem value="Medium">Medium</MenuItem>
                  <MenuItem value="High">High</MenuItem>
                  <MenuItem value="Emergency">Emergency</MenuItem>
                </Select>
              </FormControl>
            </Box>
          </Box>
          
          <Divider sx={{ mb: 2 }} />
          
          <TableContainer component={Paper} elevation={0} sx={{ borderRadius: 2 }}>
            <Table>
              <TableHead sx={{ bgcolor: 'background.default' }}>
                <TableRow>
                  <TableCell sx={{ fontWeight: 'bold' }}>Request ID</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>Patient</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>Service Type</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>Requested By</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>Status</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>Priority</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>Scheduled Time</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {requests
                  .filter(req => filter === 'All' || req.status === filter)
                  .filter(req => priorityFilter === 'All' || req.priority === priorityFilter)
                  .map((request) => (
                    <TableRow key={request.id} hover>
                      <TableCell>
                        <Chip 
                          label={request.id} 
                          size="small" 
                          icon={<Assignment fontSize="small" />}
                        />
                      </TableCell>
                      <TableCell>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <Avatar sx={{ width: 32, height: 32, mr: 1.5 }}>
                            {request.patientName.charAt(0)}
                          </Avatar>
                          {request.patientName}
                        </Box>
                      </TableCell>
                      <TableCell>{request.serviceType}</TableCell>
                      <TableCell>
                        {request.requestedBy === 'Self' ? (
                          <Chip label="Self" size="small" color="default" />
                        ) : (
                          <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <Person sx={{ mr: 0.5, color: 'text.secondary' }} />
                            {request.requestedBy}
                          </Box>
                        )}
                      </TableCell>
                      <TableCell>
                        <Chip 
                          label={request.status} 
                          color={statusColors[request.status]} 
                          size="small"
                        />
                      </TableCell>
                      <TableCell>
                        <Tooltip title={request.priority}>
                          <IconButton size="small">
                            {priorityIcons[request.priority]}
                          </IconButton>
                        </Tooltip>
                      </TableCell>
                      <TableCell>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <AccessTime sx={{ mr: 0.5, color: 'text.secondary' }} />
                          {request.scheduledTime}
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Box sx={{ display: 'flex', gap: 1 }}>
                          {request.status === 'Pending' && (
                            <>
                              <Tooltip title="Approve">
                                <IconButton 
                                  color="success" 
                                  size="small"
                                  onClick={() => handleStatusUpdate(request.id, 'Approved')}
                                >
                                  <CheckCircle fontSize="small" />
                                </IconButton>
                              </Tooltip>
                              <Tooltip title="Reject">
                                <IconButton 
                                  color="error" 
                                  size="small"
                                  onClick={() => handleStatusUpdate(request.id, 'Rejected')}
                                >
                                  <Cancel fontSize="small" />
                                </IconButton>
                              </Tooltip>
                            </>
                          )}
                          <Tooltip title="Reschedule">
                            <IconButton 
                              color="info" 
                              size="small"
                              onClick={() => openRescheduleDialog(request)}
                            >
                              <Schedule fontSize="small" />
                            </IconButton>
                          </Tooltip>
                        </Box>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>
    </Box>
  );
};

export default RequestForm;