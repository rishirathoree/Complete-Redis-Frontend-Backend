import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ChevronDown, ChartNoAxesColumn, PackagePlus, MessageCircleQuestion, Package, Dog, Cat, PackageSearch, TicketSlash, Package2, ShieldAlertIcon, Building, GitCommitVerticalIcon, } from 'lucide-react';
import { useSelector } from 'react-redux';
import logo from '../../../assets/logos.png'
import { motion } from 'framer-motion'
import { FoldHorizontal } from 'lucide-react'
import { sidebarCloser } from '../../../stores/slices/applications.slice';
import { RootState, useAppDispatch } from '../../../stores/store';

const Sidebar = () => {

    const dispatch = useAppDispatch();
    const permissions = useSelector((state: RootState) => state.auth.login?.data?.permissions)
    const roles = useSelector((state: RootState) => state.auth.login?.data?.roles)
    const isSidebarCollapsed = useSelector((state: RootState) => state.apps.sidebarCollapsed);

    const menuData = [
        {
            title: "Dashboard",
            block: "block-1",
            menus: [
                {
                    title: "Main Dashboard",
                    icon: ChartNoAxesColumn,
                    link: "/",
                    permissions: ["CATEGORIES", 'ALL'],
                    roles: ["SUBADMIN",]
                },
            ]
        },
        {
            title: "Pets Management",
            block: "block-2",
            menus: [
                {
                    title: "Pets",
                    icon: Cat,
                    link: "/pets",
                    permissions: ["PETS"],
                    roles: ["ADMIN"]
                },
                {
                    title: "Breeds",
                    icon: Dog,
                    link: "/breeds",
                    permissions: ["BREEDS"],
                    roles: ["ADMIN"]
                },
            ]
        },
        {
            title: "Category Management",
            block: "block-2",
            menus: [
                {
                    title: "Categories",
                    icon: PackagePlus,
                    link: "/categories",
                    permissions: ["CATEGORIES"],
                    roles: ["ADMIN"]
                },
                {
                    title: "Subcategories",
                    icon: PackageSearch,
                    link: "/subcategories",
                    permissions: ["SUBCATEGORIES"],
                    roles: ["ADMIN"]
                },
                {
                    title: "Brands",
                    icon: TicketSlash,
                    link: "/brands",
                    permissions: ["BRANDS"],
                    roles: ["ADMIN"]
                },
                {
                    title: "Products",
                    icon: Package2,
                    link: "/products",
                    permissions: ["PRODUCTS"],
                    roles: ["ADMIN"]
                },
            ]
        },
        {
            title: "Customer Supports",
            block: "block-3",
            menus: [
                {
                    title: "Queries",
                    icon: MessageCircleQuestion,
                    link: "/queries",
                    permissions: ["QUERIES"],
                    roles: ["ADMIN"],
                    subMenus: [
                        { title: "All Queries", link: '/queries', icon: GitCommitVerticalIcon, permissions: ['CATEGORIES'], roles: ["ADMIN"] },
                        { title: "Products Returns", link: '/queriess', icon: GitCommitVerticalIcon, permissions: ['CATEGORIES'], roles: ["ADMIN"] },
                        { title: "Products Information", link: '/queriesss', icon: GitCommitVerticalIcon, permissions: ['CATEGORIES'], roles: ["ADMIN"] },
                    ],
                },
            ]
        },
        {
            title: "Billings",
            block: "block-3",
            menus: [
                {
                    title: "Orders",
                    icon: Package,
                    link: "/orders",
                    permissions: ["ORDERS"],
                    roles: ["ADMIN"],
                },
            ]
        },
        {
            title: "Team Management",
            block: "block-3",
            menus: [
                {
                    title: "Managements",
                    icon: ShieldAlertIcon,
                    link: "/management",
                    permissions: ["OWNERS"],
                    roles: ["ADMIN"]
                },
            ]
        },
        // {
        //     title: "Billing & Finance",
        //     block: "block-4",
        //     menus: [
        //         {
        //             title: "Invoices",
        //             icon: Receipt,
        //             link: "/invoices",
        //             permissions: ["admin", "finance"],
        //             roles: ["ADMIN", "FINANCE_MANAGER"],
        //         },
        //         {
        //             title: "Payments",
        //             icon: CreditCard,
        //             link: "/payments",
        //             permissions: ["admin", "finance"],
        //             roles: ["ADMIN", "FINANCE_MANAGER"],
        //         },
        //         {
        //             title: "Insurance Claims",
        //             icon: ShieldCheck,
        //             link: "/insurance-claims",
        //             permissions: ["admin", "finance"],
        //             roles: ["ADMIN", "FINANCE_MANAGER"],
        //         },
        //     ]
        // },
        // {
        //     title: "Settings & Administration",
        //     block: "block-5",
        //     menus: [
        //         {
        //             title: "Hospital Settings",
        //             icon: Cog,
        //             link: "/settings",
        //             permissions: ["ADMIN"],
        //             roles: ["ADMIN"],
        //             subMenus: [
        //                 { title: "Departments", link: '/departments', icon: Building, permissions: ['ALL'], roles: ["ADMIN"] },
        //                 { title: "Rooms", link: '/rooms', icon: Bed, permissions: ['ALL'], roles: ["ADMIN"] },
        //                 { title: "Wards", link: '/wards', icon: HospitalIcon, permissions: ['ALL'], roles: ["ADMIN"] },
        //             ],
        //         },
        //         {
        //             title: "User Management",
        //             icon: CogIcon,
        //             link: "/user-management",
        //             permissions: ["admin"],
        //             roles: ["ADMIN"],
        //         },
        //     ]
        // },
    ];

    const filteredMenuData = menuData.map(block => ({
        ...block,
        menus: block.menus
            .map(menu => ({
                ...menu,
                subMenus: menu.subMenus?.filter(subMenu =>
                    (subMenu.permissions?.some(permission => permissions.includes(permission)) || permissions?.includes('all')) &&
                    subMenu.roles?.some(role => roles.includes(role))
                )
            }))
            .filter(menu =>
                (menu.permissions?.some(permission => permissions?.includes(permission)) || menu.roles?.some(role => roles?.includes(role))) &&
                (!menu.subMenus || menu.subMenus.length > 0)
            )
    })).filter(block => block.menus.length > 0);

    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        document.addEventListener('keydown', handleKeyDown);
        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, []);

    const handleKeyDown = (event: any) => {
        const isMac = navigator.platform.toUpperCase().indexOf('MAC') >= 0;
        const isMetaOrCtrl = isMac ? event.metaKey : event.ctrlKey;

        if (isMetaOrCtrl && event.shiftKey && event.key === 's') {
            // dispatch(collapseSidebar());
        }
    };

    const [activeDropdown, setActiveDropDown] = useState<string | null>(null);

    useEffect(() => {
        const foundMenu = filteredMenuData.find((block,) =>
            block.menus.some((menu,) =>
                menu.subMenus
                    ? menu.subMenus.some((subMenu) =>
                        location.pathname.endsWith(subMenu.link)
                    )
                    : false
            )
        );
        if (foundMenu) {
            const blockIdx = filteredMenuData.indexOf(foundMenu);
            const foundMenuIdx = foundMenu.menus.findIndex((menu) =>
                menu.subMenus
                    ? menu.subMenus.some((subMenu) =>
                        location.pathname.endsWith(subMenu.link)
                    )
                    : false
            );
            setActiveDropDown(`${blockIdx}-${foundMenuIdx}`);
        } else {
            setActiveDropDown(null);
        }
    }, [location.pathname]);

    const handleMenuClick = (mainIdx: any, menuIdx: any, link: any) => {
        if (!filteredMenuData[mainIdx].menus[menuIdx].subMenus) {
            navigate(link);
        }
        setActiveDropDown(activeDropdown === `${mainIdx}-${menuIdx}` ? null : `${mainIdx}-${menuIdx}`);
    };

    const handleSubmenuClick = (mainIdx: any, menuIdx: any, link: any) => {
        navigate(link);
        setActiveDropDown(`${mainIdx}-${menuIdx}`);
    };

    useEffect(() => {
        const handleSidebarOpen = (e: KeyboardEvent) => {
            if (e.key === `]`) {
                dispatch(sidebarCloser())
            }
        }
        document.addEventListener('keydown', handleSidebarOpen);
        return () => {
            document.removeEventListener('keydown', handleSidebarOpen);
        }
    }, [])

    return (
        <>
            <motion.div
                animate={{
                    opacity: isSidebarCollapsed ? 0 : 1,
                    width: isSidebarCollapsed ? 0 : "",
                    visibility: isSidebarCollapsed ? "hidden" : "visible",
                    transition: {
                        type: "spring",
                        duration: 0.3
                    }
                }}
                className={`overflow-auto noscrollbar h-screen w-1/6 flex flex-col border-r-[1px] border-black/5 justify-between duration-200 bg-[var(--slates)]
            `}
            >
                <div>
                    <span className='inline-flex sticky top-0 left-0 w-full cursor-pointer justify-between flex items-center px-4 py-4 gap-2'>
                        <motion.div whileTap={{ scale: 1.2 }} animate={{ transition: { type: "spring" } }}>
                            <img src={logo} className='h-5 object-cover' alt="" />
                        </motion.div>
                        <FoldHorizontal
                            onClick={() => { dispatch(sidebarCloser()) }}
                            strokeWidth={1.2} size={15} />
                    </span>

                    <ul className='py-2 space-y-4'>
                        {filteredMenuData.map((item, mainIdx) => (
                            <li key={item.title + mainIdx} className='space-y-2'>
                                <p className='text-[9px] px-4 uppercase tracking-[0.1px] text-gray-500 font-medium select-none'>{item.title}</p>
                                <div>
                                    <ul>
                                        {item.menus.map((menu, menuIdx) => {
                                            return (
                                                <li key={mainIdx + menu.title}>
                                                    <div>
                                                        <span
                                                            onClick={() => handleMenuClick(mainIdx, menuIdx, menu.link)}
                                                            className={`
                                                        flex justify-between items-center py-2 cursor-pointer px-4 relative before:duration-100 duration-100 before:left-0 before:w-[4px] before:h-full before:rounded-r-lg before:absolute before:bg-[var(--primary-theme-color)]
                                                        ${activeDropdown === `${mainIdx}-${menuIdx}` || location.pathname.endsWith(menu.link) ? 'active-scroll before:opacity-100 bg-[var(--secondary-theme-color)] text-darkgreen' : 'text-gray-700/60 before:opacity-0'}
                                                        `}
                                                        >
                                                            <span className='flex items-center gap-2'>
                                                                <menu.icon strokeWidth={0.9} size={20} />
                                                                <p className='text-[12px] font-normal'>{menu.title}</p>
                                                            </span>
                                                            {menu.subMenus && menu.subMenus.length > 0 &&
                                                                <ChevronDown className={`duration-500 ${activeDropdown === `${mainIdx}-${menuIdx}` ? 'rotate-180' : ''} `} strokeWidth={1} size={20} weight='bold'
                                                                />}
                                                        </span>
                                                        <motion.div
                                                            initial={{
                                                                opacity: 0,
                                                                height: 0,
                                                            }}
                                                            animate={{
                                                                opacity: 1,
                                                                height: activeDropdown === `${mainIdx}-${menuIdx}` ? 'auto' : 0,
                                                            }}
                                                            transition={{
                                                                duration: 0.4,
                                                                stiffness: 130,
                                                                type: 'spring',
                                                            }}
                                                            className={`overflow-hidden 
                                                        `}>
                                                            {menu.subMenus && menu.subMenus.map((subMenu: any, subIdx: number) => {
                                                                return (
                                                                    <div key={subMenu.title + subIdx}
                                                                        onClick={() => handleSubmenuClick(mainIdx, menuIdx, subMenu.link)}
                                                                        className={` cursor-pointer py-1
                                                            ${location.pathname.endsWith(subMenu.link) ? "active-scroll text-darkgreen bg-[var(--secondary-theme-color)]" : "text-gray-600/80"}
                                                            `}>
                                                                        <span className='block flex items-center ml-6 gap-1 mt-1' >
                                                                            {subMenu.icon && <subMenu.icon strokeWidth={0.9} size={20} />}
                                                                            <p className=' p-1 text-[12px] font-normal'>{subMenu.title}</p>
                                                                        </span>
                                                                    </div>
                                                                )
                                                            })}
                                                        </motion.div>
                                                    </div>
                                                </li>
                                            )
                                        })}
                                    </ul>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </motion.div>
        </>
    )
}

export default Sidebar