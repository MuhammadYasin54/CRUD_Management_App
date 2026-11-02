"use client"

import { useRouter } from "next/navigation"
import { useEffect } from "react"

const NotFound = () =>{
    const router = useRouter();

    useEffect (()=>{
        const timer = setTimeout(()=>{
            router.replace("/")
        },3000)
        return () => clearTimeout(timer)
    },[router])
    return(
        <div>
            <h1>Page Not Found</h1>
        </div>
    )
}
export default NotFound;