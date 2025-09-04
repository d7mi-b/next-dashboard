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
import { EditPartnerFormSchema } from "@/lib/definitions";
import { Partner } from "@/types/partner";
import { useState } from "react";
import usePartners from "@/hooks/usePartners";
import { Edit } from "lucide-react";

export default function EditPartnerDialogPage({
    partner,
}: {
    partner: Partner;
}) {
    const { update, isSaving } = usePartners();
    const [image, setImage] = useState<string>("");
    const [open, setOpen] = useState<boolean>(false);

    const form = useForm<z.infer<typeof EditPartnerFormSchema>>({
        resolver: zodResolver(EditPartnerFormSchema),
        defaultValues: {
            id: partner.id,
            name: partner.name ? partner.name : "",
            email: partner.email ? partner.email : "",
            phone: partner.phone ? partner.phone : "",
        },
    });

    const fields = [
        {
            name: "name",
            label: "Name",
            type: "text",
            required: true,
            description: null,
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
            description: "Please enter a valid Saudi number or Yemen number.",
        },
        {
            name: "image_1920",
            label: "Image",
            type: "file",
            required: false,
            description: null
        }
    ];

    const handleClose = () => {
        form.reset();
        setImage("");
        setOpen(false);
    }

    const handleSubmit = async (values: z.infer<typeof EditPartnerFormSchema>) => {
        if (image) {
            values.image_1920 = image;
        }

        const result: boolean = await update(values);

        if (result) {
            handleClose();
        }
    }

    const handleImageChange = (event: any) => {
        const reader: any = new FileReader();
        reader.readAsDataURL(event.target.files[0]);
        reader.onloadend = async () => {
            const base64Image = await reader.result.split(',')[1];
            setImage(base64Image);
        }
    }

    return (
        <Dialog open={open} onOpenChange={(open) => {form.reset(); setImage("");}}>
            <DialogTrigger asChild>
                <Button variant="outline" type="button" onClick={() => setOpen(true)}>
                    <Edit />
                </Button>
            </DialogTrigger>
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
                                                    <Input 
                                                        placeholder={f.label} 
                                                        type={f.type}
                                                        {...field}
                                                        value={field.value}
                                                        onChange={(event) => {
                                                            if (event.target.files && event.target.files[0]) {
                                                                handleImageChange(event);
                                                            } else {
                                                                return field.onChange(event.target.value);
                                                            }
                                                        }}
                                                    />
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
                            <DialogClose asChild onClick={handleClose}>
                                <Button variant="outline">Cancel</Button>
                            </DialogClose>
                            <Button type="submit" disabled={isSaving} onClick={form.handleSubmit(handleSubmit)}>Save changes</Button>
                        </DialogFooter>
                    </DialogContent>
                </form>
            </Form>
        </Dialog>
    );
}
