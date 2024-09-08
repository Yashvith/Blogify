const { validateToken } = require("../services/authentication");

function checkForAuthenticationCookie(cookieName) {
    return (req, res, next) => {
        const tokenCookieValue = req.cookies[cookieName];
        
        // If no token is present, continue to the next middleware
        if (!tokenCookieValue) {
            return next();
        }

        try {
            // Validate the token and attach user payload to the request
            const userPayload = validateToken(tokenCookieValue);
            req.user = userPayload;
          
           
        } catch (error) { }

        return next();
    };
}

module.exports = { 
    checkForAuthenticationCookie ,
};
