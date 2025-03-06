const { appointmentBookedTemplate } = require("../mail/templates/appointmentBookedTemplate");
const { appointmentCancelTemplate } = require("../mail/templates/appointmentCancelTemplate");
const ProfileModel = require("../models/ProfileModel");
const ProfilModel = require("../models/ProfileModel");
const UserModel = require("../models/UserModel");
const { mailSender } = require("../utils/mailSender");

exports.updateProfile = async (req, res) => {
    try{
        const {
            gender= "",
            specialization= "",
            yearsOfExperience = "",
            city = "",
            state = "",
            consultationLocation = "",
        }= req.body;


        const userId = req.user.id;
       

        const userDetail = await UserModel.findById(userId);
        if(!userDetail){
            console.log("User not found");
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        const profile = await ProfilModel.findById(userDetail.additionalDetails);

        if(userDetail.accountType === "Doctor"){
            profile.specialization = specialization;
            profile.yearsOfExperience = yearsOfExperience;
            profile.city = city;
            profile.state = state;
            profile.consultationLocation = consultationLocation;
        }
        profile.gender = gender;
        await profile.save();
        

        const updated_user_details = await UserModel.findById(userId)
        .populate("additionalDetails")
        .exec();

       

        return res.status(200).json({
            success: true,
            message: "Profile updated successfully in updateProfile function of Profile.js",
            data: updated_user_details,
        });

    }catch(err){
        console.log("Error in updateProfile function of Profile.js--", err);
        return res.status(500).json({
            success: false,
            message: "Error in updateProfile function of Profile.js",
        });
    }
}

exports.setAvailabilitySlots = async (req, res) => {
    try{
        const {
            day= "",
            startTime= "",
            endTime="",
        } = req.body;

        const timingSlotObj = {
            day: day,
            startTime: startTime,
            endTime: endTime,
        }

        const userId = req.user.id;
      
        if(!userId){
            console.log("User not found");
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        const userDetail = await UserModel.findById(userId);
        const profileDetails = await ProfilModel.findById(userDetail.additionalDetails);

        profileDetails.availabilitySlot.push(timingSlotObj);   

        await profileDetails.save();

        const updated_user_details = await UserModel.findById(userId)
        .populate({
            path: "additionalDetails",
            populate: {
                path: "availabilitySlot"
            }
        })
        .exec();

       

        return res.status(200).json({
            success: true,
            message: "Availability slots set successfully in setAvailabilitySlots function of Profile.js",
            data: updated_user_details,
        });

    }catch(err){
        console.log("Error whileing setting availability slots in setAvailabilitySlots function of Profile.js--", err);
        return res.status(500).json({
            success: false,
            message: "Error while setting availability slots in setAvailabilitySlots function of Profile.js",
        });
    }
}

exports.getAllDoctors = async (req, res) => {
    try{
        const allDoctors = await UserModel.find({accountType: "Doctor"})
        .populate("additionalDetails")
        .exec();

        if(!allDoctors){
            console.log("Doctors not found");
            return res.status(404).json({
                success: false,
                message: "Doctors not found",
            });
        }
       

        return res.status(200).json({
            success: true,
            message: "All doctors fetched successfully in getAllDoctors function of Profile.js",
            data: allDoctors,
        });

    }catch(err){
        console.log("Error in getAllDoctors function of Profile.js--", err);
        return res.status(500).json({
            success: false,
            message: "Error in getAllDoctors function of Profile.js",
        });
    }
}


exports.getDoctorAndBookSlot = async(req, res) => {
    try{
        const doctorId = req.params.doctorId;

        

        const doctor = await UserModel.findById(doctorId)
        .populate({
          path:"additionalDetails",
          populate: {
            path: "availabilitySlot" 
          }  
        })
        .exec();

        if(!doctor){
            console.log("Doctor not found");
            return res.status(404).json({
                success: false,
                message: "Doctor not found",
            });
        }

       

        return res.status(200).json({
            success: true,
            message: "Doctor fetched successfully in getDoctorById function of Profile.js",
            data: doctor,
        });
    }catch(err){
        console.log("Error while fetching doctor by ID in getDoctorById function of Profile.js--", err);
        return res.status(500).json({
            success:false,
            message: "Error while fetching doctor by ID in getDoctorById function of Profile.js",
        });
    }
}


exports.bookSlot = async (req, res) => {
    try{

        const doctorId = req.params.doctorId;
        const slotId = req.params.slotId;


        const userId = req.user.id;

        if(!userId){
            console.log("User not found");
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        const userDetail = await UserModel.findById(userId)
        .populate("additionalDetails")
        .exec();

        const doctorDetail = await UserModel.findById(doctorId)
        .populate("additionalDetails")
        .exec();

        if(userDetail.accountType !== "Patient"){
            console.log("User is not a patient");
            return res.status(400).json({
                success: false,
                message: "User is not a patient",
            });
        }
        
        const profileDetails = await ProfilModel.findOne({
            "availabilitySlot._id": slotId,
        });

   

        if (!profileDetails) {
            console.log("Slot not found");
            return res.status(404).json({
                success: false,
                message: "Slot not found",
            });
        }

        const bookingSlot = profileDetails.availabilitySlot.id(slotId);

   

        if(bookingSlot.booked === true){
            console.log("Slot already booked");
            return res.status(400).json({
                success: false,
                message: "Slot already booked",
            });
        }

        if(bookingSlot.booked === false){
            bookingSlot.booked = true;
        }
        await profileDetails.save();

     

        await ProfileModel.updateOne(
            { _id: userDetail.additionalDetails._id },
            {
                $push: {
                    patientAppointments: {
                        doctorId: doctorId,
                        date: bookingSlot.day,
                        startTime: bookingSlot.startTime,
                        endTime: bookingSlot.endTime,
                    },
                },
            }
        );

     

        const emailResponse = await mailSender(
            userDetail.email,
            "Appointment Booked Successfully",
            appointmentBookedTemplate(
                doctorDetail.additionalDetails.specialization, 
                bookingSlot.day, 
                bookingSlot.startTime, 
                bookingSlot.endTime,
                doctorDetail.additionalDetails.consultationLocation)
        );

        

        const updated_user_details = await UserModel.findById(userId)
        .populate({
            path: "additionalDetails",
            populate: {
                path: "patientAppointments"
            }
        })
        .exec();

      
        return res.status(200).json({
            success: true,
            message: "Slot booked successfully in bookSlot function of Profile.js",
            data: updated_user_details  
        });

    }catch(err){
        console.log("Error while booking slot in bookSlot function of Profile.js--", err);
        return res.status(500).json({
            success: false,
            message: "Error while booking slot in bookSlot function of Profile.js",
        });
    }
}



exports.getPatientAppointments = async (req, res) => {
    try{
        const userId = req.user.id;
        console.log("User ID--", userId);

        const userDetail =  await UserModel.findById(userId)
        .populate({
            path: "additionalDetails",
            populate: {
                path: "patientAppointments",    
            }
        })
        .exec();

        if(!userDetail){
            console.log("User not found");
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

     

        return res.status(200).json({
            success: true,
            message: "User appointments fetched successfully in getPatientAppointments function of Profile.js",
            data: userDetail,
        });

    }catch(err){
        console.log("Error while fetching patient appointments in getPatientAppointments function of Profile.js--", err);
        return res.status(500).json({
            success: false,
            message: "Error while fetching patient appointments in getPatientAppointments function of Profile.js",
        });
    }
}


exports.cancelAppointment = async(req, res) => {
    try{
        const userId = req.user.id;
        const appointmentId = req.params.appointmentId;

   
    

        const userDetail = await UserModel.findById(userId)
        .populate({
            path: "additionalDetails",
            populate:{
                path: "patientAppointments"
            }
        })
        .exec();

        if(!userDetail){
            console.log("User not found");
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        const appointment = await ProfileModel.findOne({
            "patientAppointments._id": appointmentId,
        })
        .populate("patientAppointments")
        .exec();
       

        if(!appointment){
            console.log("Appointment not found");
            return res.status(404).json({
                success: false,
                message: "Appointment not found",
            });
        }

        const patientsAppointments = appointment.patientAppointments;
      

        const cancellingAppointment = patientsAppointments.find((appointment) => appointment._id.toString() === appointmentId);

        

        const doctorId = cancellingAppointment.doctorId;

;

        const doctorDetail = await UserModel.findById(doctorId).populate("additionalDetails").exec();
      ;

        if (!doctorDetail) {
            console.log("Doctor not found");
            return res.status(404).json({
                success: false,
                message: "Doctor not found",
            });
        }

        const doctorSlots = doctorDetail.additionalDetails.availabilitySlot;
        

        const startingTime = cancellingAppointment.startTime;
        const endingTime = cancellingAppointment.endTime;

        doctorDetail.additionalDetails.availabilitySlot.forEach((slot) =>{
            if(slot.startTime === startingTime && slot.endTime === endingTime){
                slot.booked = false;
            }
        });

        await doctorDetail.save();

        await ProfileModel.updateOne(
            { _id: userDetail.additionalDetails._id },
            { $pull: { patientAppointments: { _id: appointmentId } } }
        );


        const emailResponse = await mailSender(
            userDetail.email,
            "Appointment Cancelled Successfully",
            appointmentCancelTemplate()
        )


       
        
        const updated_user_details = await UserModel.findById(userId)
        .populate({
            path: "additionalDetails",
            populate:{
                path: "patientAppointments"
            }
        })
        .exec();
        
       

        return res.status(200).json({
            success: true,
            message: "Appointment cancelled successfully in cancelAppointment function of Profile.js",
            data: updated_user_details,
        });


    }catch(err){
        console.log("Error while cancelling appointment in cancelAppointment function of Profile.js--", err);
        return res.status(500).json({
            success: false,
            message: "Error while cancelling appointment in cancelAppointment function of Profile.js",
        });
    }
}