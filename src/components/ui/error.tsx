export default function Error({ error }: { error?: string }) {
    return (
        <div className="w-full flex flex-col items-center justify-center gap-4 text-center min-h-[50vh]">
            <i className="fi fi-tr-times-hexagon text-7xl icon"></i>
            <h1 className="text-4xl font-bold">Somthing went wrong</h1>
            {
                error && <p className="text-neutral-500">{error}</p>
            }
        </div>
    );
}