import { Plus } from 'lucide-react'
import { toggleSubCategoriesModal } from '../../../../stores/slices/modal.slice'
import { useAppDispatch } from '../../../../stores/store'
const Create = () => {
  const dispatch = useAppDispatch()
  return (
    <div>
        <span onClick={()=>{dispatch(toggleSubCategoriesModal())}} className='inline-flex py-1 flex items-center gap-2'>
            <Plus size={18} strokeWidth={1} />
            <p className='text-xs font-medium'>Create New</p>
        </span>
    </div>
  )
}

export default Create