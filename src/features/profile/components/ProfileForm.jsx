// import React, { useState, useEffect } from 'react';
// import {
//   Box,
//   Button,
//   Grid,
//   TextField,
//   Typography,
//   Avatar,
//   Chip,
//   Card,
//   CardContent,
//   CardActions,
//   MenuItem,
//   Select,
//   InputLabel,
//   FormControl,
//   OutlinedInput,
//   LinearProgress,
//   useTheme
// } from '@mui/material';
// import styled from '@emotion/styled';
// import axios from 'axios';
// import { getProfileData, getUser } from '../services/profileService';
// import { toast } from 'react-toastify';

// const UploadBox = styled(Box)({
//   border: '2px dashed #ccc',
//   borderRadius: '12px',
//   padding: '16px',
//   textAlign: 'center',
//   background: '#f9f9f9'
// });

// const languages = ['Hindi', 'English', 'Marathi', 'Bengali', 'Tamil', 'Telugu'];
// const MAX_FILE_SIZE_MB = 4;

// export const ProfileForm = () => {
//   const theme = useTheme();
//   const [uploadProgress, setUploadProgress] = useState(0);
//   const [loading, setLoading] = useState(true);
//   const [previewImage, setPreviewImage] = useState(null);
//   const [documentPreviews, setDocumentPreviews] = useState({});
//   const [formValues, setFormValues] = useState({
//     firstName: '',
//     lastName: '',
//     displayName: '',
//     designation: '',
//     phoneNumber: '',
//     email: '',
//     knownLanguages: [],
//     qualification: '',
//     licenseNumber: '',
//     experience: '1 year',
//     hospitalsWorkedAt: '',
//     specializations: '',
//     skills: '',
//     profileImage: null,
//     documents: {}
//   });

//   useEffect(() => {
//     const fetchProfile = async () => {
//       setLoading(true);
//       try {
//         const profile = await getProfileData();
//         if (profile && (profile.firstName || profile.email)) {
//           setFormValues(prev => ({
//             ...prev,
//             firstName: profile.firstName || '',
//             lastName: profile.lastName || '',
//             email: profile.email || '',
//             phoneNumber: profile.phoneNumber || '',
//             displayName: profile.displayName || '',
//             designation: profile.designation || '',
//             experience: profile.experience || '1 year',
//             qualification: profile.qualification || '',
//             licenseNumber: profile.licenseNumber || '',
//             hospitalsWorkedAt: profile.hospitalsWorkedAt || '',
//             specializations: profile.specializations || '',
//             skills: profile.skills || '',
//             knownLanguages: profile.knownLanguages || [],

//           }));

//           if (profile.profileImage) {
//             setPreviewImage(`http://localhost:5000${profile.profileImage}`);
//             setFormValues((prev) => ({
//               ...prev,
//               profileImage: profile.profileImage,
//             }));
//           }
//           const previews = {};
//           if (profile.documents) {
//             const documentLabelMap = {
//               IDProof: 'ID Proof',
//               EducationCertificates: 'Education Certificates',
//               NursingLicense: 'Nursing License',
//               PoliceVerification: 'Police Verification',
//             };

//             for (const dbKey in profile.documents) {
//               const uiLabel = documentLabelMap[dbKey];
//               const path = profile.documents[dbKey];
//               if (path && (path.endsWith('.jpg') || path.endsWith('.png'))) {
//                 previews[uiLabel] = `http://localhost:5000${path}`;
//               } else if (path) {
//                 previews[uiLabel] = 'PDF Uploaded';
//               }
//             }
//           }
//           setDocumentPreviews(previews);

//           return;
//         }
//       } catch (err) {
//         if (!err.response || err.response.status !== 404) {
//           console.warn('Error fetching profile:', err);
//         }
//       } finally {
//         setLoading(false);
//       }

//       try {
//         const user = await getUser();
//         console.log("user data", user)
//         if (user) {
//           setFormValues(prev => ({
//             ...prev,
//             firstName: user.name || '',
//             lastName: user.lastName || '',
//             email: user.email || '',
//             phoneNumber: user.mobileNumber?.toString().slice(2) || '',
//             displayName: user.displayName || '',
//             designation: user.designation || '',
//             experience: user.experience || '1 year'
//           }));
//           return;
//         }
//       } catch (err) {
//         if (!err.response || err.response.status !== 404) {
//           console.warn('Error fetching user:', err);
//         }
//       } finally {
//         setLoading(false);
//       }

//       setFormValues(prev => ({
//         ...prev,
//         firstName: '',
//         lastName: '',
//         email: '',
//         phoneNumber: '',
//         displayName: '',
//         designation: '',
//         experience: '1 year'
//       }));
//     };

