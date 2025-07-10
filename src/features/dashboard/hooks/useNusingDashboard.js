import { useState, useEffect } from 'react';
import {
  fetchDashboardData,
  fetchAppointments,
  fetchClinics,
  updateAppointmentStatus,
  getPatientDetails
} from '../services/apiService';

export const useNursingDashboard = () => {
  const [dashboardData, setDashboardData] = useState(null);
  const [appointments, setAppointments] = useState([]);
  const [clinics, setClinics] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    timeRange: 'today',
    appointmentStatus: 'all'
  });


//   console.log("appointments",appointments)

  useEffect(() => {
    const loadAppointments = async () => {
      try {
        setLoading(true);
        const data = await fetchAppointments(filters.timeRange,filters.appointmentStatus);
          console.log("appointments data",data)

        setAppointments(data);
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };

    loadAppointments();
  }, []);

//   const handleStatusChange = async (id, newStatus) => {
//     try {
//       setLoading(true);
//       const updatedRequest = await updateRequestStatus(id, newStatus);
//       setRequests(prevRequests =>
//         prevRequests.map(req => (req.id === id ? updatedRequest : req))
//       );
//       setLoading(false);
//       return updatedRequest;
//     } catch (err) {
//       setError(err);
//       setLoading(false);
//       throw err;
//     }
//   };

//   const handleReschedule = async (id, newTime) => {
//     try {
//       setLoading(true);
//       const updatedRequest = await rescheduleRequest(id, newTime);
//       setRequests(prevRequests =>
//         prevRequests.map(req => (req.id === id ? updatedRequest : req))
//       );
//       setLoading(false);
//       return updatedRequest;
//     } catch (err) {
//       setError(err);
//       setLoading(false);
//       throw err;
//     }
//   };

//   const addNewRequest = async (newRequest) => {
//     try {
//       setLoading(true);
//       const createdRequest = await createRequest(newRequest);
//       setRequests(prevRequests => [...prevRequests, createdRequest]);
//       setLoading(false);
//       return createdRequest;
//     } catch (err) {
//       setError(err);
//       setLoading(false);
//       throw err;
//     }
//   };

  const handleFilterChange = (newFilters) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  };

  return {
    dashboardData,
    appointments,
    clinics,
    loading,
    error,
    filters,
    handleFilterChange
  };
};