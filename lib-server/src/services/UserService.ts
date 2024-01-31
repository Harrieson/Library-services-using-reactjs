import bcrypt from 'bcrypt';
import { config } from "../config";
import UserDto, { IUserModel } from "../dtos/UserDto";
import { IUser } from "../models/User";

export async function register(user:IUser):Promise<IUserModel>{
    const ROUNDS = config.server.rounds;

    try {
        const hashedPassword = await bcrypt.hash(user.password, ROUNDS);
        const saved = new UserDto({...user, password:hashedPassword})

        return await saved.save()
    } catch (error: any) {
        throw new Error("Unable to create user");
    }
}


export async function login(credentials:{email:string, password:string}): Promise<IUserModel> {
    const {email, password} = credentials;

    try {
        const user = await UserDto.findOne({email});

        if(!user) {
            throw new Error("Invalid Credentials");

        } else {
            const validPassword: boolean = await bcrypt.compare(password, user.password);
            if(validPassword) {
                return user;
            } else {
                throw new Error("Ingvalid Username or Password");

            }
        }
    } catch (error: any) {
        throw new Error(error.message);
    }
}