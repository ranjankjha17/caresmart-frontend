// import {
//   Box,
//   Card,
//   CardContent,
//   Typography,
//   TextField,
//   Grid,
//   Table,
//   TableHead,
//   TableRow,
//   TableCell,
//   TableBody,
//   Button,
//   FormControl,
//   InputLabel,
//   Select,
//   MenuItem,
//   Paper,
// } from '@mui/material';
// import { TimePicker } from '@mui/x-date-pickers/TimePicker';
// import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
// import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// import dayjs from 'dayjs';
// import { useEffect, useState } from 'react';
// import {
//   getAvailabilityList,
//   saveAvailability,
//   updateAvailability,
// } from '../services/availabilityService';
// import { toast } from 'react-toastify';

// const daysOfWeek = [
//   'Monday',
//   'Tuesday',
//   'Wednesday',
//   'Thursday',
//   'Friday',
//   'Saturday',
//   'Sunday',
// ];

// export const Availability = () => {
//   const [formData, setFormData] = useState({
//     available24hr: 'No',
//     travelReady: 'Yes',
//     price: '',
//     schedule: daysOfWeek.map(() => ({
//       morning: null,
//       evening: null,
//     })),
//   });

//   const [availabilityId, setAvailabilityId] = useState(null);
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//   const fetchAvailability = async () => {
//     try {
//       const data = await getAvailabilityList();
//       console.log("Fetched data:", data[0]);

//       setAvailabilityId(data._id);

//       setFormData({
//         available24hr: data?.available24hr || 'No',
//         travelReady: data?.travelReady || 'Yes',
//         price: data?.price?.toString() || '',
//         schedule: daysOfWeek.map((_, i) => ({
//           morning: data?.schedule?.[i]?.morning ? dayjs(data.schedule[i].morning, 'HH:mm') : null,
//           evening: data?.schedule?.[i]?.evening ? dayjs(data.schedule[i].evening, 'HH:mm') : null,
//         })),
//       });
//     } catch (err) {
//       if (err.response?.status !== 404) {
//         console.error('Failed to load availability', err);
//       }
//     }
//   };

//   fetchAvailability();
// }, []);


//   const handleTimeChange = (index, period, newValue) => {
//     const updatedSchedule = [...formData.schedule];
//     updatedSchedule[index][period] = newValue;
//     setFormData({ ...formData, schedule: updatedSchedule });
//   };

//   const handleInputChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async () => {
//     setLoading(true);
//     try {
//       const payload = {
//         ...formData,
//         schedule: formData.schedule.map((day) => ({
//           morning: day.morning ? day.morning.format('HH:mm') : null,
//           evening: day.evening ? day.evening.format('HH:mm') : null,
//         })),
//       };

//       console.log("payload",payload)
//       if (availabilityId) {
//         await updateAvailability(payload);
//         toast.success('Availability updated successfully!');
//       } else {
//         await saveAvailability(payload);
//         toast.success('Availability saved successfully!');
//       }
//     } catch (error) {
//       toast.error(error.message || 'Failed to submit availability');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <LocalizationProvider dateAdapter={AdapterDayjs}>
//       <Box sx={{ p: 4, bgcolor: '#f9f9f9', minHeight: '100vh' }}>
//         <Grid container justifyContent="center">
//           <Grid item xs={12} md={10} lg={8}>
//             <Card elevation={3} sx={{ borderRadius: 3 }}>
//               <CardContent>
//                 <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', color: '#1565c0' }}>
//                   Availability Setup
//                 </Typography>

//                 <Grid container spacing={3} sx={{ mt: 1, mb: 3 }}>
//                   <Grid item xs={12} md={4}>
//                     <FormControl fullWidth>
//                       <InputLabel id="available24hr-label">24 Hour Availability</InputLabel>
//                       <Select
//                         labelId="available24hr-label"
//                         name="available24hr"
//                         value={formData.available24hr}
//                         label="24 Hour Availability"
//                         onChange={handleInputChange}
//                       >
//                         <MenuItem value="Yes">Yes</MenuItem>
//                         <MenuItem value="No">No</MenuItem>
//                       </Select>
//                     </FormControl>
//                   </Grid>

//                   <Grid item xs={12} md={4}>
//                     <FormControl fullWidth>
//                       <InputLabel id="travelReady-label">Ready for Travel?</InputLabel>
//                       <Select
//                         labelId="travelReady-label"
//                         name="travelReady"
//                         value={formData.travelReady}
//                         label="Ready for Travel?"
//                         onChange={handleInputChange}
//                       >
//                         <MenuItem value="Yes">Yes</MenuItem>
//                         <MenuItem value="No">No</MenuItem>
//                       </Select>
//                     </FormControl>
//                   </Grid>

//                   <Grid item xs={12} md={4}>
//                     <TextField
//                       fullWidth
//                       label="Consultation Price (₹)"
//                       name="price"
//                       value={formData.price}
//                       onChange={handleInputChange}
//                       type="number"
//                     />
//                   </Grid>
//                 </Grid>

//                 <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
//                   Weekly Schedule
//                 </Typography>

