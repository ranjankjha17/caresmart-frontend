// import React from 'react';
// import { Box, TextField, Typography, Chip, InputAdornment } from '@mui/material';
// import { MedicalInformation, Search } from '@mui/icons-material';

// const PatientSearchHeader = ({ searchTerm, onSearchChange, patientCount }) => {
//   return (
//     <Box sx={{
//       bgcolor: 'primary.main',
//       color: 'white',
//       p: 2,
//       mb: 2,
//       borderRadius: 1,
//       display: 'flex',
//       flexDirection: { xs: 'column', sm: 'row' },
//       alignItems: 'center',
//       justifyContent: 'space-between',
//       gap: 2
//     }}>
//       <Box sx={{ display: 'flex', alignItems: 'center' }}>
//         <MedicalInformation sx={{ mr: 1.5, fontSize: { xs: '1.5rem', sm: '2rem' } }} />
//         <Typography variant="h5" fontWeight="bold">
//           My Patients
//         </Typography>
//         <Chip 
//           label={`${patientCount} Patients`} 
//           color="secondary" 
//           size="small" 
//           sx={{ ml: 2, color: 'white', fontWeight: 'bold' }} 
//         />
//       </Box>
//       <TextField
//         size="small"
//         placeholder="Search patients..."
//         variant="outlined"
//         value={searchTerm}
//         onChange={(e) => onSearchChange(e.target.value)}
//         InputProps={{
//           startAdornment: (
//             <InputAdornment position="start">
//               <Search sx={{ color: 'white' }} />
//             </InputAdornment>
//           ),
//           sx: {
//             color: 'white',
//             '& .MuiOutlinedInput-notchedOutline': {
//               borderColor: 'rgba(255, 255, 255, 0.5)'
//             },
//             '&:hover .MuiOutlinedInput-notchedOutline': {
//               borderColor: 'white'
//             }
//           }
//         }}
//         sx={{
//           width: { xs: '100%', sm: 250 },
//           '& .MuiInputBase-input::placeholder': {
//             color: 'white',
//             opacity: 0.8
//           },
//           backgroundColor: 'rgba(255, 255, 255, 0.1)',
//           borderRadius: 1
//         }}
//       />
//     </Box>
//   );
// };

// export default PatientSearchHeader;



import React from 'react';
import { Box, TextField, Typography, Chip, InputAdornment } from '@mui/material';
import { MedicalInformation, Search } from '@mui/icons-material';

const PatientSearchHeader = ({ searchTerm, onSearchChange, patientCount }) => {
  return (
    <Box sx={{
      bgcolor: 'primary.main',
      color: 'white',
      p: 2,
      mb: 2,
      borderRadius: 1,
      display: 'flex',
      flexDirection: { xs: 'column', sm: 'row' },
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: 2
    }}>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <MedicalInformation sx={{ mr: 1.5, fontSize: { xs: '1.5rem', sm: '2rem' } }} />
        <Typography variant="h5" fontWeight="bold">
          My Patients
        </Typography>
        <Chip 
          label={`${patientCount} Patients`} 
          color="secondary" 
          size="small" 
          sx={{ ml: 2, color: 'white', fontWeight: 'bold' }} 
        />
      </Box>
      <TextField
        size="small"
        placeholder="Search patients..."
        variant="outlined"
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
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
          width: { xs: '100%', sm: 250 },
          '& .MuiInputBase-input::placeholder': {
            color: 'white',
            opacity: 0.8
          },
          backgroundColor: 'rgba(255, 255, 255, 0.1)',
          borderRadius: 1
        }}
      />
    </Box>
  );
};

export default PatientSearchHeader;