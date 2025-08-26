import AddWherehouseDialog from "./add-wherehouse-dialog";
import Wherehouse from "./wherehouse";
import axios from "axios";
import { Wherehouse as WherehouseType } from "@/types/wherehouse";
import { verifySession } from "@/lib/dal";
import { requestOdoo } from "@/actions/request-odoo";

export default async function WherehousesTab() {
    const sesstion = await verifySession();
    const wherehouses: WherehouseType[] = await axios.get(process.env.NEXT_PUBLIC_API_URL + 'api/wherehouses', {
        withCredentials: true,
    })
    .then((res) => res.data)
    .catch((err) => {
        console.log("Error", err);
        return [];
    });

    await requestOdoo({
        "model": "res.partner",
        "method": "search_read",
        "args": [[], ["name", "email"]],
        "kwargs": {}
    });

    return (
        <section className="grid grid-cols-3 gap-4 max-sm:grid-cols-1 max-xl:grid-cols-2">
            <AddWherehouseDialog />
            {
                wherehouses.map((wherehouse) => (
                    <Wherehouse key={wherehouse.id} wherehouse={wherehouse} />
                ))
            }
        </section>
    );
}