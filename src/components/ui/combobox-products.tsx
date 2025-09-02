"use client"

import * as React from "react"
import { Check, ChevronsUpDown, ClosedCaption } from "lucide-react"

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
}: {
    items: Product[],
    addItem: (item: Product) => void,
}) {
    const [open, setOpen] = React.useState(false);
    const inputRef = React.useRef<HTMLInputElement>(null);

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Escape") {
            setOpen(false);
            return;
        }

        if (e.key !== "Enter") {
            setOpen(true);
            return;
        }

        e.preventDefault();

        if (e.key === "Enter") {
            const name = (e.target as HTMLInputElement).value;

            const item = items.find((item) => item.name.startsWith(name) );

            if (item) {
                addItem(item);
            }
        }
    };

    return (
        <Popover open={open}>
            <Command>
                <PopoverTrigger asChild >
                    <CommandInput
                        ref={inputRef}
                        placeholder="Search framework..."
                        className="h-9"
                        onKeyDown={handleKeyDown}
                        onFocus={() => setOpen(true)}
                    />
                </PopoverTrigger>
                <PopoverContent className="min-w-[200px]  p-0">
                    <CommandList onBlur={() => setOpen(false)} onMouseEnter={() => setOpen(true)}>
                        <CommandEmpty>No item found.</CommandEmpty>
                        <CommandGroup>
                            {items.map((item) => (
                                <CommandItem
                                    key={item.id}
                                    value={item.name}
                                    onSelect={(currentValue) => {
                                        addItem(item);
                                        setOpen(false)
                                    }}
                                >
                                    {item.name}
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    </CommandList>
                </PopoverContent>
            </Command>
        </Popover>
    )
}
