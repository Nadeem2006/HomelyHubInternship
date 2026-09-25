import { Property } from "../Models/propertyModel.js";
import { planTrip } from "../ai/tripPlanner.js";
import { generateDescription } from "../ai/generateDescription.js";

const createTripPlan = async (req, res) => {
  try {
    const {
      destination,
      budget,
      days,
      people,
      interests,
    } = req.body;

    if (!destination || !budget || !days || !people) {
      return res.status(400).json({
        status: "fail",
        message:
          "Please fill in destination, budget, days, and people",
      });
    }

    console.log("Trip request:", req.body);

    const plan = await planTrip({
      destination,
      budget,
      days,
      people,
      interests: interests || [],
    });

    console.log("AI trip plan generated successfully");

    const perNight = Number(budget) / Number(days);

    const cityRegex = new RegExp(destination.trim(), "i");

    const properties = await Property.find({
      $or: [
        { "address.city": cityRegex },
        { "address.state": cityRegex },
        { "address.area": cityRegex },
      ],
      price: {
        $lte: perNight,
      },
      maximumGuest: {
        $gte: Number(people),
      },
    }).limit(6);

    console.log("Matching properties:", properties.length);

    return res.status(200).json({
      status: "success",
      data: {
        plan,
        properties,
        perNight,
      },
    });

  } catch (error) {
    console.error("TRIP GENIE ERROR:", error);

    return res.status(500).json({
      status: "fail",
      message: error.message,
      error: error,
    });
  }
};

const writeDescription = async (req, res) => {
  try {
    const description = await generateDescription(req.body);

    return res.status(200).json({
      status: "success",
      data: {
        description,
      },
    });

  } catch (error) {
    console.error("Description generation error:", error);

    return res.status(500).json({
      status: "fail",
      message: error.message || "Could not generate a description",
    });
  }
};

export {
  createTripPlan,
  writeDescription,
};