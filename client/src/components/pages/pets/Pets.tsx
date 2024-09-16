import { useDispatch, useSelector } from "react-redux"
import Table from "./subcomps/Table"
import { useEffect, useState } from "react"
import { RootState } from "../../../stores/store"
import { GetPets } from "../../../stores/slices/pet.slice"

const Pets = () => {
    const dispatch = useDispatch()
    const [filters, setFilters] = useState({
        order: 'ASC',
    })

    useEffect(() => {
        dispatch(GetPets())
    }, [dispatch])

    const pets = useSelector((state: RootState) => state.pets.pets)

    console.log(pets)

    return (
        <>
            <div className="p-4 space-y-4">
                <Table filters={filters} list={pets} />
            </div>
        </>
    )
}

export default Pets