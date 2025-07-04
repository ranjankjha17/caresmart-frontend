// import { useState, useEffect } from 'react';
// import {
//   getAppointments,
//   updateAppointment as updateAppointmentService,
//   searchAppointments,
//   statusColors
// } from '../services/appointmentService';

// const useAppointments = () => {
//   const [appointments, setAppointments] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [searchTerm, setSearchTerm] = useState('');

//   useEffect(() => {
//     const fetchAppointments = async () => {
//       try {
//         setLoading(true);
//         const data = await getAppointments();
//         setAppointments(data);
//       } catch (err) {
//         setError(err.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchAppointments();
//   }, []);

//   const filteredAppointments = searchAppointments(appointments, searchTerm);

//   const updateAppointment = async (appointmentId, updates) => {
//     try {
//       setLoading(true);
//       const updatedAppointment = await updateAppointmentService(appointmentId, updates);
//       setAppointments(prev => 
//         prev.map(appt => 
//           appt.id === appointmentId ? { ...appt, ...updatedAppointment } : appt
//         )
//       );
//     } catch (err) {
//       setError(err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleReschedule = async (appointmentId, newDateTime) => {
//     const formattedDate = formatRescheduledDate(newDateTime);
//     await updateAppointment(appointmentId, {
//       date: formattedDate,
//       status: 'Rescheduled'
//     });
//   };

//   const handleComplete = async (appointmentId) => {
//     await updateAppointment(appointmentId, { status: 'Completed' });
//   };

//   const handleCancel = async (appointmentId) => {
//     await updateAppointment(appointmentId, { status: 'Cancelled' });
//   };

//   return {
//     appointments: filteredAppointments,
//     loading,
//     error,
//     searchTerm,
//     setSearchTerm,
//     statusColors,
//     handleReschedule,
//     handleComplete,
//     handleCancel
//   };
// };

// export default useAppointments;



import { useState, useEffect } from 'react';
import {
  getAppointments,
  updateAppointment as updateAppointmentService,
  searchAppointments,
  statusColors,
  formatRescheduledDate
} from '../services/appointmentService';

const useAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        setLoading(true);
        const data = await getAppointments();
        setAppointments(data);
        setError(null);
      } catch (err) {
        setError(err);
        setAppointments([]);
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, []);

  const filteredAppointments = searchAppointments(appointments, searchTerm);

  const updateAppointment = async (appointmentId, updates) => {

    console.log("appointment id",appointmentId)
    console.log("update",updates)
    try {
      setLoading(true);
      const updatedAppointment = await updateAppointmentService(appointmentId, updates);
      setAppointments(prev => 
        prev.map(appt => 
          appt.id === appointmentId ? { ...appt, ...updatedAppointment } : appt
        )
      );
      setError(null);
      return updatedAppointment;
    } catch (err) {
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const handleReschedule = async (appointmentId, newDateTime) => {
    console.log("new date",newDateTime)
    const formattedDate = formatRescheduledDate(newDateTime);
    console.log("formattedDAte",formattedDate)
    // return await updateAppointment(appointmentId, {
    //   date: formattedDate,
    //   status: 'Rescheduled'
    // });
    // 1. First update the appointment
    const updatedAppt = await updateAppointment(appointmentId, {
      date: formattedDate,
      status: 'Rescheduled'
    });
    
    // 2. Then refresh the appointments list
    await refreshAppointments();
    
    // 3. Return the updated appointment
    return updatedAppt;

  };
// const handleReschedule = async (appointmentId, newDateTime) => {
//     try {
//         console.log('[DEBUG] Rescheduling appointment:', {
//             appointmentId,
//             receivedDateTime: newDateTime,
//             typeofDateTime: typeof newDateTime,
//             isoString: newDateTime.toISOString(),
//             localString: newDateTime.toString(),
//             timestamp: newDateTime.getTime()
//         });

//         const updates = {
//             date: newDateTime.toISOString(),
//             status: 'Rescheduled'
//         };

//         console.log('[DEBUG] Prepared update payload:', updates);
        
//         const result = await updateAppointment(appointmentId, updates);
//         console.log('[DEBUG] Update successful:', result);
//         return result;
//     } catch (err) {
//         console.error('[ERROR] Rescheduling failed:', {
//             error: err,
//             stack: err.stack
//         });
//         throw err;
//     }
// };
  const handleComplete = async (appointmentId) => {
    const updatedComplete=await updateAppointment(appointmentId, { status: 'Completed' });
    await refreshAppointments()
    return updatedComplete
  };

  const handleCancel = async (appointmentId) => {
    const updatedCancel= await updateAppointment(appointmentId, { status: 'Cancelled' });
    await  refreshAppointments()
    return updatedCancel
  };

  const refreshAppointments = async () => {
    try {
      setLoading(true);
      const data = await getAppointments();
      setAppointments(data);
      setError(null);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  return {
    appointments: filteredAppointments,
    loading,
    error,
    searchTerm,
    setSearchTerm,
    statusColors,
    handleReschedule,
    handleComplete,
    handleCancel,
    refreshAppointments
  };
};

export default useAppointments;