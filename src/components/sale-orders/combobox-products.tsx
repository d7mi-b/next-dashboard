"use client"

import * as React from "react"
import { Check, ChevronsUpDown } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { Product } from "@/types/product"

export function ComboboxProducts({
    items,
    addItem,
    value,
    handleItemChange
}: {
    items: Product[],
    addItem: (item: Product) => void,
    value?: number,
    handleItemChange?: (item: Product, itemId: number) => void
}) {
    const [open, setOpen] = React.useState(false);
    const [currentValue, setCurrentValue] = React.useState<string>("");

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Escape") {
            setOpen(false);
            return;
        }

        if (e.key !== "Enter") {
            setOpen(true);
            return;
        }

        // e.preventDefault();

        if (e.key === "Enter") {
            const name = (e.target as HTMLInputElement).value;

            const item = items.find((item) => item.name.startsWith(name) );

            if (item) {
                if (handleItemChange) {
                    handleItemChange(item, Number(value));
                } else {
                    addItem(item);
                }
            }
        }
    };

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className="w-full justify-between"
                >
                    {value != undefined
                        ? items.find((item) => String(item.id) === String(value))?.name
                        : "Select product..."}
                    <ChevronsUpDown className="opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-full p-0">
                <Command>
                    <CommandInput placeholder="Search item..." className="h-9" />
                    <CommandList>
                        <CommandEmpty>No products found.</CommandEmpty>
                        <CommandGroup>
                            {items.map((item) => (
                                <CommandItem
                                    key={String(item.id)}
                                    value={String(item.name)}
                                    onSelect={(currentValue) => {
                                        // if (String(value) === currentValue) {
                                        //     setValue(undefined);
                                        // } else {
                                        //     setValue(item.id)
                                        // }
                                        if (handleItemChange) {
                                            handleItemChange(item, Number(value));
                                        } else {
                                            addItem(item);
                                        }
                                        setOpen(false)
                                    }}
                                >
                                    {item.name}
                                <Check
                                    className={cn(
                                        "ml-auto",
                                        String(value) === String(item.id) ? "opacity-100" : "opacity-0"
                                    )}
                                />
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    )
}
