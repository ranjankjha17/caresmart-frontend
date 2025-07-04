import React, { useState } from 'react';
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  Divider,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Avatar,
  Chip
} from '@mui/material';
import {
  People,
  Today,
  Schedule,
  LocalHospital,
  FilterList,
  ArrowDropDown,
  ArrowDropUp,
  CheckCircle,
  Warning,
  Error
} from '@mui/icons-material';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// Sample data
const patientData = [
  { name: 'Jan', patients: 120 },
  { name: 'Feb', patients: 210 },
  { name: 'Mar', patients: 180 },
  { name: 'Apr', patients: 280 },
  { name: 'May', patients: 190 },
  { name: 'Jun', patients: 240 },
];

const todayAppointments = [
  { id: 1, patient: 'John Smith', time: '09:00 AM', status: 'Confirmed', priority: 'High' },
  { id: 2, patient: 'Maria Garcia', time: '10:30 AM', status: 'Confirmed', priority: 'Medium' },
  { id: 3, patient: 'Robert Chen', time: '01:15 PM', status: 'Pending', priority: 'Low' },
  { id: 4, patient: 'Emma Wilson', time: '03:45 PM', status: 'Confirmed', priority: 'High' },
];

const recentPatients = [
  { id: 1, name: 'John Smith', lastVisit: '2 days ago', condition: 'Post-op recovery' },
  { id: 2, name: 'Maria Garcia', lastVisit: '1 week ago', condition: 'Diabetes management' },
  { id: 3, name: 'Robert Chen', lastVisit: '3 days ago', condition: 'Physical therapy' },
  { id: 4, name: 'Emma Wilson', lastVisit: 'Yesterday', condition: 'Wound care' },
];

