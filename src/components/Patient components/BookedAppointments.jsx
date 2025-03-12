import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { cancelAppointment, getPatientAllAppointments } from '../../services/operations/userAPI';

export const BookedAppointments = () => {
    const dispatch = useDispatch();
    const [bookedAppointments, setBookedAppointments] = useState([]);
    const { token } = useSelector((state) => state.auth);

    useEffect(() => {
        const fetchBookedAppointment = async () => {
            const response = await dispatch(getPatientAllAppointments(token));
            
            if (response) {
                setBookedAppointments(response.data.additionalDetails.patientAppointments);
            }
        }

        fetchBookedAppointment();
    }, [dispatch, token]);

    const handleCancelAppointment = (appointmentId) => {
 
        dispatch(cancelAppointment(token, appointmentId));
    }
   

    return (
        <div className="p-4">
            <h2 className="text-2xl font-bold mb-4">Booked Appointments</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {bookedAppointments.map((appointment) => (
                    <div key={appointment._id} className="bg-blue-50 border border-blue-500 rounded-lg p-4">
                        <p><strong>Doctor ID:</strong> {appointment.doctorId}</p>
                        <p><strong>Date:</strong> {new Date(appointment.date).toLocaleDateString()}</p>
                        <p><strong>Start Time:</strong> {new Date(appointment.startTime).toLocaleTimeString()}</p>
                        <p><strong>End Time:</strong> {new Date(appointment.endTime).toLocaleTimeString()}</p>

                        <button
                            className="mt-2 bg-red-500 text-white py-1 px-2 rounded"
                            onClick={() => handleCancelAppointment(appointment._id)}
                        >
                            Cancel Appointment
                        </button>
                    </div>
                ))}
            </div>
        </div>
    )
}