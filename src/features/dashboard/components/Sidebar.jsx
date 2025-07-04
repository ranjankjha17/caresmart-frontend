import {
  Box,
  Drawer,
  Toolbar,
  Typography,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import {
  Dashboard,
  RequestPage,
  ContactPage,
  CalendarToday,
  EventAvailable,
  Settings,
  ExitToApp,
} from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';
import { useState } from 'react';

const drawerWidth = 240;

const Sidebar = ({ user }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { text: 'Dashboard', icon: <Dashboard />, path: '/dashboard' },
    { text: 'Requests', icon: <RequestPage />, path: '/dashboard/requests' },
    { text: 'My Patients', icon: <ContactPage />, path: '/dashboard/patients' },
    { text: 'Appointments', icon: <CalendarToday />, path: '/dashboard/appointments' },
    { text: 'Availability', icon: <EventAvailable />, path: '/dashboard/availability' },
    { text: 'Profile Settings', icon: <Settings />, path: '/dashboard/settings' },
  ];

  const isActive = (path) =>
    location.pathname === path || (path !== '/dashboard' && location.pathname.startsWith(path));

  const [formData, setFormData] = useState({
    availabilityText: 'I am Available Now',
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          boxSizing: 'border-box',
          backgroundColor: '#0d47a1',
          color: 'white',
        },
      }}
    >
      <Toolbar sx={{ backgroundColor: '#1565c0' }}>
        <Typography variant="h6">CARESMART</Typography>
      </Toolbar>

      <Box sx={{ p: 2, textAlign: 'center' }}>
        <Box
          sx={{
            width: 80,
            height: 80,
            borderRadius: '50%',
            bgcolor: 'primary.main',
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            fontSize: '2rem',
            mb: 1,
          }}
        >
          {user?.name?.charAt(0)}
        </Box>
        <Typography variant="subtitle1">{user?.name}</Typography>
        <Typography variant="caption" sx={{ color: 'primary.light' }}>
          {user?.role}
        </Typography>

        <FormControl fullWidth margin="normal">
          <InputLabel
            id="availability-label"
            sx={{ color: 'white' }}
          >
            Availability
          </InputLabel>

          <Select
            labelId="availability-label"
            name="availabilityText"
            value={formData.availabilityText}
            label="Availability"
            onChange={handleInputChange}
            sx={{
              color: 'white',
              '.MuiOutlinedInput-notchedOutline': {
                borderColor: 'white',
              },
              '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                borderColor: 'white',
              },
              '&:hover .MuiOutlinedInput-notchedOutline': {
                borderColor: 'white',
              },
              '.MuiSvgIcon-root': {
                color: 'white',
              },
            }}
          >
            <MenuItem value="I am Available Now" sx={{ color: 'black' }}>
              I am Available Now
            </MenuItem>
            <MenuItem value="I am Not Available" sx={{ color: 'black' }}>
              Not Available
            </MenuItem>
          </Select>
        </FormControl>
      </Box>

      <Divider sx={{ borderColor: 'rgba(255,255,255,0.1)' }} />

      <List>
        {menuItems.map((item) => (
          <ListItem key={item.text} disablePadding>
            <ListItemButton
              onClick={() => navigate(item.path)}
              sx={{
                backgroundColor: isActive(item.path) ? 'rgba(255, 255, 255, 0.16)' : 'inherit',
                '&:hover': {
                  backgroundColor: 'rgba(255, 255, 255, 0.08)',
                },
              }}
            >
              <ListItemIcon sx={{ color: 'white' }}>{item.icon}</ListItemIcon>
              <ListItemText
                primary={item.text}
                primaryTypographyProps={{
                  fontWeight: isActive(item.path) ? 'bold' : 'normal',
                }}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>

      <Box sx={{ mt: 'auto', p: 2 }}>
        <ListItemButton
          onClick={() => {
            localStorage.clear();
            navigate('/login');
          }}
          sx={{ color: 'white' }}
        >
          <ListItemIcon sx={{ color: 'white' }}>
            <ExitToApp />
          </ListItemIcon>
          <ListItemText primary="Logout" />
        </ListItemButton>
      </Box>
    </Drawer>
  );
};

export default Sidebar;
export const SIDEBAR_WIDTH = drawerWidth;
