export default interface JwtDecodedUser {
    id: string;
    email: string;
    roles: string[];
    iat: number;
    exp: number;
}