const DashboardForm = () => {
  const [timeFilter, setTimeFilter] = useState('today');
  const [departmentFilter, setDepartmentFilter] = useState('all');
  const [priorityFilter, setPriorityFilter] = useState('all');

  // Metrics data
  const metrics = [
    { title: 'Total Patients', value: '1,248', icon: <People fontSize="large" />, change: '+12%', trend: 'up' },
    { title: 'Patients Today', value: '42', icon: <Today fontSize="large" />, change: '+5%', trend: 'up' },
    { title: 'Appointments Today', value: '28', icon: <Schedule fontSize="large" />, change: '-3%', trend: 'down' },
    { title: 'Critical Cases', value: '7', icon: <LocalHospital fontSize="large" />, change: '0%', trend: 'neutral' },
  ];

  return (
    <Box sx={{ p: 3 }}>
      {/* Header */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" fontWeight="bold">
          Nursing Dashboard
        </Typography>
        
        {/* Filters */}
        <Box sx={{ display: 'flex', gap: 2 }}>
          <FormControl size="small" sx={{ minWidth: 120 }}>
            <InputLabel>Time Range</InputLabel>
            <Select
              value={timeFilter}
              onChange={(e) => setTimeFilter(e.target.value)}
              label="Time Range"
              startAdornment={<FilterList sx={{ mr: 1 }} />}
            >
              <MenuItem value="today">Today</MenuItem>
              <MenuItem value="week">This Week</MenuItem>
              <MenuItem value="month">This Month</MenuItem>
            </Select>
          </FormControl>
          
          <FormControl size="small" sx={{ minWidth: 120 }}>
            <InputLabel>Department</InputLabel>
            <Select
              value={departmentFilter}
              onChange={(e) => setDepartmentFilter(e.target.value)}
              label="Department"
            >
              <MenuItem value="all">All Departments</MenuItem>
              <MenuItem value="emergency">Emergency</MenuItem>
              <MenuItem value="surgery">Surgery</MenuItem>
              <MenuItem value="pediatrics">Pediatrics</MenuItem>
              <MenuItem value="oncology">Oncology</MenuItem>
            </Select>
          </FormControl>
          
          <FormControl size="small" sx={{ minWidth: 120 }}>
            <InputLabel>Priority</InputLabel>
            <Select
              value={priorityFilter}
              onChange={(e) => setPriorityFilter(e.target.value)}
              label="Priority"
            >
              <MenuItem value="all">All Priorities</MenuItem>
              <MenuItem value="high">High</MenuItem>
              <MenuItem value="medium">Medium</MenuItem>
              <MenuItem value="low">Low</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </Box>

      {/* Metrics Cards */}
      <Grid container spacing={3} sx={{ mb: 3 }}>
        {metrics.map((metric, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Card sx={{ height: '100%', borderRadius: 2 }}>
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Box>
                    <Typography color="text.secondary" gutterBottom>
                      {metric.title}
                    </Typography>
                    <Typography variant="h4" fontWeight="bold">
                      {metric.value}
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                      {metric.trend === 'up' && <ArrowDropUp color="success" />}
                      {metric.trend === 'down' && <ArrowDropDown color="error" />}
                      <Typography 
                        variant="body2" 
                        color={metric.trend === 'up' ? 'success.main' : metric.trend === 'down' ? 'error.main' : 'text.secondary'}
                      >
                        {metric.change}
                      </Typography>
                    </Box>
                  </Box>
                  <Box sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: 56,
                    height: 56,
                    borderRadius: '50%',
                    bgcolor: 'primary.light',
                    color: 'primary.main'
                  }}>
                    {metric.icon}
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Charts and Tables */}
      <Grid container spacing={3}>
        {/* Patient Trend Chart */}
        <Grid item xs={12} md={8}>
          <Card sx={{ height: '100%', borderRadius: 2 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Patient Admissions Trend
              </Typography>
              <Divider sx={{ mb: 2 }} />
              <Box sx={{ height: 300 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={patientData}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line 
                      type="monotone" 
                      dataKey="patients" 
                      stroke="#3f51b5" 
                      strokeWidth={2}
                      activeDot={{ r: 6 }} 
                    />
                  </LineChart>
                </ResponsiveContainer>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Today's Appointments */}
        <Grid item xs={12} md={4}>
          <Card sx={{ height: '100%', borderRadius: 2 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Today's Appointments
              </Typography>
              <Divider sx={{ mb: 2 }} />
              <TableContainer>
                <Table size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell>Patient</TableCell>
                      <TableCell>Time</TableCell>
                      <TableCell align="right">Status</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {todayAppointments.map((appointment) => (
                      <TableRow key={appointment.id} hover>
                        <TableCell>
                          <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <Avatar sx={{ width: 32, height: 32, mr: 1.5, bgcolor: 'primary.light' }}>
                              {appointment.patient.charAt(0)}
                            </Avatar>
                            {appointment.patient}
                          </Box>
                        </TableCell>
                        <TableCell>{appointment.time}</TableCell>
                        <TableCell align="right">
                          <Chip 
                            label={appointment.status} 
                            size="small"
                            color={appointment.status === 'Confirmed' ? 'success' : 'warning'}
                            icon={appointment.status === 'Confirmed' ? <CheckCircle /> : <Warning />}
                          />
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </CardContent>
          </Card>
        </Grid>

        {/* Recent Patients */}
        <Grid item xs={12} md={6}>
          <Card sx={{ borderRadius: 2 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Recent Patients
              </Typography>
              <Divider sx={{ mb: 2 }} />
              <TableContainer component={Paper} elevation={0}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Patient</TableCell>
                      <TableCell>Last Visit</TableCell>
                      <TableCell>Condition</TableCell>
                      <TableCell align="right">Action</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {recentPatients.map((patient) => (
                      <TableRow key={patient.id} hover>
                        <TableCell>
                          <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <Avatar sx={{ width: 32, height: 32, mr: 1.5, bgcolor: 'secondary.light' }}>
                              {patient.name.charAt(0)}
                            </Avatar>
                            {patient.name}
                          </Box>
                        </TableCell>
                        <TableCell>{patient.lastVisit}</TableCell>
                        <TableCell>
                          <Chip 
                            label={patient.condition} 
                            size="small" 
                            variant="outlined"
                          />
                        </TableCell>
                        <TableCell align="right">
                          <IconButton size="small">
                            <Schedule fontSize="small" />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </CardContent>
          </Card>
        </Grid>

        {/* Critical Alerts */}
        <Grid item xs={12} md={6}>
          <Card sx={{ borderRadius: 2 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Critical Alerts
              </Typography>
              <Divider sx={{ mb: 2 }} />
              <Box sx={{ 
                p: 2, 
                backgroundColor: 'error.light', 
                borderRadius: 1,
                mb: 2,
                display: 'flex',
                alignItems: 'center'
              }}>
                <Error sx={{ color: 'error.main', mr: 1 }} />
                <Typography color="error.main">
                  <strong>John Smith</strong> - Blood pressure critically high (180/110)
                </Typography>
              </Box>
              <Box sx={{ 
                p: 2, 
                backgroundColor: 'warning.light', 
                borderRadius: 1,
                mb: 2,
                display: 'flex',
                alignItems: 'center'
              }}>
                <Warning sx={{ color: 'warning.main', mr: 1 }} />
                <Typography color="warning.main">
                  <strong>Maria Garcia</strong> - Blood sugar levels elevated (280 mg/dL)
                </Typography>
              </Box>
              <Box sx={{ 
                p: 2, 
                backgroundColor: 'warning.light', 
                borderRadius: 1,
                display: 'flex',
                alignItems: 'center'
              }}>
                <Warning sx={{ color: 'warning.main', mr: 1 }} />
                <Typography color="warning.main">
                  <strong>Robert Chen</strong> - Missed medication dose
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default DashboardForm;