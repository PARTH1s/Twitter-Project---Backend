import UserService from '../services/user-service.js'; 

const userService = new UserService();

/**
 * Handles user signup request.
 * Calls userService.signup with user data from request body.
 * Returns success response or error on failure.
 */
export const signup = async (req, res) => { 
    try {
        const response = await userService.signup({
            email: req.body.email,
            password: req.body.password,
            name: req.body.name
        });

        return res.status(201).json({
            success: true,
            message: "Successfully signed up new user",
            data: response,
            err: {},
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Something went wrong during signup",
            data: {},
            err: error,
        });
    }
};

/**
 * Handles user login request.
 * Validates user existence and password.
 * Returns JWT token on success or error message on failure.
 */
export const login = async (req, res) => { 
    try {
        const user = await userService.getUserByEmail(req.body.email);  

        if (!user) {
            return res.status(401).json({
                success: false,
                message: "User not found!",
                data: {},
                err: {}
            });
        }

        if (!user.comparePassword(req.body.password)) {
            return res.status(401).json({
                success: false,
                message: "Password incorrect!",
                data: {},
                err: {}
            });
        }

        const token = user.genJWT();
        return res.status(200).json({
            success: true,
            message: "Successfully logged in",
            data: token,
            err: {}
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Something went wrong during login",
            data: {},
            err: error
        });
    }
};

/**
 * Handles user signin (login + token generation) request.
 * Uses userService.signin to authenticate and generate token.
 * Returns user data and token on success, error on failure.
 */
export const signin = async (req, res) => {
    try {
        const { email, password } = req.body;

        const { user, token } = await userService.signin(email, password);

        return res.status(200).json({
            success: true,
            message: "Successfully signed in",
            data: { user, token },
            err: {}
        });
    } catch (error) {
        return res.status(401).json({
            success: false,
            message: error.message,
            data: {},
            err: {}
        });
    }
};
