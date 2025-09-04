"use client";

import EmptyResult from "@/components/ui/empty-result";
import AddPartnerDialog from "@/components/partners/add-partners-dialog";
import AppPagination from "@/components/ui/app-pagination";
import EditPartnerDialog from "@/components/partners/edit-partners-dialog";
import Navbar from "@/components/ui/navbar";
import usePartners from "@/hooks/usePartners";
import PartnersCardView from "@/components/partners/partners-card-view";
import { useState } from "react";
import PartnersTableView from "@/components/partners/partners-table-view";
import { Switch } from "@/components/ui/switch";
import PartnersFilters from "@/components/partners/partners-filters";
import Loading from "../loading";
import Error from "@/components/ui/error";

export default function Partners() {
    const { 
        partners, 
        page, 
        totalPages, 
        nextPage, 
        prevPage, 
        setPage, 
        partner, 
        setPartner, 
        setSearch, 
        order, 
        setOrder,
        isCustomer,
        setIsCustomer,
        isSupplier,
        setIsSupplier,
        country,
        setCountry,
        city,
        setCity,
        isLoading,
        search,
        error
    } = usePartners();
    const [cardsView, setCardsView] = useState<boolean>(false);

    if (isLoading) {
        return <Loading />
    }

    return (
        <main className="p-4 w-full">
            <Navbar 
                button={
                    <AddPartnerDialog />
                }
                search={search}
                setSearch={setSearch}
            />

            <section className="p-4">
                <header className="flex items-center justify-between gap-4 my-6">
                    <h1 className="scroll-m-20 text-center text-4xl font-extrabold tracking-tight text-balance">Partners</h1>

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
                            <PartnersFilters
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
                            />
                        </section>
                    </section>
                </header>

                {
                    partners && partners.length > 0 &&
                    <section>
                        {
                            !cardsView && <PartnersCardView partners={partners} setPartner={setPartner} />
                        }

                        {
                            cardsView && <PartnersTableView partners={partners} setPartner={setPartner} />
                        }

                        <section className="mt-4 flex items-center justify-center gap-2">
                            <AppPagination page={page} totalPages={totalPages} onNextPage={nextPage} onPrevPage={prevPage} setPage={setPage} />
                        </section>

                        {
                            partner && <EditPartnerDialog partner={partner} setPartner={setPartner} />
                        }
                    </section>
                }

                {
                    partners && partners.length === 0 && <EmptyResult />
                }

                {
                    error && <Error error={error} />
                }
            </section>
        </main>
    );
}