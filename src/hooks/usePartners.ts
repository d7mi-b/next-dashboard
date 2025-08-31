import { requestOdoo } from "@/actions/request-odoo";
import { AddPartnerFormSchema, EditPartnerFormSchema } from "@/lib/definitions";
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
    const [order, setOrder] = useState<string>("desc");
    const [isCustomer, setIsCustomer] = useState<boolean>(false);
    const [isSupplier, setIsSupplier] = useState<boolean>(false);
    const [country, setCountry] = useState("");
    const [city, setCity] = useState("");

    useEffect(() => {
        fetchPartners();
        getTotalPages();
    }, [page, search, order, city, country, isCustomer, isSupplier]);

    async function fetchPartners() {
        let domain = [];
    
        if (search) {
            domain.push('|', '|', ['name', 'ilike', search], ['email', 'ilike', search], ['phone', 'ilike', search]);
        }

        if (city) {
            domain.push(['city', 'ilike', city]);
        }
        
        if (country) {
            domain.push(['country_id', 'ilike', country]);
        }
        
        // Correct logic for customer and supplier rank filters.
        // Use an OR condition if both are checked to find partners that are either one.
        if (isCustomer && isSupplier) {
            domain.push('|', ['customer_rank', '>', 0], ['supplier_rank', '>', 0]);
        } else if (isCustomer) {
            domain.push(['customer_rank', '>', 0]);
        } else if (isSupplier) {
            domain.push(['supplier_rank', '>', 0]);
        }

        const result = await requestOdoo({
            "model": "res.partner",
            "method": "search_read",
            "args": [
                domain,
                ["name", "email", "phone", "mobile", "create_date", "image_1920", "customer_rank", "supplier_rank", "child_ids"]
            ],
            "kwargs": {
                "limit": 10,
                "offset": (page - 1) * 10,
                "order": `create_date ${order}`
            }
        });

        console.log(result);

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
                    "image_1920": values.image_1920,
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

    async function update(values: z.infer<typeof EditPartnerFormSchema>) {
        setIsSaving(true);

        let data: any = {
            "name": values.name,
            "email": values.email,
            "phone": values.phone,
        };

        if (values.image_1920) {
            data.image_1920 = values.image_1920;
        }

        const result = await requestOdoo({
            "model": "res.partner",
            "method": "write",
            "args": [
                [values.id],
                data
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
        }

        return result;
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
        let domain = [];
    
        if (search) {
            domain.push('|', '|', ['name', 'ilike', search], ['email', 'ilike', search], ['phone', 'ilike', search]);
        }

        if (city) {
            domain.push(['city', 'ilike', city]);
        }
        
        if (country) {
            domain.push(['country_id', 'ilike', country]);
        }
        
        // Correct logic for customer and supplier rank filters.
        // Use an OR condition if both are checked to find partners that are either one.
        if (isCustomer && isSupplier) {
            domain.push('|', ['customer_rank', '>', 0], ['supplier_rank', '>', 0]);
        } else if (isCustomer) {
            domain.push(['customer_rank', '>', 0]);
        } else if (isSupplier) {
            domain.push(['supplier_rank', '>', 0]);
        }

        const result = await requestOdoo({
            "model": "res.partner",
            "method": "search_count",
            "args": [
                domain
            ],
            "kwargs": {}
        });

        if (result) {
            setTotalPages(Math.ceil(result / 10));
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
        setSearch,
        order,
        setOrder,
        isCustomer,
        setIsCustomer,
        isSupplier,
        setIsSupplier,
        country,
        setCountry,
        city,
        setCity
    }
}