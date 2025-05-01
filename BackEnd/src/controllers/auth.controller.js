import validator from 'validator';
import bcrypt from 'bcryptjs';
import User from '../models/user.model.js';
import { ERROR, FAIL } from '../lib/httpsStatus.js';
import AppError from '../lib/appError.js';
import { generateToken } from '../lib/utils.js';
import ApiResponse from '../lib/apiresponse.js';
import cloudinary from '../lib/cloudnary.js';


export const signup = async (req, res, next) => {
        const { fullName, email, password } = req.body;
        try {
                if (!fullName || !email || !password) return next(AppError.init(false, 400, FAIL, "All fields are required"));
                if (!validator.isEmail(email)) return next(AppError.init(false, 400, FAIL, "Email is invalid"));
                if (!validator.isStrongPassword(password)) return next(AppError.init(false, 400, FAIL, "Password is not strong enough"));
                const user = await User.findOne({ email });
                if (user) return next(AppError.init(false, 400, FAIL, "User already exists"));
                const sald = await bcrypt.genSalt(10);
                const hashedPassword = await bcrypt.hash(password, sald);
                const newUser = new User({ fullName, email, password: hashedPassword });
                if (newUser) {
                        generateToken(newUser._id, res);
                        await newUser.save();
                        res.status(201).json(new ApiResponse(true, 201, "User created successfully", newUser));
                }
        } catch (error) {
                return next(AppError.init(false, 500, ERROR, error.message))
        }
}
export const login = async (req, res, next) => {
        const { email, password } = req.body;
        try {
                if (!validator.isEmail(email)) return next(AppError.init(false, 400, FAIL, "Email is invalid"));
                if (!validator.isStrongPassword(password)) return next(AppError.init(false, 400, FAIL, "Password is not strong enough"));
                const user = await User.findOne({ email });
                if (!user) return next(AppError.init(false, 400, FAIL, "User does not exist"));
                const isMatch = await bcrypt.compare(password, user.password);
                if (!isMatch) return next(AppError.init(false, 400, FAIL, "Password is incorrect"));
                generateToken(user._id, res);
                res.status(200).json(new ApiResponse(true, 200, "User logged in successfully", user));
        } catch (error) {
                return next(AppError.init(false, 500, ERROR, error.message))
        }

}
export const logout = async (req, res, next) => {
        try {
                res.cookie("jwt", "", { maxAge: 1 });
                res.status(200).json(new ApiResponse(true, 200, "User logged out successfully"));
        } catch (error) {
                next(AppError.init(false, 500, ERROR, error.message))
        }
}
export const apdateProfile = async (req, res, next) => {
        const { profilePic } = req.body;
        const userId = req.user._id;
        try {
                if (!profilePic) return next(AppError.init(false, 400, FAIL, "Profile picture is required"));
                const uploadResponse = await cloudinary.uploader.upload(profilePic)
                const updateUser = await User.findOneAndUpdate(userId, { profilePic: uploadResponse.secure_url }, { new: true });
                if (updateUser) {
                        res.status(200).json(new ApiResponse(true, 200, "User profile updated successfully", updateUser));
                }

        } catch (error) {
                return next(AppError.init(false, 500, ERROR, error.message))
        }
}
export const checkAuth = async (req, res, next) => {
        try {
                res.status(200).json(new ApiResponse(true, 200, "User is authenticated", req.user));
        } catch (error) {
                return next(AppError.init(false, 500, ERROR, error.message))
        }
}