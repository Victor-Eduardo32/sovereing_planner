import { BcryptHashService } from "../infra/service/bcrypt-hash.service"
import { JwtServiceImpl } from "../infra/service/jwt-impl.service"

export const initializeServices = () => {
    const hashService = new BcryptHashService();
    const jwtService = new JwtServiceImpl();

    return {
        hashService,
        jwtService,
    };
}