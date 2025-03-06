import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { getAllDoctors } from '../../services/operations/userAPI';
import { NavLink } from 'react-router-dom';

export const BookAppointment = () => {
  const dispatch = useDispatch();
  const [allDoctors, setAllDoctors] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchAllDoctors = async () => {
      const response = await dispatch(getAllDoctors());
      if (response) {
        setAllDoctors(response.data);
      }
    };
    fetchAllDoctors();
  }, [dispatch]);

 
  const filteredDoctors = allDoctors.filter((doctor) =>
    doctor.additionalDetails?.specialization?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  console.log("Filtered Doctors--", filteredDoctors);

  console.log("All Doctors in jsx--", allDoctors);

  return (
    <div className="p-4">
      <input
        type="text"
        placeholder="Search by specialization"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full p-2 border border-blue-500 rounded mb-4"
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {filteredDoctors.map((doctor) => (
          <div key={doctor._id} className="p-4 border border-blue-500 rounded bg-white">
            <h2 className="text-blue-500 font-bold">Dr. {doctor.firstName} {doctor.lastName}</h2>
            <p>City: {doctor.additionalDetails.city}</p>
            <p>State: {doctor.additionalDetails.state}</p>
            <p  >Specialization: {doctor.additionalDetails.specialization}</p>
            <p>Years of Experience: {doctor.additionalDetails.yearsOfExperience}</p>
            <NavLink to = {`/book-appointment/${doctor._id}`} >
            <button className="mt-2 p-2 px-8 bg-blue-500 text-white rounded">View </button></NavLink>
          </div>
        ))}
      </div>
    </div>
  );
};