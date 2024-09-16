import { Plus } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
const Create = () => {
  const navigate = useNavigate()
  return (
    <div>
        <span onClick={()=>{navigate("/addproducts")}} className='inline-flex py-1 flex items-center gap-2'>
            <Plus size={18} strokeWidth={1} />
            <p className='text-xs font-medium'>Create New</p>
        </span>
    </div>
  )
}

export default Create