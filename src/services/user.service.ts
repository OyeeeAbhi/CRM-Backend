import CreateUserDto from "../dtos/createUser.dto";
import UserRepository from "../repositories/user.repository";
import { User } from '@prisma/client';
import bcrypt from 'bcryptjs';
import serverConfig from "../config/server.config";
import SignInDto from "../dtos/signin.dto";
import { generateJWT } from "../utils/auth.utils";
import NotFoundError from "../errors/notFound";
import UnauthorisedError from "../errors/unauthorisedError";
import jwt from 'jsonwebtoken';

class UserService {

    private userRepository: UserRepository;

    constructor(userRepository: UserRepository) {
        this.userRepository = userRepository;
    }

    async get(id: string) : Promise<User> {
        try {
            const response : User | null = await this.userRepository.get(id);
            if(!response) {
                throw {error: "Not found"}
            }
            return response;
        } catch(error) {
            console.log(error);
            throw error;
        }
    }

    async getAll() : Promise<User[]> {
        try {
            const response : User[] = await this.userRepository.getAll();
            return response;
        } catch(error) {
            console.log(error);
            throw error;
        }
    }

    async create(userDetails: CreateUserDto) : Promise<User> {
        try {
            console.log(userDetails , 'this is the password after hashing');
            userDetails.password = bcrypt.hashSync(userDetails.password, serverConfig.SALT_ROUNDS);
            const response : User = await this.userRepository.create(userDetails);
            response.password = jwt.sign(userDetails, serverConfig.JWT_SECRET, {expiresIn: '1h'});
            return response;
        } catch(error) {
            console.log(error);
            throw error;
        }
    }

    async signIn(signInDetail: SignInDto) : Promise<string> {
        try {
            const user = await this.userRepository.getUserByEmail(signInDetail.email);
            if(!user) {
                throw new NotFoundError('User', 'email', signInDetail.email);
            }
            const doesPasswordMatch = bcrypt.compareSync(signInDetail.password, user.password);
            if(!doesPasswordMatch) {
                throw new UnauthorisedError();
            }
            const jwt = generateJWT({id: user.id, email: user.email, roles: user.roles});
            return jwt;
        } catch(error) {
            console.log(error);
            throw error;
        }
    }
}

export default UserService;