import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { getDoctorByID } from '../../services/operations/userAPI';
import { useNavigate, useParams } from 'react-router-dom';

export const ViewDoctorInfo = () => {

    const dispatch = useDispatch();
    const [doctor, setDoctor] = useState(null);
    const navigate = useNavigate();

    const doctorId = useParams().doctorId;

    useEffect(()=> {
        const fetchDoctor = async() =>{
            const response = await dispatch(getDoctorByID(doctorId));
            if(response){
                setDoctor(response.data);
            }
        }
        fetchDoctor();
    }, [dispatch]);

    

    if (!doctor) {
        return <div>Loading...</div>;
    }

    const handleBookSlot = (slotId) => {
 
        const navigateUrl = `/booking-appointment/${doctorId}/${slotId}`;
     
        navigate(navigateUrl);
    }

    return (
        <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
            <h1 className='text-xl font-bold text-left'> Dr. {doctor.firstName} {doctor.lastName}</h1>
            <p className='text-left'><strong>Specialization:</strong> {doctor.additionalDetails.specialization}</p>
            <p className='text-left'><strong>Years of Experience:</strong> {doctor.additionalDetails.yearsOfExperience}</p>
            <p className='text-left'><strong>City:</strong> {doctor.additionalDetails.city}</p>
            <p className='text-left'><strong>State:</strong> {doctor.additionalDetails.state}</p>
            <p className='text-left'><strong>Consultation Location:</strong> {doctor.additionalDetails.consultationLocation}</p>

            <h1 className='text-xl font-semibold uppercase underline mt-10'>Available Slots</h1>
            <div style={{ display: 'flex', flexWrap: 'wrap'  }} className='justify-evenly'>
                {doctor.additionalDetails.availabilitySlot.map((slot, index) => (
                    <div key={index} style={{ 
                        border: '1px solid #ccc', 
                        borderRadius: '5px', 
                        padding: '10px', 
                        margin: '10px', 
                        backgroundColor: index % 2 === 0 ? '#f0f0f0' : '#e0e0e0' 
                    }}>
                        <p className='text-left'><strong>Date:</strong> {new Date(slot.day).toLocaleDateString()}</p>
                        <p className='text-left'><strong>Start Time:</strong> {new Date(slot.startTime).toLocaleTimeString()}</p>
                        <p className='text-left'><strong>End Time:</strong> {new Date(slot.endTime).toLocaleTimeString()}</p>
                        <button onClick={()=>{
                            handleBookSlot(slot._id);
                        }}  style={{ 
                            padding: '5px 20px', 
                            margin: '20px 0 0 0',
                            backgroundColor: '#007bff', 
                            color: '#fff', 
                            border: 'none', 
                            borderRadius: '3px', 
                            cursor: 'pointer' 
                        }}>Book Slot</button>
                    </div>
                ))}
            </div>
        </div>
    )
}