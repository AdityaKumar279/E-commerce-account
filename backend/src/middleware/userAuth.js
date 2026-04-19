import jwt from "jsonwebtoken";

const authUsers = async (req, res, next) =>  {
    const {token} = req.cookies
    console.log(token);
    if(!token) {
        return res.status(400).json({ success: false, message: "Not Authorize Login Again" });
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log(decoded.id);
        if (decoded.id) {
            console.log(decoded);
            req.body = decoded.id;
        }else{
            return res.status(400).json({ success: false, message: "Invalid i token" });
        }
        next();
    } catch (error) {
        return res.status(400).json({ success: false, message: "Invalid token" });
    }

}
export default authUsers