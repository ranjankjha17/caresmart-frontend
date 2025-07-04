// import React from 'react';
// import {
//   Paper,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Avatar,
//   Chip,
//   Typography,
//   Box,
//   TablePagination,
//   useTheme
// } from '@mui/material';
// import { CalendarToday, LocalHospital } from '@mui/icons-material';
// import PatientActions from './PatientActions';

// const PatientTable = ({ patients, isMobile, onViewDetails, onUpdateVitals, onAddNotes }) => {
//   const theme = useTheme();
//   const [page, setPage] = React.useState(0);
//   const [rowsPerPage, setRowsPerPage] = React.useState(10);

//   const handleChangePage = (event, newPage) => {
//     setPage(newPage);
//   };

//   const handleChangeRowsPerPage = (event) => {
//     setRowsPerPage(parseInt(event.target.value, 10));
//     setPage(0);
//   };

//   return (
//     <Paper elevation={3} sx={{ borderRadius: 2, overflow: 'hidden' }}>
//       <TableContainer sx={{ maxHeight: 'calc(100vh - 200px)' }}>
//         <Table stickyHeader>
//           <TableHead sx={{ bgcolor: 'grey.100' }}>
//             <TableRow>
//               <TableCell sx={{ fontWeight: 'bold' }}>Patient ID</TableCell>
//               <TableCell sx={{ fontWeight: 'bold' }}>Name</TableCell>
//               {!isMobile && (
//                 <>
//                   <TableCell sx={{ fontWeight: 'bold' }}>Age/Gender</TableCell>
//                   <TableCell sx={{ fontWeight: 'bold' }}>Room/Ward</TableCell>
//                   <TableCell sx={{ fontWeight: 'bold' }}>Diagnosis</TableCell>
//                 </>
//               )}
//               <TableCell sx={{ fontWeight: 'bold' }}>Next Checkup</TableCell>
//               <TableCell sx={{ fontWeight: 'bold' }}>Actions</TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {patients.length === 0 ? (
//               <TableRow>
//                 <TableCell colSpan={isMobile ? 3 : 6} align='center' sx={{ py: 4 }}>
//                   <Typography variant='body1' color='textSecondary'>
//                     No Patients Found
//                   </Typography>
//                 </TableCell>
//               </TableRow>
//             ) : (
//               patients
//                 .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
//                 .map((patient) => (
//                   <TableRow key={patient._id} hover>
//                     <TableCell>
//                       <Chip 
//                         label={patient.patientId} 
//                         size="small" 
//                         color="primary"
//                         variant="outlined"
//                         sx={{ fontWeight: 'bold' }}
//                       />
//                     </TableCell>
//                     <TableCell>
//                       <Box sx={{ display: 'flex', alignItems: 'center' }}>
//                         <Avatar sx={{ 
//                           width: 40, 
//                           height: 40, 
//                           mr: 1,
//                           bgcolor: 'primary.light'
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
//                             <Typography sx={{ ml: 1 }}>
//                               {patient.age} yrs / {patient.gender}
//                             </Typography>
//                           </Box>
//                         </TableCell>
//                         <TableCell>
//                           <Chip 
//                             label={patient.room} 
//                             size="small" 
//                             icon={<LocalHospital fontSize="small" />}
//                             color="secondary"
//                           />
//                         </TableCell>
//                         <TableCell>
//                           <Typography variant="body2" noWrap sx={{ maxWidth: 150 }}>
//                             {patient.diagnosis}
//                           </Typography>
//                         </TableCell>
//                       </>
//                     )}
//                     <TableCell>
//                       <Box sx={{ 
//                         display: 'flex', 
//                         alignItems: 'center',
//                         backgroundColor: 'warning.light',
//                         p: 1,
//                         borderRadius: 1,
//                         color: theme.palette.getContrastText(theme.palette.warning.light)
//                       }}>
//                         <CalendarToday fontSize="small" sx={{ mr: 0.5 }} />
//                         {patient.nextCheckup}
//                       </Box>
//                     </TableCell>
//                     <TableCell>
//                       <PatientActions
//                         patient={patient}
//                         isMobile={isMobile}
//                         onViewDetails={onViewDetails}
//                         onUpdateVitals={onUpdateVitals}
//                         onAddNotes={onAddNotes}
//                       />
//                     </TableCell>
//                   </TableRow>
//                 ))
//             )}
//           </TableBody>
//         </Table>
//       </TableContainer>
//       <TablePagination
//         rowsPerPageOptions={[5, 10, 25]}
//         component="div"
//         count={patients.length}
//         rowsPerPage={rowsPerPage}
//         page={page}
//         onPageChange={handleChangePage}
//         onRowsPerPageChange={handleChangeRowsPerPage}
//         sx={{
//           borderTop: `1px solid ${theme.palette.divider}`,
//           backgroundColor: 'grey.100'
//         }}
//       />
//     </Paper>
//   );
// };

// export default PatientTable;




import React, { useState } from 'react';
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Avatar,
  Chip,
  Typography,
  Box,
  TablePagination,
  useTheme,
  Collapse,
  Grid,
  IconButton
} from '@mui/material';
import { CalendarToday, LocalHospital, KeyboardArrowDown, KeyboardArrowUp } from '@mui/icons-material';
import PatientActions from './PatientActions';
import dayjs from 'dayjs';

