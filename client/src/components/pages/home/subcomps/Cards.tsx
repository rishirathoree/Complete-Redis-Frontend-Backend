

const Cards = () => {

    return (
        <div className="border-y border-dashed border-black/10 p-4 flex items-center justify-between divide-black/10 divide-x divide-dashed">
            <div className="flex flex-col gap-1 pl-6 w-1/6">
                <h2 className="font-medium text-slate-700 text-md">Total Products</h2>
                <p className="font-semibold text-4xl text-gray-500">123</p>
            </div>
            <div className="flex flex-col gap-1 pl-6 w-1/6">
                <h2 className="font-medium text-slate-700 text-md">Total Categories</h2>
                <p className="font-semibold text-4xl text-gray-500">123</p>
            </div>
            <div className="flex flex-col gap-1 pl-6 w-1/6">
                <h2 className="font-medium text-slate-700 text-md">Total Subcategories</h2>
                <p className="font-semibold text-4xl text-gray-500">344</p>
            </div>
            <div className="flex flex-col gap-1 pl-6 w-1/6">
                <h2 className="font-medium text-slate-700 text-md">Total Pets</h2>
                <p className="font-semibold text-4xl text-gray-500">123</p>
            </div>
            <div className="flex flex-col gap-1 pl-6 w-1/6">
                <h2 className="font-medium text-slate-700 text-md">Total Breeds</h2>
                <p className="font-semibold text-4xl text-gray-500">310</p>
            </div>
            <div className="flex flex-col gap-1 pl-6 w-1/6">
                <h2 className="font-medium text-slate-700 text-md">Total Brands</h2>
                <p className="font-semibold text-4xl text-gray-500">310</p>
            </div>
        </div>

    )
}

export default Cards