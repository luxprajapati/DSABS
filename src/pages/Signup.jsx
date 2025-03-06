import React, { useState } from "react";
import toast from "react-hot-toast"; 
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {sentotp } from "../services/operations/authAPI";
import { setSignupData } from "../slices/authSlice";
import Spinner from "../components/common/Spinner"

const Signup = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.auth);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    accountType: "",
  });

  const {accountType, firstName, lastName, email, password, confirmPassword } = formData;
  const handleOnChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Password and Confirm Password should be same");
      return;
    }
    const signupData = {
      ...formData,
    };
   
    dispatch(setSignupData(signupData));
    // send otp
    dispatch(sentotp(formData.email, navigate));

    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
      accountType: "",
    });
  };

  
  return (
    <div className="flex items-center h-[88vh] w-full justify-center my-auto font-poppins ">
      {loading ? (
        <Spinner />
      ) : (
        <div className="bg-slate-100 p-8 rounded-lg shadow-[rgba(6,_24,_44,_0.4)_0px_0px_0px_2px,_rgba(6,_24,_44,_0.65)_0px_4px_6px_-1px,_rgba(255,_255,_255,_0.08)_0px_1px_0px_inset] w-11/12 max-w-md  ">
          <h1 className="text-2xl font-bold mb-6">Signup</h1>
          <p className="mb-4">Hi, Welcome 👋</p>
          
          
          <form onSubmit={handleOnSubmit}>
            <div className="mb-4">
            
              <div className="flex flex-row gap-x-2">
                <div className="mb-4">
                  <label
                    htmlFor="firstName"
                    className="block text-gray-700 mb-2 font-semibold text-left"
                  >
                    First Name
                  </label>
                  <input
                    required
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={firstName}
                    onChange={handleOnChange}
                    className="w-full px-4 py-2 border  rounded-lg focus:outline-none focus:border-blue-500 bg-slate-100"
                    placeholder="Firstname"
                  />
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="lastName"
                    className="block text-gray-700 mb-2 font-semibold text-left"
                  >
                    Last Name
                  </label>
                  <input
                    required
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={lastName}
                    onChange={handleOnChange}
                    className="w-full px-4 py-2 border  rounded-lg focus:outline-none focus:border-blue-500 bg-slate-100"
                    placeholder="Lastname"
                  />
                </div>
              </div>
              <label htmlFor="email" className="block text-gray-700 mb-2 font-semibold text-left">
                Email
              </label>
              <input
                required
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={handleOnChange}
                className="w-full px-4 py-2 border  rounded-lg focus:outline-none focus:border-blue-500 bg-slate-100"
                placeholder="E.g. abc@gmail.com"
              />
              <label htmlFor="email" className="block text-gray-700 mb-2 font-semibold text-left mt-2">
                Account Type
              </label>
              <input
                required
                type="text"
                id="accountType"
                name="accountType"
                value={accountType}
                onChange={handleOnChange}
                className="w-full px-4 py-2 border  rounded-lg focus:outline-none focus:border-blue-500 bg-slate-100"
                placeholder="Doctor or Patient"
              />
            </div>
            <div className="flex flex-row gap-x-2">
              <div className="mb-4">
                <label htmlFor="password" className="block text-gray-700 mb-2 font-semibold text-left">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={password}
                  onChange={handleOnChange}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500 bg-slate-100"
                  placeholder="Enter Password"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="confirmPassword"
                  className="block text-gray-700 mb-2 font-semibold text-left"
                >
                  Confirm Password
                </label>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  value={confirmPassword}
                  onChange={handleOnChange}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500 bg-slate-100"
                  placeholder="Confirm Password"
                />
              </div>
            </div>
          
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 rounded-lg"
            >
              Signup
            </button>
          </form>
         
        </div>
      )}
    </div>
  );
};

export default Signup;