//     fetchProfile();
//   }, []);
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormValues((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleLanguageChange = (e) => {
//     setFormValues((prev) => ({ ...prev, knownLanguages: e.target.value }));
//   };

//   const handleImageUpload = (e) => {
//     const file = e.target.files[0];
//     if (!file || file.size > MAX_FILE_SIZE_MB * 1024 * 1024) {
//       alert('File size exceeds 4MB.');
//       return;
//     }
//     setFormValues((prev) => ({ ...prev, profileImage: file }));
//     setPreviewImage(URL.createObjectURL(file));
//   };

//   const handleDocumentUpload = (label, e) => {
//     const file = e.target.files[0];
//     if (!file || file.size > MAX_FILE_SIZE_MB * 1024 * 1024) {
//       alert('File size exceeds 4MB.');
//       return;
//     }
//     setFormValues((prev) => ({
//       ...prev,
//       documents: {
//         ...prev.documents,
//         [label]: file
//       }
//     }));
//     setDocumentPreviews((prev) => ({
//       ...prev,
//       [label]: file.type.startsWith('image/') ? URL.createObjectURL(file) : 'PDF Uploaded'
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const data = new FormData();
//     for (const key in formValues) {
//       if (key === 'documents') {
//         Object.entries(formValues.documents).forEach(([docLabel, file]) => {
//           data.append(`documents[${docLabel}]`, file);
//         });
//       } else if (key === 'knownLanguages') {
//         formValues.knownLanguages.forEach((lang, i) => data.append(`knownLanguages[${i}]`, lang));
//       } else {
//         data.append(key, formValues[key]);
//       }
//     }

//     try {
//       const token = localStorage.getItem('token');
//       const config = {
//         headers: {
//           'Content-Type': 'multipart/form-data',
//           Authorization: `Bearer ${token}`,
//         },
//         onUploadProgress: (progressEvent) => {
//           const percent = Math.round((progressEvent.loaded * 100) / progressEvent.total);
//           setUploadProgress(percent);
//         },
//       };
//       const response = await axios.put('http://localhost:5000/api/profile/update-profile', data, config)
//       toast.success('Profile updated successfully!');
//       console.log(response.data);
//     } catch (err) {
//       console.error(err);
//       alert('Failed to save profile.');
//     }
//   };

//   return (
//     <Box sx={{ maxWidth: 1100, mx: 'auto', p: 4 }}>
//       <form onSubmit={handleSubmit} encType="multipart/form-data">
//         <Card variant="outlined">
//           <CardContent>
//             <Typography variant="h5" gutterBottom>Profile Image</Typography>
//             <UploadBox>
//               <Avatar
//                 variant="rounded"
//                 src={previewImage}
//                 sx={{ width: 80, height: 80, mb: 2 }}
//               />
//               <input
//                 type="file"
//                 accept="image/*"
//                 hidden
//                 id="upload-profile"
//                 onChange={handleImageUpload}
//               />
//               <label htmlFor="upload-profile">
//                 <Button variant="contained" size="small" component="span">Upload New</Button>
//               </label>
//               <Typography variant="caption" display="block" mt={1}>
//                 Your image should be below 4 MB. Accepted formats: jpg, png, svg.
//               </Typography>
//             </UploadBox>
//           </CardContent>
//         </Card>

//         <Card variant="outlined" sx={{ mt: 4 }}>
//           <CardContent>
//             <Typography variant="h5" gutterBottom>Information</Typography>
//             <Grid container spacing={2}>
//               {['firstName', 'lastName', 'displayName', 'designation', 'phoneNumber', 'email'].map((field) => (
//                 <Grid item xs={12} sm={field === 'email' || field === 'designation' ? 6 : 4} key={field}>
//                   <TextField
//                     fullWidth
//                     label={field.replace(/([A-Z])/g, ' $1')}
//                     name={field}
//                     value={formValues[field]}
//                     onChange={handleChange}
//                   />
//                 </Grid>
//               ))}
//               <Grid item xs={12}>
//                 <FormControl fullWidth>
//                   <InputLabel id="known-languages-label">Known Languages</InputLabel>
//                   <Select
//                     sx={{ width: 225 }}
//                     labelId="known-languages-label"
//                     multiple
//                     name="knownLanguages"
//                     value={formValues.knownLanguages}
//                     onChange={handleLanguageChange}
//                     input={<OutlinedInput label="Known Languages" />}
//                     renderValue={(selected) => (
//                       <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
//                         {selected.map((value) => (
//                           <Chip key={value} label={value} />
//                         ))}
//                       </Box>
//                     )}
//                   >
//                     {languages.map((language) => (
//                       <MenuItem key={language} value={language}>{language}</MenuItem>
//                     ))}
//                   </Select>
//                 </FormControl>
//               </Grid>
//             </Grid>
//           </CardContent>
//         </Card>

//         <Card variant="outlined" sx={{ mt: 4 }}>
//           <CardContent>
//             <Typography variant="h5" gutterBottom>Professional Details</Typography>
//             <Grid container spacing={2}>
//               {['qualification', 'licenseNumber', 'experience', 'hospitalsWorkedAt', 'specializations', 'skills'].map((field, index) => (
//                 <Grid item xs={12} sm={field === 'skills' ? 12 : 6} key={field}>
//                   <TextField
//                     fullWidth
//                     label={field.replace(/([A-Z])/g, ' $1')}
//                     name={field}
//                     value={formValues[field]}
//                     onChange={handleChange}
//                     placeholder={field === 'skills' ? 'Monitoring vitals, Elderly support...' : ''}
//                     multiline={field === 'skills'}
//                     rows={field === 'skills' ? 3 : 1}
//                   />
//                 </Grid>
//               ))}
//             </Grid>
//           </CardContent>
//         </Card>

//         <Card variant="outlined" sx={{ mt: 4 }}>
//           <CardContent>
//             <Typography variant="h5" gutterBottom>Documents Upload</Typography>
//             <Grid container spacing={2}>
//               {["ID Proof", "Education Certificates", "Nursing License", "Police Verification"].map((label) => (
//                 <Grid item xs={12} sm={6} key={label}>
//                   <UploadBox>
//                     <Typography variant="body2" fontWeight={600}>{label}</Typography>

//                     <input
//                       type="file"
//                       hidden
//                       id={`upload-${label}`}
//                       accept=".jpg,.jpeg,.png,.pdf"
//                       onChange={(e) => handleDocumentUpload(label, e)}
//                     />
//                     <label htmlFor={`upload-${label}`}>
//                       <Button variant="outlined" size="small" sx={{ mt: 1 }} component="span">
//                         Upload
//                       </Button>
//                     </label>

//                     <Typography variant="caption" display="block" mt={1}>
//                       Max size 4MB. Accepted formats: jpg, png, pdf.
//                     </Typography>

//                     {documentPreviews[label] && (
//                       <Box mt={1}>
//                         {documentPreviews[label].includes('blob:') || documentPreviews[label].includes('uploads') ? (
//                           documentPreviews[label].endsWith('.pdf') ? (
//                             <Typography color="success.main">PDF Uploaded</Typography>
//                           ) : (
//                             <img
//                               src={documentPreviews[label]}
//                               alt={label}
//                               style={{ maxWidth: '100%', height: 80, borderRadius: 4 }}
//                             />
//                           )
//                         ) : (
//                           <Typography color="error">Preview not available</Typography>
//                         )}
//                       </Box>
//                     )}
//                   </UploadBox>
//                 </Grid>
//               ))}
//             </Grid>
//           </CardContent>

//           <CardActions>
//             <Button variant="contained" fullWidth color="primary" size="large" type="submit">
//               Save Changes
//             </Button>
//           </CardActions>

//           {uploadProgress > 0 && uploadProgress < 100 && (
//             <LinearProgress variant="determinate" value={uploadProgress} sx={{ mt: 2 }} />
//           )}
//         </Card>
//       </form>
//     </Box>
//   );
// };



import React from 'react';
import {
  Box,
  Button,
  Grid,
  TextField,
  Typography,
  Avatar,
  Chip,
  Card,
  CardContent,
  CardActions,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  OutlinedInput,
  LinearProgress,
  useTheme
} from '@mui/material';
import styled from '@emotion/styled';
import { useProfileForm } from '../hooks/useProfileForm';

const UploadBox = styled(Box)({
  border: '2px dashed #ccc',
  borderRadius: '12px',
  padding: '16px',
  textAlign: 'center',
  background: '#f9f9f9'
});

const languages = ['Hindi', 'English', 'Marathi', 'Bengali', 'Tamil', 'Telugu'];

export const ProfileForm = () => {
  const theme = useTheme();
  const {
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
  } = useProfileForm();

  return (
    <Box sx={{ maxWidth: 1100, mx: 'auto', p: 4 }}>
      <form onSubmit={(e) => { e.preventDefault(); handleSubmit(); }} encType="multipart/form-data">
        <Card variant="outlined">
          <CardContent>
            <Typography variant="h5" gutterBottom>Profile Image</Typography>
            <UploadBox>
              <Avatar
                variant="rounded"
                src={previewImage}
                sx={{ width: 80, height: 80, mb: 2 }}
              />
              <input
                type="file"
                accept="image/*"
                hidden
                id="upload-profile"
                onChange={handleImageUpload}
              />
              <label htmlFor="upload-profile">
                <Button variant="contained" size="small" component="span">Upload New</Button>
              </label>
              <Typography variant="caption" display="block" mt={1}>
                Your image should be below 4 MB. Accepted formats: jpg, png, svg.
              </Typography>
            </UploadBox>
          </CardContent>
        </Card>

        <Card variant="outlined" sx={{ mt: 4 }}>
          <CardContent>
            <Typography variant="h5" gutterBottom>Information</Typography>
            <Grid container spacing={2}>
              {['firstName', 'lastName', 'displayName', 'designation', 'phoneNumber', 'email'].map((field) => (
                <Grid item xs={12} sm={field === 'email' || field === 'designation' ? 6 : 4} key={field}>
                  <TextField
                    fullWidth
                    label={field.replace(/([A-Z])/g, ' $1')}
                    name={field}
                    value={formValues[field]}
                    onChange={handleChange}
                  />
                </Grid>
              ))}
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel id="known-languages-label">Known Languages</InputLabel>
                  <Select
                    sx={{ width: 225 }}
                    labelId="known-languages-label"
                    multiple
                    name="knownLanguages"
                    value={formValues.knownLanguages}
                    onChange={handleLanguageChange}
                    input={<OutlinedInput label="Known Languages" />}
                    renderValue={(selected) => (
                      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                        {selected.map((value) => (
                          <Chip key={value} label={value} />
                        ))}
                      </Box>
                    )}
                  >
                    {languages.map((language) => (
                      <MenuItem key={language} value={language}>{language}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          </CardContent>
        </Card>

        <Card variant="outlined" sx={{ mt: 4 }}>
          <CardContent>
            <Typography variant="h5" gutterBottom>Professional Details</Typography>
            <Grid container spacing={2}>
              {['qualification', 'licenseNumber', 'experience', 'hospitalsWorkedAt', 'specializations', 'skills'].map((field) => (
                <Grid item xs={12} sm={field === 'skills' ? 12 : 6} key={field}>
                  <TextField
                    fullWidth
                    label={field.replace(/([A-Z])/g, ' $1')}
                    name={field}
                    value={formValues[field]}
                    onChange={handleChange}
                    placeholder={field === 'skills' ? 'Monitoring vitals, Elderly support...' : ''}
                    multiline={field === 'skills'}
                    rows={field === 'skills' ? 3 : 1}
                  />
                </Grid>
              ))}
            </Grid>
          </CardContent>
        </Card>

        <Card variant="outlined" sx={{ mt: 4 }}>
          <CardContent>
            <Typography variant="h5" gutterBottom>Documents Upload</Typography>
            <Grid container spacing={2}>
              {["ID Proof", "Education Certificates", "Nursing License", "Police Verification"].map((label) => (
                <Grid item xs={12} sm={6} key={label}>
                  <UploadBox>
                    <Typography variant="body2" fontWeight={600}>{label}</Typography>
                    <input
                      type="file"
                      hidden
                      id={`upload-${label}`}
                      accept=".jpg,.jpeg,.png,.pdf"
                      onChange={(e) => handleDocumentUpload(label, e)}
                    />
                    <label htmlFor={`upload-${label}`}>
                      <Button variant="outlined" size="small" sx={{ mt: 1 }} component="span">
                        Upload
                      </Button>
                    </label>
                    <Typography variant="caption" display="block" mt={1}>
                      Max size 4MB. Accepted formats: jpg, png, pdf.
                    </Typography>
                    {documentPreviews[label] && (
                      <Box mt={1}>
                        {documentPreviews[label].includes('blob:') || documentPreviews[label].includes('uploads') ? (
                          documentPreviews[label] === 'PDF Uploaded' ? (
                            <Typography color="success.main">PDF Uploaded</Typography>
                          ) : (
                            <img
                              src={documentPreviews[label]}
                              alt={label}
                              style={{ maxWidth: '100%', height: 80, borderRadius: 4 }}
                            />
                          )
                        ) : (
                          <Typography color="error">Preview not available</Typography>
                        )}
                      </Box>
                    )}
                  </UploadBox>
                </Grid>
              ))}
            </Grid>
          </CardContent>

          <CardActions>
            <Button variant="contained" fullWidth color="primary" size="large" type="submit">
              Save Changes
            </Button>
          </CardActions>

          {uploadProgress > 0 && uploadProgress < 100 && (
            <LinearProgress variant="determinate" value={uploadProgress} sx={{ mt: 2 }} />
          )}
        </Card>
      </form>
    </Box>
  );
};


