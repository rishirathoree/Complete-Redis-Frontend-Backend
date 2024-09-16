import { RiAppsLine, RiProfileLine, RiSettings2Line } from '@remixicon/react'
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@tremor/react'
import Settings from './subcomps/Settings'
import { SunMoon } from 'lucide-react'
import AppearanceSettings from './subcomps/Apperance'

const Generalsetting = () => {
    return (
        <div className='p-4 space-y-4'>

            <span className='space-y-2'>
                <h3 className="text-tremor-title font-bold text-tremor-content-strong dark:text-dark-tremor-content-strong">
                    General
                </h3>
                <p className=" text-tremor-default leading-6 text-tremor-content dark:text-dark-tremor-content">
                    Manage your personal details, workspace governance and notifications.
                </p>
            </span>

            <TabGroup className='space-y-4'>
                <TabList className='!bg-none !bg-[var(--slates)] shadow-sm shadow-slate-100 border-[1px] p-1' variant="solid">
                    <Tab strokeWidth={0.5} icon={RiAppsLine} className='data-[headlessui-state~="selected"]:!text-[var(--primary-theme-color)]' value="1">Applications Settings</Tab>
                    <Tab strokeWidth={0.5} icon={SunMoon} className='data-[headlessui-state~="selected"]:!text-[var(--primary-theme-color)]' value="3">Apperance</Tab>
                </TabList>
                <TabPanels className='block'>
                    <TabPanel ><Settings /></TabPanel>
                    <TabPanel ><AppearanceSettings /></TabPanel>
                </TabPanels>
            </TabGroup>
        </div>
    )
}

export default Generalsetting