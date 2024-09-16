import { useDispatch, useSelector } from "react-redux"
import Table from "./subcomps/Table"
import { useEffect, useState } from "react"
import Tops from "./subcomps/Tops"
import Dock from "./subcomps/Dock"
import { GetCategories } from "../../../stores/slices/categories.slice"
import { RootState } from "../../../stores/store"

const Categories = () => {

    const dispatch = useDispatch()

    const [filters, setFilters] = useState<object | null>({
        order: 'ASC',
    })

    useEffect(() => {
        dispatch(GetCategories())
    }, [dispatch])

    const categories = useSelector((state: RootState) => state.categories.categories)

    return (
        <>
            <div className="p-4 space-y-4">
                <Tops />
                <Table setFilters={setFilters} filters={filters} list={categories} />
            </div>
        </>
    )
}

export default Categories