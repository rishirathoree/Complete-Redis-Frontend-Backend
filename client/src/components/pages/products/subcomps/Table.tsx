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
                                        <th className="px-6 py-3 w-1/12 text-start text-xs font-medium text-gray-500 uppercase">
                                            <p>Image</p>
                                        </th>
                                        <th className="px-6 py-3 w-1/12 text-start text-xs font-medium text-gray-500 uppercase">
                                            <span className='flex items-center gap-2'>
                                                <Dog size={14} />
                                                <p className="line-clamp-1 capitalize">Title</p>
                                            </span>
                                        </th>
                                        <th className="px-6 py-3 w-1/12 text-start text-xs font-medium text-gray-500 uppercase">
                                            <span className='flex items-center gap-2'>
                                                <p className="line-clamp-1 capitalize">Descriptions</p>
                                            </span>
                                        </th>
                                        <th className="px-6 py-3 w-1/12 text-start text-xs font-medium text-gray-500 uppercase">
                                            <span className='flex items-center gap-2'>
                                                <Dog size={14} />
                                                <p className="line-clamp-1 capitalize">Variants</p>
                                            </span>
                                        </th>
                                        <th className="px-6 py-3 w-1/12 text-start text-xs font-medium text-gray-500 uppercase">
                                            <span className='flex items-center gap-2'>
                                                <ToggleLeft size={14} />
                                                <p className="line-clamp-1 capitalize">Status</p>
                                            </span>
                                        </th>
                                    </tr>
                                </thead>
                                <motion.tbody className="divide-y divide-gray-200">
                                    {data && data.map((item) => {
                                        return (
                                            <motion.tr key={item.id} className={`divide-x`}>
                                                <motion.td className="px-6 py-2 w-1/12 text-sm font-medium text-gray-800  ">
                                                    <div className='flex items-center -space-x-2'>
                                                        {item.productimages.map((image, index) => {
                                                            return (
                                                                <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: index * 0.1, duration: 1, stiffness: 100 }}>
                                                                    <img src={image.link} style={{ zIndex: (item.productimages.length * 2) - index }} className='border-[1px] object-cover size-8 rounded-md' crossOrigin='anonymous' alt="" />
                                                                </motion.span>
                                                            )
                                                        })}
                                                    </div>
                                                </motion.td>
                                                <motion.td className="px-6 py-2 w-1/12 text-sm font-medium text-gray-800">
                                                    <div className="flex items-center gap-2">
                                                        <p className='capitalize text-left	 line-clamp-1'>{item.title}</p>
                                                    </div>
                                                </motion.td>
                                                <motion.td className="px-6 py-2 w-1/12 text-sm font-medium text-gray-800">
                                                    <div className="flex items-center gap-2">
                                                        <Tooltip content={item.description} showArrow={true} className='text-[10px]' side='bottom'>
                                                            <p className="line-clamp-1 p-0 m-0 capitalize text-left"> {item.description}</p>
                                                        </Tooltip>
                                                    </div>
                                                </motion.td>
                                                <motion.td className="px-6 py-2 w-1/12 text-sm font-medium text-gray-800">
                                                    <div className="flex items-center gap-2">
                                                        <p className='capitalize text-left	 line-clamp-1'>{item.productoptions.length} Options</p>
                                                    </div>
                                                </motion.td>
                                                <motion.td className="px-6 py-2 w-1/12 text-sm font-medium text-gray-800">
                                                    <div className="flex items-center gap-2">
                                                        <Tooltip
                                                            showArrow={false}
                                                            className='text-[10px]'
                                                            side='top'
                                                            content={item.blocked ? 'Currently, products are not visible to shop' : 'Currently, products are visible to shop'}
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
