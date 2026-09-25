import React, { useEffect, useState } from "react";
import "../../css/PropertyListing.css";

import PropertyImg from "./PropertyImg";
import PaymentForm from "./PaymentForm";
import PropertyAmenities from "./PropertyAmenities";
import PropertMapInfo from "./PropertyMapInfo";

import { useParams } from "react-router-dom";
import LoadingSpinner from "../LoadingSpinner";

import { axiosInstance } from "../../utils/axios";

const PropertyListing = () => {
  const { id } = useParams();

  const [loading, setLoading] = useState(true);
  const [propertydetails, setPropertyDetails] = useState(null);

  useEffect(() => {
    const fetchPropertyDetails = async () => {
      try {
        setLoading(true);

        console.log("Fetching property:", id);

        const response = await axiosInstance.get(
          `/v1/rent/listing/${id}`
        );

        console.log(
          "Property details response:",
          response.data
        );

        setPropertyDetails(response.data.data);

      } catch (error) {
        console.error(
          "Error fetching property details:",
          error
        );

        setPropertyDetails(null);

      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchPropertyDetails();
    }
  }, [id]);

  if (loading) {
    return (
      <div className="row justify-content-around mt-5">
        <LoadingSpinner />
      </div>
    );
  }

  if (!propertydetails) {
    return (
      <div className="row justify-content-around mt-5">
        <h3>Property not found.</h3>
      </div>
    );
  }

  const {
    propertyName,
    address,
    description,
    images,
    amenities,
    maximumGuest,
    price,
    currentBookings,
  } = propertydetails;

  return (
    <div className="property-container">

      {/* Property Name */}
      <p className="property-header">
        {propertyName}
      </p>

      {/* Location */}
      <h6 className="property-location">

        <span className="material-symbols-outlined">
          house
        </span>

        <span className="location">
          {address?.area}
          {address?.area && ", "}
          {address?.city}
          {address?.city && ", "}
          {address?.state}
        </span>

      </h6>

      {/* Property Images */}
      <PropertyImg
        images={images || []}
      />

      <div className="middle-container row">

        {/* Description + Amenities */}
        <div className="des-and-amenities col-md-8 col-sm-12 col-12">

          <h2 className="property-description-header">
            Description
          </h2>

          <p className="property-description">

            {description}

            <br />
            <br />

            Max number of guests: {maximumGuest}

          </p>

          <hr />

          <PropertyAmenities
            amenities={amenities || []}
          />

        </div>

        {/* Payment Form */}
        <div className="property-payment col-md-4 col-sm-12 col-12">

          <PaymentForm
            propertyId={id}
            price={price}
            propertyName={propertyName}
            address={address}
            maximumGuest={maximumGuest}
            currentBookings={currentBookings || []}
          />

        </div>

      </div>

      <hr />

      {/* Map */}
      <div className="property-map">

        <div className="map-image-exinfo-container row">

          <PropertMapInfo
            address={address}
          />

        </div>

      </div>

    </div>
  );
};

export default PropertyListing;