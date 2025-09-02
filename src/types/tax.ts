export type Tax = {
    id: number;
    name: string;
    amount: number;
    amount_type: "percent" | "fixed"
}