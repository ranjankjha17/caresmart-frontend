// import axios from 'axios';

// const API_BASE_URL ='http://localhost:5000/api';

// const api = axios.create({
//   baseURL: API_BASE_URL,
//   timeout: 10000,
//   headers: {
//     'Content-Type': 'application/json'
//   }
// });

// // Add request interceptor for auth tokens
// api.interceptors.request.use(config => {
//   const token = localStorage.getItem('token');
//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }
//   return config;
// });

// // Add response interceptor for error handling
// api.interceptors.response.use(
//   response => response.data,
//   error => {
//     const message = error.response?.data?.message || 
//                    error.message || 
//                    'Request failed';
//     return Promise.reject(new Error(message));
//   }
// );

// export const fetchDashboardData = () => {
//   return api.get('/dashboard');
// };

// export const fetchAppointments = (timeRange = 'today', status = 'all') => {
//   return api.get('/dashboard/appointments', { params: { timeRange, status } });
// };

// export const fetchClinics = () => {
//   return api.get('/clinics');
// };

// // Additional API calls can be added here
// export const updateAppointmentStatus = (id, status) => {
//   return api.patch(`/appointments/${id}/status`, { status });
// };

// export const getPatientDetails = (patientId) => {
//   return api.get(`/patients/${patientId}`);
// };

import axios from "axios";

const BASE_URL = 'https://caresmart-backend.vercel.app/api';

// Auth Header Function
const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  return {
    headers: {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
    }
  };
};

// ============================
// Dashboard APIs
// ============================

const fetchDashboardData = async () => {
  try {
    const res = await axios.get(`${BASE_URL}/dashboard`, getAuthHeaders());
    return res.data;
  } catch (err) {
    console.error("Error fetching dashboard data:", err);
    throw err.response?.data?.message || err.message;
  }
};

const fetchAppointments = async (timeRange = 'today', status = 'all') => {
  try {
    const res = await axios.get(`${BASE_URL}/dashboard/appointments`, {
      ...getAuthHeaders(),
      params: { timeRange, status }
    });

    console.log("res data",res.data)
    return res.data;
  } catch (err) {
    console.error("Error fetching appointments:", err);
    throw err.response?.data?.message || err.message;
  }
};

// ============================
// Clinic APIs
// ============================

const fetchClinics = async () => {
  try {
    const res = await axios.get(`${BASE_URL}/clinics`, getAuthHeaders());
    return res.data;
  } catch (err) {
    console.error("Error fetching clinics:", err);
    throw err.response?.data?.message || err.message;
  }
};

// ============================
// Appointment APIs
// ============================

const updateAppointmentStatus = async (id, status) => {
  try {
    const res = await axios.patch(
      `${BASE_URL}/appointments/${id}/status`,
      { status },
      getAuthHeaders()
    );
    return res.data;
  } catch (err) {
    console.error(`Error updating appointment ${id}:`, err);
    throw err.response?.data?.message || err.message;
  }
};

// ============================
// Patient APIs
// ============================

const getPatientDetails = async (patientId) => {
  try {
    const res = await axios.get(`${BASE_URL}/patients/${patientId}`, getAuthHeaders());
    return res.data;
  } catch (err) {
    console.error(`Error fetching patient ${patientId}:`, err);
    throw err.response?.data?.message || err.message;
  }
};

// Exporting all functions
export {
  fetchDashboardData,
  fetchAppointments,
  fetchClinics,
  updateAppointmentStatus,
  getPatientDetails
};



