import axios from 'axios';

const API_BASE_URL = 'https://caresmart-backend.vercel.app/api/requests';

export const fetchRequests = async () => {
  try {
    const response = await axios.get(API_BASE_URL);
    return response.data;
  } catch (error) {
    console.error('Error fetching nursing requests:', error);
    throw error;
  }
};

export const updateRequestStatus = async (id, newStatus) => {
  try {
    const response = await axios.patch(`${API_BASE_URL}/${id}/status`, {
      status: newStatus
    });
    return response.data;
  } catch (error) {
    console.error('Error updating request status:', error);
    throw error;
  }
};

export const rescheduleRequest = async (id, newTime) => {
  try {
    const response = await axios.patch(`${API_BASE_URL}/${id}/schedule`, {
      scheduledTime: newTime
    });
    return response.data;
  } catch (error) {
    console.error('Error rescheduling request:', error);
    throw error;
  }
};

export const createRequest = async (newRequest) => {
  try {
    const response = await axios.post(API_BASE_URL, newRequest);
    return response.data;
  } catch (error) {
    console.error('Error creating new request:', error);
    throw error;
  }
};