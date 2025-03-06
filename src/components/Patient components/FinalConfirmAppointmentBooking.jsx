import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom'
import { bookSlot } from '../../services/operations/userAPI';
import toast from  "react-hot-toast"


export const FinalConfirmAppointmentBooking = () => {
    const { doctorId, slotId } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const {token} = useSelector((state) => state.auth);

    useEffect(() => {
        const bookAppointment = async () => {
            try {
                const response = await dispatch(bookSlot(token,doctorId, slotId, navigate));
                if (response) {
                    toast.success("Slot booked successfully!");
                } else {
                    toast.error("Failed to book slot.");
                }
            } catch (error) {
                toast.error("An error occurred while booking the slot.");
            } finally {
                setLoading(false);
            }
        };
        bookAppointment();
    }, [dispatch, doctorId, slotId, navigate]);

    if (loading) {
        return <div>Loading...</div>;
    }
  return (
    <div></div>
  )
}
