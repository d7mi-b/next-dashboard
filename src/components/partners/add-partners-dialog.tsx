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
import { useState } from "react";

export default function AddPartnerDialog({
    create
}: {
    create: (values: z.infer<typeof AddPartnerFormSchema>) => Promise<boolean>
}) {
    const form = useForm<z.infer<typeof AddPartnerFormSchema>>({
        resolver: zodResolver(AddPartnerFormSchema),
        defaultValues: {
            name: "",
            email: "",
            phone: "",
        },
    });

    const [open, setOpen] = useState<boolean>(false);
    const [image, setImage] = useState<string>("");

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

    const handleSubmit = async (values: z.infer<typeof AddPartnerFormSchema>) => {
        values.image_1920 = image;

        if (!values.image_1920) {
            form.setError("image_1920", { type: "required", message: "Image field is required." });
            return;
        }

        const result: boolean = await create(values);

        if (result) {
            setOpen(false);
            setImage("");
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

    const handleCloseDialog = () => {
        setOpen(false);
        setImage("");
    }

    return (
        <Dialog open={open} onOpenChange={(open) => form.reset()}>
            <Form {...form}>
                <form className="space-y-8">
                    <DialogTrigger asChild>
                        <Button type="button" className="bg-main" onClick={() => setOpen(true)}>
                            <Plus />
                            <span className="max-sm:hidden">Add Partner</span>
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]" onClickCloseBtn={handleCloseDialog}>
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
                            <DialogClose asChild onClick={handleCloseDialog}>
                                <Button type="button" variant="outline">Cancel</Button>
                            </DialogClose>
                            <Button type="submit" disabled={form.formState.isSubmitting} onClick={form.handleSubmit(handleSubmit)}>Save changes</Button>
                        </DialogFooter>
                    </DialogContent>
                </form>
            </Form>
        </Dialog>
    );
}
