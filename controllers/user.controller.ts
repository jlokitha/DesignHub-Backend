import { UserService } from "../services/user.service";
import { Request, Response } from 'express';

const userService = new UserService();

export const register = async (req: Request, res:Response) => {
    const { email, password } = req.body;
    try {
        await userService.register(email, password);
        res.status(201).json('User registered successfully');
    } catch (error) {
        console.log(error);
        res.status(400).json('User registration failed');
    }
};

export const login = async (req: Request, res:Response) => {
    const { email, password } = req.body;
    try {
        const tokens = await userService.login(email, password);
        res.status(200).json(tokens);
    } catch (error) {
        res.status(400).json('Login failed');
    }
};

export const refreshToken = async (req: Request, res:Response) => {
    const authHeader = req.headers.authorization;
    try {
        const token = await userService.refreshToken(authHeader);
        res.status(200).json(token);
    } catch (err) {
        res.status(400).send("error refreshing token");
    }
};