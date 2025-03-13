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
import { Slots } from './components/DoctorComponents/Slots';

function App() {

  const {user} = useSelector((state) => state.profile);

  // console.log("APP.JS USER---", user);                          

  return (
    <div className="App">
      <Navbar />

      <Routes>
      <Route path='/' element= {
        <Home />
      }/>

        <Route path="/login" element={
            <OpenRoute>
              <Login />
            </OpenRoute>
          }/>

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
          }/>

        {user?.user?.accountType === "Patient" && (
          <>

          <Route path= "/book-appointment" element = {
            <BookAppointment />
          } />

          <Route path='/book-appointment/:doctorId' element = {
            <ViewDoctorInfo/>
          }/>

          <Route path = '/booking-appointment/:doctorId/:slotId' element = {
            <FinalConfirmAppointmentBooking />
          }/>

          <Route path ='/user-appointments' element={
            <BookedAppointments />
          }/>
          </>
        )}
        
        {user?.user?.accountType === 'Doctor' && (
            <>
              <Route path='/doctor-dashboard' element={
                <UpdateProfile />
              }/>
              <Route path='/edit-profile' element={
                <UpdateProfile />
              }/>

              <Route path='/slots' element={
                <Slots />
              }/>
            </>
          )}

      </Routes>
    </div>

    
  );
}

export default App;
