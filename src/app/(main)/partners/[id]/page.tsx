import { requestOdoo } from "@/actions/request-odoo";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import ChildPartner from "@/components/partners/child-partner";
import DeletePartnerDialogPage from "@/components/partners/delete-partner-dialog-page";
import EditPartnerDialogPage from "@/components/partners/edit-partner-dialog-page";
import { ChildPartner as ChildPartnerType } from "@/types/child-partner";
import { Partner as PartnerType } from "@/types/partner";
import getMimeTypeFromBase64 from "@/utils/getMimeTypeFromBase64";
import { Mail, Trash, Phone, Calendar, Flag } from "lucide-react";
import Image from "next/image";

export default async function Partner({
    params
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;

    const { result: [partner] } = await requestOdoo({
        "model": "res.partner",
        "method": "read",
        "args": [
            [parseInt(id)],
            ["name", "email", "phone", "mobile", "create_date", "image_1920", "customer_rank", "supplier_rank", "country_id", "city", "child_ids"]
        ],
        "kwargs": {}
    });

    const { result: childsPartner } = await requestOdoo({
        "model": "res.partner",
        "method": "read",
        "args": [
            partner.child_ids,
            ['name', 'email', 'phone']
        ],
        "kwargs": {}
    });

    return (
        <main className="flex flex-col gap-2 w-full h-full w-full p-4">
            <section className="flex items-center gap-4 pb-4 border-b">
                <section className="w-[128px] h-[128px] rounded-md overflow-hidden">
                    <Image src={`data:${getMimeTypeFromBase64(partner.image_1920)};base64,${partner.image_1920}`} alt={partner.name} width={200} height={200} className="object-fit w-full h-full" />
                </section>

                <article className="flex-1">
                    <header className="flex items-center justify-between gap-4">
                        <h1 className="scroll-m-20 text-center text-4xl font-extrabold tracking-tight text-balance flex items-center gap-2">
                            {partner.name}

                            <Badge variant="default">{partner.is_company ? "Company" : "Individual"}</Badge>
                            <Badge variant="outline">{partner.customer_rank > 0 ? "Customer" : partner.supplier_rank > 0 ? "Supplier" : "Partner"}</Badge>
                        </h1>

                        <section className="flex items-center gap-2">
                            <section className="flex items-center gap-2">
                                <EditPartnerDialogPage partner={partner} />
                                <DeletePartnerDialogPage partner={partner} />
                            </section>
                        </section>
                    </header>

                    <section className="flex items-center gap-4 mt-4">
                        <section className="flex items-center gap-1 text-neutral-500">
                            <Mail className="size-4" />
                            <p className="text-sm">{partner.email}</p>
                        </section>
                        <section className="flex items-center gap-1 text-neutral-500">
                            <Phone className="size-4" />
                            <p className="text-sm">
                                {partner.mobile !== "false" ? partner.mobile : ''}
                                { partner.mobile && partner.phone ? ' / ' : '' }
                                { partner.phone !== "false" ? partner.phone : ''}
                            </p>
                        </section>
                        <section className="flex items-center gap-1 text-neutral-500">
                            <Calendar className="size-4" />
                            <p className="text-sm">{new Date(partner.create_date).toDateString()}</p>
                        </section>
                    </section>
                </article>
            </section>

            <article className="mt-4">
                <header className="flex items-center justify-between gap-4">
                    <h2 className="scroll-m-20 text-center text-2xl font-extrabold tracking-tight text-balance flex items-center gap-2">
                        Address
                    </h2>
                </header>

                <section className="flex items-center gap-4 mt-4">
                    <section>
                        <section className="flex items-center gap-1 text-neutral-500">
                            <Flag className="size-4" />
                            <p className="text-sm">Country</p>
                        </section>
                        <p className="font-medium">{partner.country_id ? partner.country_id[1] : ''}</p>
                    </section>

                    <section>
                        <section className="flex items-center gap-1 text-neutral-500">
                            <Flag className="size-4" />
                            <p className="text-sm">City</p>
                        </section>
                        <p className="font-medium">{partner.city ? partner.city : ''}</p>
                    </section>
                </section>
            </article>

            <section className="mt-4">
                <header className="flex items-center justify-between gap-4">
                    <h2 className="scroll-m-20 text-center text-2xl font-extrabold tracking-tight text-balance flex items-center gap-2">
                        Contact Information
                    </h2>
                </header>

                {
                    childsPartner.length > 0 &&
                    <section className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 mt-4">
                    {
                        childsPartner.map((child: ChildPartnerType) => (
                            <ChildPartner key={child.id} child={child} />
                        ))
                    }
                    </section>
                }

                {
                    childsPartner.length === 0 && 
                    <div className="w-full flex flex-col items-center justify-center gap-4 text-center min-h-[10vh]">
                        <i className="fi fi-tr-drawer-empty text-3xl icon"></i>
                        <h1 className="text-lg font-semibold">No contact information found</h1>
                    </div>
                }
            </section>
        </main>
    );
}