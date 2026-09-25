import React, { useEffect } from "react";
import "../../css/BookingDetails.css";
import PropertyImg from "../propertyListing/PropertyImg";
import { useParams } from "react-router-dom";
import LoadingSpinner from "../LoadingSpinner";
import { useDispatch, useSelector } from "react-redux";

import { fetchBookingDetails } from "../../store/Booking/booking-action";

const BookingDetails = () => {
  const { bookingId } = useParams();
  const dispatch = useDispatch();

  // Get booking details from Redux
  const bookingState = useSelector(
    (state) => state.booking
  );

  const bookingDetails =
    bookingState?.bookingDetails;

  const loading = bookingState?.loading || false;

  // Fetch booking details when page loads
  useEffect(() => {
    if (bookingId) {
      dispatch(fetchBookingDetails(bookingId));
    }
  }, [bookingId, dispatch]);

  console.log("Booking details:", bookingDetails);

  // Loading
  if (loading || !bookingDetails) {
    return (
      <div className="row justify-content-around mt-5">
        <LoadingSpinner />
      </div>
    );
  }

  // Make sure property information exists
  if (!bookingDetails.property) {
    return (
      <div className="row justify-content-around mt-5">
        <h3>Booking details not available.</h3>
      </div>
    );
  }

  return (
    <div className="details-container">

      {/* Property Name */}
      <p className="details-header">
        {bookingDetails.property.propertyName}
      </p>

      {/* Location */}
      <h6 className="details-location">

        <span className="material-symbols-outlined">
          location_on
        </span>

        <span className="location">

          {bookingDetails.property.address?.area}
          {bookingDetails.property.address?.area && ", "}

          {bookingDetails.property.address?.city}
          {bookingDetails.property.address?.city && ", "}

          {bookingDetails.property.address?.pincode}
          {bookingDetails.property.address?.pincode && ", "}

          {bookingDetails.property.address?.state}

        </span>

      </h6>

      <div className="details-information-container">

        {/* Booking Information */}
        <div className="details-information">

          <h5>Booking Information</h5>

          <section className="booking-stay-information">

            {/* Nights */}
            <span className="details">

              <span className="material-symbols-outlined stay-icon">
                bedtime
              </span>

              {bookingDetails.numberOfnights} nights

            </span>

            {/* Check-in */}
            <span className="details">

              <span className="material-symbols-outlined stay-icon">
                calendar_month
              </span>

              {new Date(
                bookingDetails.fromDate
              ).toLocaleDateString()}

            </span>

            <span className="material-symbols-outlined stay-icon">
              arrow_forward
            </span>

            {/* Check-out */}
            <span className="details">

              <span className="material-symbols-outlined stay-icon">
                calendar_month
              </span>

              {new Date(
                bookingDetails.toDate
              ).toLocaleDateString()}

            </span>

          </section>

        </div>

        {/* Total Price */}
        <div className="details-total-price-container">

          <div className="details-total-price">

            <p className="price-header">
              Total Price
            </p>

            <span className="price-in-number">
              &#8377; {bookingDetails.price}
            </span>

          </div>

        </div>

      </div>

      {/* Property Images */}
      <PropertyImg
        images={bookingDetails.property.images || []}
      />

    </div>
  );
};

export default BookingDetails;