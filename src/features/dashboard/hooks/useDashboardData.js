// import { useState, useEffect } from 'react';
// import {
//   fetchDashboardData,
//   fetchAppointments,
//   fetchClinics
// } from '../services/apiService';

// const useDashboardData = () => {
//   const [dashboardData, setDashboardData] = useState(null);
//   const [appointments, setAppointments] = useState([]);
//   const [clinics, setClinics] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [filters, setFilters] = useState({
//     timeRange: 'today',
//     appointmentStatus: 'all'
//   });

//   useEffect(() => {
//     const loadData = async () => {
//       try {
//         setLoading(true);
//         setError(null);
        
//         const [metrics, appointmentsData, clinicsData] = await Promise.all([
//           fetchDashboardData(),
//           fetchAppointments(filters.timeRange, filters.appointmentStatus),
//           fetchClinics()
//         ]);
//         setDashboardData(metrics);
//         setAppointments(appointmentsData);
//         setClinics(clinicsData);
//       } catch (err) {
//         setError(err.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     loadData();
//   }, [filters]);

//   const handleFilterChange = (newFilters) => {
//     setFilters(prev => ({ ...prev, ...newFilters }));
//   };

//   return {
//     dashboardData,
//     appointments,
//     clinics,
//     loading,
//     error,
//     filters,
//     handleFilterChange
//   };
// };

// export default useDashboardData;


import { useState, useEffect } from 'react';
import {
  fetchDashboardData,
  fetchAppointments,
  fetchClinics
} from '../services/apiService';

const useDashboardData = () => {
  const [dashboardData, setDashboardData] = useState(null);
  const [appointments, setAppointments] = useState([]);
  const [clinics, setClinics] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    timeRange: 'today',
    appointmentStatus: 'all'
  });


  console.log("appointments",appointments)

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      setError(null);

      try {
        const [metrics, appointmentsData, clinicsData] = await Promise.all([
          fetchDashboardData(),
          fetchAppointments(filters.timeRange,filters.appointmentStatus),
          fetchClinics()
        ]);

        setDashboardData(metrics);
        setAppointments(appointmentsData);
        setClinics(clinicsData);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [filters]);

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

export default useDashboardData;
