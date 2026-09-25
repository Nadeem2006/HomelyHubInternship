import React, { useState } from "react";
import { DatePicker, Space } from "antd";
import "../../css/Home.css";

const Search = () => {
  const { RangePicker } = DatePicker;

  const [keyword, setKeyword] = useState({
    city: "",
    guests: "",
    dateIn: "",
    dateOut: "",
  });

  const [value, setValue] = useState([]);

  const updateKeyword = (field, value) => {
    setKeyword((prevKeyword) => ({
      ...prevKeyword,
      [field]: value,
    }));
  };

  function returnDates(date, dateString) {
    setValue(date || []);

    if (dateString && dateString.length === 2) {
      updateKeyword("dateIn", dateString[0]);
      updateKeyword("dateOut", dateString[1]);
    }
  }

  function searchHandler(e) {
    e.preventDefault();

    console.log("Search values:", keyword);

    window.dispatchEvent(
      new CustomEvent("homelyHubSearch", {
        detail: keyword,
      })
    );
  }

  return (
    <div className="searchbar">
      <input
        className="search"
        id="search_destination"
        placeholder="Search destinations"
        type="text"
        value={keyword.city}
        onChange={(e) =>
          updateKeyword("city", e.target.value)
        }
      />

      <Space direction="vertical" size={12}>
        <RangePicker
          value={value}
          format="DD-MM-YYYY"
          picker="date"
          className="date_picker"
          disabledDate={(current) => {
            return (
              current &&
              current.isBefore(Date.now(), "day")
            );
          }}
          onChange={returnDates}
        />
      </Space>

      <input
        className="search"
        id="addguest"
        placeholder="Add guests"
        type="number"
        value={keyword.guests}
        onChange={(e) =>
          updateKeyword(
            "guests",
            e.target.value === ""
              ? ""
              : Number(e.target.value)
          )
        }
      />

      <span
        className="material-symbols-outlined searchicon"
        onClick={searchHandler}
      >
        search
      </span>
    </div>
  );
};

export default Search;