export interface Wherehouse {
    id: number;
    name: string;
    address: string;
    isDefault: boolean;
    createdAt: Date;
    updatedAt: Date;
    items: number;
}