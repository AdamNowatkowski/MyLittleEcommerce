export default function loading() {
    return (
        <div
            aria-busy="true"
            className="w-full h-screen flex justify-center absolute top-0 left-0 right-0 bottom-0 bg-white bg-opacity-70 items-center"
        >
            <div
                className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
                role="status"
            >
                <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
                    Loading...
                </span>
            </div>
        </div>
    );
}