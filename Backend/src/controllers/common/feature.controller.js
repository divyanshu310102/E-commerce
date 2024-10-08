import { Feature } from "../../models/feature.model.js";
import { asyncHandler } from "../../utils/asyncHandler.js";

const addFeatureImage = asyncHandler(async (req, res) => {
    const { image } = req.body;

    const featureImages = await Feature.create({
        image,
    })

    return res.status(200)
    .json(
        new ApiResponse(200, featureImages, "Feature image uploaded successfully")
    )
})

const getFeatureImages = asyncHandler(async (req, res) => {
    const featureImages = await Feature.find({});

    return res.status(200)
    .json(
        new ApiResponse(200, featureImages, "Feature images fetched successfully")
    )
})

export {addFeatureImage, getFeatureImages}