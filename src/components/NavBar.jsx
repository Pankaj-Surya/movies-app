import React from 'react'
import { Link } from "react-router-dom";
import LogoImg from "../Image/logo.png"
function NavBar() {
  return (
   
    <div className=" border pl-8 py-4 flex space-x-8 items-center bg-zinc-50 ">
    <img className='w-[50px] md:w-[80px] rounded-3xl' src
        ={LogoImg}>
    </img>
    
        <Link to="/home" className='text-indigo-500 font-bold text-xl md:text-3xl' >Movies</Link>
        <Link to="/favourites" className='text-indigo-500 font-bold text-xl md:text-3xl'>Favorites</Link>
    
   </div>
  )
}

export default NavBar