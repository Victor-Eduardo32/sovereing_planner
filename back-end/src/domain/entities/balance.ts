import { BalanceProps } from "../types/balanceProps";

export class Balance {
    private constructor(private props: BalanceProps){}

    public static create(user_id: string, currency: string) {
        return new Balance({
            user_id,
            amount: 0, 
            currency,
            created_at: new Date(),
            updated_at: new Date()
        })
    }

    public static with(props: BalanceProps) {
        return new Balance(props)
    }

    public get id() {
        return this.props.id
    }

    public get user_id() {
        return this.props.user_id
    }

    public get amount() {
        return this.props.amount
    }

    public get currency() {
        return this.props.currency
    }

    public get created_at() {
        return this.props.created_at
    }

    public get updated_at() {
        return this.props.updated_at
    }
}