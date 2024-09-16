import { useDispatch, useSelector } from "react-redux"
import Table from "./subcomps/Table"
import { useEffect, useState } from "react"
import { RootState } from "../../../stores/store"
import { GetBreeds } from "../../../stores/slices/breeds.slice"

const Breeds = () => {
    const dispatch = useDispatch()
    const [filters, setFilters] = useState({
        order: 'ASC',
    })

    useEffect(() => {
        dispatch(GetBreeds())
    }, [dispatch])

    const breeds = useSelector((state: RootState) => state.breeds.breeds)

    return (
        <>
            <div className="p-4 space-y-4">
                <Table filters={filters} list={breeds} />
            </div>
        </>
    )
}

export default Breeds