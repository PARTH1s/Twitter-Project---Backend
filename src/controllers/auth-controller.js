import UserService from '../services/user-service.js';

const userService = new UserService();

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
