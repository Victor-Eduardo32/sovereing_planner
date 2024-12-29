import bcrypt from "bcrypt"
import { HashService } from "../../domain/services/hash.service";

export class BcryptHashService implements HashService {
    private readonly saltRounds = 10

    public async hash(password: string): Promise<string> {
        return await bcrypt.hash(password, this.saltRounds)
    }

    public async compare(password: string, hashedPassword: string): Promise<boolean> {
        return await bcrypt.compare(password, hashedPassword)
    }
}