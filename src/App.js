import { useSelector } from 'react-redux';
import './App.css';
import { Navbar } from './components/common/Navbar';
import { Route, Routes } from 'react-router-dom';
import { Home } from './pages/Home';
import Login from './pages/Login';
import OpenRoute from './components/core/OpenRoute';
import Signup from './pages/Signup';
import OtpPage from './pages/OtpPage';
import { BookAppointment } from './components/Patient components/BookAppointment';
import { ViewDoctorInfo } from './components/Patient components/ViewDoctorInfo';
import { FinalConfirmAppointmentBooking } from './components/Patient components/FinalConfirmAppointmentBooking';
import { BookedAppointments } from './components/Patient components/BookedAppointments';
import { UpdateProfile } from './components/DoctorComponents/UpdateProfile';

function App() {

  const user = useSelector((state) => state.profile); 

  return (
    <div className="App">
      <Navbar />
      <Routes >

        {user.user === "Patient" && (
          <Route path= "/book-appointment" element = {
            <BookAppointment />
          } />
        )
        }
        {user.user === "Patient" && 
        (
          <Route path='/book-appointment/:doctorId' element = {
            <ViewDoctorInfo/>
          } />
        )
        }

        {user.user === "Patient" && (
          <Route path = '/booking-appointment/:doctorId/:slotId' element = {
            <FinalConfirmAppointmentBooking />
          } />
        )}

        {user.user === "Patient" && (
          <Route path ='/user-appointments' element={
            <BookedAppointments />
          }/>
        )}

        {user.user === 'Doctor' && (
          <Route path='/doctor-dashboard' element={
            <UpdateProfile/>
          }/>
        )}
        
      <Route path='/' element= {
        <Home />
      } />

        <Route path="/login" element=
        {
            <OpenRoute>
              <Login />
            </OpenRoute>
        }
        />

        <Route
          path="signup"
          element={
            <OpenRoute>
              
                <Signup />
              
            </OpenRoute>
          }
        />

        <Route
          path="verify-otp"
          element={
            <OpenRoute>
              <OtpPage/>
            </OpenRoute>
          }
        />

      </Routes>
    </div>
  );
}

export default App;
