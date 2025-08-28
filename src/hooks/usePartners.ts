import { requestOdoo } from "@/actions/request-odoo";
import { AddPartnerFormSchema } from "@/lib/definitions";
import { Partner } from "@/types/partner";
import { KeyboardEventHandler, useEffect, useState } from "react";
import { toast } from "sonner";
import z from "zod";

export default function usePartners() {
    const [page, setPage] = useState<number>(1);
    const [totalPages, setTotalPages] = useState<number>(1);
    const [partners, setPartners] = useState<Partner[]>([]);
    const [partner, setPartner] = useState<Partner>();
    const [isSaving, setIsSaving] = useState<boolean>(false);
    const [search, setSearch] = useState<string>("");

    useEffect(() => {
        fetchPartners();
        getTotalPages();
    }, [page, search]);

    async function fetchPartners() {
        const result = await requestOdoo({
            "model": "res.partner",
            "method": "search_read",
            "args": [
                search ? [
                    '|', '|',
                    ['name', 'ilike', search],
                    ['email', 'ilike', search],
                    ['phone', 'ilike', search],
                ] : [],
                ["name", "email", "phone", "mobile", "create_date"]
            ],
            "kwargs": {
                "limit": 5,
                "offset": (page - 1) * 5,
                "order": "create_date desc"
            }
        });

        setPartners(result);
    }

    async function create(values: z.infer<typeof AddPartnerFormSchema>) {
        setIsSaving(true);

        const result = await requestOdoo({
            "model": "res.partner",
            "method": "create",
            "args": [
                [{
                    "name": values.name,
                    "email": values.email,
                    "phone": values.phone,
                }]
            ],
            "kwargs": {}
        });

        if (result) {
            setIsSaving(false);

            if (result) {
                await fetchPartners();

                toast("Partner created successfully.");
            }

            return result;
        }
    }

    async function update(values: z.infer<typeof AddPartnerFormSchema>) {
        if (!partner) {
            toast("Please select a partner to edit.");
            return;
        }

        setIsSaving(true);

        const result = await requestOdoo({
            "model": "res.partner",
            "method": "write",
            "args": [
                [partner.id],
                {
                    "name": values.name,
                    "email": values.email,
                    "phone": values.phone,
                }
            ],
            "kwargs": {}
        });

        if (result) {
            setIsSaving(false);

            if (result) {
                await fetchPartners();

                toast("Partner has been updated successfully.");
                setPartner(undefined);
            }

            return result;
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
            "model": "res.partner",
            "method": "search_count",
            "args": [
                search ? [
                    '|', '|',
                    ['name', 'ilike', search],
                    ['email', 'ilike', search],
                    ['phone', 'ilike', search],
                ] : [],
            ],
            "kwargs": {}
        });

        if (result) {
            setTotalPages(Math.ceil(result / 5));
        }
    }

    return {
        partners,
        page,
        nextPage,
        prevPage,
        setPage,
        totalPages,
        create,
        partner,
        setPartner,
        isSaving,
        update,
        setSearch
    }
}