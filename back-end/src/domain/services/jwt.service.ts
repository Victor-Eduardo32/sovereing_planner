

export interface JwtService {
    generateToken(payload: object): string
    verifyToken(token: string): object | null
    getExpirationTime(token: string): Date | undefined
    refreshToken(token: string): string
}