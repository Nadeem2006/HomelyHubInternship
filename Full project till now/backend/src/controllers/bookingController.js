import { Property } from "../Models/propertyModel.js";
import { Booking } from "../Models/bookingModel.js";

// Create order
const createOrder = async (req, res) => {
  try {
    const { amount, propertyId, fromDate, toDate, guests } = req.body;

    const orderId = "order_" + Date.now();

    res.json({
      success: true,
      message: "Order created Successfully",
      orderId,
      amount,
      propertyId,
      fromDate,
      toDate,
      guests,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


// Verify payment and create booking
const verifyPayment = async (req, res) => {
  try {
    const { orderId, bookingDetails, forceStatus } = req.body;

    if (forceStatus !== "success") {
      return res.status(400).json({
        success: false,
        message: "Payment failed!",
        orderId,
      });
    }

    const {
      propertyId,
      fromDate,
      toDate,
      price,
      guests,
      nights,
    } = bookingDetails;

    const requestedFromDate = new Date(fromDate);
    const requestedToDate = new Date(toDate);

    // Validate dates
    if (
      isNaN(requestedFromDate.getTime()) ||
      isNaN(requestedToDate.getTime())
    ) {
      return res.status(400).json({
        success: false,
        message: "Invalid booking dates.",
      });
    }

    if (requestedFromDate >= requestedToDate) {
      return res.status(400).json({
        success: false,
        message: "Check-out date must be after check-in date.",
      });
    }

    /*
      First create the booking.
      We will only keep it if we successfully reserve
      the requested dates in the property.
    */

    const newBooking = await Booking.create({
      user: req.user._id,
      property: propertyId,
      price,
      fromDate: requestedFromDate,
      toDate: requestedToDate,
      guests,
      numberOfnights: nights,
      paid: true,
    });

    /*
      Atomically add the booking ONLY if there is
      no existing booking with overlapping dates.

      Existing:
          fromDate < requestedToDate
          AND
          toDate > requestedFromDate

      means the dates overlap.
    */

    const updatedProperty = await Property.findOneAndUpdate(
      {
        _id: propertyId,

        currentBookings: {
          $not: {
            $elemMatch: {
              fromDate: { $lt: requestedToDate },
              toDate: { $gt: requestedFromDate },
            },
          },
        },
      },
      {
        $push: {
          currentBookings: {
            bookingId: newBooking._id,
            fromDate: requestedFromDate,
            toDate: requestedToDate,
            userId: req.user._id,
          },
        },
      },
      {
        new: true,
      }
    );

    /*
      If updatedProperty is null, another booking already
      occupies those dates.

      Delete the booking we just created because the
      accommodation could not be reserved.
    */

    if (!updatedProperty) {
      await Booking.findByIdAndDelete(newBooking._id);

      return res.status(409).json({
        success: false,
        message:
          "This accommodation is already booked for the selected dates. Please choose different dates.",
      });
    }

    const paymentId = "pay_" + Date.now();

    res.json({
      success: true,
      message: "Payment successful, booking confirmed!!",
      paymentId,
      orderId,
      booking: newBooking,
    });

  } catch (error) {
    console.error("Booking verification error:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


// Get my bookings
const getUserBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({
      user: req.user._id,
    });

    res.status(200).json({
      status: "success",
      data: {
        bookings,
      },
    });

  } catch (error) {
    res.status(401).json({
      status: "fail",
      message: error.message,
    });
  }
};


// Get one booking details
const getBookingDetails = async (req, res) => {
  try {
    const booking = await Booking.findById(
      req.params.bookingId
    );

    res.status(200).json({
      status: "success",
      data: {
        booking,
      },
    });

  } catch (error) {
    res.status(401).json({
      status: "fail",
      message: error.message,
    });
  }
};


export {
  getBookingDetails,
  getUserBookings,
  createOrder,
  verifyPayment,
};