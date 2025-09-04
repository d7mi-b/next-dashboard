import { requestOdoo } from "@/actions/request-odoo";
import { AddPartnerFormSchema, EditPartnerFormSchema } from "@/lib/definitions";
import { SaleOrder } from "@/types/sale-order";
import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";
import z from "zod";

export default function useSaleOrders() {
    const [page, setPage] = useState<number>(1);
    const [totalPages, setTotalPages] = useState<number>(1);
    const [saleOrders, setSaleOrders] = useState<SaleOrder[]>();
    const [search, setSearch] = useState<string>("");
    const [order, setOrder] = useState<string>("desc");
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetchSaleOrders();
        getTotalPages();
    }, [page, search, order]);

    const fetchSaleOrders = useCallback(async () => {
        setIsLoading(true);
        setSaleOrders(undefined);
        setError(null);

        const { result } = await requestOdoo({
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
        } else {
            setError(error ?? "Failed to fetch sale orders.");
            setIsLoading(false);
        }
    }, [page, search, order]); // Dependencies for fetchSaleOrders

    const getTotalPages = useCallback(async () => {
        const { result } = await requestOdoo({
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
    }, [search, order]); // Dependencies for getTotalPages

    useEffect(() => {
        fetchSaleOrders();
        getTotalPages();
    }, [fetchSaleOrders]); // The dependencies are now the memoized functions

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
        search,
        error
    }
}