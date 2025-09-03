import { SaleOrder } from "@/types/sale-order";
import { Dispatch, SetStateAction } from "react";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "./table";
import { Button } from "./button";
import Link from "next/link";
import { ExternalLink } from "lucide-react";
import { Badge } from "./badge";

const columns = [
    {
        id: 1,
        name: "Name",
        accessor: "name",
        Cell: (saleOrder: SaleOrder) => <span>{saleOrder.name}</span>
    },
    {
        id: 2,
        name: "Partner",
        accessor: "partner_id",
        Cell: (saleOrder: SaleOrder) => <span>{saleOrder.partner_id[1]}</span>
    },
    {
        id: 3,
        name: "state",
        accessor: "state",
        Cell: (saleOrder: SaleOrder) => <Badge variant={saleOrder.state === "draft" ? "outline" : "default"}>{saleOrder.state}</Badge>
    },
    {
        id: 4,
        name: "Amount Total",
        accessor: "amount_total",
        Cell: (saleOrder: SaleOrder) => <span>{saleOrder.amount_total}</span>
    },
    {
        id: 5,
        name: "Date Order",
        accessor: "date_order",
        Cell: (saleOrder: SaleOrder) => <span>{new Date(saleOrder.date_order).toLocaleDateString()}</span>
    },
]

export default function SaleOrdersTableView({ saleOrders }: { saleOrders: SaleOrder[] }) {
    return (
        <section>
            <Table>
                <TableCaption>Sale Orders</TableCaption>
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
                        saleOrders.map((saleOrder) => (
                            <TableRow key={saleOrder.id}>
                                {
                                    columns.map((column) => (
                                        <TableCell key={column.id}>
                                            {saleOrder[column.accessor] !== "false" ? column.Cell(saleOrder) : <span></span>}
                                        </TableCell>
                                    ))
                                }
                                <TableCell>
                                    <Button variant="outline">
                                        <Link href={`/sale-orders`}>
                                            <ExternalLink />
                                        </Link>
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))
                    }
                </TableBody>
            </Table>
        </section>
    );
}