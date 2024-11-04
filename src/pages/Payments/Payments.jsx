import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '../../components/Navbar/Navbar';

function Payments() {
  const [payments, setPayments] = useState([]);
  const fetchPayments = async () => {
    const res = await axios({
      method: 'get',
      url: 'https://27.123.248.68:4000/api/payment/getPayments',
    });

    console.log(res.data);
    setPayments(res.data);
  };

  useEffect(() => {
    fetchPayments();
  }, []);
  return (
    <>
      <Navbar />
      <div className="flex flex-wrap gap-4 ml-56">
        {payments.map((p) => (
          <PaymentCard payment={p} />
        ))}
      </div>
    </>
  );
}

function PaymentCard({ payment }) {
  return (
    <div className="max-w-sm p-6 mx-auto mt-10 bg-gray-100 rounded-lg shadow-neumorphism">
      <h2 className="text-xl font-semibold text-gray-800 mb-2">
        Payment Details
      </h2>

      <div className="mt-4">
        <h3 className="text-lg font-semibold text-gray-700">Email</h3>
        <p className="text-gray-600">{payment.email}</p>
      </div>

      <div className="mt-4">
        <h3 className="text-lg font-semibold text-gray-700">
          Registration IDs
        </h3>
        <ul className="list-disc list-inside text-gray-600">
          {payment.registrationIds.map((id, index) => (
            <li key={index}>{id}</li>
          ))}
        </ul>
      </div>

      <div className="mt-4">
        <h3 className="text-lg font-semibold text-gray-700">Order ID</h3>
        <p className="text-gray-600">{payment.paymentInfo.order_id}</p>
      </div>

      <div className="mt-4">
        <h3 className="text-lg font-semibold text-gray-700">Payment ID</h3>
        <p className="text-gray-600">{payment.paymentInfo.payment_id}</p>
      </div>

      <div className="mt-4">
        <h3 className="text-lg font-semibold text-gray-700">Payment Status</h3>
        <p
          className={`text-lg font-bold ${
            payment.paymentSuccess ? 'text-green-600' : 'text-red-600'
          }`}
        >
          {payment.paymentSuccess ? 'Success' : 'Pending'}
        </p>
      </div>
    </div>
  );
}

export default Payments;
