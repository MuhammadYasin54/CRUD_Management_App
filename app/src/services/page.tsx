"use client"
import Navbar from "@/app/components/navbar/page";
import React, { useRef, useState } from "react"
import axios from "axios"



const Services = () =>{
    const [selectedImage, setSelectedImage] = useState<File | null>(null);
    const fileInputRef = useRef<HTMLInputElement | null>(null)
    const uploadImage = async()=>{
        try {
            if(!selectedImage){
                alert ("Please Select an Image")
                return;
            }
            const formData = new FormData();
            formData.append("image", selectedImage);

            const res = await axios.post("http://localhost:5050/api/profile/upload", formData)
            console.log("Image Upload Response:", res.data)

            if(res.data.status){
                alert("Image Uploaded Successfully")
                setSelectedImage(null);
                if (fileInputRef.current) {
                    fileInputRef.current.value = "";
                }
            }
           
            

        } catch (error) {
            console.log("Error while uploading image:", error)
        }
    }
    return(
        <div>
             <Navbar/>
            Welcome to Services <br/><br/>
            <input
             type="file" accept="image/*" ref={fileInputRef} onChange={(e)=>{setSelectedImage(e.target.files?.[0] || null)}}/><br/>
            <button onClick={uploadImage}>Upload Image</button>
        </div>
    )
}
export default Services;