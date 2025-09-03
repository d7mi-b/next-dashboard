import { requestOdoo } from "@/actions/request-odoo";
import { AddPartnerFormSchema, EditPartnerFormSchema } from "@/lib/definitions";
import { SaleOrder } from "@/types/sale-order";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import z from "zod";

export default function useSaleOrders() {
    const [page, setPage] = useState<number>(1);
    const [totalPages, setTotalPages] = useState<number>(1);
    const [saleOrders, setSaleOrders] = useState<SaleOrder[]>();
    const [search, setSearch] = useState<string>("");
    const [order, setOrder] = useState<string>("desc");
    const [isLoading, setIsLoading] = useState<boolean>(false);

    useEffect(() => {
        fetchSaleOrders();
        getTotalPages();
    }, [page, search, order]);

    async function fetchSaleOrders() {
        console.log("fetchSaleOrders", isLoading);
        setIsLoading(true);

        const result = await requestOdoo({
            "model": "sale.order",
            "method": "search_read",
            "args": [
                [],
                ["name", "partner_id", "state", "amount_total", "date_order"]
            ],
            "kwargs": {
                "limit": 10,
                "offset": (page - 1) * 10,
                "order": `create_date ${order}`
            }
        });

        if (result) {
            setSaleOrders(result);
            setIsLoading(false);
        }
    }

    function nextPage() {
        if (page < totalPages) {
            setPage(page + 1);
        }
    }

    function prevPage() {
        if (page > 1) {
            setPage(page - 1);
        }
    }

    async function getTotalPages() {
        const result = await requestOdoo({
            "model": "sale.order",
            "method": "search_count",
            "args": [
                []
            ],
            "kwargs": {}
        });

        if (result !== undefined && result !== null) {
            setTotalPages(Math.max(1, Math.ceil(result / 10)));
        }
    }

    return {
        saleOrders,
        page,
        nextPage,
        prevPage,
        setPage,
        totalPages,
        setSearch,
        order,
        setOrder,
        isLoading,
        search
    }
}