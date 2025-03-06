const BASE_URL = process.env.REACT_APP_BASE_URI;
console.log("BASE_URL", BASE_URL);

// AuthEndpoints
export const endpoints = {
    SENDOTP_API: BASE_URL + "/auth/sendotp",
    SIGNUP_API: BASE_URL + "/auth/signup",
    LOGIN_API: BASE_URL + "/auth/login",
}

// UserEndpoints
export const userEndpoints = {
    GETALLDOCTORS_API: BASE_URL + "/profile/get-all-doctors",
    GETDOCTORBYID_API: BASE_URL + "/profile/get-doctor-by-id/:doctorId",
    BOOKSLOT_API: BASE_URL + "/profile/book-slot/:doctorId/:slotId",
    GETPATIENTAPPOINTMENTS_API: BASE_URL + "/profile/get-patient-appointments",
    CANCELAPPOINTMENT_API: BASE_URL + "/profile/cancel-appointment/:appointmentId",
    GETDOCTORAPPOINTMENTS_API: BASE_URL + "/profile/get-doctor-appointments",
    UPDATEPROFILE_API: BASE_URL + "/profile/update-profile",
}