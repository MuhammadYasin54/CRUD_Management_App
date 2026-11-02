"use client";

import { deleteCookie } from "cookies-next";
import Link from "next/link";
import react from "react";
import { data } from "react-router-dom";


const Navbar = () =>{

    const logout = ()=>{
        deleteCookie("token")
    }
    return (
        <div>
            <ul>
                <li>
            <Link href="/src/home">
            Home
            </Link></li>
          <li>   <Link href="/src/about">
            About
            </Link></li>
             <li><Link href="/src/contact">
            Contact
            </Link></li>
             <li><Link href="/src/services">
            Services
            </Link></li>
            
             <li><Link href="/src/login">
            <button onClick={logout}> Logout </button>
            </Link></li>
            </ul>
        </div>
    )
}
export default Navbar;