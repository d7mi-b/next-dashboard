export default function Loading() {
    return (
        <main className="p-4 w-full h-screen flex items-center justify-center">
            <div className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-neutral-900 border-solid"></div>
            </div>
        </main>
    );
}