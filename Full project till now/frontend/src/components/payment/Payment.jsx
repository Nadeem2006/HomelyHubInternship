import React, { useEffect, useState } from "react";
import "../../css/Payment.css";
import {
  useNavigate,
  useParams,
  useLocation,
} from "react-router-dom";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";

import {
  initiateCheckoutSession,
  verifyPayment,
} from "../../store/payment-action";

const Payment = () => {
  const navigate = useNavigate();
  const { propertyId } = useParams();
  const location = useLocation();
  const dispatch = useDispatch();

  const [showPaymentGateway, setShowPaymentGateway] = useState(false);
  const [loading, setLoading] = useState(false);
  const [orderData, setOrderData] = useState(null);

  // Get booking details sent from PaymentForm
  const paymentDetails = location.state?.paymentDetails;

  const {
    checkinDate,
    checkoutDate,
    totalPrice,
    propertyName,
    address,
    guests,
    nights,
  } = paymentDetails || {};

  // Get payment error from Redux
  const paymentState = useSelector(
    (state) => state.payment
  );

  const paymentError = paymentState?.error;

  // If booking details are missing
  useEffect(() => {
    if (!paymentDetails) {
      toast.error("Booking details not found.");

      navigate(`/propertylist/${propertyId}`, {
        replace: true,
      });
    }
  }, [paymentDetails, propertyId, navigate]);

  // Create payment order
  const handleBooking = async () => {
    if (!paymentDetails) {
      toast.error("Booking details are missing.");
      return;
    }

    try {
      setLoading(true);

      const paymentData = {
        amount: Number(totalPrice),
        propertyId,
        fromDate: checkinDate,
        toDate: checkoutDate,
        guests: Number(guests),
      };

      console.log("Creating order:", paymentData);

      const result = await dispatch(
        initiateCheckoutSession(paymentData)
      );

      console.log("Create order response:", result);

      if (!result?.success) {
        throw new Error(
          result?.message || "Failed to create payment order."
        );
      }

      // Use the REAL order ID returned by backend
      setOrderData({
        orderId: result.orderId,
        amount: result.amount,
      });

      setShowPaymentGateway(true);

    } catch (error) {
      console.error("Create order error:", error);

      toast.error(
        error.response?.data?.message ||
          error.message ||
          "Unable to create payment order."
      );
    } finally {
      setLoading(false);
    }
  };

  // Confirm payment and create booking
  const handleConfirmPayment = async () => {
    if (!paymentDetails || !orderData?.orderId) {
      toast.error("Payment order is missing.");
      return;
    }

    try {
      setLoading(true);

      const verifyData = {
        orderId: orderData.orderId,

        bookingDetails: {
          propertyId,
          fromDate: checkinDate,
          toDate: checkoutDate,
          price: Number(totalPrice),
          guests: Number(guests),
          nights: Number(nights),
        },

        // Simulated successful payment
        forceStatus: "success",
      };

      console.log("Verifying payment:", verifyData);

      const result = await dispatch(
        verifyPayment(verifyData)
      );

      console.log("Payment verification response:", result);

      if (!result?.success) {
        throw new Error(
          result?.message || "Payment verification failed."
        );
      }

      toast.success(
        "🎉 Payment Successful! Booking Confirmed!"
      );

      setOrderData(null);
      setShowPaymentGateway(false);

      // Go to My Bookings
      setTimeout(() => {
        navigate("/user/mybookings");
      }, 1000);

    } catch (error) {
      console.error(
        "Payment verification error:",
        error
      );

      toast.error(
        error.response?.data?.message ||
          error.message ||
          "Payment verification failed."
      );
    } finally {
      setLoading(false);
    }
  };

  // Cancel payment
  const handleCancelPayment = () => {
    toast.error("Payment Cancelled");

    navigate(`/propertylist/${propertyId}`);
  };

  // Prevent rendering before redirect if details don't exist
  if (!paymentDetails) {
    return (
      <div className="payment-container">
        <div className="payment-header">
          <h1>Loading payment details...</h1>
        </div>
      </div>
    );
  }

  // -----------------------------------------
  // PAYMENT GATEWAY
  // -----------------------------------------

  if (showPaymentGateway && orderData) {
    return (
      <div className="payment-gateway-overlay">
        <div className="payment-gateway-modal">

          {/* Header */}
          <div className="gateway-header">

            <div className="gateway-logo">
              <h2>🏠 HomelyHub</h2>
              <span>Payment Gateway</span>
            </div>

            <div className="secure-badge">
              <span>🔒 Secure Payment</span>
            </div>

          </div>

          {/* Content */}
          <div className="gateway-content">

            <div className="merchant-info">

              <h3>
                Payment to:{" "}
                <strong>HomelyHub</strong>
              </h3>

              <p>
                Order ID:{" "}
                <strong>{orderData.orderId}</strong>
              </p>

            </div>

            {/* Payment Summary */}
            <div className="payment-summary">

              <div className="summary-item">
                <span>Property:</span>
                <span>{propertyName}</span>
              </div>

              <div className="summary-item">
                <span>Check-in:</span>
                <span>{checkinDate}</span>
              </div>

              <div className="summary-item">
                <span>Check-out:</span>
                <span>{checkoutDate}</span>
              </div>

              <div className="summary-item">
                <span>Guests:</span>
                <span>{guests}</span>
              </div>

              <div className="summary-item">
                <span>Nights:</span>
                <span>{nights}</span>
              </div>

              <div className="summary-item total-amount">

                <span>
                  <strong>Total Amount:</strong>
                </span>

                <span>
                  <strong>
                    ₹
                    {Number(
                      totalPrice
                    ).toLocaleString("en-IN")}
                  </strong>
                </span>

              </div>

            </div>

            {/* Error */}
            {paymentError && (
              <div className="error-message">
                {paymentError}
              </div>
            )}

            {/* Buttons */}
            <div className="gateway-actions">

              <button
                onClick={handleCancelPayment}
                className="cancel-btn"
                disabled={loading}
              >
                Cancel Payment
              </button>

              <button
                onClick={handleConfirmPayment}
                className="confirm-btn"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <span className="spinner"></span>
                    Processing...
                  </>
                ) : (
                  <>
                    <span>🔒</span>
                    Confirm Payment ₹
                    {Number(
                      totalPrice
                    ).toLocaleString("en-IN")}
                  </>
                )}
              </button>

            </div>

            {/* Security */}
            <div className="security-info">
              <p>
                <span>🛡️</span>
                Your payment information is encrypted
                and secure
              </p>
            </div>

          </div>
        </div>
      </div>
    );
  }

  // -----------------------------------------
  // BOOKING SUMMARY
  // -----------------------------------------

  return (
    <div className="payment-container">

      <div className="payment-header">
        <h1>Complete Your Booking</h1>
        <p>{propertyName}</p>
      </div>

      <div className="payment-content">

        <div className="booking-summary-card">

          <h3>Booking Details</h3>

          <div className="detail-row">
            <span>Property:</span>
            <span>{propertyName}</span>
          </div>

          <div className="detail-row">
            <span>Check-in:</span>
            <span>{checkinDate}</span>
          </div>

          <div className="detail-row">
            <span>Check-out:</span>
            <span>{checkoutDate}</span>
          </div>

          <div className="detail-row">
            <span>Guests:</span>
            <span>{guests}</span>
          </div>

          <div className="detail-row">
            <span>Nights:</span>
            <span>{nights}</span>
          </div>

          <div className="detail-row total-row">

            <strong>Total Amount:</strong>

            <strong>
              ₹
              {Number(
                totalPrice
              ).toLocaleString("en-IN")}
            </strong>

          </div>

        </div>

        {/* Error */}
        {paymentError && (
          <div className="error-message">
            {paymentError}
          </div>
        )}

        {/* Payment Button */}
        <div className="payment-action">

          <button
            onClick={handleBooking}
            disabled={loading}
            className="book-now-btn"
          >
            {loading
              ? "Processing..."
              : `Proceed to Payment ₹${Number(
                  totalPrice
                ).toLocaleString("en-IN")}`}
          </button>

        </div>

      </div>
    </div>
  );
};

export default Payment;