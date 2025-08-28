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
} from "@/components/ui/form";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus } from "lucide-react";
import { AddPartnerFormSchema } from "@/lib/definitions";
import { Partner } from "@/types/partner";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

export default function EditPartnerDialog({
    onSubmit = (values: z.infer<typeof AddPartnerFormSchema>) => { },
    isSaving = false,
    partner,
    setPartner
}: {
    onSubmit?: (values: z.infer<typeof AddPartnerFormSchema>) => void;
    isSaving?: boolean;
    partner: Partner;
    setPartner: Dispatch<SetStateAction<Partner | undefined>>;
}) {
    const [currentOpen, setCurrentOpen] = useState<boolean>(false);

    const form = useForm<z.infer<typeof AddPartnerFormSchema>>({
        resolver: zodResolver(AddPartnerFormSchema),
        defaultValues: {
            name: partner?.name ?? "",
            email: partner?.email ?? "",
            phone: partner?.phone ?? "",
        },
    });

    const fields = [
        {
            name: "name",
            label: "Name",
            type: "text",
            required: true,
        },
        {
            name: "email",
            label: "Email",
            type: "email",
            required: true,
        },
        {
            name: "phone",
            label: "Phone",
            type: "text",
            required: true,
        },
    ];

    useEffect(() => {
        if (!partner) {
            setCurrentOpen(false);
        } else {
            setCurrentOpen(true);
        }
    }, [partner]);

    const handleClose = () => {
        setCurrentOpen(false); 
        setPartner(undefined);
    }

    return (
        <Dialog open={currentOpen} onOpenChange={(open) => form.reset()}>
            <Form {...form}>
                <form className="space-y-8">
                    <DialogContent className="sm:max-w-[425px]" onClickCloseBtn={handleClose}>
                        <DialogHeader>
                            <DialogTitle>Edit partner</DialogTitle>
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
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                ))
                            }
                        </div>
                        <DialogFooter>
                            <DialogClose asChild onClick={handleClose}>
                                <Button variant="outline">Cancel</Button>
                            </DialogClose>
                            <Button type="submit" disabled={isSaving} onClick={form.handleSubmit(onSubmit)}>Save changes</Button>
                        </DialogFooter>
                    </DialogContent>
                </form>
            </Form>
        </Dialog>
    );
}
