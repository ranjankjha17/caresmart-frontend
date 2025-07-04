// import React, { useState } from 'react';
// import { Box, useTheme, useMediaQuery, CircularProgress, Alert, Snackbar } from '@mui/material';
// import PatientSearchHeader from '../patients/PatientSearchHeader';
// import PatientTable from '../patients/PatientTable';
// import PatientDetailsDialog from '../patients/PatientDetailsDialog';
// import UpdateVitalsDialog from '../patients/UpdateVitalsDialog';
// import usePatients from '../../hooks/usePatients';

// const MyPatientForm = () => {
//   const theme = useTheme();
//   const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  
//   const [snackbarOpen, setSnackbarOpen] = useState(false);
//   const [snackbarMessage, setSnackbarMessage] = useState('');
//   const [viewDetailsOpen, setViewDetailsOpen] = useState(false);
//   const [updateVitalsOpen, setUpdateVitalsOpen] = useState(false);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [vitalsData, setVitalsData] = useState({
//     bloodPressure: '',
//     temperature: '',
//     pulse: '',
//     oxygenLevel: ''
//   });

//   const {
//     patients,
//     loading,
//     error,
//     refreshPatients,
//     updatePatient,
//     selectedPatient,
//     setSelectedPatient,
//     fetchPatientById
//   } = usePatients();

//   const filteredPatients = patients.filter(patient =>
//     patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//     patient.patientId.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   const handleCloseSnackbar = () => setSnackbarOpen(false);

//   const handleAddNotes = async (patientId) => {
//     try {
//       const note = prompt('Enter your note:');
//       if (note) {
//         await addPatientNote(patientId, note);
//         await refreshPatients();
//         showSnackbar('Note added successfully');
//       }
//     } catch (err) {
//       showSnackbar('Failed to add note');
//     }
//   };

//   const showSnackbar = (message) => {
//     setSnackbarMessage(message);
//     setSnackbarOpen(true);
//   };

//   const handleOpenUpdateVitals = (patient) => {
//     setSelectedPatient(patient);
//     setVitalsData({
//       bloodPressure: patient.vitalSigns?.bloodPressure || '',
//       temperature: patient.vitalSigns?.temperature || '',
//       oxygenLevel: patient.vitalSigns?.oxygenLevel || '',
//       pulse: patient.vitalSigns?.pulse || ''
//     });
//     setUpdateVitalsOpen(true);
//   };

//   const handleSubmitVitals = async () => {
//     try {
//       await updatePatient(selectedPatient._id, vitalsData);
//       await refreshPatients();
//       showSnackbar('Vitals updated successfully');
//       setUpdateVitalsOpen(false);
//     } catch (err) {
//       showSnackbar('Failed to update vitals');
//     }
//   };

//   const handleViewDetails = async (patientId) => {
//     try {
//       const patient = await fetchPatientById(patientId);
//       setSelectedPatient(patient);
//       setViewDetailsOpen(true);
//     } catch (err) {
//       showSnackbar('Failed to load patient details');
//     }
//   };

//   if (loading) {
//     return (
//       <Box display='flex' justifyContent='center' alignItems='center' minHeight={'200px'}>
//         <CircularProgress />
//       </Box>
//     );
//   }

//   if (error) {
//     return (
//       <Alert severity='error' sx={{ margin: 2 }}>
//         Error loading patients: {error}
//       </Alert>
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

//       <PatientSearchHeader 
//         searchTerm={searchTerm}
//         onSearchChange={setSearchTerm}
//         patientCount={patients.length}
//       />

//       <PatientTable
//         patients={filteredPatients}
//         isMobile={isMobile}
//         onViewDetails={handleViewDetails}
//         onUpdateVitals={handleOpenUpdateVitals}
//         onAddNotes={handleAddNotes}
//       />

//       <PatientDetailsDialog
//         open={viewDetailsOpen}
//         onClose={() => setViewDetailsOpen(false)}
//         patient={selectedPatient}
//         onUpdateVitals={() => {
//           setViewDetailsOpen(false);
//           handleOpenUpdateVitals(selectedPatient);
//         }}
//       />

//       <UpdateVitalsDialog
//         open={updateVitalsOpen}
//         onClose={() => setUpdateVitalsOpen(false)}
//         vitalsData={vitalsData}
//         onVitalsChange={(e) => {
//           const { name, value } = e.target;
//           setVitalsData(prev => ({ ...prev, [name]: value }));
//         }}
//         onSubmit={handleSubmitVitals}
//         patientName={selectedPatient?.name}
//       />
//     </Box>
//   );
// };

// export default MyPatientForm;



