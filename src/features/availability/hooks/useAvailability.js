import { useState, useEffect } from 'react';
import {
  getAvailabilityList,
  saveAvailability,
  updateAvailability,
} from '../services/availabilityService';
import dayjs from 'dayjs';

const daysOfWeek = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday',
];

export const useAvailability = () => {
  const [formData, setFormData] = useState({
    available24hr: 'No',
    travelReady: 'Yes',
    price: '',
    schedule: daysOfWeek.map(() => ({ morning: null, evening: null })),
  });
  const [availabilityId, setAvailabilityId] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchAvailability = async () => {
    setLoading(true);
    try {
      const data = await getAvailabilityList();
      setAvailabilityId(data._id);
      setFormData({
        available24hr: data?.available24hr || 'No',
        travelReady: data?.travelReady || 'Yes',
        price: data?.price?.toString() || '',
        schedule: daysOfWeek.map((_, i) => ({
          morning: data?.schedule?.[i]?.morning ? dayjs(data.schedule[i].morning, 'HH:mm') : null,
          evening: data?.schedule?.[i]?.evening ? dayjs(data.schedule[i].evening, 'HH:mm') : null,
        })),
      });
    } catch (err) {
      if (err.response?.status !== 404) {
        console.error('Failed to load availability', err);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAvailability();
  }, []);

  const handleInputChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleTimeChange = (index, period, value) => {
    const updatedSchedule = [...formData.schedule];
    updatedSchedule[index][period] = value;
    setFormData(prev => ({ ...prev, schedule: updatedSchedule }));
  };

  const handleSubmit = async () => {
    setLoading(true);
    const payload = {
      ...formData,
      schedule: formData.schedule.map((d) => ({
        morning: d.morning ? d.morning.format('HH:mm') : null,
        evening: d.evening ? d.evening.format('HH:mm') : null,
      })),
    };
    try {
      if (availabilityId) {
        await updateAvailability(payload);
        return 'updated';
      } else {
        await saveAvailability(payload);
        return 'saved';
      }
    } catch (err) {
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    formData,
    handleInputChange,
    handleTimeChange,
    handleSubmit,
    loading,
  };
};
