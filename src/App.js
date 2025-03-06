import { useSelector } from 'react-redux';
import './App.css';
import { Navbar } from './components/common/Navbar';
import { Route, Routes } from 'react-router-dom';
import { Home } from './pages/Home';
import Login from './pages/Login';
import OpenRoute from './components/core/OpenRoute';
import Signup from './pages/Signup';
import OtpPage from './pages/OtpPage';

function App() {

  const user = useSelector((state) => state.profile); 

  return (
    <div className="App">
      <Navbar />
      <Routes >

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
