import AddWarehouseDialog from "./add-warehouse-dialog";
import Warehouse from "../warehouses/warehouse";
import axios from "axios";
import { Warehouse as WarehouseType } from "@/types/warehouse";

export default async function WarehousesTab() {
    const warehouses: WarehouseType[] = await axios.get(process.env.NEXT_PUBLIC_API_URL + 'api/warehouses', {
        withCredentials: true,
    })
    .then((res) => res.data)
    .catch((err) => []);

    return (
        <section className="grid grid-cols-3 gap-4 max-sm:grid-cols-1 max-xl:grid-cols-2">
            <AddWarehouseDialog />
            {
                warehouses.map((warehouse) => (
                    <Warehouse key={warehouse.id} warehouse={warehouse} />
                ))
            }
        </section>
    );
}