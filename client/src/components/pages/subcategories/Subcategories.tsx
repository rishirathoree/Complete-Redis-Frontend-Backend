import { useDispatch, useSelector } from "react-redux"
import Table from "./subcomps/Table"
import { useEffect, useState } from "react"
import Tops from "./subcomps/Tops"
import { RootState } from "../../../stores/store"
import { GetSubcategories } from "../../../stores/slices/subcategories.slice"

const Subcategories = () => {

    const dispatch = useDispatch()

    const [filters, setFilters] = useState<object | null>({
        order: 'ASC',
    })

    useEffect(() => {
        dispatch(GetSubcategories())
    }, [dispatch])

    const categories = useSelector((state: RootState) => state.subcategories.subcategories)
    console.log(categories)

    return (
        <>
            <div className="p-4 space-y-4">
                <Tops />
                <Table setFilters={setFilters} filters={filters} list={categories} />
            </div>
        </>
    )
}

export default Subcategories