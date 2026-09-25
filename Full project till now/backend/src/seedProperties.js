import mongoose from "mongoose";
import dotenv from "dotenv";
import { Property } from "./Models/propertyModel.js";

dotenv.config();

const amenities = [
  {
    name: "Wifi",
    icon: "wifi",
  },
  {
    name: "Kitchen",
    icon: "kitchen",
  },
  {
    name: "Ac",
    icon: "ac_unit",
  },
  {
    name: "Tv",
    icon: "tv",
  },
  {
    name: "Free Parking",
    icon: "local_parking",
  },
  {
    name: "Pool",
    icon: "pool",
  },
];

const properties = [
  {
    propertyName: "Sunny Beach Cottage",
    description:
      "A bright, airy cottage close to the beach with comfortable rooms and a peaceful atmosphere.",
    extraInfo: "Check-in on time. Good services.",
    propertyType: "House",
    roomType: "Entire Home",
    maximumGuest: 4,
    amenities,
    images: [
      { url: "/assets/image1.jpeg" },
      { url: "/assets/image2.jpeg" },
      { url: "/assets/image3.jpeg" },
      { url: "/assets/image4.jpeg" },
      { url: "/assets/image5.jpeg" },
      { url: "/assets/image6.jpeg" },
    ],
    price: 4500,
    address: {
      area: "Juhu",
      city: "Mumbai",
      state: "Maharashtra",
      pincode: 400049,
    },
    currentBookings: [
      {
        fromDate: new Date("2026-09-10"),
        toDate: new Date("2026-09-14"),
      },
      {
        fromDate: new Date("2026-10-01"),
        toDate: new Date("2026-10-05"),
      },
    ],
    checkInTime: "13:00",
    checkOutTime: "10:00",
  },

  {
    propertyName: "Mountain View Villa",
    description:
      "A peaceful mountain villa with beautiful views and comfortable rooms for families and groups.",
    extraInfo: "Clean rooms and good services.",
    propertyType: "House",
    roomType: "Entire Home",
    maximumGuest: 6,
    amenities,
    images: [
      { url: "/assets/image3.jpeg" },
      { url: "/assets/image4.jpeg" },
      { url: "/assets/image5.jpeg" },
      { url: "/assets/image6.jpeg" },
      { url: "/assets/image7.jpeg" },
      { url: "/assets/image8.jpeg" },
    ],
    price: 7800,
    address: {
      area: "Mall Road",
      city: "Manali",
      state: "Himachal Pradesh",
      pincode: 175131,
    },
    currentBookings: [],
    checkInTime: "13:00",
    checkOutTime: "10:00",
  },

  {
    propertyName: "Cozy City Apartment",
    description:
      "A comfortable city apartment with modern facilities, suitable for small families and travellers.",
    extraInfo: "Comfortable stay with good connectivity.",
    propertyType: "Flat",
    roomType: "Entire Home",
    maximumGuest: 3,
    amenities,
    images: [
      { url: "/assets/image7.jpeg" },
      { url: "/assets/image8.jpeg" },
      { url: "/assets/property2.webp" },
      { url: "/assets/property3.webp" },
      { url: "/assets/property4.webp" },
      { url: "/assets/property5.webp" },
    ],
    price: 3200,
    address: {
      area: "Koramangala",
      city: "Bengaluru",
      state: "Karnataka",
      pincode: 560034,
    },
    currentBookings: [],
    checkInTime: "13:00",
    checkOutTime: "10:00",
  },

  {
    propertyName: "Lakeside Retreat",
    description:
      "A relaxing lakeside property offering a peaceful stay with scenic surroundings.",
    extraInfo: "Peaceful location and good services.",
    propertyType: "Guest House",
    roomType: "Entire Home",
    maximumGuest: 5,
    amenities,
    images: [
      { url: "/assets/image7.jpeg" },
      { url: "/assets/image8.jpeg" },
      { url: "/assets/property2.webp" },
      { url: "/assets/property3.webp" },
      { url: "/assets/property4.webp" },
      { url: "/assets/property5.webp" },
    ],
    price: 5600,
    address: {
      area: "Lake Pichola",
      city: "Udaipur",
      state: "Rajasthan",
      pincode: 313001,
    },
    currentBookings: [],
    checkInTime: "13:00",
    checkOutTime: "10:00",
  },

  {
    propertyName: "Heritage Haveli Stay",
    description:
      "A traditional heritage stay with comfortable rooms and a beautiful atmosphere.",
    extraInfo: "Traditional experience with good services.",
    propertyType: "Hotel",
    roomType: "Room",
    maximumGuest: 8,
    amenities,
    images: [
      { url: "/assets/property2.webp" },
      { url: "/assets/property3.webp" },
      { url: "/assets/property4.webp" },
      { url: "/assets/property5.webp" },
      { url: "/assets/property6.webp" },
      { url: "/assets/property7.webp" },
    ],
    price: 6900,
    address: {
      area: "Amer Road",
      city: "Jaipur",
      state: "Rajasthan",
      pincode: 302002,
    },
    currentBookings: [],
    checkInTime: "13:00",
    checkOutTime: "10:00",
  },

  {
    propertyName: "Backwater Houseboat",
    description:
      "A beautiful houseboat stay surrounded by the peaceful backwaters of Kerala.",
    extraInfo: "Scenic location and comfortable stay.",
    propertyType: "House",
    roomType: "Entire Home",
    maximumGuest: 4,
    amenities,
    images: [
      { url: "/assets/property3.webp" },
      { url: "/assets/property4.webp" },
      { url: "/assets/property5.webp" },
      { url: "/assets/property6.webp" },
      { url: "/assets/property7.webp" },
      { url: "/assets/image1.jpeg" },
    ],
    price: 8200,
    address: {
      area: "Punnamada",
      city: "Alappuzha",
      state: "Kerala",
      pincode: 688006,
    },
    currentBookings: [],
    checkInTime: "13:00",
    checkOutTime: "10:00",
  },

  {
    propertyName: "Marina Beach Apartment",
    description:
      "A modern apartment located close to Chennai's famous Marina Beach.",
    extraInfo: "Ideal for families and weekend trips.",
    propertyType: "Flat",
    roomType: "Entire Home",
    maximumGuest: 4,
    amenities,
    images: [
      { url: "/assets/image1.jpeg" },
      { url: "/assets/image2.jpeg" },
      { url: "/assets/image3.jpeg" },
      { url: "/assets/image4.jpeg" },
      { url: "/assets/image5.jpeg" },
      { url: "/assets/image6.jpeg" },
    ],
    price: 3500,
    address: {
      area: "Triplicane",
      city: "Chennai",
      state: "Tamil Nadu",
      pincode: 600005,
    },
    currentBookings: [],
  },

  {
    propertyName: "Ooty Hill Cottage",
    description:
      "A cosy hill cottage surrounded by greenery and cool mountain weather.",
    extraInfo: "Quiet location with scenic views.",
    propertyType: "House",
    roomType: "Entire Home",
    maximumGuest: 5,
    amenities,
    images: [
      { url: "/assets/image3.jpeg" },
      { url: "/assets/image4.jpeg" },
      { url: "/assets/image5.jpeg" },
      { url: "/assets/image6.jpeg" },
      { url: "/assets/image7.jpeg" },
      { url: "/assets/image8.jpeg" },
    ],
    price: 5200,
    address: {
      area: "Coonoor Road",
      city: "Ooty",
      state: "Tamil Nadu",
      pincode: 643001,
    },
    currentBookings: [],
  },

  {
    propertyName: "Goa Palm Villa",
    description:
      "A relaxing holiday villa surrounded by palm trees and close to popular beaches.",
    extraInfo: "Perfect for a beach vacation.",
    propertyType: "House",
    roomType: "Entire Home",
    maximumGuest: 6,
    amenities,
    images: [
      { url: "/assets/property2.webp" },
      { url: "/assets/property3.webp" },
      { url: "/assets/property4.webp" },
      { url: "/assets/property5.webp" },
      { url: "/assets/property6.webp" },
      { url: "/assets/property7.webp" },
    ],
    price: 7500,
    address: {
      area: "Calangute",
      city: "Goa",
      state: "Goa",
      pincode: 403516,
    },
    currentBookings: [],
  },

  {
    propertyName: "Pune Business Stay",
    description:
      "A comfortable modern apartment suitable for business travellers and families.",
    extraInfo: "Close to shopping and business areas.",
    propertyType: "Flat",
    roomType: "Entire Home",
    maximumGuest: 4,
    amenities,
    images: [
      { url: "/assets/image7.jpeg" },
      { url: "/assets/image8.jpeg" },
      { url: "/assets/property2.webp" },
      { url: "/assets/property3.webp" },
      { url: "/assets/property4.webp" },
      { url: "/assets/property5.webp" },
    ],
    price: 4100,
    address: {
      area: "Hinjewadi",
      city: "Pune",
      state: "Maharashtra",
      pincode: 411057,
    },
    currentBookings: [],
  },

  {
    propertyName: "Kochi Riverside Home",
    description:
      "A peaceful riverside home offering a comfortable Kerala travel experience.",
    extraInfo: "Good connectivity and peaceful surroundings.",
    propertyType: "Guest House",
    roomType: "Entire Home",
    maximumGuest: 5,
    amenities,
    images: [
      { url: "/assets/image1.jpeg" },
      { url: "/assets/image2.jpeg" },
      { url: "/assets/image3.jpeg" },
      { url: "/assets/image4.jpeg" },
      { url: "/assets/image5.jpeg" },
      { url: "/assets/image6.jpeg" },
    ],
    price: 4800,
    address: {
      area: "Fort Kochi",
      city: "Kochi",
      state: "Kerala",
      pincode: 682001,
    },
    currentBookings: [],
  },

  {
    propertyName: "Hyderabad City Villa",
    description:
      "A spacious villa with modern facilities in a convenient part of Hyderabad.",
    extraInfo: "Suitable for families and groups.",
    propertyType: "House",
    roomType: "Entire Home",
    maximumGuest: 7,
    amenities,
    images: [
      { url: "/assets/property3.webp" },
      { url: "/assets/property4.webp" },
      { url: "/assets/property5.webp" },
      { url: "/assets/property6.webp" },
      { url: "/assets/property7.webp" },
      { url: "/assets/image1.jpeg" },
    ],
    price: 6200,
    address: {
      area: "Gachibowli",
      city: "Hyderabad",
      state: "Telangana",
      pincode: 500032,
    },
    currentBookings: [],
  },

  {
    propertyName: "Mysore Palace Stay",
    description:
      "A comfortable stay close to the historic attractions of Mysore.",
    extraInfo: "Great for sightseeing trips.",
    propertyType: "Hotel",
    roomType: "Room",
    maximumGuest: 3,
    amenities,
    images: [
      { url: "/assets/image2.jpeg" },
      { url: "/assets/image3.jpeg" },
      { url: "/assets/image4.jpeg" },
      { url: "/assets/image5.jpeg" },
      { url: "/assets/image6.jpeg" },
      { url: "/assets/image7.jpeg" },
    ],
    price: 3000,
    address: {
      area: "Sayyaji Rao Road",
      city: "Mysuru",
      state: "Karnataka",
      pincode: 570001,
    },
    currentBookings: [],
  },

  {
    propertyName: "Delhi Heritage Apartment",
    description:
      "A modern apartment located near popular heritage and shopping destinations.",
    extraInfo: "Good public transport connectivity.",
    propertyType: "Flat",
    roomType: "Entire Home",
    maximumGuest: 4,
    amenities,
    images: [
      { url: "/assets/image4.jpeg" },
      { url: "/assets/image5.jpeg" },
      { url: "/assets/image6.jpeg" },
      { url: "/assets/image7.jpeg" },
      { url: "/assets/image8.jpeg" },
      { url: "/assets/property2.webp" },
    ],
    price: 4400,
    address: {
      area: "Karol Bagh",
      city: "Delhi",
      state: "Delhi",
      pincode: 110005,
    },
    currentBookings: [],
  },

  {
    propertyName: "Rishikesh Riverside Retreat",
    description:
      "A peaceful retreat near the Ganges with comfortable rooms and scenic surroundings.",
    extraInfo: "Ideal for relaxing holidays.",
    propertyType: "Guest House",
    roomType: "Room",
    maximumGuest: 4,
    amenities,
    images: [
      { url: "/assets/property4.webp" },
      { url: "/assets/property5.webp" },
      { url: "/assets/property6.webp" },
      { url: "/assets/property7.webp" },
      { url: "/assets/image1.jpeg" },
      { url: "/assets/image2.jpeg" },
    ],
    price: 3800,
    address: {
      area: "Tapovan",
      city: "Rishikesh",
      state: "Uttarakhand",
      pincode: 249192,
    },
    currentBookings: [],
  },

  {
    propertyName: "Kolkata Heritage Home",
    description:
      "A comfortable heritage-style home offering a traditional city experience.",
    extraInfo: "Located near major attractions.",
    propertyType: "House",
    roomType: "Entire Home",
    maximumGuest: 5,
    amenities,
    images: [
      { url: "/assets/image5.jpeg" },
      { url: "/assets/image6.jpeg" },
      { url: "/assets/image7.jpeg" },
      { url: "/assets/image8.jpeg" },
      { url: "/assets/property3.webp" },
      { url: "/assets/property4.webp" },
    ],
    price: 4200,
    address: {
      area: "Park Street",
      city: "Kolkata",
      state: "West Bengal",
      pincode: 700016,
    },
    currentBookings: [],
  },

  {
    propertyName: "Ahmedabad Modern Stay",
    description:
      "A modern and spacious apartment for travellers visiting Ahmedabad.",
    extraInfo: "Comfortable rooms and easy city access.",
    propertyType: "Flat",
    roomType: "Entire Home",
    maximumGuest: 4,
    amenities,
    images: [
      { url: "/assets/property5.webp" },
      { url: "/assets/property6.webp" },
      { url: "/assets/property7.webp" },
      { url: "/assets/image1.jpeg" },
      { url: "/assets/image2.jpeg" },
      { url: "/assets/image3.jpeg" },
    ],
    price: 3600,
    address: {
      area: "Navrangpura",
      city: "Ahmedabad",
      state: "Gujarat",
      pincode: 380009,
    },
    currentBookings: [],
  },

  {
    propertyName: "Shimla Snow View Hotel",
    description:
      "A comfortable mountain hotel with beautiful views of the surrounding hills.",
    extraInfo: "Popular for family holidays.",
    propertyType: "Hotel",
    roomType: "Room",
    maximumGuest: 3,
    amenities,
    images: [
      { url: "/assets/image3.jpeg" },
      { url: "/assets/image4.jpeg" },
      { url: "/assets/image5.jpeg" },
      { url: "/assets/image6.jpeg" },
      { url: "/assets/property2.webp" },
      { url: "/assets/property3.webp" },
    ],
    price: 5800,
    address: {
      area: "Mall Road",
      city: "Shimla",
      state: "Himachal Pradesh",
      pincode: 171001,
    },
    currentBookings: [],
  },

  {
    propertyName: "Varanasi Riverside Stay",
    description:
      "A peaceful accommodation close to the famous ghats of Varanasi.",
    extraInfo: "Suitable for short city visits.",
    propertyType: "Guest House",
    roomType: "Room",
    maximumGuest: 3,
    amenities,
    images: [
      { url: "/assets/image6.jpeg" },
      { url: "/assets/image7.jpeg" },
      { url: "/assets/image8.jpeg" },
      { url: "/assets/property4.webp" },
      { url: "/assets/property5.webp" },
      { url: "/assets/property6.webp" },
    ],
    price: 2800,
    address: {
      area: "Assi Ghat",
      city: "Varanasi",
      state: "Uttar Pradesh",
      pincode: 221005,
    },
    currentBookings: [],
  },

  {
    propertyName: "Bengaluru Tech Park Apartment",
    description:
      "A modern apartment located close to Bengaluru's technology and business areas.",
    extraInfo: "Ideal for business travellers.",
    propertyType: "Flat",
    roomType: "Entire Home",
    maximumGuest: 4,
    amenities,
    images: [
      { url: "/assets/property7.webp" },
      { url: "/assets/image1.jpeg" },
      { url: "/assets/image2.jpeg" },
      { url: "/assets/image3.jpeg" },
      { url: "/assets/image4.jpeg" },
      { url: "/assets/image5.jpeg" },
    ],
    price: 3900,
    address: {
      area: "Whitefield",
      city: "Bengaluru",
      state: "Karnataka",
      pincode: 560066,
    },
    currentBookings: [],
  },

  {
    propertyName: "Mahabalipuram Beach Villa",
    description:
      "A relaxing beach villa near the historic coastal attractions of Mahabalipuram.",
    extraInfo: "Perfect for weekend trips.",
    propertyType: "House",
    roomType: "Entire Home",
    maximumGuest: 6,
    amenities,
    images: [
      { url: "/assets/image2.jpeg" },
      { url: "/assets/image3.jpeg" },
      { url: "/assets/image4.jpeg" },
      { url: "/assets/image5.jpeg" },
      { url: "/assets/image6.jpeg" },
      { url: "/assets/image7.jpeg" },
    ],
    price: 6500,
    address: {
      area: "East Coast Road",
      city: "Mahabalipuram",
      state: "Tamil Nadu",
      pincode: 603104,
    },
    currentBookings: [],
  },

  {
    propertyName: "Wayanad Forest Cottage",
    description:
      "A peaceful cottage surrounded by greenery and natural beauty.",
    extraInfo: "Quiet location for nature lovers.",
    propertyType: "House",
    roomType: "Entire Home",
    maximumGuest: 5,
    amenities,
    images: [
      { url: "/assets/property2.webp" },
      { url: "/assets/property3.webp" },
      { url: "/assets/property4.webp" },
      { url: "/assets/property5.webp" },
      { url: "/assets/property6.webp" },
      { url: "/assets/property7.webp" },
    ],
    price: 4700,
    address: {
      area: "Kalpetta",
      city: "Wayanad",
      state: "Kerala",
      pincode: 673121,
    },
    currentBookings: [],
  },

  {
    propertyName: "Jodhpur Blue City Stay",
    description:
      "A comfortable heritage stay with easy access to the historic parts of Jodhpur.",
    extraInfo: "Traditional atmosphere and modern facilities.",
    propertyType: "Hotel",
    roomType: "Room",
    maximumGuest: 4,
    amenities,
    images: [
      { url: "/assets/image4.jpeg" },
      { url: "/assets/image5.jpeg" },
      { url: "/assets/image6.jpeg" },
      { url: "/assets/image7.jpeg" },
      { url: "/assets/image8.jpeg" },
      { url: "/assets/property2.webp" },
    ],
    price: 5100,
    address: {
      area: "Clock Tower",
      city: "Jodhpur",
      state: "Rajasthan",
      pincode: 342001,
    },
    currentBookings: [],
  },

  {
    propertyName: "Pondicherry French Quarter Home",
    description:
      "A charming home near the French Quarter with easy access to beaches and cafes.",
    extraInfo: "Great for weekend getaways.",
    propertyType: "Guest House",
    roomType: "Entire Home",
    maximumGuest: 4,
    amenities,
    images: [
      { url: "/assets/image1.jpeg" },
      { url: "/assets/image2.jpeg" },
      { url: "/assets/image3.jpeg" },
      { url: "/assets/image4.jpeg" },
      { url: "/assets/property3.webp" },
      { url: "/assets/property4.webp" },
    ],
    price: 4300,
    address: {
      area: "White Town",
      city: "Puducherry",
      state: "Puducherry",
      pincode: 605001,
    },
    currentBookings: [],
  },
];

const seedProperties = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    console.log("MongoDB connected");

    console.log("Number of properties:", properties.length);

    // Remove old seeded properties
    await Property.deleteMany({});

    // Insert all 6 properties
    await Property.insertMany(properties);

    console.log("6 properties inserted successfully");

    await mongoose.connection.close();

    console.log("MongoDB connection closed");
  } catch (error) {
    console.error("Error inserting properties:", error);

    await mongoose.connection.close();

    process.exit(1);
  }
};

seedProperties();

