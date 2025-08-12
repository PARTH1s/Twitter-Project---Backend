import passport from 'passport';

/**
 * Middleware to authenticate requests using JWT strategy with Passport.
 * If authentication fails, responds with 401 Unauthorized.
 * On success, attaches the user object to req and proceeds to next middleware.
 */
export const authenticate = (req, res, next) => {
    passport.authenticate('jwt', (err, user, info) => {
        if (err) {
            return next(err);  
        }
        if (!user) {
            return res.status(401).json({
                message: 'Unauthorized Access'
            });
        }
        req.user = user;
        next();
    })(req, res, next);
};
