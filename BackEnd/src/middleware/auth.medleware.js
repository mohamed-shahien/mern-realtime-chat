import jwt from "jsonwebtoken";
import AppError from "../lib/appError.js";
import User from "../models/user.model.js";  

// 1. اتأكد إن التوكن موجود في الكوكيز
// 2. فك التوكن (verify token)
// 3. دور على اليوزر في قاعدة البيانات
// 4. حفظ بيانات اليوزر في request علشان الكنترولر يعرف مين اللي بيعدل مثلا
// 5. كمل للكنترولر
export const protectRoute = async (req, res, next) => {
        const token = req.cookies.jwt;
        if (token) {
                try {
                        const decoded = jwt.verify(token, process.env.JWT_SECRET);
                        const user = await User.findById(decoded.id).select("-password");
                        if (!user) {
                                return next(AppError.init(false, 401, "Unauthorized", "User not found"));
                        }
                        req.user = user;
                        next();
                } catch (error) {
                        return next(AppError.init(false, 401, "Unauthorized", "Invalid token"));
                }
        }
};