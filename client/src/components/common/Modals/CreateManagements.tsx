import { useSelector } from "react-redux"
import { RootState, useAppDispatch } from "../../../stores/store"
import { motion } from 'framer-motion'
import { useEffect, useRef, useState } from "react"
import useOnClickOutside from "../../../hooks/useOutsideClick"
import { toggleManagementModal } from "../../../stores/slices/modal.slice"
import { X } from "lucide-react"
import { Input } from "../TextInputs/TextInput"
import { TOP_PERMISSSIONS, TOP_ROLES } from "../../../configs/constant.config"
import { CreateManagement } from "../../../stores/slices/management.slice"

const CreateManagements = () => {

    const dispatch = useAppDispatch()
    const isOpen = useSelector((state: RootState) => state.modal.managementModal)
    const ref = useRef(null)

    useOnClickOutside(isOpen, ref, () => {
        if (isOpen) dispatch(onResetClose())
    })

    const [forms, setForms] = useState({
        username: "",
        firstName: "",
        lastName: "",
        password: "",
        email: "",
        phoneNumber: "",
        roles: "",
        permissions: []
    })

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target
        setForms(prev => ({ ...prev, [name]: value }))
    }

    const onResetClose = () => {
        setForms({
            username: "",
            firstName: "",
            lastName: "",
            password: "",
            email: "",
            phoneNumber: "",
            roles: "",
            permissions: []
        })
        dispatch(toggleManagementModal())
    }

    const handleSubmit = async () => {
        const formData = new FormData()
        for (const [key, value] of Object.entries(forms)) {
            if(Array.isArray(value)) {
                value.forEach((id) => {
                    formData.append(`${key}[]`, id);
                });
            }
            else{
                formData.append(key, value)
            }
        }
        dispatch(CreateManagement(formData))
    }

    const { pending, success, error } = useSelector((state: RootState) => state.management.create)

    useEffect(() => { if (success) { onResetClose() } }, [success])

        console.log(forms)

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
                    <p className="font-medium text-md">Add Managements</p>
                    <X onClick={() => dispatch(toggleManagementModal())} strokeWidth={1} className="cursor-pointer" />
                </span>

                <div className="p-4 grid grid-cols-2 gap-4">
                    <label className="block space-y-2">
                        <p className="font-medium text-gray-800 text-xs">First Name</p>
                        <Input
                            name="firstName"
                            value={forms.firstName}
                            onChange={handleInputChange}
                            placeholder="Enter first name"
                        />
                    </label>


                    <label className="block space-y-2">
                        <p className="font-medium text-gray-800 text-xs">Last Name</p>
                        <Input
                            name="lastName"
                            value={forms.lastName}
                            onChange={handleInputChange}
                            placeholder="Enter last name"
                        />
                    </label>

                    <label className="block space-y-2">
                        <p className="font-medium text-gray-800 text-xs">Username</p>
                        <Input
                            name="username"
                            value={forms.username}
                            onChange={handleInputChange}
                            placeholder="Enter username"
                        />
                    </label>

                    <label className="block space-y-2">
                        <p className="font-medium text-gray-800 text-xs">Email</p>
                        <Input
                            name="email"
                            type="email"
                            value={forms.email}
                            onChange={handleInputChange}
                            placeholder="Enter email"
                        />
                    </label>

                    <label className="block space-y-2">
                        <p className="font-medium text-gray-800 text-xs">Password</p>
                        <Input
                            name="password"
                            type="password"
                            value={forms.password}
                            onChange={handleInputChange}
                            placeholder="Enter password"
                        />
                    </label>

                    <label className="block space-y-2">
                        <p className="font-medium text-gray-800 text-xs">Phone Number</p>
                        <Input
                            name="phoneNumber"
                            value={forms.phoneNumber}
                            onChange={handleInputChange}
                            placeholder="Enter phone number"
                        />
                    </label>
                    
                    <div className="space-y-3 col-span-2">
                    <p className="font-medium text-gray-800 text-xs">Select Role</p>
                    <div className="col-span-2 gap-2 flex flex-wrap">
                        {TOP_PERMISSSIONS.map((item, idx) => {
                            return (
                                <span
                                onClick={()=>{
                                    if(forms.permissions.includes(item)){
                                        setForms((p)=>({
                                            ...p,
                                            permissions: forms.permissions.filter(permission => permission !== item)
                                        }))
                                    }else{
                                        setForms((p)=>({
                                           ...p,
                                            permissions: [...forms.permissions, item]
                                        }))
                                    }
                                }}
                                key={idx} className={`text-xs ring-[1px] ring-black/5 px-2 py-1 cursor-pointer rounded-lg ${forms.permissions.includes(item) ? 'bg-[var(--primary-theme-color)] text-white' : ""}`}>
                                    {item}
                                </span>
                            )
                        })}
                        </div>
                    </div>

                <div className="space-y-3 col-span-2">
                    <p className="font-medium text-gray-800 text-xs">Select Role</p>
                    <div className="col-span-2 gap-2 flex flex-wrap">
                        {TOP_ROLES.map((item, idx) => {
                            return (
                                <span
                                onClick={() => {
                                    setForms((p)=>({
                                        ...p,
                                        roles: item
                                    }))
                                }}
                                key={idx} className={`text-xs ring-[1px] ring-black/5 px-2 py-1 cursor-pointer rounded-lg ${forms.roles === item ? 'bg-[var(--primary-theme-color)] text-white' : ""}`}>
                                    {item}
                                </span>
                            )
                        })}
                        </div>
                    </div>
                    </div>

                <div className="p-4 flex items-center  justify-end gap-2">
                    <motion.button whileTap={{ scale: 1.1 }} onClick={onResetClose} className="bg-[var(--slate-theme-color)] text-black font-medium text-xs px-6 py-2 rounded">Cancel</motion.button>
                    <motion.button onClick={handleSubmit} whileTap={{ scale: 1.1 }} className="bg-[var(--primary-theme-color)] text-white font-medium text-xs px-6 py-2 rounded">Create</motion.button>
                </div>
            </motion.div>
        </motion.div>
    )
}

export default CreateManagements
