const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema({
    gender: {
      type: String,
      enum: ["Male", "Female"],
    },
    specialization:{
        type:String,
    },
    yearsOfExperience:{
        type: Number,
    },
    city: {
        type: String,
        trim: true,
    },
    state:{
        type:String,
        trim: true,
    },
    availabilitySlot: [
        {
          day: { type: String, required: true },
          startTime: { type: String, required: true }, // Example: "10:00 AM"
          endTime: { type: String, required: true },   // Example: "5:00 PM"
        },
    ],
    bookedSlots: [
        {
          patientId: { type: mongoose.Schema.Types.ObjectId, ref: "UserModel", required: true },
          date: { type: String, required: true }, // Format: YYYY-MM-DD
          timeSlot: { type: String, required: true }, // Example: "10:30 AM - 11:00 AM"
          status: {
            type: String,
            enum: ["Pending", "Completed"],
            default: "Pending",
          }
        },
      ],
    patientAppointments: [
        {
          doctorId: { type: mongoose.Schema.Types.ObjectId, ref: "UserModel", required: true },
          date: { type: String, required: true }, // Format: YYYY-MM-DD
          timeSlot: { type: String, required: true }, // Example: "10:30 AM - 11:00 AM"
        },
    ],
  });
  
  module.exports = mongoose.model("ProfileModel", profileSchema);
  