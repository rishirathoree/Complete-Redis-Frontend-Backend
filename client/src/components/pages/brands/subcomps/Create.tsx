import { Plus } from 'lucide-react'
import React from 'react'
const Create = () => {
  return (
    <div>
        <span className='inline-flex py-1 flex items-center gap-2'>
            <Plus size={18} strokeWidth={1} />
            <p className='text-xs font-medium'>Create New</p>
        </span>
    </div>
  )
}

export default Create