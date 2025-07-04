import React from 'react';
import {
  Box,
  Typography,
  Avatar,
  Divider,
  Chip,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Button,
  Paper,
  IconButton
} from '@mui/material';
import {
  Person,
  MedicalInformation,
  LocalHospital,
  CalendarToday,
  Medication,
  Warning,
  MonitorHeart,
  Thermostat,
  Favorite,
  Close,
  Notes,
  Opacity
} from '@mui/icons-material';

const MobilePatientDetails = ({ patient, onClose, onUpdateVitals }) => {
  return (
    <Box sx={{ p: 2 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h6" fontWeight="bold">
          Patient Details
        </Typography>
        <IconButton onClick={onClose}>
          <Close />
        </IconButton>
      </Box>

      <Paper elevation={0} sx={{ p: 2, mb: 2, backgroundColor: 'grey.50', borderRadius: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <Avatar sx={{ 
            width: 64, 
            height: 64, 
            mr: 2,
            bgcolor: 'primary.light'
          }}>
            {patient.name.charAt(0)}
          </Avatar>
          <Box>
            <Typography variant="h6">{patient.name}</Typography>
            <Chip 
              label={`ID: ${patient.patientId}`} 
              size="small" 
              color="primary"
              variant="outlined"
              sx={{ mt: 0.5 }}
            />
          </Box>
        </Box>

        <List dense>
          <ListItem>
            <ListItemAvatar>
              <Avatar sx={{ bgcolor: 'secondary.light' }}>
                <Person />
              </Avatar>
            </ListItemAvatar>
            <ListItemText 
              primary="Age/Gender" 
              secondary={`${patient.age} years / ${patient.gender}`}
            />
          </ListItem>
          
          <ListItem>
            <ListItemAvatar>
              <Avatar sx={{ bgcolor: 'info.light' }}>
                <LocalHospital />
              </Avatar>
            </ListItemAvatar>
            <ListItemText 
              primary="Room/Ward" 
              secondary={patient.room}
            />
          </ListItem>

          <ListItem>
            <ListItemAvatar>
              <Avatar sx={{ bgcolor: 'warning.light' }}>
                <MedicalInformation />
              </Avatar>
            </ListItemAvatar>
            <ListItemText 
              primary="Diagnosis" 
              secondary={patient.diagnosis || 'Not specified'}
            />
          </ListItem>

          <ListItem>
            <ListItemAvatar>
              <Avatar sx={{ bgcolor: 'success.light' }}>
                <Person />
              </Avatar>
            </ListItemAvatar>
            <ListItemText 
              primary="Attending Physician" 
              secondary={patient.doctor || 'Not assigned'}
            />
          </ListItem>

          <ListItem>
            <ListItemAvatar>
              <Avatar sx={{ 
                bgcolor: patient.status === 'Active' ? 
                  'success.light' : 
                  'error.light'
              }}>
                {patient.status === 'Active' ? 'A' : 'I'}
              </Avatar>
            </ListItemAvatar>
            <ListItemText 
              primary="Status" 
              secondary={patient.status}
            />
          </ListItem>

          <ListItem>
            <ListItemAvatar>
              <Avatar sx={{ bgcolor: 'error.light' }}>
                <Medication />
              </Avatar>
            </ListItemAvatar>
            <ListItemText 
              primary="Medications" 
              secondary={patient.medications?.join(', ') || 'None prescribed'}
              secondaryTypographyProps={{ sx: { wordBreak: 'break-word' } }}
            />
          </ListItem>

          <ListItem>
            <ListItemAvatar>
              <Avatar sx={{ bgcolor: 'warning.light' }}>
                <Warning />
              </Avatar>
            </ListItemAvatar>
            <ListItemText 
              primary="Allergies" 
              secondary={patient.allergies?.join(', ') || 'None reported'}
            />
          </ListItem>

          <ListItem>
            <ListItemAvatar>
              <Avatar sx={{ bgcolor: 'info.light' }}>
                <CalendarToday />
              </Avatar>
            </ListItemAvatar>
            <ListItemText 
              primary="Next Checkup" 
              secondary={patient.nextCheckup || 'Not scheduled'}
            />
          </ListItem>

          {patient.vitalSigns && (
            <>
              <ListItem>
                <ListItemAvatar>
                  <Avatar sx={{ bgcolor: 'error.light' }}>
                    <MonitorHeart />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText 
                  primary="Blood Pressure" 
                  secondary={patient.vitalSigns.bloodPressure || '--/--'}
                />
              </ListItem>

              <ListItem>
                <ListItemAvatar>
                  <Avatar sx={{ bgcolor: 'warning.light' }}>
                    <Thermostat />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText 
                  primary="Temperature" 
                  secondary={patient.vitalSigns.temperature ? `${patient.vitalSigns.temperature}°C` : '--'}
                />
              </ListItem>

              <ListItem>
                <ListItemAvatar>
                  <Avatar sx={{ bgcolor: 'error.light' }}>
                    <Favorite />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText 
                  primary="Pulse Rate" 
                  secondary={patient.vitalSigns.pulse ? `${patient.vitalSigns.pulse} bpm` : '--'}
                />
              </ListItem>

              <ListItem>
                <ListItemAvatar>
                  <Avatar sx={{ bgcolor: 'info.light' }}>
                    <Opacity />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText 
                  primary="Oxygen Level" 
                  secondary={patient.vitalSigns.oxygenLevel ? `${patient.vitalSigns.oxygenLevel}%` : '--'}
                />
              </ListItem>
            </>
          )}

          <ListItem>
            <ListItemAvatar>
              <Avatar sx={{ bgcolor: 'primary.light' }}>
                <Notes />
              </Avatar>
            </ListItemAvatar>
            <ListItemText 
              primary="Clinical Notes" 
              secondary={patient.notes || 'No notes available'}
              secondaryTypographyProps={{ whiteSpace: 'pre-wrap' }}
            />
          </ListItem>
        </List>
      </Paper>

      <Box sx={{ display: 'flex', gap: 2 }}>
        <Button
          variant="outlined"
          fullWidth
          onClick={onClose}
        >
          Close
        </Button>
        <Button
          variant="contained"
          color="primary"
          fullWidth
          onClick={onUpdateVitals}
        >
          Update Vitals
        </Button>
      </Box>
    </Box>
  );
};

export default MobilePatientDetails;