import { SavingProps } from "../types/savingProps";

export class Saving {
    private constructor(private readonly props: SavingProps){}

    public static create(balance_id: number, description: string, value: bigint, date: Date) {
        return new Saving({
            balance_id,
            description,
            value,
            date,
            created_at: new Date()
        })
    }

    public static with(props: SavingProps) {
        return new Saving(props)
    }

    public get id() {
        return this.props.id
    }

    public get balance_id() {
        return this.props.balance_id
    }

    public get description() {
        return this.props.description
    }

    public get value() {
        return this.props.value
    }

    public get date() {
        return this.props.date
    }

    public get created_at() {
        return this.props.created_at
    }
}