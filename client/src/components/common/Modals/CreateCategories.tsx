import { useSelector } from "react-redux"
import { RootState, useAppDispatch } from "../../../stores/store"
import { motion } from 'framer-motion'
import { useEffect, useRef, useState } from "react"
import useOnClickOutside from "../../../hooks/useOutsideClick"
import { toggleCategoriesModal } from "../../../stores/slices/modal.slice"
import { Inbox, X } from "lucide-react"
import { Input } from "../TextInputs/TextInput"
import { Textarea } from "../TextInputs/Textarea"
import { CreateCategoriesHandler } from "../../../stores/slices/categories.slice"

const CreateCategories = () => {

    const dispatch = useAppDispatch()
    const isOpen = useSelector((state: RootState) => state.modal.categoriesModal)
    const ref = useRef(null)

    useOnClickOutside(isOpen, ref, () => { 
        if (isOpen) dispatch(toggleCategoriesModal()) 
    })

    // Form state
    const [forms, setForms] = useState({
        name: '',
        description: '',
        image: null as File | null
    })

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target
        setForms(prev => ({ ...prev, [name]: value }))
    }

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files && e.target.files[0]
        if (file) {
            setForms(prev => ({ ...prev, image: file }))
        }
    }

    const imagePreview = forms.image ? URL.createObjectURL(forms.image) : null

    const onResetClose = () => {
        setForms({ name: '', description: '', image: null })
        dispatch(toggleCategoriesModal())
    }

    const handleSubmit = async () => {
        const formData  = new FormData()
        for (const [key,value] of Object.entries(forms)) {
        formData.append(key, value)
        }
        dispatch(CreateCategoriesHandler(formData))
    }

    const {pending,success,error} = useSelector((state: RootState) => state.categories.create)

    useEffect(()=>{if(success){onResetClose()}},[success])

    return (
        <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: isOpen ? 1 : 0 }} 
            transition={{ duration: 0.5, ease: "easeInOut",stiffness:100 }} 
            exit={{ opacity: 0 }} 
            className={`h-screen w-full overflow-auto flex items-center justify-center absolute top-0 left-0 bg-black/50 z-[1000] ${isOpen ? 'visible' : 'hidden'}`}
        >
            <motion.div 
                ref={ref} 
                initial={{ opacity: 0, y: 40 }} 
                animate={{ y: isOpen ? 0 : 40, opacity: isOpen ? 1 : 0 }} 
                exit={{ opacity: 0, y: 40 }} 
                transition={{ duration: 0.5, ease: "easeInOut" }} 
                className="h-min w-2/5 bg-white divide-y rounded-lg"
            >
                <span className="p-4 flex items-center justify-between">
                    <p className="font-medium text-md">Add Categories</p>
                    <X onClick={() => dispatch(toggleCategoriesModal())} strokeWidth={1} className="cursor-pointer" />
                </span>

                <div className="p-4 space-y-4">
                    <label className="space-y-2 block">
                        <p className="font-medium text-gray-800 text-xs">Category Name</p>
                        <Input 
                            name="name" 
                            value={forms.name} 
                            onChange={handleInputChange} 
                            placeholder="Enter category name" 
                        />
                    </label>

                    <label className="space-y-2 block">
                        <p className="font-medium text-gray-800 text-xs">Description</p>
                        <Textarea 
                            name="description" 
                            value={forms.description} 
                            onChange={handleInputChange} 
                            className="h-20" 
                            placeholder="Enter description"
                        />
                    </label>

                    <div>
                        <label 
                            htmlFor="fileUpload" 
                            className="bg-[var(--secondary-theme-color)] w-full flex text-gray-400 items-center justify-center space-y-3 flex-col p-4 h-40 text-black border-[1px] rounded-lg border-dashed cursor-pointer"
                        >
                            <Inbox />
                            <p className="font-medium text-[14px]">Upload your image here.</p>
                            <input 
                                onChange={handleImageUpload} 
                                type="file" 
                                className="hidden" 
                                id="fileUpload" 
                            />
                        </label>
                    </div>

                    {imagePreview && (
                        <motion.div 
                            initial={{ height: 0, opacity: 0 }} 
                            animate={{ height: 'auto', opacity: 1 }} 
                            className="mt-4"
                        >
                            <img src={imagePreview} alt="Preview" className="h-40 shadow-2xl shadow-gray-50 w-1/2 object-cover rounded-lg" />
                        </motion.div>
                    )}
                </div>

                <div className="p-4 flex items-center  justify-end gap-2">
                    <motion.button whileTap={{scale:1.1}} onClick={onResetClose} className="bg-[var(--slate-theme-color)] text-black font-medium text-xs px-6 py-2 rounded">Cancel</motion.button>
                    <motion.button onClick={handleSubmit} whileTap={{scale:1.1}} className="bg-[var(--primary-theme-color)] text-white font-medium text-xs px-6 py-2 rounded">Create</motion.button>
                    </div>
            </motion.div>
        </motion.div>
    )
}

export default CreateCategories
