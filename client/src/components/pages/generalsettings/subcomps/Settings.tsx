import { Card, Divider } from '@tremor/react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleClickSound, toggleNotificationSound } from '../../../../stores/slices/applications.slice';
const Settings = () => {

    type selectorProps = {
        apps: {
            clickSound: boolean,
            notificationSound : boolean
        }
    }

    const dispatch = useDispatch();
    const soundSettingStatus = useSelector((state: selectorProps) => state.apps.clickSound);
    const notificationStatus = useSelector((state: selectorProps) => state.apps.notificationSound);

    return (
        <div>
            <Card className="max-w-xl overflow-hidden p-0">
                <div className="border-b border-tremor-border bg-tremor-background-muted px-4 py-3 dark:border-dark-tremor-border dark:bg-dark-tremor-background-muted">
                    <label
                        htmlFor="feature-2"
                        className="text-tremor-default font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong"
                    >
                        Click Sounds
                    </label>
                </div>
                <div className="flex items-start space-x-10 p-4">
                    <p
                        id="feature-2-description"
                        className="text-tremor-default leading-6 text-tremor-content dark:text-dark-tremor-content"
                    >
                        Add a little joy to your clicks! Enable click sounds to make each interaction on your device more delightful. Whether you prefer subtle clicks or a more pronounced sound, it's a simple way to add personality to your experience.{' '}

                    </p>
                    <label className="inline-flex items-center cursor-pointer">
                        <input checked={soundSettingStatus} onChange={() => { dispatch(toggleClickSound()) }} type="checkbox" value="" className="sr-only peer" />
                        <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none  dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-[var(--primary-theme-color)]"></div>
                    </label>
                </div>
            </Card>
            <Divider />
            <Card className="max-w-xl overflow-hidden p-0">
                <div className="border-b border-tremor-border bg-tremor-background-muted px-4 py-3 dark:border-dark-tremor-border dark:bg-dark-tremor-background-muted">
                    <label
                        htmlFor="feature-2"
                        className="text-tremor-default font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong"
                    >
                        Notification Sounds
                    </label>
                </div>
                <div className="flex items-start space-x-10 p-4">
                    <p
                        id="feature-2-description"
                        className="text-tremor-default leading-6 text-tremor-content dark:text-dark-tremor-content"
                    >
                        Stay informed with a touch of sound! Enable notification sounds to ensure you never miss an important alert. Whether it’s a message, update, or reminder, the right sound keeps you in the loop. Customize your experience to suit your needs with this simple toggle.
                    </p>
                    <label className="inline-flex items-center cursor-pointer">
                        <input onChange={()=>{dispatch(toggleNotificationSound())}} checked={notificationStatus} type="checkbox" value="" className="sr-only peer" />
                        <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none  dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-[var(--primary-theme-color)]"></div>
                    </label>
                </div>
            </Card>
            <Divider />
        </div>
    )
}

export default Settings;
