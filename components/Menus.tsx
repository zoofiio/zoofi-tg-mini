import { cn } from '@/libs/utils';
import { IconType } from "react-icons";
import { IoDocumentTextOutline, IoHome, IoPersonAddOutline, IoPodiumOutline, IoWalletOutline } from 'react-icons/io5';
import { create } from 'zustand';
import { useShallow } from 'zustand/shallow';

export type MenuType = {
    icon: IconType,
    txt: string,
    disable?: boolean,
}
const menus: MenuType[] = [
    {
        icon: IoHome,
        txt: 'Home',
    },
    {
        icon: IoPersonAddOutline,
        txt: 'Partners',
        disable: true
    },
    {
        icon: IoDocumentTextOutline,
        txt: 'About LNT',
    },
    {
        icon: IoWalletOutline,
        txt: 'Earn',
    },
    {
        icon: IoPodiumOutline,
        txt: 'Leaders',
        disable: true
    },
]

export type MenusStore = {
    current: MenuType,
    isClickedGo: boolean
}
export const useMenusStore = create<MenusStore>(() => ({
    current: menus[0],
    isClickedGo: false,
}))

export function Menus() {
    const current = useMenusStore(useShallow((s) => s.current))
    return <div className="flex items-center gap-2.5 w-full justify-between">
        {
            menus.map(m =>
                <div
                    onClick={() => m !== current && !m.disable && useMenusStore.setState({ current: m })}
                    className={cn("rounded-lg w-[3.75rem] h-[3.25rem] flex flex-col items-center justify-center gap-1 bg-white/95 text-black/50 cursor-pointer", { 'text-primary': m == current, 'cursor-not-allowed opacity-80': m.disable, })}>
                    <m.icon className="text-base" />
                    <div className='text-[.625rem] font-medium whitespace-nowrap'>{m.txt}</div>
                </div>)
        }
    </div>
}