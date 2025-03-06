import React from 'react'
import doctorimage from "../assests/DoctorVectorImage.png"

export const Home = () => {
  return (
    <div className='w-full h-screen border-b-2 border-blue-500'>
        <div className='w-10/12 h-full flex flex-col md:flex-row lg:justify-between justify-evenly items-center mx-auto'>
        <div>
            <div className='text-2xl flex font-serif font-semibold text-blue-400 flex-col'>Book you next appointments from our platform 
                <span className='text-blue-500 text-3xl font-bold'>CLINIX-360</span>
            </div>
        </div>
        <div>
            <img src={doctorimage} alt='doctorimg' className='rounded-lg' />
        </div>
        </div>
    </div>
  )
}
