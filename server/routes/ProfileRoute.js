// Import the required modules
const express = require("express");
const router = express.Router();

// Import the required controller
const {
    updateProfile,
    setAvailabilitySlots,
    getAllDoctors,
    getDoctorAndBookSlot,
    bookSlot,
    getPatientAppointments,
    cancelAppointment
} = require("../controllers/Profile");

// Import the required middleware
const {auth, isPatient} = require("../middlewares/auth");

// ===================================Profile ROUTES==============================================
router.post("/update-profile", auth, updateProfile);

router.post("/set-availability-slots", auth, setAvailabilitySlots);

router.get("/get-all-doctors", getAllDoctors);

router.get("/get-doctor-by-id/:doctorId", getDoctorAndBookSlot);

router.post("/book-slot/:doctorId/:slotId", auth, isPatient, bookSlot);

router.get("/get-patient-appointments", auth, isPatient, getPatientAppointments);

router.delete("/cancel-appointment/:appointmentId", auth, isPatient, cancelAppointment);

module.exports = router;