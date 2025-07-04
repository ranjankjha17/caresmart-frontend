// import React from 'react';
// import {
//   Paper,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Typography,
//   Avatar,
//   IconButton,
//   Tooltip,
//   Chip,
//   Box
// } from '@mui/material';
// import {
//   AccessTime,
//   Assignment,
//   CheckCircle,
//   Cancel,
//   Schedule,
//   Person,
//   Emergency,
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

// const RequestsTable = ({ 
//   requests, 
//   filter, 
//   priorityFilter, 
//   onStatusChange, 
//   onReschedule 
// }) => {
//   return (
//     <TableContainer component={Paper} elevation={0} sx={{ borderRadius: 2 }}>
//       <Table>
//         <TableHead sx={{ bgcolor: 'background.default' }}>
//           <TableRow>
//             <TableCell sx={{ fontWeight: 'bold', color: 'text.primary' }}>Request ID</TableCell>
//             <TableCell sx={{ fontWeight: 'bold', color: 'text.primary' }}>Patient</TableCell>
//             <TableCell sx={{ fontWeight: 'bold', color: 'text.primary' }}>Service Type</TableCell>
//             <TableCell sx={{ fontWeight: 'bold', color: 'text.primary' }}>Requested By</TableCell>
//             <TableCell sx={{ fontWeight: 'bold', color: 'text.primary' }}>Status</TableCell>
//             <TableCell sx={{ fontWeight: 'bold', color: 'text.primary' }}>Priority</TableCell>
//             <TableCell sx={{ fontWeight: 'bold', color: 'text.primary' }}>Scheduled Time</TableCell>
//             <TableCell sx={{ fontWeight: 'bold', color: 'text.primary' }}>Actions</TableCell>
//           </TableRow>
//         </TableHead>
//         <TableBody>
//           {requests
//             .filter(req => filter === 'All' || req.status === filter)
//             .filter(req => priorityFilter === 'All' || req.priority === priorityFilter)
//             .map((request) => (
//               <TableRow key={request.id} hover>
//                 <TableCell>
//                   <Chip 
//                     label={request.id} 
//                     size="small" 
//                     icon={<Assignment fontSize="small" />}
//                     sx={{ color: 'text.primary' }}
//                   />
//                 </TableCell>
//                 <TableCell>
//                   <Box sx={{ display: 'flex', alignItems: 'center' }}>
//                     <Avatar sx={{ width: 32, height: 32, mr: 1.5 }}>
//                       {request.patientName.charAt(0)}
//                     </Avatar>
//                     <Typography color="text.primary">
//                       {request.patientName}
//                     </Typography>
//                   </Box>
//                 </TableCell>
//                 <TableCell>
//                   <Typography color="text.primary">
//                     {request.serviceType}
//                   </Typography>
//                 </TableCell>
//                 <TableCell>
//                   {request.requestedBy === 'Self' ? (
//                     <Chip 
//                       label="Self" 
//                       size="small" 
//                       color="default" 
//                       sx={{ color: 'text.primary' }}
//                     />
//                   ) : (
//                     <Box sx={{ display: 'flex', alignItems: 'center' }}>
//                       <Person sx={{ mr: 0.5, color: 'text.secondary' }} />
//                       <Typography color="text.primary">
//                         {request.requestedBy}
//                       </Typography>
//                     </Box>
//                   )}
//                 </TableCell>
//                 <TableCell>
//                   <Chip 
//                     label={request.status} 
//                     color={statusColors[request.status]} 
//                     size="small"
//                     sx={{ color: 'white' }}
//                   />
//                 </TableCell>
//                 <TableCell>
//                   <Tooltip title={request.priority}>
//                     <IconButton size="small">
//                       {priorityIcons[request.priority]}
//                     </IconButton>
//                   </Tooltip>
//                 </TableCell>
//                 <TableCell>
//                   <Box sx={{ display: 'flex', alignItems: 'center' }}>
//                     <AccessTime sx={{ mr: 0.5, color: 'text.secondary' }} />
//                     <Typography color="text.primary">
//                       {request.scheduledTime}
//                     </Typography>
//                   </Box>
//                 </TableCell>
//                 <TableCell>
//                   <Box sx={{ display: 'flex', gap: 1 }}>
//                     {request.status === 'Pending' && (
//                       <>
//                         <Tooltip title="Approve">
//                           <IconButton 
//                             color="success" 
//                             size="small"
//                             onClick={() => onStatusChange(request.id, 'Approved')}
//                           >
//                             <CheckCircle fontSize="small" />
//                           </IconButton>
//                         </Tooltip>
//                         <Tooltip title="Reject">
//                           <IconButton 
//                             color="error" 
//                             size="small"
//                             onClick={() => onStatusChange(request.id, 'Rejected')}
//                           >
//                             <Cancel fontSize="small" />
//                           </IconButton>
//                         </Tooltip>
//                       </>
//                     )}
//                     <Tooltip title="Reschedule">
//                       <IconButton 
//                         color="info" 
//                         size="small"
//                         onClick={() => onReschedule(request)}
//                       >
//                         <Schedule fontSize="small" />
//                       </IconButton>
//                     </Tooltip>
//                   </Box>
//                 </TableCell>
//               </TableRow>
//             ))}
//         </TableBody>
//       </Table>
//     </TableContainer>
//   );
// };

