import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  Chip,
  Box,
  Skeleton
} from '@mui/material';
import { MedicalServices, CheckCircle, Cancel } from '@mui/icons-material';

const ClinicsAvailability = ({ clinics = [], loading }) => {
  return (
    <Card sx={{ 
      height: '100%',
      borderRadius: 2,
      boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.05)'
    }}>
      <CardContent>
        <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
          Clinics & Availability
        </Typography>
        <Divider sx={{ mb: 2 }} />
        
        <List disablePadding>
          {loading ? (
            Array.from({ length: 4 }).map((_, index) => (
              <ListItem key={`clinic-skeleton-${index}`} sx={{ py: 1.5 }}>
                <ListItemAvatar>
                  <Skeleton variant="circular" width={40} height={40} />
                </ListItemAvatar>
                <ListItemText
                  primary={<Skeleton variant="text" width="60%" />}
                  secondary={<Skeleton variant="text" width="40%" />}
                />
                <Skeleton variant="rectangular" width={80} height={24} />
              </ListItem>
            ))
          ) : (
            clinics.map((clinic) => (
              <ListItem key={clinic.id} sx={{ py: 1.5 }}>
                <ListItemAvatar>
                  <Avatar sx={{ bgcolor: 'secondary.light', color: 'secondary.contrastText' }}>
                    <MedicalServices />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={
                    <Typography sx={{ fontWeight: 500 }}>
                      {clinic.name}
                    </Typography>
                  }
                  secondary={`${new Date(clinic.openTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} - ${new Date(clinic.closeTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`}
                />
                <Chip
                  label={clinic.available ? 'Available' : 'Full'}
                  size="small"
                  icon={clinic.available ? 
                    <CheckCircle fontSize="small" /> : 
                    <Cancel fontSize="small" />}
                  color={clinic.available ? 'success' : 'error'}
                  sx={{ minWidth: 90 }}
                />
              </ListItem>
            ))
          )}
        </List>
      </CardContent>
    </Card>
  );
};

export default ClinicsAvailability;