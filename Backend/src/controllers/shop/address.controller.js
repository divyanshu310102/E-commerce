import { Address } from "../../models/address.model";
import { ApiError } from "../../utils/ApiError";
import { ApiResponse } from "../../utils/ApiResponse";
import { asyncHandler } from "../../utils/asyncHandler";


const addAddress = asyncHandler(async (req, res) => {
    const { userId, address, city, pincode, phone, notes } = req.body;

    if(
        [userId, address, city, pincode, phone, notes].some((field) => field.trim() === "")
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
    .json(new ApiResponse(200, addressList, "Address fetched successfully"))
      
})




export {fetchAllAddress, addAddress}