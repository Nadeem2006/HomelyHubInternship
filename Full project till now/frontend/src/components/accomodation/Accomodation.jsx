import React, { useEffect, useState } from "react";
import "../../css/Accomodation.css";
import ProgressSteps from "../ProgressSteps";
import MyAccomodation from "./MyAccomodation";
import { Link } from "react-router-dom";
import LoadingSpinner from "../LoadingSpinner";
import { axiosInstance } from "../../utils/axios";

const Accomodation = () => {
  const [accomodation, setAccomodation] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMyAccomodations = async () => {
      try {
        const response = await axiosInstance.get(
          "/v1/rent/listing/myAccommodations"
        );

        console.log(
          "My accommodations response:",
          response.data
        );

        setAccomodation(response.data.data || []);
      } catch (error) {
        console.error(
          "Error fetching accommodations:",
          error
        );

        setAccomodation([]);
      } finally {
        setLoading(false);
      }
    };

    fetchMyAccomodations();
  }, []);

  return (
    <>
      <ProgressSteps accomodation />

      <div className="accom-container">
        <Link to="/accomodationform">
          <button className="add-new-place">
            + Add new place
          </button>
        </Link>

        {loading && <LoadingSpinner />}

        {!loading && accomodation.length === 0 && (
          <p>Accomodation not available</p>
        )}

        {!loading && accomodation.length > 0 && (
          <MyAccomodation
            accomodation={accomodation}
            loading={loading}
          />
        )}
      </div>
    </>
  );
};

export default Accomodation;