import jwt, { JwtPayload } from 'jsonwebtoken';
import serverConfig from '../config/server.config';
import JwtDecodedUser from '../types/JwtDecodedUser';
import { console } from 'inspector';

export function generateJWT(obj: any) : string {
    return jwt.sign(obj, serverConfig.JWT_SECRET, {expiresIn: '1h'});
}

export function verifyToken(token: string): JwtDecodedUser {

        console.log('Verifying token:', serverConfig.JWT_SECRET);
        const decodedToken = jwt.verify(token, serverConfig.JWT_SECRET);
        console.log(decodedToken);
        return decodedToken as JwtDecodedUser;
    
        
    
}