export type Partner = {
    id: number;
    name: string;
    email: string;
    phone: string;
    mobile: string;
    address: string;
    isDefault: boolean;
    create_date: Date;
    updated_date: Date;
    image_1920: Base64URLString;
    customer_rank: number;
    supplier_rank: number;
    country_id: [number, string] | false;
    city: string | false;
    child_ids: number[];
}