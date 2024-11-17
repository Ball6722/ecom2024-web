import React, { useState } from "react";
import "../stripe.css";
import {
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import useEcomStore from "../store/ecom-store";
import { saveAddress, saveOrder } from "../api/user";
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
export default function CheckoutForm() {
  const navigate = useNavigate()
  const token = useEcomStore((state) => state.token);
  const clearCart = useEcomStore((state)=>state.clearCart)
  const stripe = useStripe();
  const elements = useElements();

  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsLoading(true);

    const payload = await stripe.confirmPayment({
      elements,
      redirect: "if_required",
    });

    console.log(payload);
    if (payload.error) {
      setMessage(payload.error.message);
      toast.success(payload.error.message)
      
    } else if (payload.paymentIntent.status === "succeeded") {
      console.log("Ready or Saveorder");
      // Create Order
      saveOrder(token,payload)
      .then((res)=>{
        console.log(res)
        clearCart()
        toast.success('Payment Success!!')
        navigate('/user/history')
      })
      .catch((err)=>{
        console.log(err)
      })
    } else {
      toast.success('ชำระเงินไม่สำเร็จ!!')
    }

    setIsLoading(false);
  };

  const paymentElementOptions = {
    layout: "tabs",
  };

  return (
    <>
      <form className="space-y-6" id="payment-form" onSubmit={handleSubmit}>
        <PaymentElement id="payment-element" options={paymentElementOptions} />
        <button
          className="stripe-button"
          disabled={isLoading || !stripe || !elements}
          id="submit"
        >
          <span id="button-text">
            {isLoading ? (
              <div className="spinner" id="spinner"></div>
            ) : (
              "Pay now"
            )}
          </span>
        </button>
        {/* Show any error or success messages */}
        {message && <div id="payment-message">{message}</div>}
      </form>
    </>
  );
}
