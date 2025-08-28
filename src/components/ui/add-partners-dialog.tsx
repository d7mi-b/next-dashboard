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
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus } from "lucide-react";
import { AddPartnerFormSchema } from "@/lib/definitions";

export default function AddPartnerDialog({
    onSubmit = (values: z.infer<typeof AddPartnerFormSchema>) => { },
    isSaving = false,
}: {
    onSubmit?: (values: z.infer<typeof AddPartnerFormSchema>) => void;
    isSaving?: boolean;
}) {
    const form = useForm<z.infer<typeof AddPartnerFormSchema>>({
        resolver: zodResolver(AddPartnerFormSchema),
        defaultValues: {
            name: "",
            email: "",
            phone: "",
        },
    });

    const fields = [
        {
            name: "name",
            label: "Name",
            type: "text",
            required: true,
            description: null
        },
        {
            name: "email",
            label: "Email",
            type: "email",
            required: true,
            description: null
        },
        {
            name: "phone",
            label: "Phone",
            type: "text",
            required: true,
            description: "Please enter a valid Saudi number or Yemen number."
        },
    ];

    return (
        <Dialog onOpenChange={(open) => form.reset()}>
            <Form {...form}>
                <form className="space-y-8">
                    <DialogTrigger asChild>
                        <Button type="button" className="bg-main">
                            <Plus />
                            <span className="max-sm:hidden">Add Partner</span>
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                            <DialogTitle>Add partner</DialogTitle>
                            <DialogDescription>
                                Fill in the partner information.
                            </DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4">
                            {
                                fields.map((f) => (
                                    <FormField
                                        key={f.name}
                                        control={form.control}
                                        name={f.name as "name" | "email" | "phone"}
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>{f.label}</FormLabel>
                                                <FormControl>
                                                    <Input placeholder={f.label} type={f.type} {...field} />
                                                </FormControl>
                                                {
                                                    f.description && <FormDescription>{f.description}</FormDescription>
                                                }
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                ))
                            }
                        </div>
                        <DialogFooter>
                            <DialogClose asChild>
                                <Button type="button" variant="outline">Cancel</Button>
                            </DialogClose>
                            <Button type="submit" disabled={isSaving || form.formState.isSubmitting} onClick={form.handleSubmit(onSubmit)}>Save changes</Button>
                        </DialogFooter>
                    </DialogContent>
                </form>
            </Form>
        </Dialog>
    );
}
