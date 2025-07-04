// import React, { useState } from 'react';
// import { IconButton, Box, Tooltip, Menu, MenuItem } from '@mui/material';
// import { Visibility, EditNote, AddComment, MoreVert } from '@mui/icons-material';

// const PatientActions = ({ patient, isMobile, onViewDetails, onUpdateVitals, onAddNotes }) => {
//   const [anchorEl, setAnchorEl] = useState(null);

//   const handleMenuOpen = (event) => {
//     setAnchorEl(event.currentTarget);
//   };

//   const handleMenuClose = () => {
//     setAnchorEl(null);
//   };

//   if (isMobile) {
//     return (
//       <>
//         <IconButton size="small" onClick={handleMenuOpen}>
//           <MoreVert />
//         </IconButton>
//         <Menu
//           anchorEl={anchorEl}
//           open={Boolean(anchorEl)}
//           onClose={handleMenuClose}
//         >
//           <MenuItem onClick={() => {
//             onViewDetails(patient._id);
//             handleMenuClose();
//           }}>
//             <Visibility fontSize="small" sx={{ mr: 1 }} /> View Details
//           </MenuItem>
//           <MenuItem onClick={() => {
//             onUpdateVitals(patient);
//             handleMenuClose();
//           }}>
//             <EditNote fontSize="small" sx={{ mr: 1 }} /> Update Vitals
//           </MenuItem>
//           <MenuItem onClick={() => {
//             onAddNotes(patient._id);
//             handleMenuClose();
//           }}>
//             <AddComment fontSize="small" sx={{ mr: 1 }} /> Add Notes
//           </MenuItem>
//         </Menu>
//       </>
//     );
//   }

//   return (
//     <Box sx={{ display: 'flex', gap: 1 }}>
//       <Tooltip title="View Details">
//         <IconButton 
//           color="info" 
//           size="small" 
//           onClick={() => onViewDetails(patient._id)}
//           sx={{ 
//             backgroundColor: 'info.light',
//             '&:hover': { backgroundColor: 'info.main', color: 'white' }
//           }}
//         >
//           <Visibility fontSize="small" />
//         </IconButton>
//       </Tooltip>
//       <Tooltip title="Update Vitals">
//         <IconButton 
//           color="success" 
//           size="small" 
//           onClick={() => onUpdateVitals(patient)}
//           sx={{ 
//             backgroundColor: 'success.light',
//             '&:hover': { backgroundColor: 'success.main', color: 'white' }
//           }}
//         >
//           <EditNote fontSize="small" />
//         </IconButton>
//       </Tooltip>
//       <Tooltip title="Add Notes">
//         <IconButton 
//           color="primary" 
//           size="small" 
//           onClick={() => onAddNotes(patient._id)}
//           sx={{ 
//             backgroundColor: 'primary.light',
//             '&:hover': { backgroundColor: 'primary.main', color: 'white' }
//           }}
//         >
//           <AddComment fontSize="small" />
//         </IconButton>
//       </Tooltip>
//     </Box>
//   );
// };

// export default PatientActions;





import React from 'react';
import { IconButton, Box, Tooltip, Button } from '@mui/material';
import { Visibility, EditNote, AddComment } from '@mui/icons-material';

const PatientActions = ({ patient, isMobile, onViewDetails, onUpdateVitals, onAddNotes }) => {
  if (isMobile) {
    return (
      <Box sx={{ display: 'flex', gap: 1, mt: 1 }}>
        <Button
          variant="outlined"
          size="small"
          startIcon={<Visibility />}
          onClick={() => onViewDetails(patient._id)}
          fullWidth
        >
          View
        </Button>
        <Button
          variant="outlined"
          size="small"
          startIcon={<EditNote />}
          onClick={() => onUpdateVitals(patient)}
          fullWidth
        >
          Vitals
        </Button>
        <Button
          variant="outlined"
          size="small"
          startIcon={<AddComment />}
          onClick={() => onAddNotes(patient._id)}
          fullWidth
        >
          Notes
        </Button>
      </Box>
    );
  }

  return (
    <Box sx={{ display: 'flex', gap: 1 }}>
      <Tooltip title="View Details">
        <IconButton 
          color="info" 
          size="small" 
          onClick={() => onViewDetails(patient._id)}
          sx={{ 
            backgroundColor: 'info.light',
            '&:hover': { backgroundColor: 'info.main', color: 'white' }
          }}
        >
          <Visibility fontSize="small" />
        </IconButton>
      </Tooltip>
      <Tooltip title="Update Vitals">
        <IconButton 
          color="success" 
          size="small" 
          onClick={() => onUpdateVitals(patient)}
          sx={{ 
            backgroundColor: 'success.light',
            '&:hover': { backgroundColor: 'success.main', color: 'white' }
          }}
        >
          <EditNote fontSize="small" />
        </IconButton>
      </Tooltip>
      <Tooltip title="Add Notes">
        <IconButton 
          color="primary" 
          size="small" 
          onClick={() => onAddNotes(patient._id)}
          sx={{ 
            backgroundColor: 'primary.light',
            '&:hover': { backgroundColor: 'primary.main', color: 'white' }
          }}
        >
          <AddComment fontSize="small" />
        </IconButton>
      </Tooltip>
    </Box>
  );
};

export default PatientActions;