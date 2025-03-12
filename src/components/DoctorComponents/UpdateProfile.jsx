import React from 'react'
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom';
import { updateProfile } from '../../services/operations/userAPI';

export const UpdateProfile = () => {
    const { user } = useSelector((state) => state.profile);
    const { token } = useSelector((state) => state.auth);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    // console.log("user in Update profile--", user);
    const url = useLocation();
    // console.log("url in Update profile--", url.pathname);

    const submitProfileForm = (data) => {
        // console.log("data in submitProfileForm--", data );
        dispatch(updateProfile(token, data, navigate));

    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            {url.pathname === "/doctor-dashboard" && (
                <div className="bg-white shadow-xl rounded-lg p-8 m-4 w-full lg:w-1/2 relative">
                    <button
                        onClick={() => {
                            navigate("/edit-profile")
                        }}
                        className="absolute top-4 right-4 bg-blue-500 text-white py-2 px-4 rounded"
                    >
                        Edit Profile
                    </button>
                    <h2 className="text-2xl font-bold mb-6 text-left uppercase">Profile Information</h2>
                    <section className="space-y-4 text-left">
                        <div className="text-lg">
                            <span className="font-semibold">Name:</span> {user.firstName} {user.lastName}
                        </div>
                        <div className="text-lg">
                            <span className="font-semibold">Specialization:</span> {user.additionalDetails.specialization}
                        </div>
                        <div className="text-lg">
                            <span className="font-semibold">Experience:</span> {user.additionalDetails.yearsOfExperience} Years
                        </div>
                        <div className="text-lg">
                            <span className="font-semibold">Gender:</span> {user.additionalDetails.gender}
                        </div>
                        <div className="text-lg">
                            <span className="font-semibold">City:</span> {user.additionalDetails.city}
                        </div>
                        <div className="text-lg">
                            <span className="font-semibold">State:</span> {user.additionalDetails.state}
                        </div>
                        <div className="text-lg">
                            <span className="font-semibold">Address:</span> {user.additionalDetails.consultationLocation}
                        </div>
                    </section>
                </div>
            )}

            {url.pathname === "/edit-profile" && (
                <form onSubmit={handleSubmit(submitProfileForm)} className="bg-white shadow-xl rounded-lg p-8 m-4 w-full lg:w-1/2">
                    <h2 className="text-2xl font-bold mb-6 text-left uppercase">Edit Profile</h2>
                    <div className="mb-4">
                        <label htmlFor="specialization" className="block text-left text-gray-700 font-semibold mb-2">Specialization:</label>
                        <input
                            type="text"
                            name="specialization"
                            placeholder="Enter your specialization"
                            className="border-2 border-gray-200 rounded-md w-full p-2"
                            {...register('specialization', { required: true })}
                            defaultValue={user.additionalDetails.specialization}
                        />
                        {errors.specialization && <span className="text-red-500">This field is required</span>}
                    </div>

                    <div className="mb-4">
                        <label htmlFor="gender" className="block text-gray-700 text-left font-semibold mb-2">Gender:</label>
                        <input
                            type="text"
                            name="gender"
                            placeholder="Enter your gender"
                            className="border-2 border-gray-200 rounded-md w-full p-2"
                            {...register('gender', { required: true })}
                            defaultValue={user.additionalDetails.gender}
                        />
                        {errors.gender && <span className="text-red-500">This field is required</span>}
                    </div>

                    <div className="mb-4">
                        <label htmlFor="yearsOfExperience" className="block text-left text-gray-700 font-semibold mb-2">Years of Experience:</label>
                        <input
                            type="number"
                            name="yearsOfExperience"
                            placeholder="Enter your years of experience"
                            className="border-2 border-gray-200 rounded-md w-full p-2"
                            {...register('yearsOfExperience', { required: true })}
                            defaultValue={user.additionalDetails.yearsOfExperience}
                        />
                        {errors.yearsOfExperience && <span className="text-red-500">This field is required</span>}
                    </div>

                    <div className="mb-4">
                        <label htmlFor="city" className="block text-gray-700 text-left font-semibold mb-2">City:</label>
                        <input
                            type="text"
                            name="city"
                            placeholder="Enter your city"
                            className="border-2 border-gray-200 rounded-md w-full p-2"
                            {...register('city', { required: true })}
                            defaultValue={user.additionalDetails.city}
                        />
                        {errors.city && <span className="text-red-500">This field is required</span>}
                    </div>

                    <div className="mb-4">
                        <label htmlFor="state" className="block text-left text-gray-700 font-semibold mb-2">State:</label>
                        <input
                            type="text"
                            name="state"
                            placeholder="Enter your state"
                            className="border-2 border-gray-200 rounded-md w-full p-2"
                            {...register('state', { required: true })}
                            defaultValue={user.additionalDetails.state}
                        />
                        {errors.state && <span className="text-red-500">This field is required</span>}
                    </div>

                    <div className="mb-4">
                        <label htmlFor="consultationLocation" className="block text-left text-gray-700 font-semibold mb-2">Consultation Location:</label>
                        <input
                            type="text"
                            name="consultationLocation"
                            placeholder="Enter your consultation location"
                            className="border-2 border-gray-200 rounded-md w-full p-2"
                            {...register('consultationLocation', { required: true })}
                            defaultValue={user.additionalDetails.consultationLocation}
                        />
                        {errors.consultationLocation && <span className="text-red-500">This field is required</span>}
                    </div>

                    <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded mt-4 w-full">Save</button>
                </form>
            )}
        </div>
    )
}