import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Payment = () => {
    const [paymentDetails, setPaymentDetails] = useState({ paymentAmount: "", cardNo: "" });
    let navigate = useNavigate();

    const handleCheckout = async (e) => {
        e.preventDefault();
        const response = await fetch("http://localhost:5000/payment/create", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ 
                paymentAmount: paymentDetails.paymentAmount,
                cardNo: paymentDetails.cardNo,
            })
        });
        const json = await response.json()
        console.log(json);
        if (json.success) {
            alert("Successfully Paid. Value = "+ json.clientSecret);
            navigate("/");
        }
        else {
            alert("Some error occured");
            navigate("/");
        }
    }

    const onChange = (e) => {
        setPaymentDetails({ ...paymentDetails, [e.target.name]: e.target.value })
    }

    return (
        <div className='container'>
            <form className="form-style-9" onSubmit={handleCheckout}>
                <div className="mb-3">
                    <label htmlFor="amount" className="form-label">Amount</label>
                    <input type="text" className="form-control" id="paymentAmount" name='paymentAmount' value={paymentDetails.paymentAmount} onChange={onChange} aria-describedby="emailHelp" />
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="cardNo" className="form-label">Card No</label>
                    <input type="text" className="form-control" id="cardNo" name='cardNo' value={[paymentDetails.cardNo]} onChange={onChange} />
                </div>
                <button type="submit" className="btn btn-primary">Checkout</button>
            </form>
        </div>
    )
}

export default Payment;


