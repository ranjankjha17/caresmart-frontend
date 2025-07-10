// import React, { useState } from 'react';
// import {
//   Card,
//   CardContent,
//   Typography,
//   Divider,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Avatar,
//   Chip,
//   Box,
//   Skeleton,
//   TablePagination,
//   IconButton,
//   Tooltip
// } from '@mui/material';
// import {
//   CheckCircle,
//   Pending,
//   Cancel,
//   AccessTime,
//   Edit,
//   Schedule
// } from '@mui/icons-material';
// import { useNavigate } from 'react-router-dom';

// const statusConfig = {
//   confirmed: {
//     icon: <CheckCircle color="success" fontSize="small" />,
//     color: 'success',
//     label: 'Confirmed'
//   },
//   pending: {
//     icon: <Pending color="warning" fontSize="small" />,
//     color: 'warning',
//     label: 'Pending'
//   },
//   cancelled: {
//     icon: <Cancel color="error" fontSize="small" />,
//     color: 'error',
//     label: 'Cancelled'
//   },
//   Rescheduled: {
//     icon: <Schedule color="error" fontSize="small" />,
//     color: 'error',
//     label: 'Rescheduled'
//   }

// };

// const AppointmentsTable = ({ appointments = [], loading }) => {
//   const [page, setPage] = useState(0);
//   const [rowsPerPage, setRowsPerPage] = useState(5);
//   const navigate = useNavigate();

//   const handleChangePage = (event, newPage) => {
//     setPage(newPage);
//   };

//   const handleChangeRowsPerPage = (event) => {
//     setRowsPerPage(parseInt(event.target.value, 10));
//     setPage(0);
//   };

//   const handleEditAppointment = (appointmentId) => {
//     navigate(`/appointments/${appointmentId}/edit`);
//   };

//   return (
//     <Card sx={{
//       height: '100%',
//       borderRadius: 2,
//       boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.05)'
//     }}>
//       <CardContent>
//         <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
//           Appointments
//         </Typography>
//         <Divider sx={{ mb: 2 }} />

//         <TableContainer>
//           <Table>
//             <TableHead>
//               <TableRow>
//                 <TableCell sx={{ fontWeight: 600 }}>Patient</TableCell>
//                 <TableCell sx={{ fontWeight: 600 }}>Time</TableCell>
//                 <TableCell sx={{ fontWeight: 600 }}>Service</TableCell>
//                 <TableCell sx={{ fontWeight: 600 }}>Status</TableCell>
//                 <TableCell sx={{ fontWeight: 600 }} align="right">Actions</TableCell>
//               </TableRow>
//             </TableHead>
//             <TableBody>
//               {loading ? (
//                 Array.from({ length: rowsPerPage }).map((_, index) => (
//                   <TableRow key={`skeleton-${index}`}>
//                     <TableCell>
//                       <Box sx={{ display: 'flex', alignItems: 'center' }}>
//                         <Skeleton variant="circular" width={40} height={40} />
//                         <Skeleton variant="text" width={100} sx={{ ml: 2 }} />
//                       </Box>
//                     </TableCell>
//                     <TableCell><Skeleton variant="text" /></TableCell>
//                     <TableCell><Skeleton variant="text" /></TableCell>
//                     <TableCell><Skeleton variant="text" width={80} /></TableCell>
//                     <TableCell align="right"><Skeleton variant="text" width={50} /></TableCell>
//                   </TableRow>
//                 ))
//               ) : (
//                 appointments
//                   .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
//                   .map((appointment) => (
//                     <TableRow key={appointment.id} hover>
//                       <TableCell>
//                         <Box sx={{ display: 'flex', alignItems: 'center' }}>
//                           <Avatar
//                             src={appointment.patient.avatar}
//                             sx={{
//                               width: 40,
//                               height: 40,
//                               mr: 2,
//                               bgcolor: 'primary.light',
//                               color: 'primary.contrastText'
//                             }}
//                           >
//                             {appointment.patient.name.charAt(0)}
//                           </Avatar>
//                           <Box>
//                             <Typography sx={{ fontWeight: 500 }}>
//                               {appointment.patient.name}
//                             </Typography>
//                             <Typography variant="body2" color="text.secondary">
//                               {appointment.patient.id}
//                             </Typography>
//                           </Box>
//                         </Box>
//                       </TableCell>
//                       <TableCell>
//                         <Box sx={{ display: 'flex', alignItems: 'center' }}>
//                           <AccessTime sx={{ mr: 1, color: 'text.secondary' }} />
//                           {new Date(appointment.time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
//                         </Box>
//                       </TableCell>
//                       <TableCell>
//                         <Chip
//                           label={appointment.service}
//                           size="small"
//                           variant="outlined"
//                         />
//                       </TableCell>
//                       <TableCell>
//                         <Chip
//                           label={statusConfig[appointment.status].label}
//                           size="small"
//                           icon={statusConfig[appointment.status].icon}
//                           color={statusConfig[appointment.status].color}
//                           sx={{ fontWeight: 500 }}
//                         />
//                       </TableCell>
//                       <TableCell align="right">
//                         <Tooltip title="Edit Appointment">
//                           <IconButton
//                             size="small"
//                             onClick={() => handleEditAppointment(appointment.id)}
//                           >
//                             <Edit fontSize="small" />
//                           </IconButton>
//                         </Tooltip>
//                       </TableCell>
//                     </TableRow>
//                   ))
//               )}
//             </TableBody>
//           </Table>
//         </TableContainer>

