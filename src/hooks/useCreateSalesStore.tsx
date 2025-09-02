import { productColumns } from "@/config/product-column";
import { Product } from "@/types/product";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

const useCreateSalesStore = create(persist(
    (set, get) => ({
        total: 0,
        setTotal: (total: number) => set({ total }),
        items: [],
        setItems: (items: Product[]) => set({ items }),
        columns: productColumns,
        changeVisibility: (name: string) => {
            const columns = [...get().columns];
            const index = columns.findIndex(c => c.name === name);

            if (index === -1) {
                return;
            }

            columns[index].visibility = !columns[index].visibility;
            set({ columns });
        },
        customer: null,
        setCustomer: (customer: number | string) => set({ customer }),
        warehouse: null,
        setwarehouse: (warehouse: number | string) => set({ warehouse }),
        date: new Date(),
        setDate: (date: Date) => set({ date }),
        reset: () => {
            set({
                total: 0,
                items: [],
                columns: productColumns,
                customer: null,
                warehouse: null,
                date: new Date(),
            });
        },
    }),
    {
        name: 'create-sales-order',
        storage: createJSONStorage(() => localStorage),
    }
));

export default useCreateSalesStore;