export type SaleOrder = {
    id: number;
    name: string;
    partner_id: any[];
    state: number | string;
    amount_total: number;
    date_order: Date;
}