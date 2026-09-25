import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import "../../css/Home.css";
import { axiosInstance } from "../../utils/axios";

const Card = ({ id, image, name, address, price }) => {
  return (
    <figure className="property">
      <Link to={`/propertylist/${id}`}>
        <img src={image} alt="Propertyimg" />
      </Link>

      <h4>{name}</h4>

      <figcaption>
        <main className="propertydetails">
          <h5>{name}</h5>

          <h6>
            <span className="material-symbols-outlined houseicon">
              home_pin
            </span>
            {address}
          </h6>

          <p>
            <span className="price">₹{price}</span> per night
          </p>
        </main>
      </figcaption>
    </figure>
  );
};

const PropertyList = () => {
  const [properties, setProperties] = useState([]);
  const [totalProperties, setTotalProperties] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchParams, setSearchParams] = useState({});

  const propertyListRef = useRef(null);

  const fetchProperties = async (page, params = {}) => {
    try {
      setLoading(true);
      setError(null);

      const response = await axiosInstance.get(
        "/v1/rent/listing",
        {
          params: {
            ...params,
            page,
          },
        }
      );

      console.log("Page:", page);
      console.log("Request params:", params);
      console.log("Properties:", response.data.data);

      setProperties(response.data.data || []);

      setTotalProperties(
        response.data.all_properties || 0
      );
    } catch (error) {
      console.error("Property fetch error:", error);

      setError(
        error.response?.data?.message ||
          error.message ||
          "Could not fetch properties"
      );
    } finally {
      setLoading(false);
    }
  };

  // Initial load
  useEffect(() => {
    fetchProperties(1, {});
  }, []);

  // Handle search
  useEffect(() => {
    const handleSearch = (event) => {
      const params = event.detail || {};

      console.log("Search parameters:", params);

      setSearchParams(params);
      setCurrentPage(1);

      fetchProperties(1, params);
    };

    window.addEventListener(
      "homelyHubSearch",
      handleSearch
    );

    return () => {
      window.removeEventListener(
        "homelyHubSearch",
        handleSearch
      );
    };
  }, []);

  // Handle filters
  useEffect(() => {
    const handleFilters = (event) => {
      const params = event.detail || {};

      console.log("Filter parameters:", params);

      setSearchParams(params);
      setCurrentPage(1);

      fetchProperties(1, params);
    };

    window.addEventListener(
      "homelyHubFilters",
      handleFilters
    );

    return () => {
      window.removeEventListener(
        "homelyHubFilters",
        handleFilters
      );
    };
  }, []);

  // Handle page change
  useEffect(() => {
    if (currentPage === 1) {
      return;
    }

    fetchProperties(currentPage, searchParams);
  }, [currentPage]);

  // Animation
  useEffect(() => {
    if (propertyListRef.current) {
      gsap.fromTo(
        propertyListRef.current.children,
        {
          y: 50,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: "power2.out",
        }
      );
    }
  }, [properties]);

  const lastPage = Math.max(
    1,
    Math.ceil(totalProperties / 12)
  );

  if (loading) {
    return (
      <p className="not_found">
        Loading properties...
      </p>
    );
  }

  if (error) {
    return (
      <p className="not_found">
        {error}
      </p>
    );
  }

  return (
    <>
      {properties.length === 0 ? (
        <p className="not_found">
          Property not found
        </p>
      ) : (
        <div
          className="propertylist"
          ref={propertyListRef}
        >
          {properties.map((property) => (
            <Card
              key={property._id}
              id={property._id}
              image={property.images?.[0]?.url}
              name={property.propertyName}
              address={`${property.address?.city || ""}, ${
                property.address?.state || ""
              } ${property.address?.pincode || ""}`}
              price={property.price}
            />
          ))}
        </div>
      )}

      <div className="pagination">
        <button
          className="previous_btn"
          onClick={() =>
            setCurrentPage((prev) =>
              Math.max(1, prev - 1)
            )
          }
          disabled={currentPage === 1}
        >
          <span className="material-symbols-outlined">
            arrow_back_ios_new
          </span>
        </button>

        <span style={{ margin: "0 15px" }}>
          Page {currentPage} of {lastPage}
        </span>

        <button
          className="next_btn"
          onClick={() =>
            setCurrentPage((prev) => prev + 1)
          }
          disabled={currentPage >= lastPage}
        >
          <span className="material-symbols-outlined">
            arrow_forward_ios
          </span>
        </button>
      </div>
    </>
  );
};

export default PropertyList;