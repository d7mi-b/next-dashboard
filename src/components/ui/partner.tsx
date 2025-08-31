import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "./card";
import { Partner as PartnerType } from "@/types/partner";
import PartnerAvatar from "./partner-avatar";

export default function Partner({ partner, onClick }: { partner: PartnerType; onClick?: () => void }) {
    return (
        <Card className="gap-4" onClick={onClick}>
            <CardContent className="flex items-center gap-4">
                <PartnerAvatar image={partner.image_1920} name={partner.name} />
            </CardContent>

            <CardHeader className="flex items-center justify-between gap-4">
                <CardTitle className="text-xl font-semibold">{partner.name}</CardTitle>
            </CardHeader>

            <CardContent>
                <p className="text-sm text-neutral-500 font-medium mb-4">{partner.email}</p>
                <p className="text-sm text-neutral-500 font-medium mb-4">
                    {partner.mobile !== "false" ? partner.mobile : ''}
                    { partner.mobile && partner.phone ? ' / ' : '' }
                    { partner.phone !== "false" ? partner.phone : ''}
                </p>
            </CardContent>

            <CardFooter className="flex items-center justify-between gap-4 mt-8">
                <p className="text-sm text-neutral-500">created at:</p>

                <section className="overflow-hidden [&>p]:w-[48px] [&>p]:h-[32px] rounded-full flex [&>p]:flex [&>p]:items-center [&>p]:justify-center">
                    <p className="bg-orange-100 text-orange-500 text-center font-medium">{new Date(partner.create_date).getDate()}</p>
                    <p className="bg-red-100 text-red-500 text-center font-medium">{new Date(partner.create_date).getMonth() + 1}</p>
                </section>
            </CardFooter>
        </Card>
    );
}