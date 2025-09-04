"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import {
    Dialog,
    DialogTrigger,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
    DialogClose,
} from "@/components/ui/dialog";

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
    FormDescription,
} from "@/components/ui/form";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Plus } from "lucide-react";

const formSchema = z.object({
    name: z.string().min(1, { message: "Name field is required." }),
    address: z.string().min(1, { message: "Address field is required." }),
    isDefault: z.boolean().optional(),
});

export default function AddWarehouseDialog() {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            address: "",
            isDefault: false,
        },
    });

    function onSubmit(values: z.infer<typeof formSchema>) {
        console.log("Form Submitted ✅", values);
    }

    return (
        <Dialog>
            <Form {...form}>
                <form className="space-y-8">
                    <DialogTrigger asChild>
                        <Button variant="outline" className="w-full h-full flex-col text-lg text-neutral-500 border-none">
                            <Plus />
                            Add Warehouse
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                            <DialogTitle>Add Warehouse</DialogTitle>
                            <DialogDescription>
                                Fill in the warehouse information.
                            </DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4">
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Name</FormLabel>
                                    <FormControl>
                                    <Input placeholder="Warehouse name" {...field} />
                                    </FormControl>
                                    <FormDescription>This is the name of the warehouse.</FormDescription>
                                    <FormMessage />
                                </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="address"
                                render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Address</FormLabel>
                                    <FormControl>
                                    <Input placeholder="Warehouse address" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="isDefault"
                                render={({ field }) => (
                                <FormItem className="flex flex-row items-center gap-2">
                                    <FormControl>
                                    <Checkbox
                                        checked={field.value}
                                        onCheckedChange={field.onChange}
                                    />
                                    </FormControl>
                                    <FormLabel>Default</FormLabel>
                                    <FormMessage />
                                </FormItem>
                                )}
                            />
                        </div>
                        <DialogFooter>
                            <DialogClose asChild>
                                <Button variant="outline">Cancel</Button>
                            </DialogClose>
                            <Button type="submit" onClick={form.handleSubmit(onSubmit)}>Save changes</Button>
                        </DialogFooter>
                    </DialogContent>
                </form>
            </Form>
        </Dialog>
    );
}
