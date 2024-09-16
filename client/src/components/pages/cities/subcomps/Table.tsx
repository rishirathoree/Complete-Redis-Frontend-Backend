import { motion } from 'framer-motion';
import { Globe, Globe2, Link } from 'lucide-react';

interface TableProps {
    list: {
        data: {
            platform: string;
            link: string;
            id: string;
        }[];
    };
    filters: {
        order: 'asc' | 'desc';
    };
}


const Table = ({ list }: TableProps) => {

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
                                            <p>Name</p>
                                        </th>
                                        <th className="px-6 py-3 w-1/4 text-start text-xs font-medium text-gray-500 uppercase">
                                            <span className='flex items-center gap-2'>
                                                <Globe2 size={18} absoluteStrokeWidth strokeWidth={1} />
                                                <p>State</p>
                                            </span>
                                        </th>
                                        <th className="px-6 py-3 w-1/4 text-start text-xs font-medium text-gray-500 uppercase">
                                            <span className='flex items-center gap-2'>
                                                <Globe2 size={18} absoluteStrokeWidth strokeWidth={1} />
                                                <p>Country</p>
                                            </span>
                                        </th>
                                    </tr>
                                </thead>
                                <motion.tbody className="divide-y divide-gray-200">
                                    {data && data.map((item) => (
                                        <motion.tr key={item.id} className={`
                                        divide-x
                                        `}>
                                            <motion.td className="px-6 py-2 w-1/4 whitespace-nowrap text-sm font-medium first-letter:uppercase text-gray-800">
                                                {item.name}
                                            </motion.td>
                                            <motion.td className="px-6 py-2 w-1/4 whitespace-nowrap text-sm font-light text-gray-800">
                                                {item.state.name}
                                            </motion.td>
                                            <motion.td className="px-6 py-2 w-1/4 whitespace-nowrap text-sm font-light text-gray-800">
                                                {item.country.name}
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
