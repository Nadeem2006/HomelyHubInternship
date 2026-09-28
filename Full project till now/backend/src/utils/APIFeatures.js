class APIFeatures {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }

  // =========================
  // FILTER
  // =========================
  filter() {
    const queryObj = { ...this.queryString };
    const filterQuery = {};

    // -------------------------
    // PRICE
    // -------------------------
    const minPrice = Number(queryObj.minPrice);
    const maxPrice = Number(queryObj.maxPrice);

    if (
      queryObj.minPrice !== undefined &&
      queryObj.minPrice !== "" &&
      !isNaN(minPrice)
    ) {
      filterQuery.price = {
        ...filterQuery.price,
        $gte: minPrice,
      };
    }

    if (
      queryObj.maxPrice !== undefined &&
      queryObj.maxPrice !== "" &&
      !isNaN(maxPrice)
    ) {
      filterQuery.price = {
        ...filterQuery.price,
        $lte: maxPrice,
      };
    }

    // -------------------------
    // PROPERTY TYPE
    // -------------------------
    if (
      queryObj.propertyType &&
      queryObj.propertyType !== ""
    ) {
      let propertyTypeArray = [];

      if (Array.isArray(queryObj.propertyType)) {
        propertyTypeArray = queryObj.propertyType;
      } else {
        propertyTypeArray = queryObj.propertyType
          .split(",")
          .map((value) => value.trim())
          .filter(Boolean);
      }

      if (propertyTypeArray.length > 0) {
        filterQuery.propertyType = {
          $in: propertyTypeArray,
        };
      }
    }

    // -------------------------
    // ROOM TYPE
    // -------------------------
    if (
      queryObj.roomType &&
      queryObj.roomType !== "" &&
      queryObj.roomType !== "Anytype"
    ) {
      filterQuery.roomType = queryObj.roomType;
    }

    // -------------------------
    // AMENITIES
    // -------------------------
    if (
      queryObj.amenities &&
      queryObj.amenities !== ""
    ) {
      let amenitiesArray = [];

      if (Array.isArray(queryObj.amenities)) {
        amenitiesArray = queryObj.amenities;
      } else {
        amenitiesArray = queryObj.amenities
          .split(",")
          .map((value) => value.trim())
          .filter(Boolean);
      }

      if (amenitiesArray.length > 0) {
        filterQuery.amenities = {
          $all: amenitiesArray.map((amenity) => ({
            $elemMatch: {
              name: amenity,
            },
          })),
        };
      }
    }

    console.log("FILTER QUERY:", filterQuery);

    this.query = this.query.find(filterQuery);

    return this;
  }

  // =========================
  // SEARCH
  // =========================
  search() {
    const queryObj = { ...this.queryString };
    const searchQuery = {};

    // -------------------------
    // CITY / STATE / AREA
    // -------------------------
    if (
      queryObj.city &&
      queryObj.city.trim() !== ""
    ) {
      const city = queryObj.city.trim();

      searchQuery.$or = [
        {
          "address.city": {
            $regex: city,
            $options: "i",
          },
        },
        {
          "address.state": {
            $regex: city,
            $options: "i",
          },
        },
        {
          "address.area": {
            $regex: city,
            $options: "i",
          },
        },
      ];
    }

    // -------------------------
    // GUESTS
    // -------------------------
    if (
      queryObj.guests &&
      queryObj.guests !== ""
    ) {
      const guests = Number(queryObj.guests);

      if (!isNaN(guests)) {
        searchQuery.maximumGuest = {
          $gte: guests,
        };
      }
    }

    // -------------------------
    // DATE SEARCH
    // -------------------------
    if (
      queryObj.dateIn &&
      queryObj.dateOut
    ) {
      try {
        const [inDay, inMonth, inYear] =
          queryObj.dateIn.split("-");

        const [outDay, outMonth, outYear] =
          queryObj.dateOut.split("-");

        const dateIn = new Date(
          `${inYear}-${inMonth}-${inDay}T00:00:00.000Z`
        );

        const dateOut = new Date(
          `${outYear}-${outMonth}-${outDay}T00:00:00.000Z`
        );

        if (
          !isNaN(dateIn.getTime()) &&
          !isNaN(dateOut.getTime())
        ) {
          searchQuery.currentBookings = {
            $not: {
              $elemMatch: {
                fromDate: {
                  $lt: dateOut,
                },
                toDate: {
                  $gt: dateIn,
                },
              },
            },
          };
        }
      } catch (error) {
        console.log(
          "Date search error:",
          error.message
        );
      }
    }

    console.log("SEARCH QUERY:", searchQuery);

    this.query = this.query.find(searchQuery);

    return this;
  }

  // =========================
  // PAGINATION
  // =========================
  paginate() {
    const page =
      Number(this.queryString.page) || 1;

    const limit =
      Number(this.queryString.limit) || 12;

    const skip = (page - 1) * limit;

    this.query = this.query
      .skip(skip)
      .limit(limit);

    return this;
  }
}

export { APIFeatures };