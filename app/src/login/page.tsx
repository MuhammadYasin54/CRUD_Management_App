"use client"

import axios from "axios"
import React, { useState } from "react"
import {getCookie, setCookie} from "cookies-next"
import { useRouter } from "next/navigation"


const Login = () =>{
const router = useRouter();
    const [formState, setFormState] = useState({
        email: "",
        password: ""
    })

    const submitForm = async () =>{
        
        const apiUrl = "http://localhost:5050/user/login"
        try {
            let res = await axios({
                url: apiUrl,
                method: "POST",
                data: formState
            })
            console.log("Result:", res)
            const {status, data} = res

            if(status == 200){
                console.log("Login Success")

                setCookie("token", data.token,{maxAge: 60 * 60 * 3, 
            
                })
                
            
            setFormState({
                email: "",
                password: "",

            })
            router.push("/src/home")
        }
        } catch (error) {
            console.log("Error while Login Users")
            if (axios.isAxiosError(error)) {
                console.log("Response:", error.response?.data);
            }
        }
    }
    return (
        <div>
           <h1> Login Screen</h1>


            <input type="email"
            placeholder="Enter Email"
            value={formState.email}
            onChange={(e)=>{setFormState({...formState, email: e.target.value})}} 
            
            />
             <input type="password"
            placeholder="Enter Password"
            value={formState.password}
            onChange={(e)=>{setFormState({...formState, password: e.target.value})}} 
            
            />
            <button onClick={submitForm}>Login</button>
        </div>
    )
}
export default Login;