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
    consultationLocation:{
      type: String,
      trim: true,
    },
    availabilitySlot: [
        {
          day: { type: Date, required: true },
          startTime: { type: Date, required: true }, // Example: "10:00 AM"
          endTime: { type: Date, required: true },   // Example: "5:00 PM"
          booked: { type: Boolean, default: false },
        },
    ],
    patientAppointments: [
        {
          doctorId: { type: mongoose.Schema.Types.ObjectId, ref: "UserModel", required: true },
          date: { type: Date, required: true }, 
          startTime: {type: Date, require: true},
          endTime: {type: Date, require: true} 
        },
    ],
  });
  
  module.exports = mongoose.model("ProfileModel", profileSchema);
  