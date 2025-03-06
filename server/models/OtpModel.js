const mongoose = require("mongoose");
const {mailSender} = require("../utils/mailSender");
const otpTemplate = require("../mail/templates/emailVerificationTemplate");

const otpSchema = new mongoose.Schema({
    email: {
      type: String,
      required: true,
    },
    otp: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      expires: 5 * 60,
    },
});
  

async function sendVerificationMail(email, otp){
    try{
        const mailResponse = await mailSender(email, 
            "Email Verification", 
            otpTemplate(otp)
        );

     

    }catch(err){
        console.log("Error while sending verification mail--",err);
        throw err;
    }
  }


  otpSchema.pre("save", async function (next) {
  
    await sendVerificationMail(this.email, this.otp);
    next();
})

module.exports = mongoose.model("OtpModel", otpSchema);