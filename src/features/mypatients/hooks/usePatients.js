import { useEffect, useState } from "react"
import { getPatients, getPatientById, savePatient, updatePatientService, searchPatients,addPatientNote } from '../services/patientService'

const usePatients = () => {
    const [patients, setPatients] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPatient, setSelectedPatient] = useState(null);

    useEffect(() => {
        const fetchPatients = async () => {
            try {
                setLoading(true)
                const data = await getPatients()
                setPatients(data)
                setError(null)
            } catch (err) {
                setError(err)
                setPatients([])
            } finally {
                setLoading(false)
            }
        }

        fetchPatients()
    }, [])
  const filteredPatients = searchPatients(patients, searchTerm);

    const updatePatient = async (patientId, updates) => {
      console.log("patid",patientId)

        try {
            setLoading(true);
            const updatedPatient = await updatePatientService( updates,patientId);
            setPatients(prev =>
                prev.map(pat =>
                    pat.id === patientId ? { ...pat, ...updatedPatient } : pat
                )
            );
            setError(null);
            return updatedPatient;
        } catch (err) {
            setError(err);
            throw err;
        } finally {
            setLoading(false);
        }
    };

  const refreshPatients = async () => {
    try {
      setLoading(true);
      const data = await getPatients();
      setPatients(data);
      setError(null);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };


    // Add note to patient
  const addPatientNote = async (id, note) => {
    try {
      setLoading(true);
      const updatedPatient = await addPatientNote(id, note);
      setPatients(prev => prev.map(p => p.id === id ? updatedPatient : p));
      if (selectedPatient?.id === id) {
        setSelectedPatient(updatedPatient);
      }
      setError(null);
      return updatedPatient;
    } catch (err) {
      setError(err.message || `Failed to add note to patient ${id}`);
      throw err;
    } finally {
      setLoading(false);
    }
  };
  // Fetch single patient
  const fetchPatientById = async (id) => {
    try {
      setLoading(true);
      const data = await getPatientById(id);
      // console.log("patientbyid",data)
      setSelectedPatient(data);
      setError(null);
      return data
    } catch (err) {
      setError(err.message || `Failed to fetch patient ${id}`);
    } finally {
      setLoading(false);
    }
  };




    return {patients:filteredPatients,loading,error, searchTerm,setSearchTerm,refreshPatients,updatePatient,selectedPatient,setSelectedPatient,fetchPatientById}
}


export default usePatients


// import { useState, useEffect } from 'react';
// import patientService from '../services/patientService';

// const usePatients = () => {
//   const [patients, setPatients] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [selectedPatient, setSelectedPatient] = useState(null);

//   // Fetch all patients
//   const fetchPatients = async () => {
//     try {
//       setLoading(true);
//       const data = await patientService.getPatients();
//       setPatients(data);
//       setError(null);
//     } catch (err) {
//       setError(err.message || 'Failed to fetch patients');
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Fetch single patient
//   const fetchPatientById = async (id) => {
//     try {
//       setLoading(true);
//       const data = await patientService.getPatientById(id);
//       setSelectedPatient(data);
//       setError(null);
//     } catch (err) {
//       setError(err.message || `Failed to fetch patient ${id}`);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Update patient
//   const updatePatient = async (id, patientData) => {
//     try {
//       setLoading(true);
//       const updatedPatient = await patientService.updatePatient(id, patientData);
//       setPatients(prev => prev.map(p => p.id === id ? updatedPatient : p));
//       setError(null);
//       return updatedPatient;
//     } catch (err) {
//       setError(err.message || `Failed to update patient ${id}`);
//       throw err;
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Add note to patient
//   const addPatientNote = async (id, note) => {
//     try {
//       setLoading(true);
//       const updatedPatient = await patientService.addPatientNote(id, note);
//       setPatients(prev => prev.map(p => p.id === id ? updatedPatient : p));
//       if (selectedPatient?.id === id) {
//         setSelectedPatient(updatedPatient);
//       }
//       setError(null);
//       return updatedPatient;
//     } catch (err) {
//       setError(err.message || `Failed to add note to patient ${id}`);
//       throw err;
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchPatients();
//   }, []);

//   return {
//     patients,
//     selectedPatient,
//     loading,
//     error,
//     fetchPatientById,
//     updatePatient,
//     addPatientNote,
//     refreshPatients: fetchPatients
//   };
// };

// export default usePatients;