import { Partner as PartnerType } from "@/types/partner";
import { Dispatch, SetStateAction } from "react";
import Partner from "./partner";

export default function PartnersCardView({ partners, setPartner }: { partners: PartnerType[], setPartner: Dispatch<SetStateAction<PartnerType | undefined>> }) {
    return (
        <section className="grid grid-cols-3 gap-4 max-sm:grid-cols-1 max-xl:grid-cols-2">
            {
                partners.map((partner) => (
                    <Partner key={partner.id} partner={partner} onClick={() => setPartner(partner)} />
                ))
            }
        </section>
    );
}