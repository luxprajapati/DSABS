import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Spinner from "../components/common/Spinner";
import OtpInput from "react-otp-input";
import { NavLink } from "react-router-dom";
import { BiArrowBack } from "react-icons/bi";
import { RxCountdownTimer } from "react-icons/rx";
import { sentotp, signup } from "../services/operations/authAPI";

const OtpPage = () => {
  const { signupData, loading } = useSelector((state) => state.auth);
  const [otp, setOtp] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!signupData) {
      navigate("/signup");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleOnSubmit = (e) => {
    e.preventDefault();
    const {accountType ,firstName, lastName, email, password, confirmPassword} =
      signupData;

    

    dispatch(
      signup(
        accountType,
        firstName,
        lastName,
        email,
        password,
        confirmPassword,
        otp,
        navigate
      )
    );
  };

  return (
    <div className="flex justify-center items-center my-auto font-poppins text-slate-200">
      {loading ? (
        <Spinner />
      ) : (
        <div className="max-w-[500px] p-4 lg:p-8">
          <h1 className=" font-semibold text-[1.875rem] leading-[2.375rem]">
            Verify Email
          </h1>
          <p className="text-[1.125rem]  leading-[1.625rem] my-4 text-slate-200">
            A Verification code has been sent to you. Enter the code below.
          </p>

          <form onSubmit={handleOnSubmit}>
            <OtpInput
              value={otp}
              onChange={setOtp}
              numInputs={4}
              renderInput={(props) => (
                <input
                  {...props}
                  placeholder="-"
                  style={{
                    boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                  }}
                  className="w-[48px] lg:w-[60px] border-0  rounded-[0.5rem] text-zinc-950 aspect-square text-center focus:border-0 focus:outline-2 "
                />
              )}
              containerStyle={{
                justifyContent: "space-between",
                gap: "0 6px",
              }}
            />

            <button
              className="w-full bg-slate-200 py-[12px] px-[12px] rounded-[8px] mt-6 font-medium text-zinc-950 "
              type="submit"
            >
              Verify Email
            </button>
          </form>
          <div className="mt-6 flex items-center justify-between">
            <div>
              <NavLink to="/login">
                <p className="flex items-center gap-x-2">
                  <BiArrowBack /> Back To Login
                </p>
              </NavLink>
            </div>

            <button
              className="flex items-center text-blue-100 gap-x-2"
              onClick={() => {
                dispatch(sentotp(signupData.email, navigate));
              }}
            >
              <RxCountdownTimer />
              Resend it
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default OtpPage;
