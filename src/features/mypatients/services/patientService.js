import axios from "axios"

const BASE_URL = 'https://caresmart-backend.vercel.app/api'


const getAuthHeaders = () => {
    const token = localStorage.getItem('token')
    return {
        headers: {
            "Content-Type": "application/json",
            ...(token && { Authorization: `Bearer ${token}` }),
        }
    }
}

const getPatients = async () => {
    try {
        const res = await axios.get(`${BASE_URL}/patients`, getAuthHeaders())
        return res.data.patient
    } catch (err) {
        console.error('Error fetching patients:', err);
        throw err.response?.data?.message || err.message;

    }
}

const getPatientById = async (id) => {
    try {
        const res = await axios.get(`${BASE_URL}/patients/${id}`, getAuthHeaders())
        // console.log("res",res.data)
        return res.data

    } catch (err) {
        console.error(`Error fetching patients ${id}:`, err);
        throw err.response?.data?.message || err.message;
    }
}


const savePatient = async (patientData) => {
    try {
        const res = await axios.post(`${BASE_URL}/patients`, patientData, getAuthHeaders())
        return res.data

    } catch (err) {
        console.error(`Error saving patients:`, err);
        throw err.response?.data?.message || err.message;

    }
}

  // Add new patient note
  const addPatientNote= async (id, notes) => {
    try {
      const response = await axios.put(`${BASE_URL}/patients/${id}/notes`, { notes },getAuthHeaders());
      return response.data;
    } catch (error) {
      console.error(`Error adding note to patient ${id}:`, error);
      throw error;
    }
  }


const updatePatientService = async (updateData,id) => {
  console.log("update data",updateData)
  console.log("id",id)
    try {
        const res = await axios.put(`${BASE_URL}/patients/${id}`, updateData, getAuthHeaders())
        return res.data

    } catch (err) {
        console.error(`Error updating patients:${id}`, err);
        throw err.response?.data?.message || err.message;

    }

}

const searchPatients = (patients, term) => {
  if (!term.trim()) return patients;

  const lowerTerm = term.toLowerCase();
  return patients.filter(
    (item) =>
      item.patientName.toLowerCase().includes(lowerTerm) ||
      item.serviceType.toLowerCase().includes(lowerTerm)
    //   item.id.toLowerCase().includes(lowerTerm)
  );
};


export {getPatients,getPatientById,savePatient,updatePatientService,searchPatients,addPatientNote}



// import axios from 'axios';

// const API_BASE_URL = 'http://localhost:5000/api';

// const patientService = {
  
//    getAuthHeaders : () => {
//     const token = localStorage.getItem('token')
//     return {
//         headers: {
//             "Content-Type": "application/json",
//             ...(token && { Authorization: `Bearer ${token}` }),
//         }
//     }
// },

//   // Get all patients
//   getPatients: async () => {
//     try {
//       const response = await axios.get(`${API_BASE_URL}/patients`);
//       console.log(response.data.patient)
//       return response.data.patient;
//     } catch (error) {
//       console.error('Error fetching patients:', error);
//       throw error;
//     }
//   },

//   // Get single patient by ID
//   getPatientById: async (id) => {
//     try {
//       const response = await axios.get(`${API_BASE_URL}/patients/${id}`);
//       return response.data;
//     } catch (error) {
//       console.error(`Error fetching patient ${id}:`, error);
//       throw error;
//     }
//   },

//   // Update patient information
//   updatePatient: async (id, patientData) => {
//     console.log("token",getAuthHeaders())
//     try {
//       const response = await axios.put(`${API_BASE_URL}/patients/${id}`, patientData,getAuthHeaders());
//       return response.data;
//     } catch (error) {
//       console.error(`Error updating patient ${id}:`, error);
//       throw error;
//     }
//   },

//   // Add new patient note
//   addPatientNote: async (id, note) => {
//     try {
//       const response = await axios.put(`${API_BASE_URL}/patients/${id}`, { note });
//       return response.data;
//     } catch (error) {
//       console.error(`Error adding note to patient ${id}:`, error);
//       throw error;
//     }
//   }
// };

// export default patientService;
