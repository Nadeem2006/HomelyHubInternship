import React, { useState } from "react";
import FilterModal from "./FilterModal";

const Filter = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState({});

  const handleShowAllPhotos = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleFilterChange = (filterName, value) => {
    setSelectedFilters((prevFilters) => ({
      ...prevFilters,
      [filterName]: value,
    }));
  };

  const handleApplyFilters = (filters) => {
    console.log("Applied filters:", filters);

    window.dispatchEvent(
      new CustomEvent("homelyHubFilters", {
        detail: filters,
      })
    );
  };

  return (
    <>
      <span
        className="material-symbols-outlined filter"
        onClick={handleShowAllPhotos}
      >
        tune
      </span>

      {isModalOpen && (
        <FilterModal
          selectedFilters={selectedFilters}
          onFilterChange={handleFilterChange}
          onApplyFilters={handleApplyFilters}
          onClose={handleCloseModal}
        />
      )}
    </>
  );
};

export default Filter;