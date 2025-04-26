import jwt from "jsonwebtoken";
export const generateToken = (id, res) => {
        const token = jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn:"7d" });

        res.cookie("jwt", token, {
                maxAge: 100 * 60 * 60 * 1000,
                httpOnly: true,
                sameSite: "strict",
                secure: process.env.NODE_ENV !== "development",
        });

        return token;
};
