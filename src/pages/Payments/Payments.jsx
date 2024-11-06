import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '../../components/Navbar/Navbar';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { useNavigate, useLocation } from 'react-router-dom';

function Payments() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const username = state?.username;

  useEffect(() => {
    if (!username) {
      navigate('/login', { state: { redirect: '/payments' } });
    }
  }, [username, navigate]);

  // If no username, return null to avoid rendering the component before navigation happens
  if (!username) {
    return null;
  }

  const [payments, setPayments] = useState([]);
  const fetchPayments = async () => {
    const res = await axios({
      method: 'get',
      url: 'https://27.123.248.68:4000/api/payment/getPayments',
    });

    // console.log(res.data);
    setPayments(res.data);
  };

  const fetchPaymentDetails = async () => {
    const res = await axios({
      method: 'get',
      url: 'https://api.razorpay.com/v1/payments/pay_PELK1ut2aH5bPG',
    });

    log(res);
  };

  useEffect(() => {
    fetchPayments();
    fetchPaymentDetails();
  }, []);

  // Pdf
  const exportPDF = () => {
    const unit = 'pt';
    const size = 'A4'; // Use A1, A2, A3 or A4
    const orientation = 'portrait'; // portrait or landscape

    const marginLeft = 40;
    const doc = new jsPDF(orientation, unit, size);

    doc.setFontSize(15);

    const totalResults = payments.length;

    const title = `Total Results ${totalResults}`;
    const headers = [
      ['Email', 'Order Id', 'Amount', 'Payment Id', 'Payment Sucess'],
    ];

    const data = payments.map((elt) => [
      elt.email,
      elt.paymentInfo.order_id,
      elt.paymentInfo.amount,
      elt.paymentSuccess,
      elt.paymentInfo.payment_id,
      elt.paymentSuccess,
    ]);

    let content = {
      startY: 50,
      head: headers,
      body: data,
    };

    doc.text(title, marginLeft, 40);
    doc.autoTable(content);
    doc.save('report.pdf');
  };

  return (
    <>
      <Navbar username={username} />
      <div className="payment-wrapper ml-60">
        <PaymentCard payment={payments} />
      </div>
      <button
        onClick={() => exportPDF()}
        className="block my-5 mx-60 bg-slate-300 px-8 py-3"
      >
        Download
      </button>
    </>
  );
}

function PaymentCard({ payment }) {
  console.log(payment);
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-6xl bg-white rounded-lg shadow-lg overflow-hidden">
        <table className="min-w-full bg-white">
          <thead>
            <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal overflow-scroll">
              <th className="py-3 px-2 text-left">Email</th>
              <th className="py-3 px-2 text-left">Order ID</th>
              <th className="py-3 px-2 text-left">Amount</th>
              <th className="py-3 px-2 text-left">Payment ID</th>
              <th className="py-3 px-2 text-left">Payment Success</th>
              <th className="py-3 px-2 text-left">Registration IDs</th>
            </tr>
          </thead>
          <tbody className="text-gray-700 text-sm font-light">
            {payment.map((entry, index) => (
              <tr
                key={index}
                className="border-b border-gray-200 hover:bg-gray-100"
              >
                <td className="py-3 px-6">{entry.email}</td>
                <td className="py-3 px-6">{entry.paymentInfo.order_id}</td>
                <td className="py-3 px-6">{entry.paymentInfo.amount}</td>
                <td className="py-3 px-6">{entry.paymentInfo.payment_id}</td>
                <td className="py-3 px-6">
                  {entry.paymentSuccess ? 'Yes' : 'No'}
                </td>
                <td className="py-3 px-6">
                  {entry.registrationIds.map((id, idx) => (
                    <span key={idx} className="block">
                      {id}
                    </span>
                  ))}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Payments;
