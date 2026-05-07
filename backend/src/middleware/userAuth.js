import jwt from "jsonwebtoken";

const authUsers = async (req, res, next) =>  {
    // const {token} = req.cookies
    const {token} = req.headers
    
    if(!token) {
        return res.status(400).json({ success: false, message: "Not Authorize Login Again" });
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        if (decoded.id) {
            
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