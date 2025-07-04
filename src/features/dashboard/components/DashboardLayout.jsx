// import { Box, Drawer, CssBaseline, Toolbar, List, Typography, Divider, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
// import { MedicalServices, People, CalendarToday, Settings, ExitToApp, Dashboard, RequestPage, ContactPage, EventAvailable } from '@mui/icons-material';
// import { Outlet, useNavigate, useLocation } from 'react-router-dom';
// import { useEffect } from 'react';

// const drawerWidth = 240;

// export const DashboardLayout = () => {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const user = JSON.parse(localStorage.getItem('user'));

//   useEffect(() => {
//     if (!user) navigate('/login');
//   }, [user, navigate]);

//   const menuItems = [
//     { text: 'Dashboard', icon: <Dashboard />, path: '/dashboard' },
//     { text: 'Requests', icon: <RequestPage />, path: '/dashboard/requests' },
//     { text: 'My Patients', icon: <ContactPage />, path: '/dashboard/patients' },
//     { text: 'Appointments', icon: <CalendarToday />, path: '/dashboard/appointments' },
//     { text: 'Availability', icon: <EventAvailable />, path: '/dashboard/availability' },
//     { text: 'Profile Settings', icon: <Settings />, path: '/dashboard/settings' },
//   ];

//   // Highlight the current active menu item
//   const isActive = (path) => {
//     return location.pathname === path || 
//            (path !== '/dashboard' && location.pathname.startsWith(path));
//   };

//   return (
//     <Box sx={{ display: 'flex' }}>
//       <CssBaseline />
//       <Drawer
//         variant="permanent"
//         sx={{
//           width: drawerWidth,
//           flexShrink: 0,
//           '& .MuiDrawer-paper': {
//             width: drawerWidth,
//             boxSizing: 'border-box',
//             backgroundColor: '#0d47a1',
//             color: 'white',
//           },
//         }}
//       >
//         <Toolbar sx={{ backgroundColor: '#1565c0' }}>
//           <Typography variant="h6">MediCare</Typography>
//         </Toolbar>
//         <Box sx={{ p: 2, textAlign: 'center' }}>
//           <Box
//             sx={{
//               width: 80,
//               height: 80,
//               borderRadius: '50%',
//               bgcolor: 'primary.main',
//               display: 'inline-flex',
//               alignItems: 'center',
//               justifyContent: 'center',
//               color: 'white',
//               fontSize: '2rem',
//               mb: 1
//             }}
//           >
//             {user?.name?.charAt(0)}
//           </Box>
//           <Typography variant="subtitle1">{user?.name}</Typography>
//           <Typography variant="caption" sx={{ color: 'primary.light' }}>
//             {user?.role}
//           </Typography>
//         </Box>
//         <Divider sx={{ borderColor: 'rgba(255,255,255,0.1)' }} />
//         <List>
//           {menuItems.map((item) => (
//             <ListItem key={item.text} disablePadding>
//               <ListItemButton 
//                 onClick={() => navigate(item.path)}
//                 sx={{
//                   backgroundColor: isActive(item.path) ? 'rgba(255, 255, 255, 0.16)' : 'inherit',
//                   '&:hover': {
//                     backgroundColor: 'rgba(255, 255, 255, 0.08)',
//                   }
//                 }}
//               >
//                 <ListItemIcon sx={{ color: 'white' }}>
//                   {item.icon}
//                 </ListItemIcon>
//                 <ListItemText 
//                   primary={item.text} 
//                   primaryTypographyProps={{
//                     fontWeight: isActive(item.path) ? 'bold' : 'normal'
//                   }}
//                 />
//               </ListItemButton>
//             </ListItem>
//           ))}
//         </List>
//         <Box sx={{ mt: 'auto', p: 2 }}>
//           <ListItemButton
//             onClick={() => {
//               localStorage.clear();
//               navigate('/login');
//             }}
//             sx={{ color: 'white' }}
//           >
//             <ListItemIcon sx={{ color: 'white' }}>
//               <ExitToApp />
//             </ListItemIcon>
//             <ListItemText primary="Logout" />
//           </ListItemButton>
//         </Box>
//       </Drawer>
//       <Box 
//         component="main" 
//         sx={{ 
//           flexGrow: 1, 
//           p: 3,
//           width: `calc(100% - ${drawerWidth}px)`,
//         }}
//       >
//         <Toolbar />
//         <Outlet />
//       </Box>
//     </Box>
//   );
// };



import { Box, CssBaseline, Toolbar } from '@mui/material';
import { Outlet, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import Sidebar, { SIDEBAR_WIDTH } from './Sidebar';

export const DashboardLayout = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    if (!user) navigate('/login');
  }, [user, navigate]);

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <Sidebar user={user} />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: `calc(100% - ${SIDEBAR_WIDTH}px)`,
        }}
      >
        <Toolbar />
        <Outlet />
      </Box>
    </Box>
  );
};

