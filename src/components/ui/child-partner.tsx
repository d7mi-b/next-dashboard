import { ChildPartner as ChildPartnerType } from "@/types/child-partner";
import { Mail, Phone } from "lucide-react";

export default function ChildPartner({ child }: { child: ChildPartnerType }) {
    return (
        <article className="p-4 border rounded shadow">
            <header>
                <h4 className="font-medium text-lg">{child.name}</h4>
            </header>

            <section className="flex items-center flex-wrap gap-4 mt-2">
                <section className="flex items-center gap-1 text-neutral-500">
                    <Mail className="size-4" />
                    <p className="text-sm">{child.email}</p>
                </section>
                <section className="flex items-center gap-1 text-neutral-500">
                    <Phone className="size-4" />
                    <p className="text-sm">{child.phone}</p>
                </section>
            </section>
        </article>
    );
}