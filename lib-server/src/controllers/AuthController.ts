import { Request, Response } from "express";
import { IUserModel } from "../dtos/UserDto";
import { IUser } from "../models/User";
import { login, register } from "../services/UserService";
import { InvalidUserNameOrPasswordError } from "../utils/LibraryErrors";

async function handleRegister(req:Request, res:Response) {
    const user:IUser = req.body;

    try {
        const registeredUser = await register(user);

        res.status(201).json({
            message: "user successfully created",
            user: {
                _id: registeredUser._id,
                type: registeredUser.type,
                firstName: registeredUser.firstName,
                lastName: registeredUser.lastName,
                email: registeredUser.email
            }
        })
    } catch (error:any) {
        res.status(500).json({message: "Unable to add User at this point in time", error:error.message})
    }
}

async function handleLogin(req:Request, res:Response) {
    const credentials = req.body;

    try {
        const loggedIn:IUserModel = await login(credentials);
        res.status(200).json({
            message: "User Successfully Logged in",
            user: {
                _id: loggedIn._id,
                type: loggedIn.type,
                firstName: loggedIn.firstName,
                lastName: loggedIn.lastName,
                email: loggedIn.email
            }
        })
    } catch (error: any) {
        if(error instanceof InvalidUserNameOrPasswordError){
            res.status(401).json({message: "Unable to login user at this time", error: error.message});
        } else {
            res.status(500).json({message: "Unable to login user with this credentials at this time, please try again Later", error: error.message})
        }
    }
}

export default {handleRegister, handleLogin};