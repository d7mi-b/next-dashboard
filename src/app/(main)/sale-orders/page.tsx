"use client";

import AppPagination from "@/components/ui/app-pagination";
import { Button } from "@/components/ui/button";
import EmptyResult from "@/components/ui/empty-result";
import Navbar from "@/components/ui/navbar";
import SaleOrdersTableView from "@/components/ui/sale-orders-table-view";
import { Switch } from "@/components/ui/switch";
import useSaleOrders from "@/hooks/useSaleOrders";
import { Plus } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import Loading from "../loading";

export default function SaleOrders() {
    const { 
        saleOrders, 
        page, 
        totalPages, 
        nextPage, 
        prevPage, 
        setPage,
        setSearch,
        order,
        setOrder,
        isLoading,
        search
    } = useSaleOrders();
    const [cardsView, setCardsView] = useState<boolean>(false);

    if (!saleOrders && isLoading) {
        return <Loading />
    }

    return (
        <main className="p-4 w-full">
            <Navbar 
                button={
                    <Button asChild>
                        <Link href="/sale-orders/create">
                            <Plus />
                            New Sale Order
                        </Link>
                    </Button>
                }
                search={search}
                setSearch={setSearch}
            />

            <section className="p-4">
                <header className="flex items-center justify-between gap-4 my-6">
                    <h1 className="scroll-m-20 text-center text-4xl font-extrabold tracking-tight text-balance">Sale Orders</h1>

                    <section className="flex items-center gap-2">
                        <section className="flex items-center gap-2">
                            <span>Cards</span>
                            <Switch
                                checked={cardsView}
                                onCheckedChange={() => setCardsView(!cardsView)}
                            />
                            <span>List</span>
                        </section>

                        <section>
                            {/* <PartnersFilters
                                country={country}
                                setCountry={setCountry}
                                city={city}
                                setCity={setCity}
                                isCustomer={isCustomer}
                                setIsCustomer={setIsCustomer}
                                isSupplier={isSupplier}
                                setIsSupplier={setIsSupplier}
                                order={order}
                                setOrder={setOrder}
                            /> */}
                        </section>
                    </section>
                </header>

                {
                    saleOrders && saleOrders.length > 0 &&
                    <section>
                        <SaleOrdersTableView saleOrders={saleOrders} />

                        <section className="mt-4 flex items-center justify-center gap-2">
                            <AppPagination page={page} totalPages={totalPages} onNextPage={nextPage} onPrevPage={prevPage} setPage={setPage} />
                        </section>
                    </section>
                }

                {
                    saleOrders && saleOrders.length === 0 && <EmptyResult />
                }
            </section>
        </main>
    );
}