"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Combobox } from "@/components/ui/combobox";
import { ComboboxProducts } from "@/components/ui/combobox-products";
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
import { Trash } from "lucide-react";
import { redirect } from "next/navigation";
import { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";

export default function Page() {
    const { 
        customers, 
        warehouses,
        products,
        items,
        addItem,
        handleQuantityChange,
        removeItem,
        create
    } = useCreateSalesOrder();
    const total: number = useCreateSalesStore((state: any) => state.total);
    const columns = useCreateSalesStore((state: any) => state.columns);
    const customer: number = useCreateSalesStore((state: any) => state.customer);
    const setCustomer = useCreateSalesStore((state: any) => state.setCustomer);
    const warehouse: number = useCreateSalesStore((state: any) => state.warehouse);
    const setwarehouse = useCreateSalesStore((state: any) => state.setwarehouse);
    const date: Date = useCreateSalesStore((state: any) => state.date);
    const setDate = useCreateSalesStore((state: any) => state.setDate);

    const form = useForm<z.infer<typeof CreateSaleOrderFormSchema>>({
        resolver: zodResolver(CreateSaleOrderFormSchema),
        defaultValues: {
            customer: customer ?? "",
            warehouse: warehouse ?? "",
            date: date ?? "",
        },
    });

    useEffect(() => {
        form.setValue("customer", customer);
        form.setValue("warehouse", warehouse);
        form.setValue("date", new Date(date));
    }, [customer, warehouse, date]);

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
                                    <TableRow key={item.id}>
                                        {
                                            columns.filter((c: any) => c.visibility).map((column: any, index: number) => {
                                                if (column.key === "taxes") {
                                                    return (
                                                        <TableCell key={index}>
                                                            {
                                                                item.taxes && item.taxes.length > 0 ? item.taxes.map((tax) => <Badge key={tax.id}>{tax.name}</Badge>) : "-"
                                                            }
                                                        </TableCell>
                                                    )
                                                } else if (column.key === "quantity") {
                                                    return (
                                                        <TableCell key={index}>
                                                            <Input 
                                                                min={1} 
                                                                type="number" 
                                                                className="w-[100px]" 
                                                                value={item.quantity} 
                                                                onChange={(e) => {
                                                                    const quantity = Number(e.target.value);

                                                                    if (quantity >= 1) {
                                                                        handleQuantityChange(item, quantity)
                                                                    }
                                                                }} 
                                                            />
                                                        </TableCell>
                                                    )
                                                }

                                                return <TableCell key={index}>{item[column.key]}</TableCell>
                                            })
                                        }
                                        <TableCell>
                                            <Button variant="outline" className="cursor-pointer hover:text-red-600" onClick={() => removeItem(item)}>
                                                <Trash />
                                            </Button>
                                        </TableCell>
                                    </TableRow>
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