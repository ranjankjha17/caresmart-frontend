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
  Tooltip
} from '@mui/material';
import {
  CheckCircle,
  Pending,
  Cancel,
  AccessTime,
  Edit
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

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
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const navigate = useNavigate();

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleEditAppointment = (appointmentId) => {
    navigate(`/appointments/${appointmentId}/edit`);
  };

  return (
    <Card sx={{ 
      height: '100%',
      borderRadius: 2,
      boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.05)'
    }}>
      <CardContent>
        <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
          Appointments
        </Typography>
        <Divider sx={{ mb: 2 }} />
        
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: 600 }}>Patient</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Time</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Service</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Status</TableCell>
                <TableCell sx={{ fontWeight: 600 }} align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {loading ? (
                Array.from({ length: rowsPerPage }).map((_, index) => (
                  <TableRow key={`skeleton-${index}`}>
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Skeleton variant="circular" width={40} height={40} />
                        <Skeleton variant="text" width={100} sx={{ ml: 2 }} />
                      </Box>
                    </TableCell>
                    <TableCell><Skeleton variant="text" /></TableCell>
                    <TableCell><Skeleton variant="text" /></TableCell>
                    <TableCell><Skeleton variant="text" width={80} /></TableCell>
                    <TableCell align="right"><Skeleton variant="text" width={50} /></TableCell>
                  </TableRow>
                ))
              ) : (
                appointments
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((appointment) => (
                    <TableRow key={appointment.id} hover>
                      <TableCell>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <Avatar 
                            src={appointment.patient.avatar}
                            sx={{ 
                              width: 40, 
                              height: 40,
                              mr: 2,
                              bgcolor: 'primary.light',
                              color: 'primary.contrastText'
                            }}
                          >
                            {appointment.patient.name.charAt(0)}
                          </Avatar>
                          <Box>
                            <Typography sx={{ fontWeight: 500 }}>
                              {appointment.patient.name}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              {appointment.patient.id}
                            </Typography>
                          </Box>
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <AccessTime sx={{ mr: 1, color: 'text.secondary' }} />
                          {new Date(appointment.time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Chip 
                          label={appointment.service} 
                          size="small" 
                          variant="outlined"
                        />
                      </TableCell>
                      <TableCell>
                        <Chip
                          label={statusConfig[appointment.status].label}
                          size="small"
                          icon={statusConfig[appointment.status].icon}
                          color={statusConfig[appointment.status].color}
                          sx={{ fontWeight: 500 }}
                        />
                      </TableCell>
                      <TableCell align="right">
                        <Tooltip title="Edit Appointment">
                          <IconButton 
                            size="small"
                            onClick={() => handleEditAppointment(appointment.id)}
                          >
                            <Edit fontSize="small" />
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
          sx={{ borderTop: '1px solid rgba(224, 224, 224, 1)' }}
        />
      </CardContent>
    </Card>
  );
};

export default AppointmentsTable;