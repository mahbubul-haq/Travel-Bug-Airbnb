import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import StripeCheckout from 'react-stripe-checkout';

const Payment = () => {
    
    const {id} = useParams();
    const [booking, setBooking] = useState({});
    useEffect(() => {
      fetchBooking();
  
  }, []);
  const fetchBooking = async () => {
    const response = await fetch("http://localhost:5000/booking/" + id, {
        method: 'GET',
        
        
    });
    const data = await response.json();
  
    if (data.success) {
        console.log(data);
        setBooking(data.booking);
    }
  }
    const makePayment = async (token) => {
        const body = {
            token,
            booking
        }
        const headers = {
            "Content-Type": "application/json",
            "auth-token": localStorage.getItem("token"),
        }
        const response =  await fetch("http://localhost:5000/payment/create", {
            method: "POST",
            headers,
            body: JSON.stringify(body)
        });
        const data = await response.json();
        console.log(data);
    }
    

    return (
      <div>
       <StripeCheckout stripeKey="pk_test_51LbLZjLOMUpyuAnrdPiTUuHC5zH8qH6O9VY8BfSO4TI9vKK6a1LjwGNnQNq3Z3jPTXwAIfTpK957wr4HBOe0KbsB00NJVCBzV6" token={makePayment} name="Make Payment"
        shippingAddress amount={booking.totalPrice*100} 
       >
         <button className="btn btn-primary">Pay Now</button>
       </StripeCheckout>
      </div>
    )
}

export default Payment;


