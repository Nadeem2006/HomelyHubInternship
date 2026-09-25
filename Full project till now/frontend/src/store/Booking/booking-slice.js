import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  bookings: [],
  bookingDetails: null,
  loading: false,
  error: null,
};

const bookingSlice = createSlice({
  name: "booking",

  initialState,

  reducers: {

    // Booking list/details request started
    setBookingRequest(state) {
      state.loading = true;
      state.error = null;
    },

    // Store all bookings received from API
    setBookings(state, action) {
      state.bookings = action.payload;
      state.loading = false;
      state.error = null;
    },

    // Add a newly created booking
    addBooking(state, action) {
      state.bookings.push(action.payload);
    },

    // Store one booking's details
    setBookingDetails(state, action) {
      state.bookingDetails = action.payload;
      state.loading = false;
      state.error = null;
    },

    // Store booking error
    setBookingError(state, action) {
      state.loading = false;
      state.error = action.payload;
    },

    // Clear individual booking details
    clearBookingDetails(state) {
      state.bookingDetails = null;
    },
  },
});

export const {
  setBookingRequest,
  setBookings,
  addBooking,
  setBookingDetails,
  setBookingError,
  clearBookingDetails,
} = bookingSlice.actions;

export default bookingSlice;