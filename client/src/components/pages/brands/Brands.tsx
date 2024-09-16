import { useDispatch, useSelector } from "react-redux"
import Table from "./subcomps/Table"
import { useEffect, useState } from "react"
import { RootState } from "../../../stores/store"
import { GetBrands } from "../../../stores/slices/brands.slice"

const Brands = () => {
    const dispatch = useDispatch()
    const [filters, setFilters] = useState({
        order: 'ASC',
    })

    useEffect(() => {
        dispatch(GetBrands())
    }, [dispatch])

    const brands = useSelector((state: RootState) => state.brands.brands)

    return (
        <>
            <div className="p-4 space-y-4">
                <Table filters={filters} list={brands} />
            </div>
        </>
    )
}

export default Brands