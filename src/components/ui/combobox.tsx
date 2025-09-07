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

export function Combobox({
    items,
    value,
    setValue,
    keyLabel = "name",
    keyValue = "id",
}: {
    items: any[],
    value: string | number | undefined,
    setValue: React.Dispatch<React.SetStateAction<string | number | undefined>>,
    keyLabel?: string,
    keyValue?: string,
}) {
    const [open, setOpen] = React.useState(false);

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
                        ? items.find((item) => String(item[keyValue]) === String(value))?.[keyLabel]
                        : "Select item..."}
                    <ChevronsUpDown className="opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-full p-0">
                <Command>
                    <CommandInput placeholder="Search item..." className="h-9" />
                    <CommandList>
                        <CommandEmpty>No item found.</CommandEmpty>
                        <CommandGroup>
                            {items.map((item) => (
                                <CommandItem
                                    key={String(item[keyValue])}
                                    value={String(item[keyLabel])}
                                    onSelect={(currentValue) => {
                                        if (String(value) === currentValue) {
                                            setValue(undefined);
                                        } else {
                                            setValue(item[keyValue])
                                        }

                                        setOpen(false)
                                    }}
                                >
                                    {item[keyLabel]}
                                <Check
                                    className={cn(
                                        "ml-auto",
                                        String(value) === String(item[keyValue]) ? "opacity-100" : "opacity-0"
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
