import { useSelector } from "react-redux"
import { RootState, useAppDispatch } from "../../../stores/store"
import { motion } from 'framer-motion'
import { useRef } from "react"
import useOnClickOutside from "../../../hooks/useOutsideClick"
import { togglePatientModal } from "../../../stores/slices/modal.slice"

const CreatePatientModal = () => {

    const dispatch = useAppDispatch()
    const isOpen = useSelector((state: RootState) => state.modal.patientModal)
    const ref = useRef(null)
    useOnClickOutside(isOpen, ref, () => { dispatch(togglePatientModal()) })

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: isOpen ? 1 : 0 }} transition={{ duration: 0.5, ease: "easeInOut" }} exit={{ opacity: 0 }} className={`h-screen w-full overflow-auto flex items-center justify-center absolute top-0 left-0 bg-black/50 z-[1000] ${isOpen ? 'visible' : 'hidden'}`}>
            <motion.div ref={ref} initial={{ opacity: 0, y: 40 }} animate={{ y: isOpen ? 0 : 40, opacity: isOpen ? 1 : 0 }} exit={{ opacity: 0, y: 40 }} transition={{ duration: 0.5, ease: "easeInOut" }} className="h-5/6 w-2/4 bg-white">

            </motion.div>
        </motion.div>
    )
}

export default CreatePatientModal
