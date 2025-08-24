import AddWherehouseDialog from "./add-wherehouse-dialog";
import Wherehouse from "./wherehouse";
import axios from "axios";
import { Wherehouse as WherehouseType } from "@/types/wherehouse";

export default async function WherehousesTab() {
    const wherehouses: WherehouseType[] = await axios.get(process.env.NEXT_PUBLIC_API_URL + 'api/wherehouses')
    .then((res) => res.data)
    .catch((err) => {
        console.log("Error", err);
        return [];
    });

    return (
        <section className="grid grid-cols-3 gap-4 max-sm:grid-cols-1 max-lg:grid-cols-2">
            <AddWherehouseDialog />
            {
                wherehouses.map((wherehouse) => (
                    <Wherehouse key={wherehouse.id} wherehouse={wherehouse} />
                ))
            }
        </section>
    );
}