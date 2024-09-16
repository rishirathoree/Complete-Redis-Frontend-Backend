import { useDispatch, useSelector } from "react-redux"
import Table from "./subcomps/Table"
import { useEffect, useState } from "react"
import { GetState } from "../../../stores/slices/state.slice"
const State = () => {
  const dispatch = useDispatch()
  const [filters,setFilters] = useState({
    order: 'ASC',
  })
  
  useEffect(()=>{
    dispatch(GetState())
  },[dispatch])

  const state = useSelector(state => state.states.states)

  return (
    <>
   <div className="p-4 space-y-4">
   <Table filters={filters} list={state} />
   </div>
    </>
  )
}

export default State