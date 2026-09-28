import { Property } from "../Models/propertyModel.js";
import { APIFeatures } from "../utils/APIFeatures.js";
import imagekit from "../utils/ImagekitIO.js";

// ==========================================
// GET ALL PROPERTIES
// ==========================================
const getProperties = async (req, res) => {
  try {
    console.log(
      "Incoming listing request:",
      req.query
    );

    // -----------------------------
    // Build filtered query
    // -----------------------------
    const features = new APIFeatures(
      Property.find(),
      req.query
    )
      .filter()
      .search();

    // -----------------------------
    // Get filtered properties count
    // -----------------------------
    const filteredProperties =
      await features.query.clone();

    const totalFilteredProperties =
      filteredProperties.length;

    // -----------------------------
    // Apply pagination
    // -----------------------------
    features.paginate();

    const properties = await features.query;

    console.log(
      "Filtered properties:",
      totalFilteredProperties
    );

    console.log(
      "Properties returned:",
      properties.length
    );

    res.status(200).json({
      status: "success",
      no_of_responses: properties.length,
      all_properties: totalFilteredProperties,
      data: properties,
    });
  } catch (error) {
    console.error(
      "Error getting properties:",
      error
    );

    res.status(500).json({
      status: "fail",
      message:
        error.message ||
        "Internal server error",
    });
  }
};

// ==========================================
// GET SINGLE PROPERTY
// ==========================================
const getProperty = async (req, res) => {
  try {
    const property =
      await Property.findById(req.params.id);

    if (!property) {
      return res.status(404).json({
        status: "fail",
        message: "Property not found",
      });
    }

    res.status(200).json({
      status: "success",
      data: property,
    });
  } catch (error) {
    console.error(
      "Error getting property:",
      error
    );

    res.status(404).json({
      status: "fail",
      message: error.message,
    });
  }
};

// ==========================================
// CREATE PROPERTY
// ==========================================
const createProperty = async (req, res) => {
  try {
    const {
      propertyName,
      description,
      propertyType,
      roomType,
      extraInfo,
      address,
      amenities,
      checkInTime,
      checkOutTime,
      maximumGuest,
      price,
      images,
    } = req.body;

    // -----------------------------
    // Validate images
    // -----------------------------
    if (
      !images ||
      !Array.isArray(images) ||
      images.length < 6
    ) {
      return res.status(400).json({
        status: "fail",
        message:
          "Please upload at least 6 images",
      });
    }

    // -----------------------------
    // Upload images to ImageKit
    // -----------------------------
    const uploadedImages = [];

    for (const image of images) {
      const result = await imagekit.upload({
        file: image.url,
        fileName: `property_${Date.now()}.jpg`,
        folder: "property_images",
      });

      uploadedImages.push({
        url: result.url,
        public_id: result.fileId,
      });
    }

    // -----------------------------
    // Create property
    // -----------------------------
    const property = await Property.create({
      propertyName,
      description,
      propertyType,
      roomType,
      extraInfo,
      address,
      amenities,
      checkInTime,
      checkOutTime,
      maximumGuest,
      price,
      images: uploadedImages,
      userId: req.user.id,
    });

    console.log(
      "New property added:",
      property._id
    );

    res.status(201).json({
      status: "success",
      data: {
        data: property,
      },
    });
  } catch (error) {
    console.error(
      "Error creating property:",
      error
    );

    res.status(400).json({
      status: "fail",
      message: error.message,
    });
  }
};

// ==========================================
// GET USER'S PROPERTIES
// ==========================================
const getUsersProperties = async (
  req,
  res
) => {
  try {
    const userId = req.user._id;

    console.log(
      "Logged in user ID:",
      userId
    );

    const properties =
      await Property.find({
        userId,
      });

    console.log(
      "User properties found:",
      properties.length
    );

    res.status(200).json({
      status: "success",
      data: properties,
    });
  } catch (error) {
    console.error(
      "Error getting user properties:",
      error
    );

    res.status(500).json({
      status: "fail",
      message: error.message,
    });
  }
};

export {
  getProperties,
  getProperty,
  createProperty,
  getUsersProperties,
};