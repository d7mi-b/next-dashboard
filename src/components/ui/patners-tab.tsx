import AddWherehouseDialog from "./add-wherehouse-dialog";
import { requestOdoo } from "@/actions/request-odoo";
import { Partner as PartnerType } from "@/types/partner";
import Partner from "./partner";

export default async function PartnersTab() {
    const partners: PartnerType[] = await requestOdoo({
        "model": "res.partner",
        "method": "search_read",
        "args": [[], ["name", "email", "phone", "mobile", "create_date"]],
        "kwargs": {}
    });

    return (
        <section className="grid grid-cols-3 gap-4 max-sm:grid-cols-1 max-xl:grid-cols-2">
            <AddWherehouseDialog />
            {
                partners.map((partner) => (
                    <Partner key={partner.id} partner={partner} />
                ))
            }
        </section>
    );
}