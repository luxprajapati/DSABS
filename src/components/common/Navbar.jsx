import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { VscAccount } from "react-icons/vsc";
import { logout } from '../../services/operations/authAPI';

export const Navbar = () => {

    const dispatch =  useDispatch();
    const {token} = useSelector((state) => state.auth);
    // const token = "1212";
    const {user} = useSelector((state) => state.profile);
    console.log("User in navbar--",user);

  return (
    <div className='flex flex-row w-full justify-between items-center px-10 py-5 bg-blue-500 text-white '>
        <div className='font-extrabold text-2xl'>
            <NavLink to='/'>Clinix-360</NavLink>
        </div>
        <div className='flex flex-row space-x-4'>
            <div> 
                {token === null && (
                    <NavLink to ='/login' > Sign in</NavLink>
                )}
            </div>
            <div> {token === null && (<NavLink to ='/signup' > Sign up</NavLink>)} </div>

            <div>
                {
                    token !== null && (
                        <NavLink to='/user-appointments'>
                            <VscAccount size={25} />
                        </NavLink>
                    )
                }
            </div>

            <div>
                {token !== null &&  (
                    <NavLink to='/' onClick={() =>{
                        dispatch(logout());
                    }}>Logout</NavLink>
                )}
            </div>
        </div>
    </div>
  )
}
