import React, { useState } from "react";
import { useForm } from "@tanstack/react-form";
import { DatePicker, Space } from "antd";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import { STATIC_IS_AUTHENTICATED } from "../../data/staticData";

const PaymentForm = ({
  price,
  propertyName,
  address,
  maximumGuest,
  propertyId,
  currentBookings = [],
}) => {
  const [calculatedPrice, setCalulatedPrice] = useState(0);
  const navigate = useNavigate();
  const { RangePicker } = DatePicker;

  const [isAuthenticated] = useState(STATIC_IS_AUTHENTICATED);

  // Disable dates that are already booked
  const isDateDisabled = (current) => {
    const today = moment().startOf("day");

    // Disable past dates
    if (current.isBefore(today)) {
      return true;
    }

    // Disable dates that fall inside an existing booking
    return currentBookings.some((booking) => {
      const startDate = moment(booking.fromDate).startOf("day");
      const endDate = moment(booking.toDate).startOf("day");
      const currentMoment = moment(current.toDate()).startOf("day");

      // Checkout date is allowed for the next guest
      return (
        currentMoment.isSameOrAfter(startDate) &&
        currentMoment.isBefore(endDate)
      );
    });
  };

  const form = useForm({
    defaultValues: {
      dateRange: [],
      guests: "",
      name: "",
      phoneNumber: "",
    },

    onSubmit: async ({ value }) => {
      const [checkinDate, checkoutDate] = value.dateRange;

      const nights = moment(checkoutDate).diff(
        moment(checkinDate),
        "days"
      );

      const { name, guests, phoneNumber } = value;

      if (
        name &&
        guests &&
        phoneNumber &&
        checkinDate &&
        checkoutDate
      ) {
        const paymentDetails = {
          checkinDate,
          checkoutDate,
          nights,
          totalPrice: calculatedPrice,
          propertyName,
          address,
          guests: Number(guests),
          name,
          phoneNumber,
        };

        console.log("Payment details:", paymentDetails);

        // Send booking details to Payment.jsx
        navigate(`/payment/${propertyId}`, {
          state: {
            paymentDetails,
          },
        });
      } else {
        alert("Please fill all fields correctly before proceeding.");
      }
    },
  });

  return (
    <div className="form-container">
      <form
        className="payment-form"
        onSubmit={(e) => {
          e.preventDefault();
          form.handleSubmit();
        }}
      >
        {/* Price */}
        <div className="price-pernight">
          Price: <b>&#8377;{price}</b>
          <span> / Per night</span>
        </div>

        <div className="payment-field">

          {/* Date Selection */}
          <form.Field name="dateRange">
            {(field) => (
              <div className="date">
                <Space direction="vertical" size={12}>
                  <RangePicker
                    format="YYYY-MM-DD"
                    picker="date"
                    disabledDate={isDateDisabled}
                    onChange={(value, dateString) => {
                      field.handleChange(dateString);

                      const [checkin, checkout] = dateString;

                      if (checkin && checkout) {
                        const nights = moment(
                          checkout,
                          "YYYY-MM-DD"
                        ).diff(
                          moment(checkin, "YYYY-MM-DD"),
                          "days"
                        );

                        const total = price * nights;

                        setCalulatedPrice(total);
                      } else {
                        setCalulatedPrice(0);
                      }
                    }}
                  />
                </Space>
              </div>
            )}
          </form.Field>

          {/* Number of Guests */}
          <form.Field
            name="guests"
            validators={{
              onChange: ({ value }) =>
                value > 0 && value <= maximumGuest
                  ? undefined
                  : `Guests must be 1 - ${maximumGuest}`,
            }}
          >
            {(field) => (
              <div className="guest">
                <label className="payment-labels">
                  Number of guests:
                </label>

                <br />

                <input
                  type="number"
                  className="no-of-guest"
                  placeholder="Guest"
                  value={field.state.value}
                  onChange={(e) =>
                    field.handleChange(e.target.value)
                  }
                  min="1"
                  max={maximumGuest}
                />

                {field.state.meta.errors &&
                  field.state.meta.errors.length > 0 && (
                    <p style={{ color: "red" }}>
                      {field.state.meta.errors[0]}
                    </p>
                  )}
              </div>
            )}
          </form.Field>

          {/* Name and Phone */}
          <div className="name-phoneno">

            {/* Full Name */}
            <form.Field name="name">
              {(field) => (
                <>
                  <label className="payment-labels">
                    Your full name:
                  </label>

                  <br />

                  <input
                    type="text"
                    className="full-name"
                    placeholder="Name"
                    value={field.state.value}
                    onChange={(e) =>
                      field.handleChange(e.target.value)
                    }
                  />
                </>
              )}
            </form.Field>

            <br />

            {/* Phone Number */}
            <form.Field name="phoneNumber">
              {(field) => (
                <>
                  <label className="payment-labels">
                    Phone Number:
                  </label>

                  <br />

                  <input
                    type="tel"
                    className="phone-number"
                    placeholder="Number"
                    value={field.state.value}
                    onChange={(e) =>
                      field.handleChange(e.target.value)
                    }
                  />
                </>
              )}
            </form.Field>
          </div>
        </div>

        {/* Book Button */}
        <div className="book-place">
          {!isAuthenticated ? (
            <button
              type="button"
              onClick={() => navigate("/login")}
            >
              Login to Book
            </button>
          ) : (
            <button type="submit">
              Book this place &#8377; {calculatedPrice}
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default PaymentForm;