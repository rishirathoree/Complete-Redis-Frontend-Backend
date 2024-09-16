import { motion } from 'framer-motion';
import React, { useRef } from 'react';
import useOnClickOutsideWithClass from '../../../hooks/useOutsideClick';

interface ModalProps {
    show: string | boolean | number | null,
    close: () => void,
    children: React.ReactNode,
}

const Modal: React.FC<ModalProps> = ({ show, close, children }) => {

    const ref = useRef<HTMLDivElement | null>(null);

    useOnClickOutsideWithClass(ref, close,'modal-open')

    return (
        <motion.div
            className={`w-full h-screen fixed top-0 left-0 bg-black/50 flex items-center justify-center`}
            animate={{
                opacity: show ? 1 : 0,
                visibility: show ? 'visible' : 'hidden',
                transition: { duration: 0.5, type: "spring", }
            }}
            initial={{ opacity: 0,visibility: 'visible' }}
        >
            <motion.div
                className={`bg-white w-2/4 h-2/3 rounded-xl modal-open`}
                ref={ref}
                animate={{
                    y: show ? 0 : 100,
                    opacity: show ? 1 : 0,
                    visibility: show ? 'visible' : 'hidden',
                    transition: { duration: 0.2, type: "spring", stiffness: 100 }
                }}
                initial={{
                    opacity: 0,
                    scale: 0.9,
                    y: 100,
                    visibility: "hidden",
                }}
            >
                {children}
            </motion.div>
        </motion.div>
    )
}

export default Modal