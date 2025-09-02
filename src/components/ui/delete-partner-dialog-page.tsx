"use client";

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

import { Button } from "@/components/ui/button";
import { Partner } from "@/types/partner";
import { useState } from "react";
import { Trash } from "lucide-react";
import { requestOdoo } from "@/actions/request-odoo";
import { redirect } from "next/navigation";
import { toast } from "sonner";

export default function DeletePartnerDialogPage({
    partner,
}: {
    partner: Partner;
}) {
    const [open, setOpen] = useState<boolean>(false);

    const handleClose = () => {
        setOpen(false);
    }

    const handleDelete = async () => {
        const result = await requestOdoo({
            "model": "res.partner",
            "method": "unlink",
            "args": [
                [partner.id],
            ],
            "kwargs": {}
        });

        if (result) {
            handleClose();
            redirect("/partners");
        } else {
            toast.error("Failed to delete partner.");
        }
    }

    return (
        <Dialog open={open}>
            <DialogTrigger asChild>
                <Button variant="outline" type="button" onClick={() => setOpen(true)}>
                    <Trash />
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]" onClickCloseBtn={handleClose}>
                <DialogHeader>
                    <DialogTitle>Delete partner</DialogTitle>
                </DialogHeader>
                <p>Are you sure you want to delete this partner?</p>
                <DialogFooter>
                    <DialogClose asChild onClick={handleClose}>
                        <Button variant="outline">Cancel</Button>
                    </DialogClose>
                    <Button type="submit" variant="destructive" onClick={handleDelete}>Delete</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