//         <TablePagination
//           rowsPerPageOptions={[5, 10, 25]}
//           component="div"
//           count={appointments.length}
//           rowsPerPage={rowsPerPage}
//           page={page}
//           onPageChange={handleChangePage}
//           onRowsPerPageChange={handleChangeRowsPerPage}
//           sx={{ borderTop: '1px solid rgba(224, 224, 224, 1)' }}
//         />
//       </CardContent>
//     </Card>
//   );
// };

// export default AppointmentsTable;





import React, { useState } from 'react';
import {
  Card,
  CardContent,
  Typography,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Avatar,
  Chip,
  Box,
  Skeleton,
  TablePagination,
  IconButton,
  Tooltip,
  useTheme
} from '@mui/material';
import {
  CheckCircle,
  Pending,
  Cancel,
  AccessTime,
  Edit,
  ArrowForward
} from '@mui/icons-material';

const statusConfig = {
  confirmed: {
    icon: <CheckCircle color="success" fontSize="small" />,
    color: 'success',
    label: 'Confirmed'
  },
  pending: {
    icon: <Pending color="warning" fontSize="small" />,
    color: 'warning',
    label: 'Pending'
  },
  cancelled: {
    icon: <Cancel color="error" fontSize="small" />,
    color: 'error',
    label: 'Cancelled'
  }
};

