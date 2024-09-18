const jwt = require('jsonwebtoken')
model.exports= (role) => {
    return (req, res, next) =>{

        const token= req.header('autorization');
        if (!token) {
            return res.status(401).json({
                message: 'No token provided. Access denied'
            });
        }
        try {

            const decoded =jwt.verify(token.split(' ')[1], process.env.JWT_SECRET);
            
            if(role && decoded.role !== role){

                return res.status(403).json ({
                    message: "Forbidden"
                });
            }

            next();

        }
        catch (err)
        {
            res.status(400).json({ message:' invalid token'});
        }
    };
};