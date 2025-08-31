export default function EmptyResult() {
    return (
        <div className="w-full flex flex-col items-center justify-center gap-4 text-center min-h-[50vh]">
            <i className="fi fi-tr-drawer-empty text-7xl icon"></i>
            <h1 className="text-4xl font-bold">No results found</h1>
            <p className="text-neutral-500">Please try again with a different search term.</p>
        </div>
    );
}