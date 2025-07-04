// import React, { useState } from 'react';
// import {
//   Box,
//   Card,
//   CardContent,
//   CircularProgress,
//   Alert,
//   Snackbar,
//   Typography,
//   Divider
// } from '@mui/material';
// import { LocalHospital } from '@mui/icons-material';
// import { useNursingRequests } from '../../hooks/useNursingRequest';
// import RequestFilters from './RequestFilters';
// import RequestsTable from './RequestsTable';
// import RescheduleDialog from './RescheduleDialog';

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
//   const [rescheduleDialogOpen, setRescheduleDialogOpen] = useState(false);
//   const [currentRequest, setCurrentRequest] = useState(null);

//   const handleStatusUpdate = async (id, newStatus) => {
//     try {
//       await handleStatusChange(id, newStatus);
//       showSnackbar(`Request status updated to ${newStatus}`, 'success');
//     } catch (err) {
//       showSnackbar('Failed to update request status', 'error');
//     }
//   };

//   const openRescheduleDialog = (request) => {
//     setCurrentRequest(request);
//     setRescheduleDialogOpen(true);
//   };

//   const closeRescheduleDialog = () => {
//     setRescheduleDialogOpen(false);
//     setCurrentRequest(null);
//   };

//   const handleRescheduleRequest = async (newDateTime) => {
//     try {
//       await handleReschedule(currentRequest.id, newDateTime);
//       showSnackbar('Request rescheduled successfully', 'success');
//     } catch (err) {
//       showSnackbar('Failed to reschedule request', 'error');
//     }
//     closeRescheduleDialog();
//   };

//   const showSnackbar = (message, severity) => {
//     setSnackbarMessage(message);
//     setSnackbarSeverity(severity);
//     setSnackbarOpen(true);
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

//       <RescheduleDialog
//         open={rescheduleDialogOpen}
//         onClose={closeRescheduleDialog}
//         appointment={currentRequest}
//         onReschedule={handleRescheduleRequest}
//       />

//       <Card elevation={3} sx={{ mb: 3, borderRadius: 3 }}>
//         <CardContent>
//           <Box sx={{ 
//             display: 'flex', 
//             justifyContent: 'space-between', 
//             alignItems: 'center',
//             mb: 3
//           }}>
//             <Typography variant="h5" fontWeight="bold" color="text.primary">
//               <LocalHospital sx={{ verticalAlign: 'middle', mr: 1 }} />
//               Nursing Service Requests
//             </Typography>
            
//             <RequestFilters 
//               filter={filter}
//               setFilter={setFilter}
//               priorityFilter={priorityFilter}
//               setPriorityFilter={setPriorityFilter}
//             />
//           </Box>
          
//           <Divider sx={{ mb: 2 }} />
          
//           <RequestsTable
//             requests={requests}
//             filter={filter}
//             priorityFilter={priorityFilter}
//             onStatusChange={handleStatusUpdate}
//             onReschedule={openRescheduleDialog}
//           />
//         </CardContent>
//       </Card>
//     </Box>
//   );
// };

// export default RequestForm;





import React, { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  CircularProgress,
  Alert,
  Snackbar,
  Typography
} from '@mui/material';
import { LocalHospital } from '@mui/icons-material';
import { useNursingRequests } from '../../hooks/useNursingRequest';
import RequestFilters from './RequestFilters';
import RequestsTable from './RequestsTable';
import RescheduleDialog from './RescheduleDialog';

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
      showSnackbar(`Request status updated to ${newStatus}`, 'success');
    } catch (err) {
      showSnackbar('Failed to update request status', 'error');
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
      await handleReschedule(currentRequest.id, newDateTime);
      showSnackbar('Request rescheduled successfully', 'success');
    } catch (err) {
      showSnackbar('Failed to reschedule request', 'error');
    }
    closeRescheduleDialog();
  };

  const showSnackbar = (message, severity) => {
    setSnackbarMessage(message);
    setSnackbarSeverity(severity);
    setSnackbarOpen(true);
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
    <Box sx={{ p: 3, backgroundColor: '#f5f7fa' }}>
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

      <Card elevation={3} sx={{ 
        mb: 3, 
        borderRadius: 3,
        boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)'
      }}>
        <CardContent sx={{ p: 0 }}>
          <Box sx={{ 
            p: 3,
            backgroundColor: '#3f51b5',
            color: 'white',
            borderTopLeftRadius: 12,
            borderTopRightRadius: 12
          }}>
            <Box sx={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center',
            }}>
              <Typography variant="h5" fontWeight="bold" color="inherit">
                <LocalHospital sx={{ 
                  verticalAlign: 'middle', 
                  mr: 1,
                  color: 'white'
                }} />
                Requests
              </Typography>
              
              <RequestFilters 
                filter={filter}
                setFilter={setFilter}
                priorityFilter={priorityFilter}
                setPriorityFilter={setPriorityFilter}
              />
            </Box>
          </Box>
          
          <RequestsTable
            requests={requests}
            filter={filter}
            priorityFilter={priorityFilter}
            onStatusChange={handleStatusUpdate}
            onReschedule={openRescheduleDialog}
          />
        </CardContent>
      </Card>
    </Box>
  );
};

export default RequestForm;