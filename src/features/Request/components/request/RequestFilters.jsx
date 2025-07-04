// import React from 'react';
// import {
//   Box,
//   FormControl,
//   InputLabel,
//   Select,
//   MenuItem
// } from '@mui/material';

// const RequestFilters = ({ 
//   filter, 
//   setFilter, 
//   priorityFilter, 
//   setPriorityFilter 
// }) => {
//   return (
//     <Box sx={{ display: 'flex', gap: 2 }}>
//       <FormControl size="small" sx={{ minWidth: 150 }}>
//         <InputLabel sx={{ color: 'text.primary' }}>Status</InputLabel>
//         <Select
//           value={filter}
//           onChange={(e) => setFilter(e.target.value)}
//           label="Status"
//           sx={{ 
//             color: 'text.primary',
//             '& .MuiSelect-icon': { color: 'text.primary' }
//           }}
//         >
//           <MenuItem value="All">All Statuses</MenuItem>
//           <MenuItem value="Pending">Pending</MenuItem>
//           <MenuItem value="Approved">Approved</MenuItem>
//           <MenuItem value="Rejected">Rejected</MenuItem>
//           <MenuItem value="Completed">Completed</MenuItem>
//         </Select>
//       </FormControl>
      
//       <FormControl size="small" sx={{ minWidth: 150 }}>
//         <InputLabel sx={{ color: 'text.primary' }}>Priority</InputLabel>
//         <Select
//           value={priorityFilter}
//           onChange={(e) => setPriorityFilter(e.target.value)}
//           label="Priority"
//           sx={{ 
//             color: 'text.primary',
//             '& .MuiSelect-icon': { color: 'text.primary' }
//           }}
//         >
//           <MenuItem value="All">All Priorities</MenuItem>
//           <MenuItem value="Low">Low</MenuItem>
//           <MenuItem value="Medium">Medium</MenuItem>
//           <MenuItem value="High">High</MenuItem>
//           <MenuItem value="Emergency">Emergency</MenuItem>
//         </Select>
//       </FormControl>
//     </Box>
//   );
// };

// export default RequestFilters;





import React from 'react';
import {
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from '@mui/material';

const RequestFilters = ({ 
  filter, 
  setFilter, 
  priorityFilter, 
  setPriorityFilter 
}) => {
  return (
    <Box sx={{ display: 'flex', gap: 2 }}>
      <FormControl size="small" sx={{ minWidth: 150 }}>
        <InputLabel sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>Status</InputLabel>
        <Select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          label="Status"
          sx={{ 
            color: 'white',
            '& .MuiSelect-icon': { color: 'white' },
            '& .MuiOutlinedInput-notchedOutline': {
              borderColor: 'rgba(255, 255, 255, 0.3)'
            },
            '&:hover .MuiOutlinedInput-notchedOutline': {
              borderColor: 'rgba(255, 255, 255, 0.5)'
            }
          }}
        >
          {['All', 'Pending', 'Approved', 'Rejected', 'Completed'].map((status) => (
            <MenuItem 
              key={status} 
              value={status}
              sx={{ color: '#333' }}
            >
              {status}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      
      <FormControl size="small" sx={{ minWidth: 150 }}>
        <InputLabel sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>Priority</InputLabel>
        <Select
          value={priorityFilter}
          onChange={(e) => setPriorityFilter(e.target.value)}
          label="Priority"
          sx={{ 
            color: 'white',
            '& .MuiSelect-icon': { color: 'white' },
            '& .MuiOutlinedInput-notchedOutline': {
              borderColor: 'rgba(255, 255, 255, 0.3)'
            },
            '&:hover .MuiOutlinedInput-notchedOutline': {
              borderColor: 'rgba(255, 255, 255, 0.5)'
            }
          }}
        >
          {['All', 'Low', 'Medium', 'High', 'Emergency'].map((priority) => (
            <MenuItem 
              key={priority} 
              value={priority}
              sx={{ color: '#333' }}
            >
              {priority}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};

export default RequestFilters;