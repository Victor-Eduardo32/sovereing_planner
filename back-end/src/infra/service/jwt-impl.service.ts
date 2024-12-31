import jwt, { JwtPayload } from "jsonwebtoken"
import { JwtService } from "../../domain/services/jwt.service"
import crypto from "crypto"

export class JwtServiceImpl implements JwtService {
    private readonly secret: string

    constructor() {
        if(!process.env.JWT_SECRET_KEY) {
            console.warn('WARNING: JWT_SECRET_KEY is not set. Using a default key for development purposes.')
        }

        this.secret = process.env.JWT_SECRET_KEY || crypto.randomBytes(64).toString('hex');
    }

    public generateToken(payload: object): string {
        return jwt.sign(payload, this.secret, { expiresIn: '3h' })
    }

    public verifyToken(token: string): JwtPayload | null {
        try {
            const decoded = jwt.verify(token, this.secret)

            if(typeof decoded === 'string') {
                return null
            }

            return decoded as JwtPayload
        } catch (error) {
            return null
        }
    }
}