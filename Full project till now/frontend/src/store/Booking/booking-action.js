import { axiosInstance } from "../../utils/axios";
import {
  setBookingRequest,
  setBookingDetails,
  setBookings,
  setBookingError,
} from "./booking-slice";


// Fetch individual booking details
export const fetchBookingDetails = (bookingId) => async (dispatch) => {
  try {

    dispatch(setBookingRequest());

    const response = await axiosInstance.get(
      `/v1/rent/user/booking/${bookingId}`
    );

    console.log(
      "Booking details API response:",
      response.data
    );

    dispatch(
      setBookingDetails(
        response.data.data.booking
      )
    );

  } catch (error) {

    console.error(
      "Error fetching booking details:",
      error
    );

    dispatch(
      setBookingError(
        error.response?.data?.message ||
        error.message ||
        "Failed to fetch booking details"
      )
    );
  }
};


// Fetch all user bookings
export const fetchUserBookings = () => async (dispatch) => {
  try {

    dispatch(setBookingRequest());

    const response = await axiosInstance.get(
      "/v1/rent/user/booking"
    );

    console.log(
      "User bookings API response:",
      response.data
    );

    dispatch(
      setBookings(
        response.data.data.bookings
      )
    );

  } catch (error) {

    console.error(
      "Error fetching bookings:",
      error
    );

    dispatch(
      setBookingError(
        error.response?.data?.message ||
        error.message ||
        "Failed to fetch bookings"
      )
    );
  }
};