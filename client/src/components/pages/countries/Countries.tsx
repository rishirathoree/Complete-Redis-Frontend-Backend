import { useDispatch, useSelector } from "react-redux"
import Table from "./subcomps/Table"
import { useEffect, useState } from "react"
import Tops from "./subcomps/Tops"
import Dock from "./subcomps/Dock"
import { GetCountries } from "../../../stores/slices/countries.slice"

const Countries = () => {

    const dispatch = useDispatch()

    const [filters, setFilters] = useState<object | null>({
        order: 'ASC',
    })

    useEffect(() => {
        dispatch(GetCountries())
    }, [dispatch])

    const state = useSelector(state => state.countries.countries)

    return (
        <>
            <div className="p-4 space-y-4">
                <Tops />
                <Table setFilters={setFilters} filters={filters} list={state} />
                <Dock />
            </div>
        </>
    )
}

export default Countries