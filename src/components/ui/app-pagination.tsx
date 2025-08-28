import { 
    Pagination, 
    PaginationButton, 
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationNext, 
    PaginationPrevious 
} from "./pagination";

export default function AppPagination({
    page = 1,
    totalPages,
    onNextPage,
    onPrevPage,
    setPage = (number: number) => { },
}: {
    page?: number;
    totalPages: number;
    onNextPage?: () => void;
    onPrevPage?: () => void;
    setPage?: (page: number) => void;
}) {
    const getPageNumbers = () => {
        const pageNumbers = [];
        const startPage = Math.max(1, page - Math.floor(5 / 2));
        const endPage = Math.min(totalPages, Math.floor(startPage + 5 - 1));

        // Add page numbers within the calculated range
        for (let i = startPage; i <= endPage; i++) {
            pageNumbers.push(i);
        }

        return pageNumbers;
    };

    const pageNumbers = getPageNumbers();

    return (
        <Pagination>
            <PaginationContent>
                <PaginationItem>
                    <PaginationPrevious className="cursor-pointer" onClick={onPrevPage} disabled={page === 1} />
                </PaginationItem>
                {/* First Page Button */}
                {pageNumbers[0] > 1 && (
                    <>
                        <PaginationItem>
                            <PaginationButton onClick={() => setPage(1)} isActive={page === 1} className="cursor-pointer">
                                1
                            </PaginationButton>
                        </PaginationItem>
                        {pageNumbers[0] > 2 && <PaginationEllipsis />}
                    </>
                )}

                {/* Dynamic Page Buttons */}
                {pageNumbers.map((pageNumber) => (
                    <PaginationItem key={pageNumber}>
                        <PaginationButton
                            className="cursor-pointer"
                            onClick={() => setPage(pageNumber)}
                            isActive={pageNumber === page}
                        >
                            {pageNumber}
                        </PaginationButton>
                    </PaginationItem>
                ))}

                {/* Last Page Button */}
                {pageNumbers[pageNumbers.length - 1] < totalPages && (
                    <>
                        {pageNumbers[pageNumbers.length - 1] < totalPages - 1 && <PaginationEllipsis />}
                        <PaginationItem>
                            <PaginationButton onClick={() => setPage(totalPages)} isActive={page === totalPages} className="cursor-pointer">
                                {totalPages}
                            </PaginationButton>
                        </PaginationItem>
                    </>
                )}
                <PaginationItem>
                    <PaginationNext className="cursor-pointer" onClick={onNextPage} disabled={page === totalPages} />
                </PaginationItem>
            </PaginationContent>
        </Pagination>
    );
}