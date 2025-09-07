import { requestOdoo } from "@/actions/request-odoo";
import { Partner } from "@/types/partner";
import { Product } from "@/types/product";
import { Tax } from "@/types/tax";
import { Warehouse } from "@/types/warehouse";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import useCreateSalesStore from "./useCreateSalesStore";

export default function useCreateSalesOrder() {
    const items: Product[] = useCreateSalesStore((state: any) => state.items);
    const setItems = useCreateSalesStore((state: any) => state.setItems);
    const setTotal = useCreateSalesStore((state: any) => state.setTotal);
    const customer: number | null = useCreateSalesStore((state: any) => state.customer ?? null);
    const date: Date = useCreateSalesStore((state: any) => state.date ?? new Date());
    const reset = useCreateSalesStore((state: any) => state.reset);

    useEffect(() => {
        calculateTotal();
    }, [items]);

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

    function handlePriceChange (item: any, list_price: number) {
        const updated = {
            ...item,
            list_price,
            price_subtotal: list_price * item.quantity,
        };

        const { total, taxAmount } = calculateTotalItem(updated);

        updated.price_total = total;
        updated.tax_amount = taxAmount;

        setItems(items.map(i => i.id === updated.id ? updated : i));
    }

    async function handleItemChange (item: Product, itemId: number) {
        if (items.find(i => i.id === item.id)) {
            toast.warning("Item already added.");
            return;
        }

        const updated = {
            ...item,
            quantity: 1,
            price_subtotal: item.list_price,
        };

        const taxes = await getTaxes(item);

        updated.taxes = taxes;

        const { total, taxAmount } = calculateTotalItem(updated);

        updated.price_total = total;
        updated.tax_amount = taxAmount;

        setItems(items.map(i => i.id === itemId ? updated : i));
    }

    async function getTaxes (item: any) {
        if (!item?.taxes_id || (Array.isArray(item.taxes_id) && item.taxes_id.length === 0)) {
            return [];
        }

        const { result, error } = await requestOdoo({
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
            toast.error(error ?? "Failed to get taxes.");
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

    async function create (draft: boolean = false) {
        if (!customer) {
            toast.error("Select a customer before creating the order.");
            return;
        }

        if (!items.length) {
            toast.error("Add at least one item before creating the order.");
            return;
        }

        const order_line = items.map((item) => ([
            0,
            0,
            {
                "name": item.name,
                "product_id": item.product_variant_id?.[0] ?? item.id,
                "product_uom_qty": Math.max(1, Number(item.quantity) ?? 1),
                "price_unit": item.list_price,
            }
        ]));

        try {
            const { result, error } = await requestOdoo({
                "model": "sale.order",
                "method": "create",
                "args": [
                    {
                        "order_line": order_line,
                        "partner_id": customer,
                    }
                ],
                "kwargs": {},
            });

            if (typeof result === "number") {
                toast.success(`Order #${result} created successfully.`);
                reset();
            } else {
                toast.error(error ?? "Failed to create order.");
                return;
            }

            if (!draft) {
                const { result: confirmOrderResult, error: confirmOrderError } = await requestOdoo({
                    "model": "sale.order",
                    "method": "action_confirm",
                    "args": [
                        [result],
                    ],
                    "kwargs": {}
                });

                if (confirmOrderResult) {
                    toast.success(`Order #${result} confirmed successfully.`);
                    reset();
                    return true;
                } else {
                    toast.error(confirmOrderError ?? "Failed to confirm order.");
                }
            } else {
                return true;
            }
        } catch (err: any) {
            toast.error(err?.message ?? "Failed to create order.");
        }
    }

    return {
        items,
        addItem,
        handleQuantityChange,
        handlePriceChange,
        removeItem,
        create,
        handleItemChange
    }
}