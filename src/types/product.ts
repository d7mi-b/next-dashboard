import type { Tax } from "./tax";

export type Product = {
    id: number;
    product_variant_id: number[];
    name: string;
    list_price: number;
    taxes_id: ReadonlyArray<number>;
    quantity: number;
    price_total: number;
    price_subtotal: number;
    taxes: ReadonlyArray<Tax>;
    default_code: string;
    tax_amount: number;
}