const PatientTableRow = ({ patient, isMobile, onViewDetails, onUpdateVitals, onAddNotes }) => {
  const [open, setOpen] = useState(false);
  const theme = useTheme();

  if (isMobile) {
    return (
      <>
        <TableRow hover onClick={() => setOpen(!open)}>
          <TableCell>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Avatar sx={{ 
                width: 40, 
                height: 40, 
                mr: 1,
                bgcolor: 'primary.light'
              }}>
                {patient.name.charAt(0)}
              </Avatar>
              <Box>
                <Typography variant="subtitle2">{patient.name.split(' ')[0]}</Typography>
                <Typography variant="caption" color="textSecondary">
                  ID: {patient.patientId}
                </Typography>
              </Box>
            </Box>
          </TableCell>
          <TableCell>
            <Box sx={{ 
              display: 'flex', 
              alignItems: 'center',
              backgroundColor: 'warning.light',
              p: 1,
              borderRadius: 1,
              color: theme.palette.getContrastText(theme.palette.warning.light)
            }}>
              <CalendarToday fontSize="small" sx={{ mr: 0.5 }} />
              {/* {patient.nextCheckup.split(' ')[1]} */}
              {dayjs(patient.nextCheckup).format('YYYY-MM-DD hh:mm A')}

            </Box>
          </TableCell>
          <TableCell>
            <IconButton
              size="small"
              onClick={(e) => {
                e.stopPropagation();
                setOpen(!open);
              }}
            >
              {open ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
            </IconButton>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={3}>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <Box sx={{ margin: 1, p: 2, backgroundColor: 'grey.50', borderRadius: 2 }}>
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <Typography variant="subtitle2">Age/Gender</Typography>
                    <Typography>{patient.age} yrs / {patient.gender}</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="subtitle2">Room/Ward</Typography>
                    <Typography>
                      <Chip 
                        label={patient.room} 
                        size="small" 
                        icon={<LocalHospital fontSize="small" />}
                        color="secondary"
                      />
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant="subtitle2">Diagnosis</Typography>
                    <Typography>{patient.diagnosis}</Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant="subtitle2">Doctor</Typography>
                    <Typography>{patient.doctor}</Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <PatientActions
                      patient={patient}
                      isMobile={isMobile}
                      onViewDetails={onViewDetails}
                      onUpdateVitals={onUpdateVitals}
                      onAddNotes={onAddNotes}
                    />
                  </Grid>
                </Grid>
              </Box>
            </Collapse>
          </TableCell>
        </TableRow>
      </>
    );
  }

  return (
    <TableRow hover>
      <TableCell>
        <Chip 
          label={patient.patientId} 
          size="small" 
          color="primary"
          variant="outlined"
          sx={{ fontWeight: 'bold' }}
        />
      </TableCell>
      <TableCell>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Avatar sx={{ 
            width: 40, 
            height: 40, 
            mr: 1,
            bgcolor: 'primary.light'
          }}>
            {patient.name.charAt(0)}
          </Avatar>
          {patient.name}
        </Box>
      </TableCell>
      <TableCell>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Typography>
            {patient.age} yrs / {patient.gender}
          </Typography>
        </Box>
      </TableCell>
      <TableCell>
        <Chip 
          label={patient.room} 
          size="small" 
          icon={<LocalHospital fontSize="small" />}
          color="secondary"
        />
      </TableCell>
      <TableCell>
        <Typography variant="body2" noWrap sx={{ maxWidth: 150 }}>
          {patient.diagnosis}
        </Typography>
      </TableCell>
      <TableCell>
        <Box sx={{ 
          display: 'flex', 
          alignItems: 'center',
          backgroundColor: 'light',
          p: 1,
          borderRadius: 1,
          color: theme.palette.getContrastText(theme.palette.warning.light)
        }}>
          <CalendarToday fontSize="small" sx={{ mr: 0.5 }} />
          {/* {patient.nextCheckup} */}
          {dayjs(patient.nextCheckup).format('YYYY-MM-DD hh:mm A')}

        </Box>
      </TableCell>
      <TableCell>
        <PatientActions
          patient={patient}
          isMobile={isMobile}
          onViewDetails={onViewDetails}
          onUpdateVitals={onUpdateVitals}
          onAddNotes={onAddNotes}
        />
      </TableCell>
    </TableRow>
  );
};

const PatientTable = ({ patients, isMobile, onViewDetails, onUpdateVitals, onAddNotes }) => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const theme = useTheme();

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Paper elevation={3} sx={{ borderRadius: 2, overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: 'calc(100vh - 200px)' }}>
        <Table stickyHeader>
          <TableHead sx={{ bgcolor: 'grey.100' }}>
            <TableRow>
              {isMobile ? (
                <>
                  <TableCell sx={{ fontWeight: 'bold' }}>Patient</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>Checkup</TableCell>
                  <TableCell />
                </>
              ) : (
                <>
                  <TableCell sx={{ fontWeight: 'bold' }}>Patient ID</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>Name</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>Age/Gender</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>Room/Ward</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>Diagnosis</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>Next Checkup</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>Actions</TableCell>
                </>
              )}
            </TableRow>
          </TableHead>
          <TableBody>
            {patients.length === 0 ? (
              <TableRow>
                <TableCell colSpan={isMobile ? 3 : 7} align='center' sx={{ py: 4 }}>
                  <Typography variant='body1' color='textSecondary'>
                    No Patients Found
                  </Typography>
                </TableCell>
              </TableRow>
            ) : (
              patients
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((patient) => (
                  <PatientTableRow
                    key={patient._id}
                    patient={patient}
                    isMobile={isMobile}
                    onViewDetails={onViewDetails}
                    onUpdateVitals={onUpdateVitals}
                    onAddNotes={onAddNotes}
                  />
                ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={patients.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        sx={{
          borderTop: `1px solid ${theme.palette.divider}`,
          backgroundColor: 'grey.100'
        }}
      />
    </Paper>
  );
};

export default PatientTable;