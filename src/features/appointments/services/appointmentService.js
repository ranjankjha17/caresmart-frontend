// import axios from 'axios';

// // Create axios instance with base config
// const apiClient = axios.create({
//   baseURL: 'http://localhost:5000/api',
//   headers: {
//     'Content-Type': 'application/json'
//   }
// });

// // Add request interceptor to inject token
// apiClient.interceptors.request.use(
//   (config) => {
//     const token = localStorage.getItem('token');
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

// // Status color mapping
// const statusColors = {
//   Scheduled: 'primary',
//   Completed: 'success',
//   Missed: 'error',
//   Cancelled: 'warning',
//   Rescheduled: 'info'
// };

// // API service functions
// const getAppointments = async () => {
//   try {
//     const response = await apiClient.get('/appointments');
//     return response.data;
//   } catch (error) {
//     console.error('Error fetching appointments:', error);
//     throw error.response?.data?.message || error.message;
//   }
// };

// const getAppointmentById = async (id) => {
//   try {
//     const response = await apiClient.get(`/appointments/${id}`);
//     return response.data;
//   } catch (error) {
//     console.error(`Error fetching appointment ${id}:`, error);
//     throw error.response?.data?.message || error.message;
//   }
// };

// const updateAppointment = async (appointmentId, updates) => {
//     console.log("appintid",appointmentId)
//         console.log("update",updates)

//   try {
//     const response = await apiClient.put(
//       `/appointments/${appointmentId}`,
//       updates
//     );
//     return response.data;
//   } catch (error) {
//     console.error(`Error updating appointment ${appointmentId}:`, error);
//     throw error.response?.data?.message || error.message;
//   }
// };

// const createAppointment = async (appointmentData) => {
//   try {
//     const response = await apiClient.post('/appointments', appointmentData);
//     return response.data;
//   } catch (error) {
//     console.error('Error creating appointment:', error);
//     throw error.response?.data?.message || error.message;
//   }
// };

// const deleteAppointment = async (appointmentId) => {
//   try {
//     await apiClient.delete(`/appointments/${appointmentId}`);
//     return true;
//   } catch (error) {
//     console.error(`Error deleting appointment ${appointmentId}:`, error);
//     throw error.response?.data?.message || error.message;
//   }
// };

// // Client-side search function
// const searchAppointments = (appointments, searchTerm) => {
//   if (!searchTerm.trim()) return appointments;
  
//   return appointments.filter(appt =>
//     appt.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
//     appt.serviceType.toLowerCase().includes(searchTerm.toLowerCase()) ||
//     appt.id.toLowerCase().includes(searchTerm.toLowerCase())
//   );
// };

// // Date formatting utility
// const formatRescheduledDate = (dateTime) => {

//     console.log("datetime",dateTime)
//   return dateTime.toLocaleString('en-US', {
//     month: 'short',
//     day: 'numeric',
//     year: 'numeric',
//     hour: '2-digit',
//     minute: '2-digit'
//   });
// };

// export {
//   getAppointments,
//   getAppointmentById,
//   updateAppointment,
//   createAppointment,
//   deleteAppointment,
//   searchAppointments,
//   statusColors,
//   formatRescheduledDate
// };



import axios from 'axios';

const BASE_URL = 'http://localhost:5000/api';

// Get auth headers with token
const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  return {
    headers: {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
    },
  };
};

// Status color mapping
const statusColors = {
  Scheduled: 'primary',
  Completed: 'success',
  Missed: 'error',
  Cancelled: 'warning',
  Rescheduled: 'info',
};

// Get all appointments
const getAppointments = async () => {
  try {
    const res = await axios.get(`${BASE_URL}/appointments`, getAuthHeaders());
    return res.data;
  } catch (err) {
    console.error('Error fetching appointments:', err);
    throw err.response?.data?.message || err.message;
  }
};

// Get single appointment by ID
const getAppointmentById = async (id) => {
  try {
    const res = await axios.get(`${BASE_URL}/appointments/${id}`, getAuthHeaders());
    return res.data;
  } catch (err) {
    console.error(`Error fetching appointment ${id}:`, err);
    throw err.response?.data?.message || err.message;
  }
};

// Create a new appointment
const createAppointment = async (appointmentData) => {
  try {
    const res = await axios.post(`${BASE_URL}/appointments`, appointmentData, getAuthHeaders());
    return res.data;
  } catch (err) {
    console.error('Error creating appointment:', err);
    throw err.response?.data?.message || err.message;
  }
};

// Update appointment by ID
const updateAppointment = async (id, updates) => {
  console.log("updates",updates)
  try {
    const res = await axios.put(`${BASE_URL}/appointments/${id}`, updates, getAuthHeaders());
    return res.data;
  } catch (err) {
    console.error(`Error updating appointment ${id}:`, err);
    throw err.response?.data?.message || err.message;
  }
};

// Delete appointment by ID
const deleteAppointment = async (id) => {
  try {
    await axios.delete(`${BASE_URL}/appointments/${id}`, getAuthHeaders());
    return true;
  } catch (err) {
    console.error(`Error deleting appointment ${id}:`, err);
    throw err.response?.data?.message || err.message;
  }
};

// Search appointments
const searchAppointments = (appointments, term) => {
  if (!term.trim()) return appointments;

  const lowerTerm = term.toLowerCase();
  return appointments.filter(
    (item) =>
      item.patientName.toLowerCase().includes(lowerTerm) ||
      item.serviceType.toLowerCase().includes(lowerTerm)
    //   item.id.toLowerCase().includes(lowerTerm)
  );
};

// Format date
const formatRescheduledDate = (dateTime) => {
  return dateTime.toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};

export {
  getAppointments,
  getAppointmentById,
  createAppointment,
  updateAppointment,
  deleteAppointment,
  searchAppointments,
  statusColors,
  formatRescheduledDate,
};
