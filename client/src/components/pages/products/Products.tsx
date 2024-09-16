import { useDispatch, useSelector } from "react-redux"
import Table from "./subcomps/Table"
import { useEffect, useState } from "react"
import Tops from "./subcomps/Tops"
import { RootState } from "../../../stores/store"
import { GetProducts } from "../../../stores/slices/products.slice"

const Products = () => {

    const dispatch = useDispatch()

    const [filters, setFilters] = useState<object | null>({
        order: 'ASC',
    })

    useEffect(() => {
        dispatch(GetProducts())
    }, [dispatch])

    const products = useSelector((state: RootState) => state.products.products)

    return (
        <>
            <div className="p-4 space-y-4">
                <Tops />
                <Table setFilters={setFilters} filters={filters} list={products} />
            </div>
        </>
    )
}

export default Products