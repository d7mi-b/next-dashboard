import { Home } from "lucide-react";
import { Badge } from "./badge";
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "./card";
import { warehouse as warehouseType } from "@/types/warehouse";

export default function Warehouse({ warehouse }: { warehouse: warehouseType }) {
    return (
        <Card className="gap-4">
            <CardContent className="flex items-center gap-4">
                <section className="w-[40px] h-[40px] bg-main rounded-md flex items-center justify-center text-background">
                    <Home />
                </section>

                <p className="font-medium text-main">{warehouse.items} Items</p>
            </CardContent>

            <CardHeader className="flex items-center justify-between gap-4">
                <CardTitle className="text-xl font-semibold">{warehouse.name}</CardTitle>

                {
                    warehouse.isDefault &&
                    <Badge variant="outline">Default</Badge>
                }
            </CardHeader>

            <CardContent>
                <p className="text-sm text-neutral-500 font-medium mb-4">{warehouse.address}</p>

                <div className="*:data-[slot=avatar]:ring-background flex -space-x-2 *:data-[slot=avatar]:ring-2 *:data-[slot=avatar]:grayscale">
                    <Avatar>
                        <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    <Avatar>
                        <AvatarImage src="https://github.com/leerob.png" alt="@leerob" />
                        <AvatarFallback>LR</AvatarFallback>
                    </Avatar>
                    <Avatar>
                        <AvatarImage
                            src="https://github.com/evilrabbit.png"
                            alt="@evilrabbit"
                        />
                        <AvatarFallback>ER</AvatarFallback>
                    </Avatar>
                </div>
            </CardContent>

            <CardFooter className="flex items-center justify-between gap-4 mt-8">
                <p className="text-sm text-neutral-500">Last updated:</p>

                <section className="overflow-hidden [&>p]:w-[48px] [&>p]:h-[32px] rounded-full flex [&>p]:flex [&>p]:items-center [&>p]:justify-center">
                    <p className="bg-orange-100 text-orange-500 text-center font-medium">{new Date(warehouse.updatedAt).getDate()}</p>
                    <p className="bg-red-100 text-red-500 text-center font-medium">{new Date(warehouse.updatedAt).getMonth() + 1}</p>
                </section>
            </CardFooter>
        </Card>
    );
}