const AppointmentsTable = ({ appointments = [], loading }) => {
  console.log("appointments",appointments)
  const theme = useTheme();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Card sx={{ 
      height: '100%',
      borderRadius: 3,
      boxShadow: '0 6px 20px rgba(0, 0, 0, 0.08)',
      background: theme.palette.mode === 'dark'
        ? 'linear-gradient(135deg, #2C3E50 0%, #1A1A1A 100%)'
        : '#FFFFFF'
    }}>
      <CardContent sx={{ p: 0 }}>
        <Box sx={{ p: 3 }}>
          <Typography 
            variant="h6" 
            sx={{ 
              fontWeight: 700,
              color: theme.palette.text.primary
            }}
          >
            Today's Appointments
          </Typography>
          <Divider sx={{ 
            mt: 2,
            borderColor: theme.palette.mode === 'dark' 
              ? 'rgba(255, 255, 255, 0.12)' 
              : 'rgba(0, 0, 0, 0.12)'
          }} />
        </Box>
        
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow sx={{
                backgroundColor: theme.palette.mode === 'dark'
                  ? 'rgba(255, 255, 255, 0.05)'
                  : 'rgba(63, 81, 181, 0.05)'
              }}>
                <TableCell sx={{ 
                  fontWeight: 600,
                  color: theme.palette.text.secondary
                }}>Patient</TableCell>
                <TableCell sx={{ 
                  fontWeight: 600,
                  color: theme.palette.text.secondary
                }}>Time</TableCell>
                <TableCell sx={{ 
                  fontWeight: 600,
                  color: theme.palette.text.secondary
                }}>Service</TableCell>
                <TableCell sx={{ 
                  fontWeight: 600,
                  color: theme.palette.text.secondary
                }}>Status</TableCell>
                <TableCell align="right" sx={{ 
                  fontWeight: 600,
                  color: theme.palette.text.secondary
                }}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {loading ? (
                Array.from({ length: rowsPerPage }).map((_, index) => (
                  <TableRow key={`skeleton-${index}`}>
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Skeleton 
                          variant="circular" 
                          width={40} 
                          height={40} 
                          sx={{ 
                            bgcolor: theme.palette.mode === 'dark' ? '#444' : '#eee' 
                          }} 
                        />
                        <Skeleton 
                          variant="text" 
                          width={100} 
                          sx={{ 
                            ml: 2,
                            bgcolor: theme.palette.mode === 'dark' ? '#444' : '#eee'
                          }} 
                        />
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Skeleton 
                        variant="text" 
                        sx={{ 
                          bgcolor: theme.palette.mode === 'dark' ? '#444' : '#eee'
                        }} 
                      />
                    </TableCell>
                    <TableCell>
                      <Skeleton 
                        variant="text" 
                        sx={{ 
                          bgcolor: theme.palette.mode === 'dark' ? '#444' : '#eee'
                        }} 
                      />
                    </TableCell>
                    <TableCell>
                      <Skeleton 
                        variant="text" 
                        width={80}
                        sx={{ 
                          bgcolor: theme.palette.mode === 'dark' ? '#444' : '#eee'
                        }} 
                      />
                    </TableCell>
                    <TableCell align="right">
                      <Skeleton 
                        variant="circular" 
                        width={32} 
                        height={32}
                        sx={{ 
                          bgcolor: theme.palette.mode === 'dark' ? '#444' : '#eee'
                        }} 
                      />
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                appointments
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((appointment) => (
                    <TableRow 
                      key={appointment.id} 
                      hover
                      sx={{
                        '&:last-child td': { borderBottom: 0 },
                        '&:hover': {
                          backgroundColor: theme.palette.mode === 'dark'
                            ? 'rgba(255, 255, 255, 0.03)'
                            : 'rgba(63, 81, 181, 0.03)'
                        }
                      }}
                    >
                      <TableCell>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <Avatar 
                            src={appointment.patient.avatar}
                            sx={{ 
                              width: 40, 
                              height: 40,
                              mr: 2,
                              bgcolor: theme.palette.primary.light,
                              color: theme.palette.primary.contrastText
                            }}
                          >
                            {appointment.patient.name.charAt(0)}
                          </Avatar>
                          <Box>
                            <Typography 
                              sx={{ 
                                fontWeight: 500,
                                color: theme.palette.text.primary
                              }}
                            >
                              {appointment.patient.name}
                            </Typography>
                            <Typography 
                              variant="body2" 
                              sx={{ 
                                color: theme.palette.text.secondary
                              }}
                            >
                              {appointment.patient.id}
                            </Typography>
                          </Box>
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <AccessTime 
                            sx={{ 
                              mr: 1, 
                              color: theme.palette.text.secondary
                            }} 
                          />
                          <Typography
                            sx={{
                              color: theme.palette.text.primary
                            }}
                          >
                            {new Date(appointment.time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </Typography>
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Chip 
                          label={appointment.service} 
                          size="small" 
                          variant="outlined"
                          sx={{
                            borderColor: theme.palette.mode === 'dark'
                              ? 'rgba(255, 255, 255, 0.3)'
                              : 'rgba(0, 0, 0, 0.2)',
                            color: theme.palette.text.primary
                          }}
                        />
                      </TableCell>
                      <TableCell>
                        <Chip
                          label={statusConfig[appointment.status].label}
                          size="small"
                          icon={statusConfig[appointment.status].icon}
                          color={statusConfig[appointment.status].color}
                          sx={{ 
                            fontWeight: 500,
                            color: 'white'
                          }}
                        />
                      </TableCell>
                      <TableCell align="right">
                        <Tooltip title="View Details">
                          <IconButton 
                            size="small"
                            sx={{
                              color: theme.palette.primary.main,
                              '&:hover': {
                                backgroundColor: theme.palette.primary.light
                              }
                            }}
                          >
                            <ArrowForward fontSize="small" />
                          </IconButton>
                        </Tooltip>
                      </TableCell>
                    </TableRow>
                  ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
        
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={appointments.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          sx={{ 
            borderTop: theme.palette.mode === 'dark'
              ? '1px solid rgba(255, 255, 255, 0.12)'
              : '1px solid rgba(0, 0, 0, 0.12)',
            color: theme.palette.text.secondary
          }}
        />
      </CardContent>
    </Card>
  );
};

export default AppointmentsTable;