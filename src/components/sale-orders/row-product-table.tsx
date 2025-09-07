import { Product } from "@/types/product";
import { TableCell, TableRow } from "../ui/table";
import { Trash } from "lucide-react";
import useCreateSalesOrder from "@/hooks/useCreateSalesOrder";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Dispatch, SetStateAction, useState } from "react";
import { Badge } from "../ui/badge";
import { ComboboxProducts } from "./combobox-products";

export default function RowProductTable({ 
    item, 
    editable, 
    setEditable,
    columns,
    products,
}: { 
    item: Product, 
    editable: number, 
    setEditable: Dispatch<SetStateAction<number | undefined>>,
    columns: any[],
    products: Product[],
}) {
    const { addItem, handleQuantityChange, removeItem, handlePriceChange, handleItemChange } = useCreateSalesOrder();

    return (
        <TableRow className="cursor-pointer hover:bg-light" onClick={() => setEditable(item.id)}>
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
                                {
                                    editable === item.id ? (
                                        <Input 
                                            min={1} 
                                            type="number" 
                                            className="w-[100px]" 
                                            value={item.quantity} 
                                            onChange={(e) => {
                                                handleQuantityChange(item, Number(e.target.value));
                                            }}
                                            onBlur={(e) => {
                                                const quantity = Number(e.target.value);
                                                if (quantity < 1) {
                                                    handleQuantityChange(item, 1)
                                                }
                                            }}
                                        />
                                    ) : item.quantity
                                }
                            </TableCell>
                        )
                    } else if (column.key === "list_price") {
                        return (
                            <TableCell key={index}>
                                {
                                    editable === item.id ? (
                                        <Input 
                                            min={1} 
                                            type="number" 
                                            className="w-[100px]" 
                                            value={item.list_price} 
                                            onChange={(e) => {
                                                handlePriceChange(item, Number(e.target.value));
                                            }}
                                            onBlur={(e) => {
                                                const quantity = Number(e.target.value);
                                                if (quantity < 1) {
                                                    handlePriceChange(item, 1)
                                                }
                                            }}
                                            autoFocus
                                        />
                                    ) : item.list_price
                                }
                            </TableCell>
                        )
                    } else if (column.key === "name") {
                        return (
                            <TableCell key={index}>
                                {
                                    editable === item.id ? (
                                        <ComboboxProducts items={products} addItem={addItem} handleItemChange={handleItemChange} value={item.id} />
                                    ) : item.name
                                }
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
    );
}