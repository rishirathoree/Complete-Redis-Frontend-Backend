import { motion } from 'framer-motion';
import { Dog, ToggleLeft } from 'lucide-react';
import Badges from '../../../common/Badges/Badges';
import { Tooltip } from '../../../common/Tooltips/Tooltips';

interface TableProps {
    list: {
        data: {
            id: string,
            image: string;
            blocked: boolean;
            name: string;
            breeds: {
                name: string;
                image: string
            }
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
                                        <th className="px-6 py-3 w-1/6 text-start text-xs font-medium text-gray-500 uppercase">
                                            <p>Image</p>
                                        </th>
                                        <th className="px-6 py-3 w-1/6 text-start text-xs font-medium text-gray-500 uppercase">
                                            <span className='flex items-center gap-2'>
                                                <Dog size={14} />
                                                <p>Name</p>
                                            </span>
                                        </th>
                                        <th className="px-6 py-3 w-1/6 text-start text-xs font-medium text-gray-500 uppercase">
                                            <span className='flex items-center gap-2'>
                                                <p>Brand Details</p>
                                            </span>
                                        </th>
                                        <th className="px-6 py-3 w-1/6 text-start text-xs font-medium text-gray-500 uppercase">
                                            <span className='flex items-center gap-2'>
                                                <p>Total Products Available</p>
                                            </span>
                                        </th>
                                        <th className="px-6 py-3 w-1/6 text-start text-xs font-medium text-gray-500 uppercase">
                                            <span className='flex items-center gap-2'>
                                                <ToggleLeft size={14} />
                                                <p>Status</p>
                                            </span>
                                        </th>
                                    </tr>
                                </thead>
                                <motion.tbody className="divide-y divide-gray-200">
                                    {data && data.map((item) => {
                                        return (
                                            <motion.tr key={item.id} className={`divide-x`}>
                                                <motion.td className="px-6 py-2 w-1/6 text-sm font-medium text-gray-800">
                                                    <Tooltip side='bottom' showArrow={0} className='text-[10px]' content={item.name}>
                                                        <img src={item.image} className='object-cover shadow size-8 rounded-md' crossOrigin='anonymous' alt="" />
                                                    </Tooltip>
                                                </motion.td>
                                                <motion.td className="px-6 py-2 w-1/6 text-sm font-medium text-gray-800">
                                                    <div className="flex items-center gap-2">
                                                        <p className='lowercase first-letter:uppercase'>{item.name}</p>
                                                    </div>
                                                </motion.td>
                                                <motion.td className="px-6 py-2 w-1/6 text-sm font-medium text-gray-800">
                                                    <div className="flex items-center gap-2">
                                                        <Tooltip content={item.description} showArrow={0} className='text-[10px]' side='bottom'>
                                                        <p className="line-clamp-1 p-0 m-0 text-left"> {item.description}</p>
                                                        </Tooltip>
                                                    </div>
                                                </motion.td>
                                                <motion.td className="px-6 py-2 w-1/6 text-sm font-medium text-gray-800">
                                                    <div className="flex items-center gap-2">
                                                        <p className="line-clamp-1 p-0 m-0 text-left"> {item.totalProducts}</p>
                                                    </div>
                                                </motion.td>
                                                <motion.td className="px-6 py-2 w-1/6 text-sm font-medium text-gray-800">
                                                    <div className="flex items-center gap-2">
                                                        <Tooltip
                                                            showArrow={false}
                                                            className='text-[10px]'
                                                            side='top'
                                                            content={item.blocked ? 'Currently, brands are not visible to shop' : 'Currently, brands are visible to shop'}
                                                        >
                                                            <Badges
                                                                type={item.blocked ? 'red' : 'green'}
                                                                content={item.blocked ? 'Blocked' : 'Not Blocked'}
                                                            />
                                                        </Tooltip>
                                                    </div>
                                                </motion.td>
                                            </motion.tr>
                                        )
                                    })}
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
