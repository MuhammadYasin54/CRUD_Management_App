"use client"
import Navbar from "@/app/components/navbar/page";
import react from "react";
import axios from "axios";
import {loadStripe} from "@stripe/stripe-js";
import { API_URL } from "@/app/lib/api";


const stripeKey = "pk_test_51UB70ePcVMBDfhN8mDuxvKYI37fcmLWLsnAqr03iEaBm2P2oyQRR29JePCRpKh6pyadaFCYpJvW97tnNQHLsJmEg00waT9S2QG";

const Contact = () => {
  const productData = [{
    productName: "Blue jacket",
    productPrice: 50,
    productImage:
      "https://www.angeljackets.com/product_images/q/805/blue_leather_cafer_racer_jacket__91491_thumb.webp",
    productQuantity: 2,
  },
  {
    productName: "Black jacket",
    productPrice: 60,
    productImage:
      "https://www.angeljackets.com/product_images/y/148/hooded_leather_jacket_womens_blue__54478_thumb.webp",
    productQuantity: 1,
  }];

  const handleCheckOut = async () => {
    try {
      const stripe = await loadStripe(stripeKey);
      const apiUrl = `${API_URL}/check-out/session`;
      const res = await axios({
        method: "POST",
        url: apiUrl,
        data: {
          items: productData,
        },
      });

      console.log("Checkout session created successfully", res.data);
      const { status, data } = res;
      if (status == 200) {

        const checkoutUrl = res.data?.data?.checkoutUrl;

        console.log("Checkout URL:", checkoutUrl);

        if (checkoutUrl) {
        window.location.href = checkoutUrl;
      }
      else {
        console.log("Stripe checkout Url is missing")
      }
    }
    
    } catch (error) {
      console.log("Error while creating checkout session", error);
    }
  };

  return (
    <div>
      <Navbar />
      Welcome to Contact
      <h1>CheckOut Screen</h1>
      <button onClick={handleCheckOut}>CheckOut</button>
    </div>
  );
};

export default Contact;
