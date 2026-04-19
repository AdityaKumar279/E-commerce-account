import jwt from "jsonwebtoken";


const authUser = async (req, res, next) =>  {
    const token = req.cookies.token
    if(!token) {
        return res.status(400).json({ success: false, message: "Not Authorize Login Again" });
          }
        try {
            const token_decode = jwt.verify(token, process.env.JWT_SECRET)
            req.body.productId = token_decode.id
            next()
        } catch (error) {
            console.log(error);
            res.status(401).send({ success: false, message: error.message })
        }
        

}
export default authUser