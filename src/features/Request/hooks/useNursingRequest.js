import { useState, useEffect } from 'react';
import {
  fetchRequests,
  updateRequestStatus,
  rescheduleRequest,
  createRequest
} from '../services/requestServices';

export const useNursingRequests = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadRequests = async () => {
      try {
        setLoading(true);
        const data = await fetchRequests();
        setRequests(data);
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };

    loadRequests();
  }, []);

  const handleStatusChange = async (id, newStatus) => {
    try {
      setLoading(true);
      const updatedRequest = await updateRequestStatus(id, newStatus);
      setRequests(prevRequests =>
        prevRequests.map(req => (req.id === id ? updatedRequest : req))
      );
      setLoading(false);
      return updatedRequest;
    } catch (err) {
      setError(err);
      setLoading(false);
      throw err;
    }
  };

  const handleReschedule = async (id, newTime) => {
    try {
      setLoading(true);
      const updatedRequest = await rescheduleRequest(id, newTime);
      setRequests(prevRequests =>
        prevRequests.map(req => (req.id === id ? updatedRequest : req))
      );
      setLoading(false);
      return updatedRequest;
    } catch (err) {
      setError(err);
      setLoading(false);
      throw err;
    }
  };

  const addNewRequest = async (newRequest) => {
    try {
      setLoading(true);
      const createdRequest = await createRequest(newRequest);
      setRequests(prevRequests => [...prevRequests, createdRequest]);
      setLoading(false);
      return createdRequest;
    } catch (err) {
      setError(err);
      setLoading(false);
      throw err;
    }
  };

  return {
    requests,
    loading,
    error,
    handleStatusChange,
    handleReschedule,
    addNewRequest
  };
};