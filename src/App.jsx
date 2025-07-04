import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { Signup } from './pages/auth/Signup';
import { Login } from './pages/auth/Login';
import { DashboardLayout } from './features/dashboard/components/DashboardLayout'; // Import your layout
import ProtectedRoute from './features/dashboard/components/ProtectedRoute';
import { Dashboard } from './pages/Dashboard/Dashboard';
import { Profile } from './pages/profile/Profile';
import { Availability } from './pages/availability/Availability';
import AppointmentsForm from './features/appointments/components/AppointmentsForm';
import HealthcareDashboard from './pages/Home/Home';
import MyPatientForm from './features/mypatients/components/patients/MyPatientForm';
import RequestForm from './features/Request/components/request/RequestForm';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HealthcareDashboard />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />

          <Route element={<ProtectedRoute />}>
            <Route path="/dashboard" element={<DashboardLayout />}>
              <Route index element={<Dashboard />} />
              <Route path="availability" element={<Availability />} />
              <Route path='settings' element={<Profile />} />
              <Route path='requests' element={<RequestForm />} />
              <Route path='appointments' element={<AppointmentsForm />} />
              <Route path='patients' element={<MyPatientForm/>} />

            </Route>
          </Route>

          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>

        <ToastContainer
          position="top-right"
          autoClose={2000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </BrowserRouter>
    </>
  );
}

export default App;