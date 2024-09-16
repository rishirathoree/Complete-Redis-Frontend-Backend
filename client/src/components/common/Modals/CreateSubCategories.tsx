import { useSelector } from "react-redux"
import { RootState, useAppDispatch } from "../../../stores/store"
import { motion } from 'framer-motion'
import { useEffect, useRef, useState } from "react"
import useOnClickOutside from "../../../hooks/useOutsideClick"
import { toggleSubCategoriesModal } from "../../../stores/slices/modal.slice"
import { Inbox, Trash2, X } from "lucide-react"
import { Input } from "../TextInputs/TextInput"
import { Textarea } from "../TextInputs/Textarea"
import { GetCategories } from "../../../stores/slices/categories.slice"
import { Tooltip } from "../Tooltips/Tooltips"
import { CreateSubCategoriesHandler } from "../../../stores/slices/subcategories.slice"

const CreateSubCategories = () => {

    const dispatch = useAppDispatch()

    const isOpen = useSelector((state: RootState) => state.modal.subcategoriesModal)
    
    const ref = useRef(null)

    useOnClickOutside(isOpen, ref, () => {
        if (isOpen) dispatch(toggleSubCategoriesModal())
    })

    useEffect(() => {
        if (isOpen) {
            dispatch(GetCategories())
        }
    }, [isOpen])

    const [forms, setForms] = useState({
        name: '',
        description: '',
        categoryId: "",
        image: null as File | null
    })

    const [imagePreview, setImagePreview] = useState<string | null>(null)

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target
        setForms(prev => ({ ...prev, [name]: value }))
    }

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files && e.target.files[0]
        if (file) {
            setForms(prev => ({ ...prev, image: file }))
            const previewUrl = URL.createObjectURL(file)
            setImagePreview(previewUrl)
        }
    }

    // Clean up URL object when component unmounts or image is reset
    useEffect(() => {
        return () => {
            if (imagePreview) {
                URL.revokeObjectURL(imagePreview)
            }
        }
    }, [imagePreview])

    const resetImage = () => {
        if (imagePreview) {
            URL.revokeObjectURL(imagePreview)
        }
        setForms(prev => ({ ...prev, image: null }))
        setImagePreview(null)
    }

    useEffect(() => { dispatch(GetCategories()) }, [dispatch])

    const categoriesOptions = useSelector((state: RootState) => state.categories.categories.data || [])

    const onResetClose = () => {
        setForms({ name: '', description: '', image: null, categoryId: "" })
        setImagePreview(null)
        dispatch(toggleSubCategoriesModal())
    }

    const handleSubmit = async () => {
        const formData = new FormData()
        for (const [key, value] of Object.entries(forms)) {
            formData.append(key, value)
        }
        dispatch(CreateSubCategoriesHandler(formData))
    }

    const { pending, success, error } = useSelector((state: RootState) => state.subcategories.create)

    useEffect(() => { if (success) { onResetClose() } }, [success])

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: isOpen ? 1 : 0 }}
            transition={{ duration: 0.5, ease: "easeInOut", stiffness: 100 }}
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
                    <p className="font-medium text-md">Add Sub Categories</p>
                    <X onClick={() => dispatch(toggleSubCategoriesModal())} strokeWidth={1} className="cursor-pointer" />
                </span>

                <div className="p-4 space-y-4">
                    <label className="space-y-2 block">
                        <p className="font-medium text-gray-800 text-xs">Sub Category Name</p>
                        <Input
                            name="name"
                            value={forms.name}
                            onChange={handleInputChange}
                            placeholder="Enter Sub Category Name"
                        />
                    </label>

                    <label className="space-y-2 block">
                        <p className="font-medium text-gray-800 text-xs">Select Category</p>
                        <div className="flex flex-wrap items-center gap-2">
                            {categoriesOptions.map((item, idx) => (
                                <motion.span
                                    key={item.id}
                                    transition={{ delay: idx * 0.1 }}
                                    animate={{ height: 'auto', opacity: 1 }}
                                    initial={{ height: 0, opacity: 0 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    className="flex items-center gap-1 shadow bg-white rounded-lg overflow-hidden"
                                >
                                    <Tooltip className="z-[500000]" showArrow={false} content={item.name}>
                                        <img
                                            onClick={() => { setForms((p) => ({ ...p, categoryId: item.id })) }}
                                            src={item.image}
                                            crossOrigin="anonymous"
                                            className={`size-12 rounded-lg ${item.id === forms.categoryId ? 'border-[1px] border-[var(--primary-theme-color)]' : ""}`}
                                            alt={item.name}
                                        />
                                    </Tooltip>
                                </motion.span>
                            ))}
                        </div>

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
                            htmlFor="fileUpload2Subcategories"
                            className="bg-[var(--secondary-theme-color)] w-full flex text-gray-400 items-center justify-center space-y-3 flex-col p-4 h-20 text-black border-[1px] rounded-lg border-dashed cursor-pointer"
                        >
                            <Inbox />
                            <p className="font-medium text-[14px]">Upload your image here.</p>
                            <input
                                onChange={handleImageUpload}
                                type="file"
                                className="hidden"
                                id="fileUpload2Subcategories"
                            />
                        </label>
                    </div>

                    {imagePreview && (
                        <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            className="relative"
                        >
                            <div className="relative w-40 h-40 group rounded-lg overflow-hidden">
                                <span onClick={resetImage} className="w-full h-full absolute inset-0 flex items-center justify-center group-hover:bg-black/50">
                                    <Trash2 className="group-hover:text-white" />
                                </span>
                                <img src={imagePreview} alt="Preview" className=" shadow-2xl shadow-gray-50 border object-cover rounded-lg" />
                            </div>
                        </motion.div>
                    )}
                </div>

                <div className="p-4 flex items-center  justify-end gap-2">
                    <motion.button whileTap={{ scale: 1.1 }} onClick={onResetClose} className="bg-[var(--slate-theme-color)] text-black font-medium text-xs px-6 py-2 rounded">Cancel</motion.button>
                    <motion.button onClick={handleSubmit} whileTap={{ scale: 1.1 }} className="bg-[var(--primary-theme-color)] text-white font-medium text-xs px-6 py-2 rounded">Create</motion.button>
                </div>
            </motion.div>
        </motion.div>
    )
}

export default CreateSubCategories
