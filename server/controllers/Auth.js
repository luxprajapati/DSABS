const UserModel = require("../models/UserModel");
const ProfileModel = require("../models/ProfileModel");
const OTPModel = require("../models/OtpModel");

const JWT = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const otpGenerator = require("otp-generator");

require("dotenv").config();

exports.sendotp = async(req, res) => {
    try{
        const{email} = req.body;
        const checkUserPresent = await UserModel.findOne
        ({email: email});

        if(checkUserPresent){
            return res.status(400).json({
                success: false,
                message: "User already exists with this email",
            });
        }

        let otp = otpGenerator.generate(4, {
            numeric: true, 
            alphabets: true,
            upperCase: true,
            specialChars: true,
        });
        
        let uniqueOtp = await OTPModel.findOne({otp: otp});
        while(uniqueOtp){
            otp = otpGenerator.generate(4, {
                numeric: true,
                alphabets: false,
                upperCase: false,
                specialChars: false,
            });

            uniqueOtp = await OTPModel.findOne({otp: otp});
        }

        const otpPayload = {email, otp};
        const otpBody = await OTPModel.create(otpPayload);
        console.log("OTP Body in Auth controller--", otpBody);

        return res.status(200).json({
            success: true,
            message: "OTP sent successfully",
            otp: otp,
        });
    }catch(err){
        console.log("Error in sendOtp function of Auth.js--", err);
        return res.status(500).json({
            success: false,
            message: "Error in sendOtp function of Auth.js",
        });
    }
};


exports.signup = async(req, res) => {
    try{
        const {
            accountType,
            firstName,
            lastName,
            email,
            password,
            confirmPassword,
            otp,
        } = req.body;

        if(!accountType || !firstName || !lastName || !email || !password || !confirmPassword || !otp){
            return res.status(400).json({
                success: false,
                message: "All fields are required",
            });
        }

        if(password !== confirmPassword){
            return res.status(400).json({
                success: false,
                message: "Password and confirm password should be same",
            });
        }

        const existingUser = await UserModel.findOne({email: email});
        if(existingUser){
            return res.status(400).json({
                success: false,
                message: "User already exists with this email",
            });
        }

        const recentOtp = await OTPModel.findOne({email}).sort({createdAt: -1}).limit(1);

        console.log("Recent OTP--", recentOtp);

        if(recentOtp.length === 0){
            return res.status(400).json({
                success: false,
                message: "Please request for OTP again",
            });
        }else if(recentOtp.otp !== otp){
            console.log("Recent OTP--", recentOtp[0].otp);
            console.log("Entered OTP--", otp);
            return res.status(400).json({
                success: false,
                message: "Invalid OTP",
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const profileDetails = await ProfileModel.create({
            gender: null,
            specialization: null,
            yearsOfExperience: null,
            city: null,
            state: null,
            availabilitySlot: [],
            bookedSlots: [],
            patientAppointments: [],
        });  // creating empty profile for user to fill details later on registration

        const newUser = await UserModel.create({
            accountType,
            firstName,
            lastName,
            email,
            password: hashedPassword,
            additionalDetails: profileDetails._id,
            image: `https://ui-avatars.com/api/?name=${firstName}+${lastName}&background=random&length=1`
        });


        console.log("User registered successfully in signup function of Auth.js--", newUser);

        return res.status(200).json({
            success: true,
            message: "User registered successfully in signup function of Auth.js",
            data: newUser,
        });

        
    }catch(err){
        console.log("Error in signup function of Auth.js--", err);
        return res.status(500).json({
            success: false,
            message: "Error in signup function of Auth.js",
        });
    }
};


exports.login = async(req, res) => {
    try{
        const {email, password} = req.body;
        if (!email || !password) {
            if (!email) {
              return res.status(403).json({
                success: false,
                message: "Email is required",
              });
            } else if (!password) {
              return res.status(403).json({
                success: false,
                message: "Password is required",
              });
            }
          }

        const userExist = await UserModel.findOne({email: email})
        .populate("additionalDetails")
        .exec();

        if(!userExist){
            return res.status(400).json({
                success: false,
                message: "User not found with this email",
            });
        }

        if(await bcrypt.compare(password, userExist.password)){
            const payload = {
                email:userExist.email,
                accountType: userExist.accountType,
                id: userExist._id,
            };

            const token = JWT.sign(payload, process.env.JWT_SECRET, {expiresIn: "24h"});
            userExist.token = token;
            userExist.password = undefined; // to hide password from response
            console.log("User logged in successfully in login function of Auth.js--", userExist);

            res.cookie("userInfo", token,
                {
                    expires: new Date(Date.now() + 72 * 3600000),
                    httpOnly: true,
                }
            ).status(200).json({
                success: true,
                message: "User logged in successfully",
                data: userExist,
            });
            
        }else{
            return res.status(401).json({
                success: false,
                message: "Invalid password",
            });
        }


    }
    catch(err){
        console.log("Error in login function of Auth.js--", err);
        return res.status(500).json({
            success: false,
            message: "Error in login function of Auth.js",
        });
    }
}