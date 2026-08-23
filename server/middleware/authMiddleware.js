const jwt = require("jsonwebtoken");

const authMiddleware = (req,res,next) => {
    try {
        // get the authorization header
        const authHeader = req.headers.authorization;
        if (!authHeader) {
            return res.status(401).json({
                message: "Authentication required"
            });
        }

        // Extract the token
        const token = authHeader.split(" ")[1];

        if(!token) {
            return res.status(401).json({
                message: "Authentication required"
            });
        }
        // verify the token

        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET
        );

        // STORE THE USER INFORMATION IN THE REQUEST

        req.user = decoded;

        //Continue to the next middleware/controller
        next();
    } catch (error) {
        return res.status(401).json({
            message: "Invalid or expired token"
        });
    }
};

module.exports = authMiddleware;