import React, { useState } from 'react';
import { Box, useTheme, useMediaQuery, CircularProgress, Alert, Snackbar, Dialog } from '@mui/material';
import usePatients from '../../hooks/usePatients';
import { addPatientNote } from '../../services/patientService';
import PatientSearchHeader from '../patients/PatientSearchHeader';
import PatientTable from '../patients/PatientTable';
import PatientDetailsDialog from '../patients/PatientDetailsDialog';
import UpdateVitalsDialog from '../patients/UpdateVitalsDialog';
import MobilePatientDetails from '../patients/MobilePatientDetails';

const MyPatientForm = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [viewDetailsOpen, setViewDetailsOpen] = useState(false);
  const [updateVitalsOpen, setUpdateVitalsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [vitalsData, setVitalsData] = useState({
    bloodPressure: '',
    temperature: '',
    pulse: '',
    oxygenLevel: ''
  });
  const [mobileSelectedPatient, setMobileSelectedPatient] = useState(null);

  const {
    patients,
    loading,
    error,
    refreshPatients,
    updatePatient,
    selectedPatient,
    setSelectedPatient,
    fetchPatientById
  } = usePatients();

  const filteredPatients = patients.filter(patient =>
    patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.patientId.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCloseSnackbar = () => setSnackbarOpen(false);

  const showSnackbar = (message) => {
    setSnackbarMessage(message);
    setSnackbarOpen(true);
  };

  const handleAddNotes = async (patientId) => {
    try {
      const note = prompt('Enter your note:');
      if (note) {
        await addPatientNote(patientId, note);
        await refreshPatients();
        showSnackbar('Note added successfully');
      }
    } catch (err) {
      showSnackbar('Failed to add note');
    }
  };

  const handleOpenUpdateVitals = (patient) => {
    setSelectedPatient(patient);
    setVitalsData({
      bloodPressure: patient.vitalSigns?.bloodPressure || '',
      temperature: patient.vitalSigns?.temperature || '',
      oxygenLevel: patient.vitalSigns?.oxygenLevel || '',
      pulse: patient.vitalSigns?.pulse || ''
    });
    setUpdateVitalsOpen(true);
  };

  const handleSubmitVitals = async () => {
    try {
      await updatePatient(selectedPatient._id, vitalsData);
      await refreshPatients();
      showSnackbar('Vitals updated successfully');
      setUpdateVitalsOpen(false);
    } catch (err) {
      showSnackbar('Failed to update vitals');
    }
  };

  const handleViewDetails = async (patientId) => {
    try {
      const patient = await fetchPatientById(patientId);
      if (isMobile) {
        setMobileSelectedPatient(patient);
      } else {
        setSelectedPatient(patient);
        setViewDetailsOpen(true);
      }
    } catch (err) {
      showSnackbar('Failed to load patient details');
    }
  };

  const handleCloseMobileDetails = () => {
    setMobileSelectedPatient(null);
  };

  if (loading) {
    return (
      <Box display='flex' justifyContent='center' alignItems='center' minHeight={'200px'}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Alert severity='error' sx={{ margin: 2 }}>
        Error loading patients: {error}
      </Alert>
    );
  }

  return (
    <Box sx={{ p: isMobile ? 0 : 3 }}>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>

      <PatientSearchHeader 
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        patientCount={patients.length}
      />

      <PatientTable
        patients={filteredPatients}
        isMobile={isMobile}
        onViewDetails={handleViewDetails}
        onUpdateVitals={handleOpenUpdateVitals}
        onAddNotes={handleAddNotes}
      />

      {isMobile ? (
        <Dialog
          fullScreen
          open={Boolean(mobileSelectedPatient)}
          onClose={handleCloseMobileDetails}
        >
          {mobileSelectedPatient && (
            <MobilePatientDetails
              patient={mobileSelectedPatient}
              onClose={handleCloseMobileDetails}
              onUpdateVitals={() => {
                handleCloseMobileDetails();
                handleOpenUpdateVitals(mobileSelectedPatient);
              }}
            />
          )}
        </Dialog>
      ) : (
        <PatientDetailsDialog
          open={viewDetailsOpen}
          onClose={() => setViewDetailsOpen(false)}
          patient={selectedPatient}
          onUpdateVitals={() => {
            setViewDetailsOpen(false);
            handleOpenUpdateVitals(selectedPatient);
          }}
        />
      )}

      <UpdateVitalsDialog
        open={updateVitalsOpen}
        onClose={() => setUpdateVitalsOpen(false)}
        vitalsData={vitalsData}
        onVitalsChange={(e) => {
          const { name, value } = e.target;
          setVitalsData(prev => ({ ...prev, [name]: value }));
        }}
        onSubmit={handleSubmitVitals}
        patientName={selectedPatient?.name}
      />
    </Box>
  );
};

export default MyPatientForm;