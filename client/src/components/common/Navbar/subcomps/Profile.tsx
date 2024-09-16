import { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import useOnClickOutside from '../../../../hooks/useOutsideClick';
import { LogOut, Store, Settings, HelpCircle, Moon } from 'lucide-react';
import { useAppDispatch } from '../../../../stores/store';
import { resetAuth } from '../../../../stores/slices/auth.slice';

const Profile = () => {

    const [open, setOpen] = useState<boolean>(false);

    const dispatch = useAppDispatch()

    const ref = useRef<HTMLDivElement>(null);

    const closer = () => {
        setOpen(false);
    };

    useOnClickOutside(open, ref, closer,);

    return (
        <div className="relative p-0 m-0" ref={ref}>
            <button onClick={() => setOpen(p => !p)} className="font-semibold text-xs p-0 m-0 align-middle">
                <img
                    src="https://images.unsplash.com/photo-1484863137850-59afcfe05386?q=80&w=2942&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    alt="Profile"
                    className="w-8 h-8 rounded-md object-cover"
                />
            </button>
            <motion.div
                initial={{ opacity: 0, y: 20, display: 'none' }}
                animate={{ y: open ? 0 : 20, opacity: open ? 1 : 0, display: open ? 'block' : 'none', }}
                transition={{ duration: 0.21, type: "spring", }}
                className=" h-min w-60 z-[5000] rounded-lg absolute top-[calc(100%+10px)] shadow-xl shadow-slate-50 border-[0.5px] bg-white right-0"
            >
                <div className=" p-4 flex items-center">
                    <img
                        src="https://images.unsplash.com/photo-1484863137850-59afcfe05386?q=80&w=2942&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                        alt="Profile"
                        className="w-10 h-10 p-0 m-0 rounded-md object-cover"
                    />
                    <div className="ml-3">
                        <p className="text-sm font-semibold">Arlene McCoy</p>
                        <p className="text-xs text-gray-500">info@pixsellz.io</p>
                    </div>
                    <span className="ml-auto text-xs text-yellow-500 bg-yellow-100 px-2 py-1 rounded-full">Pro</span>
                </div>
                <ul className="py-2">
                    <li className=''>
                        <a href="#" className="flex border-t-[1px] items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                            <Store className="mr-2 h-4 w-4 text-gray-600" />
                            <span>Store</span>
                        </a>
                    </li>
                    <li className=''>
                        <a href="#" className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                            <Settings className="mr-2 h-4 w-4 text-gray-600" />
                            <span>Settings</span>
                        </a>
                    </li>
                    <li className=''>
                        <a href="#" className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                            <HelpCircle className="mr-2 h-4 w-4 text-gray-600" />
                            <span>Help Center</span>
                        </a>
                    </li>
                    <li className="flex border-y-[1px] items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                        <Moon className="mr-2 h-4 w-4 text-gray-600" />
                        <span>Dark Mode</span>
                        <label className="ml-auto flex items-center cursor-pointer">
                            <input type="checkbox" className="sr-only peer" />
                            <motion.div
                                className={`w-9 h-5 bg-gray-300 rounded-full before:absolute relative before:left-0 before-top-0 before:bg-[var(--primary-theme-color)] before:size-5 before:rounded-full before:z-50 peer-checked:before:translate-x-4 before:duration-500`}></motion.div>
                        </label>
                    </li>
                    <li className=''>
                        <div onClick={()=>{
                            dispatch(resetAuth())
                        }} className="flex items-center px-4 py-2 text-sm text-red-600 hover:bg-gray-100">
                            <LogOut className="mr-2 h-4 w-4 text-red-600" />
                            <span>Log Out</span>
                        </div>
                    </li>
                </ul>
            </motion.div>
        </div>
    );
};

export default Profile;
