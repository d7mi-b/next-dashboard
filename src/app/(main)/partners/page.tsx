"use client";

import EmptyResult from "@/components/empty-result";
import AddPartnerDialog from "@/components/ui/add-partners-dialog";
import AppPagination from "@/components/ui/app-pagination";
import EditPartnerDialog from "@/components/ui/edit-partners-dialog";
import Navbar from "@/components/ui/navbar";
import Partner from "@/components/ui/partner";
import usePartners from "@/hooks/usePartners";

export default function Partners() {
    const { partners, page, totalPages, nextPage, prevPage, setPage, create, update, partner, setPartner, isSaving, setSearch } = usePartners();

    return (
        <main className="p-4 w-full">
            <Navbar 
                button={
                    <AddPartnerDialog isSaving={isSaving} onSubmit={create} />
                } 
                setSearch={setSearch}
            />

            <section className="p-4">
                <header className="flex items-center justify-between gap-4 my-6">
                    <h1 className="scroll-m-20 text-center text-4xl font-extrabold tracking-tight text-balance">Partners</h1>
                </header>

                {
                    partners.length > 0 &&
                    <section>
                        <section className="grid grid-cols-3 gap-4 max-sm:grid-cols-1 max-xl:grid-cols-2">
                            {
                                partners.map((partner) => (
                                    <Partner key={partner.id} partner={partner} onClick={() => setPartner(partner)} />
                                ))
                            }
                        </section>

                        <section className="mt-4 flex items-center justify-center gap-2">
                            <AppPagination page={page} totalPages={totalPages} onNextPage={nextPage} onPrevPage={prevPage} setPage={setPage} />
                        </section>

                        {
                            partner && <EditPartnerDialog isSaving={isSaving} onSubmit={update} partner={partner} setPartner={setPartner} />
                        }
                    </section>
                }

                {
                    partners.length === 0 && <EmptyResult />
                }
            </section>
        </main>
    );
}