import { Address } from "../../models/address.model.js";
import { ApiError } from "../../utils/ApiError.js";
import { ApiResponse } from "../../utils/ApiResponse.js";
import { asyncHandler } from "../../utils/asyncHandler.js";


const addAddress = asyncHandler(async (req, res) => {
    const { userId, address, city, pincode, phone, notes } = req.body;
    // console.log(req.body)
    

    if(
        [userId, address, city, pincode, phone, notes].some((field) => field?.trim() === "")
    ){
           throw new ApiError(400, "All fields are required")
    }

    const newAddress = await Address.create({
        userId,
        address,
        city,
        pincode,
        notes,
        phone,
    })

    const createdAddress = await Address.findById(newAddress._id)

    if(!createdAddress){
        throw new ApiError(500, "Failed to add new address")
    }

    return res.status(200)
    .json(new ApiResponse(200, createdAddress,"Address added successfully!"))
})

const fetchAllAddress = asyncHandler(async (req, res) => {
    const {userId} = req.params;
   
    if (!userId) {
        throw new ApiError(400, "UserId required!")
        }
     
    const addressList = await Address.find({userId})
    

    if(!addressList){
        throw new ApiError(500, "Error fetching address!!")
    }

    return res.status(200)
    .json(new ApiResponse(200, {addressList}, "Address fetched successfully"))
      
})

const editAddress = asyncHandler(async (req,res) => {
    const { userId, addressId } = req.params;
    const formData = req.body;

    if (!userId || !addressId) {
     throw new ApiError(400, "User and address id is required!")
    }

    const address = await Address.findOneAndUpdate(
      {
        _id: addressId,
        userId,
      },
      formData,
      { new: true }
    );

    if (!address) {
      throw new ApiError(404, "Address not found!!")
    }

    return res.status(200)
    .json(new ApiResponse(200, address,"Address updated successfully!!"));
})

const deleteAddress = asyncHandler(async (req, res) => {
    const { userId, addressId } = req.params;
    if (!userId || !addressId) 
      {
        throw new ApiError(400, address,"User and address id is required!")
      }

      const address = await Address.findOneAndDelete({ _id: addressId, userId });

    if (!address) {
     throw new ApiError(400, "Address not found!")
    }

    return res.status(200)
    .json(new ApiResponse(200, {}, "Address deleted successfully!!"));


})




export {fetchAllAddress, addAddress, editAddress, deleteAddress}