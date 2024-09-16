import { useDispatch, useSelector } from "react-redux"
import Table from "./subcomps/Table"
import { useEffect, useState } from "react"
import Tops from "./subcomps/Tops"
import Dock from "./subcomps/Dock"
import { GetCities } from "../../../stores/slices/cities.slice"

const Cities = () => {

    const dispatch = useDispatch()

    const [filters, setFilters] = useState<object | null>({
        order: 'ASC',
    })

    useEffect(() => {
        dispatch(GetCities())
    }, [dispatch])

    const cities = useSelector(state => state.cities.cities)

    return (
        <>
            <div className="p-4 space-y-4">
                <Tops />
                <Table setFilters={setFilters} filters={filters} list={cities} />
                <Dock />
            </div>
        </>
    )
}

export default Cities