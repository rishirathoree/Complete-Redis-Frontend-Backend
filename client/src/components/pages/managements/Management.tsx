import { useDispatch, useSelector } from "react-redux"
import Table from "./subcomps/Table"
import { useEffect, useState } from "react"
import { RootState } from "../../../stores/store"
import { GetManagement } from "../../../stores/slices/management.slice"
import Tops from "./subcomps/Tops"

const Management = () => {
    const dispatch = useDispatch()
    const [filters, setFilters] = useState({
        order: 'ASC',
    })

    useEffect(() => {
        dispatch(GetManagement())
    }, [dispatch])

    const managements = useSelector((state: RootState) => state.management.managements)

    console.log(managements)

    return (
        <>
            <div className="p-4 space-y-4">
                <Tops />
                <Table filters={filters} list={managements} />
            </div>
        </>
    )
}

export default Management