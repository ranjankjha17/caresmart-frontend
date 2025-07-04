import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api/availability';

export const saveAvailability = async (availabilityData) => {
    const token = localStorage.getItem('token');
    if (!token) {
        throw new Error('User not authenticated. No token found.');
    }
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };
    try {
        const response = await axios.post(`${API_BASE_URL}/save-availability`, availabilityData, config);
        return response.data;
    } catch (error) {
        console.error('Error saving availability:', error);
        throw error.response?.data || { message: 'Failed to save availability' };
    }
};

export const getAvailabilityList = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
        throw new Error('User not authenticated. No token found.');
    }
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };
    try {
        const response = await axios.get(`${API_BASE_URL}/availability-by-user`, config);
        return response.data;
    } catch (error) {
        console.error('Error fetching availability list:', error);
        throw error.response?.data || { message: 'Failed to fetch availability list' };
    }
};


export const updateAvailability = async (updatedData) => {
    const token = localStorage.getItem('token');
    if (!token) {
        throw new Error('User not authenticated. No token found.');
    }
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };
    try {
        console.log("updated data", updatedData)
        const response = await axios.put(`${API_BASE_URL}/update-availability`, updatedData, config)

        return response.data;
    } catch (error) {
        console.error('Error updating availability:', error);
        throw error.response?.data || { message: 'Failed to update availability' };
    }
};
