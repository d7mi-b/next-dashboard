"use client";

import { Button } from "@/components/ui/button";
import { Combobox } from "@/components/ui/combobox";
import { DatePicker } from "@/components/ui/date-picker";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Navbar from "@/components/ui/navbar";
import ProductTableColumnSetting from "@/components/ui/product-table-column-setting";
import { Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import useCreateSalesOrder from "@/hooks/useCreateSalesOrder";
import useCreateSalesStore from "@/hooks/useCreateSalesStore";
import { CreateSaleOrderFormSchema } from "@/lib/definitions";
import { zodResolver } from "@hookform/resolvers/zod";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";
import RowProductTable from "@/components/sale-orders/row-product-table";
import { ComboboxProducts } from "@/components/sale-orders/combobox-products";
import { Product } from "@/types/product";
import { requestOdoo } from "@/actions/request-odoo";
import { Warehouse } from "@/types/warehouse";

export default function Page() {
    const [products, setProducts] = useState<Product[]>([]);
    const [customers, setCustomers] = useState([]);
    const [warehouses, setwarehouses] = useState<any[]>([]);

    const {
        items,
        addItem,
        create,
    } = useCreateSalesOrder();

    const total: number = useCreateSalesStore((state: any) => state.total);
    const columns = useCreateSalesStore((state: any) => state.columns);
    const customer: number = useCreateSalesStore((state: any) => state.customer);
    const setCustomer = useCreateSalesStore((state: any) => state.setCustomer);
    const warehouse: number = useCreateSalesStore((state: any) => state.warehouse);
    const setwarehouse = useCreateSalesStore((state: any) => state.setwarehouse);
    const date: Date = useCreateSalesStore((state: any) => state.date);
    const setDate = useCreateSalesStore((state: any) => state.setDate);

    const [editable, setEditable] = useState<number>();

    const form = useForm<z.infer<typeof CreateSaleOrderFormSchema>>({
        resolver: zodResolver(CreateSaleOrderFormSchema),
        defaultValues: {
            customer: customer ?? "",
            warehouse: warehouse ?? "",
            date: date ?? "",
        },
    });

    useEffect(() => {
        console.log("useEffect getProducts start");
        getProducts();
        getCustomers();
        getwarehouses();
        console.log("useEffect getProducts done");
    }, []);

    useEffect(() => {
        form.setValue("customer", customer);
        form.setValue("warehouse", warehouse);
        form.setValue("date", new Date(date));
    }, [customer, warehouse, date]);

    const getProducts = async () => {
        const { result } = await requestOdoo({
            "model": "product.template",
            "method": "search_read",
            "args": [
                [
                    ["sale_ok", "=", true]
                ],
                ["name", "list_price", "taxes_id", "default_code", "product_variant_id"]
            ],
            "kwargs": {}    
        });

        if (result) {
            setProducts(result);
        }
    }

    async function getCustomers() {
        const { result } = await requestOdoo({
            "model": "res.partner",
            "method": "search_read",
            "args": [
                [
                    ["supplier_rank", "=", 0]
                ],
                ["name", "email", "phone", "mobile", "create_date", "image_1920", "customer_rank", "supplier_rank", "child_ids", "is_company"]
            ],
            "kwargs": {}
        });

        if (result) {
            setCustomers(result);
        }
    }

    async function getwarehouses() {
        const result: Warehouse[] = [
            {
                id: 1,
                name: "warehouse 1",
                address: "123 Main Street, Anytown, USA",
                isDefault: true,
                createdAt: new Date(),
                updatedAt: new Date(),
                items: 10,
            },
            {
                id: 2,
                name: "warehouse 2",
                address: "456 Main Street, Anytown, USA",
                isDefault: false,
                createdAt: new Date(),
                updatedAt: new Date(),
                items: 20,
            }
        ]

        setwarehouses(result);
    }

    const fields = [
        {
            name: "customer",
            label: "Customer",
            type: "combobox",
            options: customers,
            value: customer,
            setValue: setCustomer,
        },
        {
            name: "warehouse",
            label: "warehouse",
            type: "combobox",
            options: warehouses,
            value: warehouse,
            setValue: setwarehouse,
        },
        {
            name: "date",
            label: "Date",
            type: "date",
            value: date,
            setValue: setDate,
            options: []
        },
    ];

    const RenderFormControler = (field: any, fieldConfig: any) => {
        if (fieldConfig.type === "combobox") {
            return (
                <Combobox 
                    items={fieldConfig.options} 
                    value={fieldConfig.value as string | number} 
                    setValue={(e) => {
                        fieldConfig.setValue(e);
                        field.onChange(e);
                    }} 
                    keyLabel="name" 
                    keyValue="id"
                />
            );
        } else if (fieldConfig.type === "date") {
            return (
                <DatePicker
                    date={fieldConfig.value} 
                    setDate={(e: any) => {
                        fieldConfig.setValue(e);
                        field.onChange(e);
                    }} 
                />
            );
        } else {
            return (
                <Input {...field} type={fieldConfig.type}/>
            );
        }
    }

    const onSubmitDraftOrder = async (values: z.infer<typeof CreateSaleOrderFormSchema>) => {
        if (items.length === 0) {
            toast.warning("Please add at least one product.");
            return;
        }

        const result = await create(true);

        if (result) {
            redirect('/sale-orders');
        }
    }

    const onSubmitConfirmOrder = async (values: z.infer<typeof CreateSaleOrderFormSchema>) => {
        if (items.length === 0) {
            toast.warning("Please add at least one product.");
            return;
        }

        const result = await create();

        if (result) {
            redirect('/sale-orders');
        }
    }

    return (
        <main className="p-4 w-full">
            <Navbar />

            <header className="flex items-center justify-between gap-4">
                <h1 className="scroll-m-20 text-center text-4xl font-extrabold tracking-tight text-balance flex items-center gap-2">
                    Create Sales Order
                </h1>
            </header>

            <section>
                <FormProvider {...form}>
                    <Form {...form}>
                        <form className="grid grid-cols-3 max-lg:grid-cols-2 max-sm:grid-cols-1 items-center gap-4 my-6">
                            {
                                fields.map((f, index) => (
                                    <FormField
                                        key={index} 
                                        control={form.control}
                                        name={f.name as "customer" | "warehouse" | "date"}
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel htmlFor={f.name}>{f.label}</FormLabel>
                                                <FormControl>
                                                    {
                                                        RenderFormControler(field, f)
                                                    }
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                ))
                            }
                        </form>
                    </Form>
                </FormProvider>
            </section>

            <section className="my-8">
                <header className="flex items-center justify-between gap-4 my-2">
                    <h2 className="scroll-m-20 text-center text-lg font-extrabold tracking-tight text-balance flex items-center gap-2">
                        Products
                    </h2>

                    <ProductTableColumnSetting />
                </header>
                <section className="w-full overflow-x-auto">
                    <Table>
                        <TableCaption>A list of products.</TableCaption>
                        <TableHeader>
                            <TableRow>
                                {
                                    columns.filter((c: any) => c.visibility).map((column: any) => (
                                        <TableHead key={column.name}>{column.name}</TableHead>
                                    ))
                                }
                                <TableHead></TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {
                                items.map((item) => (
                                    <RowProductTable columns={columns} products={products} item={item} key={item.id} editable={editable!} setEditable={setEditable} />
                                ))
                            }
                            <TableRow>
                                <TableCell colSpan={columns.filter((c: any) => c.visibility).length + 1}>
                                    <ComboboxProducts items={products} addItem={addItem} />
                                </TableCell>
                            </TableRow>
                        </TableBody>
                        <TableFooter>
                            <TableRow>
                                <TableCell>Total</TableCell>
                                <TableCell colSpan={columns.filter((c: any) => c.visibility).length - 1} className="text-right">${total}</TableCell>
                            </TableRow>
                        </TableFooter>
                    </Table>
                </section>
            </section>

            <section className="flex items-center justify-end gap-4 my-4">
                <Button onClick={form.handleSubmit(onSubmitDraftOrder)} variant="outline">Save as Draft</Button>
                <Button onClick={form.handleSubmit(onSubmitConfirmOrder)}>Save & Send</Button>
            </section>
        </main>
    );
}