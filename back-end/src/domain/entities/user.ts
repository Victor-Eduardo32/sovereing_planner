import { HashService } from "../services/hash.service";
import { UserProps } from "../types/userProps";

export class User {
    private constructor(private props: UserProps){}

    public static create(name: string, email: string, password: string) {
        return new User({
            id: crypto.randomUUID().toString(),
            name,
            email,
            password,
            created_at: new Date()
        })
    }

    public static with(props: UserProps) {
        return new User(props)
    }

    public async setPassword(password: string, hashService: HashService): Promise<void> {
        this.props.password = await hashService.hash(password)
    }

    public async comparePassword(password: string, hashService: HashService): Promise<boolean> {
        return await hashService.compare(password, this.props.password)
    }

    public get id() {
        return this.props.id
    }

    public get name() {
        return this.props.name
    }

    public get email() {
        return this.props.email
    }
    
    public get password() {
        return this.props.password
    }

    public get created_at() {
        return this.props.created_at
    }
}