import { requestOdoo } from "@/actions/request-odoo";
import { Partner } from "@/types/partner";
import { Product } from "@/types/product";
import { Tax } from "@/types/tax";
import { warehouse } from "@/types/warehouse";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import useCreateSalesStore from "./useCreateSalesStore";

export default function useCreateSalesOrder() {
    const items: Product[] = useCreateSalesStore((state: any) => state.items);
    const setItems = useCreateSalesStore((state: any) => state.setItems);
    const setTotal = useCreateSalesStore((state: any) => state.setTotal);

    const [customers, setCustomers] = useState<Partner[]>([]);
    const [warehouses, setwarehouses] = useState<any[]>([]);
    const [products, setProducts] = useState<Product[]>([]);

    useEffect(() => {
        getCustomers();
        getwarehouses();
        getProducts();
    }, []);

    useEffect(() => {
        calculateTotal();
    }, [items]);

    async function getCustomers() {
        const result = await requestOdoo({
            "model": "res.partner",
            "method": "search_read",
            "args": [
                [
                    ["supplier_rank", "=", 0]
                ],
                ["name", "email", "phone", "mobile", "create_date", "image_1920", "customer_rank", "supplier_rank", "child_ids", "is_company"]
            ],
            "kwargs": {}
        });

        if (result) {
            setCustomers(result);
        }
    }

    async function getwarehouses() {
        const result: warehouse[] = [
            {
                id: 1,
                name: "warehouse 1",
                address: "123 Main Street, Anytown, USA",
                isDefault: true,
                createdAt: new Date(),
                updatedAt: new Date(),
                items: 10,
            },
            {
                id: 2,
                name: "warehouse 2",
                address: "456 Main Street, Anytown, USA",
                isDefault: false,
                createdAt: new Date(),
                updatedAt: new Date(),
                items: 20,
            }
        ]

        setwarehouses(result);
    }

    async function getProducts() {
        const result = await requestOdoo({
            "model": "product.template",
            "method": "search_read",
            "args": [
                [
                    ["sale_ok", "=", true]
                ],
                ["name", "list_price", "taxes_id", "default_code"]
            ],
            "kwargs": {}
        });

        if (result) {
            setProducts(result);
        }
    }

    async function addItem (item: any) {
        if (items.find(i => i.id === item.id)) {
            toast.warning("Item already added.");
            return;
        }

        const taxes = await getTaxes(item);

        item.taxes = taxes;
        item.quantity = 1;
        item.price_subtotal = item.list_price * item.quantity;

        const { total, taxAmount } = calculateTotalItem(item);

        item.price_total = total;
        item.tax_amount = taxAmount;

        setItems([...items, item]);
    }

    function removeItem (item: any) {
        setItems(items.filter(i => i.id !== item.id));
    }

    function handleQuantityChange (item: any, quantity: number) {
        const updated = {
            ...item,
            quantity,
            price_subtotal: item.list_price * quantity,
        };

        const { total, taxAmount } = calculateTotalItem(updated);

        updated.price_total = total;
        updated.tax_amount = taxAmount;

        setItems(items.map(i => i.id === updated.id ? updated : i));
    }

    async function getTaxes (item: any) {
        if (!item?.taxes_id || (Array.isArray(item.taxes_id) && item.taxes_id.length === 0)) {
            return [];
        }

        const result: Tax[] = await requestOdoo({
            "model": "account.tax",
            "method": "read",
            "args": [
                item.taxes_id,
                ["name", "amount", "amount_type"]
            ],
            "kwargs": {}
        });

        if (result) {
            return result;
        } else {
            return [];
        }
    }

    function calculateTotalItem (item: Product) {
        let total = item.price_subtotal;
        let taxAmount = 0;

        const taxes: Tax[] = Array.isArray((item as any).taxes) ? (item as any).taxes : [];

        taxes.forEach(tax => {
            if (tax.amount_type === "fixed") {
                const amount = (tax.amount ?? 0) * (item.quantity ?? 1);
                taxAmount += amount;
                total += amount;
            } else {
                const amount = item.price_subtotal * (tax.amount / 100);
                taxAmount += amount;
                total += amount;
            }
        });

        return { total, taxAmount };
    }

    function calculateTotal () {
        setTotal(items.reduce((acc, cur) => acc + (cur.price_total ?? 0), 0));
    }

    return {
        customers,
        warehouses,
        products,
        items,
        addItem,
        handleQuantityChange,
        removeItem,
    }
}