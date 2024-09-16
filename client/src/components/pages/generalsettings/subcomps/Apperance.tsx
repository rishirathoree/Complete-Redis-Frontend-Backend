import { Button, Divider } from '@tremor/react';
import { useDispatch, useSelector } from 'react-redux';
import { setBrandColorHelper } from '../../../../stores/slices/applications.slice';

type settingProps = {
    apps: {
        themeColor: string
    }
}

export default function AppearanceSettings() {

    const dispatch = useDispatch()

    const colors = [
        { color: '#8ecae6', name: 'skyblue' },
        { color: '#FF5555', name: 'red' },
        { color: '#ffb703', name: 'orange' },
        { color: '#34c38f', name: 'green' },
        { color: '#588157', name: 'green' },
        { color: '#f5ebe0', name: 'skin' },
    ]

    const { themeColor } = useSelector((state: settingProps) => state.apps);

    return (
        <div className="">

            {/* Choose colors */}
            <div className='flex py-4 items-center justify-between'>
                <div>
                    <h5 className='font-semibold text-sm'>Brand Color</h5>
                    <h5 className='font-medium text-gray-600 text-sm'>Select or customize your brand color</h5>
                </div>
                <div>
                    <div className='flex items-center gap-2'>
                        {colors.map((item, idx) => {
                            return (
                                <>
                                    <div key={idx} className={`size-8 rounded-full ${themeColor === item.color ? 'ring-4 ring-blue-50' : ""}`} onClick={()=>{dispatch(setBrandColorHelper(item.color))}} style={{ backgroundColor: item.color }}></div>
                                </>
                            )
                        })}
                    </div>
                </div>
                <p></p>
            </div>
            
            <Divider />

        </div>
    );
}
