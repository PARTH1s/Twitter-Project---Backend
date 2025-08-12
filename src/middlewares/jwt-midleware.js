import JWT from "passport-jwt";
import User from '../models/user.js';

const JwtStrategy = JWT.Strategy;
const ExtractJwt = JWT.ExtractJwt;

//  JWT Strategy
const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: "twitter_secret",   
};

/**
 * Configures Passport to use JWT strategy for authentication.
 * Verifies JWT payload by finding the user in DB.
 * Calls done() with user if found, or false if not.
 */
export const passportAuth = (passport) => {
    passport.use(
        new JwtStrategy(opts, async (jwt_payload, done) => {
            try {
                const user = await User.findById(jwt_payload.id);
                if (!user) {
                    return done(null, false);  
                }
                return done(null, user);  
            } catch (err) {
                return done(err, false);  
            }
        })
    );
};
