import jwt from 'jsonwebtoken';



const adminAuth = async (req, res, next) => {
    try {
        const {token} =  req.cookies
        
        if(!token){
            res.status(401).send({ error: 'Please  authenticate as admin' });
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (decoded !== process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD) {
            res.status(401).send({ error: 'Please authenticate as admin' });
        }
        next();
    } catch (e) {
        
        res.status(401).send({ error: 'Please authenticate as admin' });
    }
};

export default adminAuth;

//('Authorization').replace('Bearer ', '');