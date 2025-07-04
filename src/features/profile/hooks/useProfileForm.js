import { useEffect, useState } from 'react';
import { getProfileData, getUser } from '../services/profileService';
import { toast } from 'react-toastify';
import axios from 'axios';

const MAX_FILE_SIZE_MB = 4;

export const useProfileForm = () => {
  const [formValues, setFormValues] = useState({
    firstName: '',
    lastName: '',
    displayName: '',
    designation: '',
    phoneNumber: '',
    email: '',
    knownLanguages: [],
    qualification: '',
    licenseNumber: '',
    experience: '1 year',
    hospitalsWorkedAt: '',
    specializations: '',
    skills: '',
    profileImage: null,
    documents: {}
  });

  const [previewImage, setPreviewImage] = useState(null);
  const [documentPreviews, setDocumentPreviews] = useState({});
  const [loading, setLoading] = useState(true);
  const [uploadProgress, setUploadProgress] = useState(0);

  const fetchProfile = async () => {
    setLoading(true);
    try {
      const profile = await getProfileData();
      if (profile && (profile.firstName || profile.email)) {
        setFormValues((prev) => ({
          ...prev,
          ...profile,
          knownLanguages: profile.knownLanguages || [],
          profileImage: profile.profileImage || null,
          documents: profile.documents || {}
        }));

        if (profile.profileImage) {
          setPreviewImage(`http://localhost:5000${profile.profileImage}`);
        }

        const previews = {};
        const map = {
          IDProof: 'ID Proof',
          EducationCertificates: 'Education Certificates',
          NursingLicense: 'Nursing License',
          PoliceVerification: 'Police Verification'
        };

        for (const key in profile.documents) {
          const path = profile.documents[key];
          if (path) {
            previews[map[key]] = path.endsWith('.pdf')
              ? 'PDF Uploaded'
              : `http://localhost:5000${path}`;
          }
        }

        setDocumentPreviews(previews);
        return;
      }
    } catch (err) {
      console.warn('Error fetching profile:', err);
    }

    try {
      const user = await getUser();
      if (user) {
        setFormValues((prev) => ({
          ...prev,
          firstName: user.name || '',
          lastName: user.lastName || '',
          email: user.email || '',
          phoneNumber: user.mobileNumber?.toString().slice(2) || '',
          displayName: user.displayName || '',
          designation: user.designation || '',
          experience: user.experience || '1 year',
        }));
      }
    } catch (err) {
      console.warn('Error fetching user:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleLanguageChange = (e) => {
    setFormValues((prev) => ({ ...prev, knownLanguages: e.target.value }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file || file.size > MAX_FILE_SIZE_MB * 1024 * 1024) {
      alert('File size exceeds 4MB.');
      return;
    }
    setFormValues((prev) => ({ ...prev, profileImage: file }));
    setPreviewImage(URL.createObjectURL(file));
  };

  const handleDocumentUpload = (label, e) => {
    const file = e.target.files[0];
    if (!file || file.size > MAX_FILE_SIZE_MB * 1024 * 1024) {
      alert('File size exceeds 4MB.');
      return;
    }

    setFormValues((prev) => ({
      ...prev,
      documents: { ...prev.documents, [label]: file }
    }));

    setDocumentPreviews((prev) => ({
      ...prev,
      [label]: file.type.startsWith('image/')
        ? URL.createObjectURL(file)
        : 'PDF Uploaded'
    }));
  };

  const handleSubmit = async () => {
    const formData = new FormData();

    for (const key in formValues) {
      if (key === 'documents') {
        Object.entries(formValues.documents).forEach(([label, file]) => {
          formData.append(`documents[${label}]`, file);
        });
      } else if (key === 'knownLanguages') {
        formValues.knownLanguages.forEach((lang, i) =>
          formData.append(`knownLanguages[${i}]`, lang)
        );
      } else {
        formData.append(key, formValues[key]);
      }
    }

    try {
      const token = localStorage.getItem('token');
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
        onUploadProgress: (progressEvent) => {
          const percent = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          setUploadProgress(percent);
        },
      };

      const response = await axios.put(
        'http://localhost:5000/api/profile/update-profile',
        formData,
        config
      );

      toast.success('Profile updated successfully!');
      return response.data;
    } catch (err) {
      console.error(err);
      toast.error('Failed to save profile.');
    }
  };

  return {
    formValues,
    previewImage,
    documentPreviews,
    uploadProgress,
    loading,
    handleChange,
    handleImageUpload,
    handleLanguageChange,
    handleDocumentUpload,
    handleSubmit
  };
};
