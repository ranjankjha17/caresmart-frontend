import axios from 'axios';

const API_BASE_URL = 'https://caresmart-backend.vercel.app/api/otp';

export const sendOTP = async (mobileNumber) => {
  console.log('mob no',mobileNumber)
  try {
    const response = await axios.post(`${API_BASE_URL}/send-otp`, {
      mobileNumber,
    });
    return response.data;
  } catch (error) {
    console.error('Error sending OTP:', error);
    throw error.response?.data || { message: 'Failed to send OTP' };
  }
};

export const verifyOTPAndRegister = async (userData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/verify-and-register`, userData);
    return response.data;
  } catch (error) {
    console.error('Error verifying OTP:', error);
    throw error.response?.data || { message: 'Failed to verify OTP and register' };
  }
};