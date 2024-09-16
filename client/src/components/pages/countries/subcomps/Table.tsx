import { motion } from 'framer-motion';
import Checkbox from '../../../common/Checkbox/Checkbox';
import { addCompaniesSelector } from '../../../../stores/slices/companies.slice';
import { useDispatch, useSelector } from 'react-redux';

interface TableProps {
    list: {
        data: {
            id:string,
            logo: string;
            name: string;
            email: string;
            phone: string;
            state: { name: string };
            country: { name: string };
        }[];
    };
    filters: {
        order: 'asc' | 'desc';
    };
}

interface rowSelectorProp {
    companies: { selected: string[] },
}

const Table = ({ list }: TableProps) => {
    const dispatch = useDispatch()
    const selectedItemsRow = useSelector((state : rowSelectorProp) => state.companies.selected)

    const { data } = list;

    return (
        <div className='space-y-4'>
            <div className="flex flex-col">
                <div className="-m-1.5 overflow-x-auto">
                    <div className="p-1.5 min-w-full inline-block align-middle">
                        <div className="rounded-lg overflow-hidden dark:border-neutral-700">
                            <table className="table-fixed min-w-full divide-y divide-gray-200">
                                <thead>
                                    <tr className='border-y divide-x'>
                                        <th className="px-6 py-3 w-1/4 text-start text-xs font-medium text-gray-500 uppercase"> 
                                            <span className='flex items-center gap-2'>
                                            <Checkbox disabled={true} />
                                                <p>Name</p>
                                            </span>
                                        </th>
                                    </tr>
                                </thead>
                                <motion.tbody className="divide-y divide-gray-200">
                                    {data && data.map((item, idx) => (
                                        <motion.tr key={item.id} className={`
                                        divide-x
                                        ${selectedItemsRow.includes(item.id) ? 'bg-slate-100/20 animate-pulse' : ""}
                                        `}>
                                            <motion.td className="px-6 py-2 w-1/4 whitespace-nowrap text-sm font-medium text-gray-800">
                                                <div className="flex items-center gap-2">
                                                    <Checkbox
                                                    onChange={()=>{
                                                        dispatch(addCompaniesSelector(item.id))
                                                    }}
                                                    id={item.id} />
                                                    <label htmlFor={item.id} className="flex items-center">
                                                        <p>{item.name}</p>
                                                    </label>
                                                </div>
                                            </motion.td>
                                        </motion.tr>
                                    ))}
                                </motion.tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Table;
