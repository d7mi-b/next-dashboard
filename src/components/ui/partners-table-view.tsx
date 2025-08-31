import { Partner } from "@/types/partner";
import { Dispatch, SetStateAction } from "react";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "./table";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import getMimeTypeFromBase64 from "@/utils/getMimeTypeFromBase64";
import PartnerAvatar from "./partner-avatar";
import { Button } from "./button";
import Link from "next/link";
import { Edit, ExternalLink } from "lucide-react";

const columns = [
    {
        id: 1,
        name: "Name",
        accessor: "name",
        Cell: (partner: Partner) => <section className="flex items-center gap-2">
            <PartnerAvatar image={partner.image_1920} name={partner.name} />
            <span>{partner.name}</span>
        </section>,
    },
    {
        id: 2,
        name: "Email",
        accessor: "email",
        Cell: (partner: Partner) => <span>{partner.email}</span>,
    },
    {
        id: 3,
        name: "Phone",
        accessor: "phone",
        Cell: (partner: Partner) => <span>{partner.phone}</span>,
    },
    {
        id: 4,
        name: "Mobile",
        accessor: "mobile",
        Cell: (partner: Partner) => <span>{partner.mobile}</span>,
    },
    {
        id: 5,
        name: "Create Date",
        accessor: "create_date",
        Cell: (partner: Partner) => <span>{new Date(partner.create_date).toLocaleDateString()}</span>,
    },
]

export default function PartnersTableView({ partners, setPartner }: { partners: Partner[], setPartner: Dispatch<SetStateAction<Partner | undefined>> }) {
    return (
        <section>
            <Table>
                <TableCaption>Partners</TableCaption>
                <TableHeader>
                    <TableRow>
                        {
                            columns.map((column) => (
                                <TableHead key={column.id}>{column.name}</TableHead>
                            ))
                        }
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {
                        partners.map((partner) => (
                            <TableRow key={partner.id}>
                                {
                                    columns.map((column) => (
                                        <TableCell key={column.id}>
                                            {partner[column.accessor] !== "false" ? column.Cell(partner) : <span></span>}
                                        </TableCell>
                                    ))
                                }
                                <TableCell>
                                    <Button variant="outline">
                                        <Link href={`/partners/${partner.id}`}>
                                            <ExternalLink />
                                        </Link>
                                    </Button>
                                    <Button variant="outline" onClick={() => setPartner(partner)}><Edit /></Button>
                                </TableCell>
                            </TableRow>
                        ))
                    }
                </TableBody>
            </Table>
        </section>
    );
}