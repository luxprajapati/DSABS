import { userEndpoints } from "../apis";
import {apiConnector} from "../apiconnector";
import toast from "react-hot-toast";
import { setLoading } from "../../slices/authSlice";

const {
    GETALLDOCTORS_API,
    GETDOCTORBYID_API,
    BOOKSLOT_API,
    GETPATIENTAPPOINTMENTS_API,
    CANCELAPPOINTMENT_API,
    UPDATEPROFILE_API
} = userEndpoints;

export function getAllDoctors(){
    return async(dispatch) => {
        try{
            const response = await apiConnector("GET", GETALLDOCTORS_API);
            return response.data;
        }catch(err){
            console.log("Failed to get all Doctors--", err);
        }
    }
}

export function getDoctorByID(doctorId) {
    return async (dispatch) => {
      const toastId = toast.loading("Loading...");
      dispatch(setLoading(true));
      try {
        const response = await apiConnector("GET", GETDOCTORBYID_API.replace(":doctorId", doctorId));
        
        toast.success("Doctor fetched successfully");
        return response.data;
      } catch (err) {
        console.log("Failed to get Doctor by ID--", err);
      } finally {
        dispatch(setLoading(false));
        toast.dismiss(toastId);
      }
    };
  }


export function getPatientAllAppointments(token){
    return async(dispatch) => {
        const toastId = toast.loading("Loading...");
        dispatch(setLoading(true));
        try{
            const response = await apiConnector("GET", GETPATIENTAPPOINTMENTS_API,{},
                {Authorization: `Bearer ${token}`,}
            );
          
            toast.success("All patient appointments fetched successfully");
            return response.data;
        }catch(err){
            console.log("Failed to get all patient appointments--", err);
        }
        finally{
            dispatch(setLoading(false));
            toast.dismiss(toastId);
        }
    }
}


export function bookSlot(token, doctorId, slotId, navigate) {
   
    return async (dispatch) => {
        const toastId = toast.loading("Loading...");
        dispatch(setLoading(true));

        const API = BOOKSLOT_API.replace(":doctorId", doctorId).replace(":slotId", slotId);
        try {
            const response = await apiConnector("POST",API,{}, 
                {Authorization: `Bearer ${token}`,}
            );
        
            toast.success("Slot Booked Successfully");
            navigate('/user-appointments');
            return response.data;
        } catch (err) {
            console.log("Failed to book slot--", err);
            toast.error("Failed to book slot");
        } finally {
            dispatch(setLoading(false));
            toast.dismiss(toastId);
        }
    }
}

export function cancelAppointment(token, appointmentId){
    return async(dispatch) => {
        const toastId = toast.loading("Loading...");
        dispatch(setLoading(true));
        try{
            const response = await apiConnector("DELETE", CANCELAPPOINTMENT_API.replace(":appointmentId", appointmentId),{},
                {Authorization: `Bearer ${token}`,}
            );
      
            toast.success("Appointment cancelled successfully");
            return response.data;
        
        }catch(err){
            console.log("Failed to cancel appointment--", err);
            toast.error("Failed to cancel appointment");
        }
        finally{
            dispatch(setLoading(false));
            toast.dismiss(toastId);
        }
    }
}

export function updateProfile(token, formdata){
    return async(dispatch) =>{
        const toastId = toast.loading("Loading...");
        dispatch(setLoading(true));
        try{
            const response = await apiConnector("PUT", UPDATEPROFILE_API, formdata, 
                {Authorization: `Bearer ${token}`,}
            );
 
            toast.success("Profile updated successfully");
            return response.data;
        }catch(err){
            console.log("Failed to update profile--", err);
            toast.error("Failed to update profile");
        }finally{
            dispatch(setLoading(false));
            toast.dismiss(toastId);
        }
    }
}