//                 <Paper elevation={1} sx={{ overflow: 'auto' }}>
//                   <Table>
//                     <TableHead sx={{ backgroundColor: '#eeeeee' }}>
//                       <TableRow>
//                         <TableCell sx={{ fontWeight: 600 }}>Day</TableCell>
//                         <TableCell sx={{ fontWeight: 600 }}>Morning</TableCell>
//                         <TableCell sx={{ fontWeight: 600 }}>Evening</TableCell>
//                       </TableRow>
//                     </TableHead>
//                     <TableBody>
//                       {daysOfWeek.map((day, index) => (
//                         <TableRow key={day}>
//                           <TableCell>{day}</TableCell>
//                           <TableCell>
//                             <TimePicker
//                               value={formData.schedule[index].morning}
//                               onChange={(value) => handleTimeChange(index, 'morning', value)}
//                               slotProps={{
//                                 textField: {
//                                   size: 'small',
//                                   fullWidth: true,
//                                   variant: 'outlined',
//                                 },
//                               }}
//                             />
//                           </TableCell>
//                           <TableCell>
//                             <TimePicker
//                               value={formData.schedule[index].evening}
//                               onChange={(value) => handleTimeChange(index, 'evening', value)}
//                               slotProps={{
//                                 textField: {
//                                   size: 'small',
//                                   fullWidth: true,
//                                   variant: 'outlined',
//                                 },
//                               }}
//                             />
//                           </TableCell>
//                         </TableRow>
//                       ))}
//                     </TableBody>
//                   </Table>
//                 </Paper>

//                 <Box mt={4} textAlign="right">
//                   <Button
//                     variant="contained"
//                     size="large"
//                     disabled={loading}
//                     sx={{
//                       backgroundColor: '#1565c0',
//                       '&:hover': { backgroundColor: '#0d47a1' },
//                       px: 4,
//                     }}
//                     onClick={handleSubmit}
//                   >
//                     {loading ? 'Saving...' : 'Save Availability'}
//                   </Button>
//                 </Box>
//               </CardContent>
//             </Card>
//           </Grid>
//         </Grid>
//       </Box>
//     </LocalizationProvider>
//   );
// };


import {
  Box, Card, CardContent, Typography, TextField, Grid, Table, TableHead, TableRow,
  TableCell, TableBody, Button, FormControl, InputLabel, Select, MenuItem, Paper,
} from '@mui/material';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { toast } from 'react-toastify';
import { useAvailability } from '../hooks/useAvailability';

const daysOfWeek = [
  'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday',
];

export const AvailabilityForm = () => {
  const {
    formData,
    handleInputChange,
    handleTimeChange,
    handleSubmit,
    loading,
  } = useAvailability();

  const handleFormSubmit = async () => {
    try {
      const result = await handleSubmit();
      toast.success(`Availability ${result} successfully!`);
    } catch (err) {
      toast.error(err.message || 'Failed to submit availability');
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box sx={{ p: 4, bgcolor: '#f9f9f9', minHeight: '100vh' }}>
        <Grid container justifyContent="center">
          <Grid item xs={12} md={10} lg={8}>
            <Card elevation={3} sx={{ borderRadius: 3 }}>
              <CardContent>
                <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', color: '#1565c0' }}>
                  Availability Setup
                </Typography>

                <Grid container spacing={3} sx={{ mt: 1, mb: 3 }}>
                  <Grid item xs={12} md={4}>
                    <FormControl fullWidth>
                      <InputLabel id="available24hr-label">24 Hour Availability</InputLabel>
                      <Select
                        labelId="available24hr-label"
                        name="available24hr"
                        value={formData.available24hr}
                        label="24 Hour Availability"
                        onChange={handleInputChange}
                      >
                        <MenuItem value="Yes">Yes</MenuItem>
                        <MenuItem value="No">No</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>

                  <Grid item xs={12} md={4}>
                    <FormControl fullWidth>
                      <InputLabel id="travelReady-label">Ready for Travel?</InputLabel>
                      <Select
                        labelId="travelReady-label"
                        name="travelReady"
                        value={formData.travelReady}
                        label="Ready for Travel?"
                        onChange={handleInputChange}
                      >
                        <MenuItem value="Yes">Yes</MenuItem>
                        <MenuItem value="No">No</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>

                  <Grid item xs={12} md={4}>
                    <TextField
                      fullWidth
                      label="Consultation Price (₹)"
                      name="price"
                      value={formData.price}
                      onChange={handleInputChange}
                      type="number"
                    />
                  </Grid>
                </Grid>

                <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                  Weekly Schedule
                </Typography>

                <Paper elevation={1} sx={{ overflow: 'auto' }}>
                  <Table>
                    <TableHead sx={{ backgroundColor: '#eeeeee' }}>
                      <TableRow>
                        <TableCell sx={{ fontWeight: 600 }}>Day</TableCell>
                        <TableCell sx={{ fontWeight: 600 }}>Morning</TableCell>
                        <TableCell sx={{ fontWeight: 600 }}>Evening</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {daysOfWeek.map((day, index) => (
                        <TableRow key={day}>
                          <TableCell>{day}</TableCell>
                          <TableCell>
                            <TimePicker
                              value={formData.schedule[index].morning}
                              onChange={(value) => handleTimeChange(index, 'morning', value)}
                              slotProps={{
                                textField: {
                                  size: 'small',
                                  fullWidth: true,
                                  variant: 'outlined',
                                },
                              }}
                            />
                          </TableCell>
                          <TableCell>
                            <TimePicker
                              value={formData.schedule[index].evening}
                              onChange={(value) => handleTimeChange(index, 'evening', value)}
                              slotProps={{
                                textField: {
                                  size: 'small',
                                  fullWidth: true,
                                  variant: 'outlined',
                                },
                              }}
                            />
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </Paper>

                <Box mt={4} textAlign="right">
                  <Button
                    variant="contained"
                    size="large"
                    disabled={loading}
                    sx={{
                      backgroundColor: '#1565c0',
                      '&:hover': { backgroundColor: '#0d47a1' },
                      px: 4,
                    }}
                    onClick={handleFormSubmit}
                  >
                    {loading ? 'Saving...' : 'Save Availability'}
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </LocalizationProvider>
  );
};
