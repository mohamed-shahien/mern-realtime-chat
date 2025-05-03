import appError from "../lib/appError.js";
import ApiResponse from "../lib/apiresponse.js";
import User from "../models/user.model.js";
import cloudinary from "../lib/cloudnary.js";
import Message from "../models/message.model.js";
import { getReceiverSocketId, io } from "../lib/socket.js";
import { ERROR } from "../lib/httpsStatus.js";

export const getUsersForSideBar = async (req, res, next) => {
        const loggedInUserId = req.user._id;
        try {
                const users = await User.find({ _id: { $ne: loggedInUserId } }).select("-password");
                res.status(200).json(new ApiResponse(true, 200, "Users fetched successfully", users));
        } catch (error) {
                return next(appError.init(false, 500, ERROR, error.message))
        }

};

export const getMessages = async (req, res, next) => {
        try {
                const { id: userToChateId } = req.params;
                const myId = req.user._id;
                const message = await Message.find({ $or: [{ senderId: myId, receiverId: userToChateId }, { senderId: userToChateId, receiverId: myId }] });
                res.status(200).json(new ApiResponse(true, 200, "Messages fetched successfully", message));
        } catch (error) {
                return next(appError.init(false, 500, ERROR, error.message))
        }
}


export const sendMessage = async (req, res, next) => {
        const { image, text } = req.body;
        const { id: receiverId } = req.params;
        const senderId = req.user._id;
        try {
                let imageURL;
                if (image) {
                        const uploadResponse = await cloudinary.uploader.upload(image)
                        imageURL = uploadResponse.secure_url;
                }
                const newMessage = new Message({ senderId, receiverId, text, image: imageURL });
                await newMessage.save();

                const receverSockerId = getReceiverSocketId(receiverId);
                if (receverSockerId) {
                        io.to(receverSockerId).emit("message", newMessage);
                }

                res.status(200).json(new ApiResponse(true, 200, "Message sent successfully", newMessage));
        } catch (error) {
                return next(appError.init(false, 500, ERROR, error.message))
        }
}