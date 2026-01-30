import userModel from "../models/user.model.js"



const addToCart = async (req, res) => {
    try {
        const {productId, itemId, size} = req.body

        const userData = await userModel.findById(productId)
        let cartData = await userData.cartData;

        if(cartData[itemId]){
            if(cartData[itemId][size]) {
                cartData[itemId][size] += 1
            }else{
                cartData[itemId][size] = 1
            }
        }else{
            cartData[itemId] = {}
            cartData[itemId][size] = 1
        }

        await userModel.findByIdAndUpdate(productId, {cartData})
        res.status(200).json({success: true, message: "Added to Cart"})
    } catch (error) {
        res.status(500).json({success: false, message: e.message})
    }
}
const updateToCart = async (req, res) => {
    try {
        const {productId, itemId, size, quantity} = req.body

        const userData = await userModel.findById(productId)
        let cartData = await userData.cartData;

        cartData[itemId][size] = quantity
        await userModel.findByIdAndUpdate(productId, {cartData})
        res.status(200).json({success: true, message: "UpDated to Cart"})

    } catch (error) {
        res.status(500).json({success: false, message: error.message})
        
    }

}
const getToCart = async (req, res) => {
    try {
        const {productId} = req.body

        const userData = await userModel.findById(productId)
        let cartData = await userData.cartData;
        res.status(200).json({success: true, cartData})
    } catch (error) {
        res.status(500).json({success: false, message: error.message})
    }

}

export {
    addToCart,
    updateToCart,
    getToCart
}