// export default RequestsTable;





import React from 'react';
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Avatar,
  IconButton,
  Tooltip,
  Chip,
  Box
} from '@mui/material';
import {
  AccessTime,
  Assignment,
  CheckCircle,
  Cancel,
  Schedule,
  Person,
  Emergency,
  KeyboardArrowDown
} from '@mui/icons-material';
import dayjs from 'dayjs';

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

const RequestsTable = ({ 
  requests, 
  filter, 
  priorityFilter, 
  onStatusChange, 
  onReschedule 
}) => {
  return (
    <TableContainer component={Paper} elevation={0}>
      <Table>
        <TableHead sx={{ 
          backgroundColor: '#f8f9fa',
          '& th': {
            fontWeight: 600,
            color: '#495057',
            borderBottom: '2px solid #e9ecef'
          }
        }}>
          <TableRow>
            <TableCell>Request ID</TableCell>
            <TableCell>Patient</TableCell>
            <TableCell>Service Type</TableCell>
            <TableCell>Requested By</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Priority</TableCell>
            <TableCell>Scheduled Time</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {requests
            .filter(req => filter === 'All' || req.status === filter)
            .filter(req => priorityFilter === 'All' || req.priority === priorityFilter)
            .map((request) => (
              <TableRow 
                key={request.id} 
                hover
                sx={{ 
                  '&:nth-of-type(even)': {
                    backgroundColor: '#f8f9fa'
                  },
                  '&:last-child td': {
                    borderBottom: 0
                  }
                }}
              >
                <TableCell>
                  <Chip 
                    label={request.id} 
                    size="small" 
                    icon={<Assignment fontSize="small" />}
                    sx={{ 
                      color: '#212529',
                      backgroundColor: '#e9ecef'
                    }}
                  />
                </TableCell>
                <TableCell>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Avatar sx={{ 
                      width: 32, 
                      height: 32, 
                      mr: 1.5,
                      backgroundColor: '#3f51b5',
                      color: 'white'
                    }}>
                      {request.patientName.charAt(0)}
                    </Avatar>
                    <Typography color="#212529" fontWeight={500}>
                      {request.patientName}
                    </Typography>
                  </Box>
                </TableCell>
                <TableCell>
                  <Typography color="#495057">
                    {request.serviceType}
                  </Typography>
                </TableCell>
                <TableCell>
                  {request.requestedBy === 'Self' ? (
                    <Chip 
                      label="Self" 
                      size="small" 
                      sx={{ 
                        color: '#495057',
                        backgroundColor: '#e9ecef'
                      }}
                    />
                  ) : (
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Person sx={{ mr: 0.5, color: '#6c757d' }} />
                      <Typography color="#495057">
                        {request.requestedBy}
                      </Typography>
                    </Box>
                  )}
                </TableCell>
                <TableCell>
                  <Chip 
                    label={request.status} 
                    color={statusColors[request.status]} 
                    size="small"
                    sx={{ 
                      color: 'white',
                      fontWeight: 500,
                      minWidth: 80
                    }}
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
                    <AccessTime sx={{ mr: 0.5, color: '#6c757d' }} />
                    <Typography color="#495057">
                      {dayjs(request.scheduledTime).format('YYYY-MM-DD hh:mm A')}                      
                    </Typography>
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
                            onClick={() => onStatusChange(request.id, 'Approved')}
                            sx={{ '&:hover': { backgroundColor: 'rgba(46, 125, 50, 0.08)' } }}
                          >
                            <CheckCircle fontSize="small" />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Reject">
                          <IconButton 
                            color="error" 
                            size="small"
                            onClick={() => onStatusChange(request.id, 'Rejected')}
                            sx={{ '&:hover': { backgroundColor: 'rgba(211, 47, 47, 0.08)' } }}
                          >
                            <Cancel fontSize="small" />
                          </IconButton>
                        </Tooltip>
                      </>
                    )}
                    <Tooltip title="Reschedule">
                      <IconButton 
                        color="primary" 
                        size="small"
                        onClick={() => onReschedule(request)}
                        sx={{ '&:hover': { backgroundColor: 'rgba(63, 81, 181, 0.08)' } }}
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
  );
};

export default RequestsTable;