"use client"
import React,{ useEffect } from "react"
const SuccessPage = ()=>{
    setTimeout(()=>{
        window.location.href = "/src/home"
    },3000)
    return(
        <h1>Payment Successful...!</h1>
    )
}
export default SuccessPage;