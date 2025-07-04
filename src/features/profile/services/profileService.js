import axios from "axios";

const API_BASE_URL = 'https://caresmart-backend.vercel.app/api/profile';

export const getUser = async () => {
    const token = localStorage.getItem('token');
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };

    try {
        const response = await axios.get(`https://caresmart-backend.vercel.app/api/user/me`, config);
        console.log("user",response.data)
        return response.data;
    } catch (error) {
        console.error('Error fetching user list:', error);
        throw error.response?.data || { message: 'Failed to fetch user list' };
    }
};

export const getProfileData = async () => {
    const token = localStorage.getItem('token');
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };

    try {
        const response = await axios.get(`${API_BASE_URL}/my-profile`, config);
        return response.data;
    } catch (error) {
        console.error('Error fetching availability list:', error);
        throw error.response?.data || { message: 'Failed to fetch availability list' };
    }
};

export const updateProfile = async (updatedData) => {
    const token = localStorage.getItem('token');
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };

    try {
        console.log("updated data", updatedData)
        const response = await axios.put(`${API_BASE_URL}/update-profile`, updatedData, config)

        return response.data;
    } catch (error) {
        console.error('Error updating availability:', error);
        throw error.response?.data || { message: 'Failed to update availability' };
    }
};
