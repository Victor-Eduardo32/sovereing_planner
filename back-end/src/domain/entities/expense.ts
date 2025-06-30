import { ExpenseProps } from "../types/expenseProps";

export class Expense {
    private constructor(private readonly props: ExpenseProps){}

    public static create(balance_id: number, description: string, value: bigint, date: Date) {
        return new Expense({
            balance_id,
            description,
            value,
            date,
            created_at: new Date()
        })
    }

    public static with(props: ExpenseProps) {
        return new Expense(props)
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