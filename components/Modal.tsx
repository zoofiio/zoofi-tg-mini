import { cn } from "@/libs/utils"
import { Fragment, ReactNode, useRef } from "react"
import { useClickAway, useToggle } from "react-use"

export type ModalProps = {
    className?: string,
    trigger: ReactNode | ((p: { toggleOpen: (open?: boolean) => void }) => ReactNode),
    triggerClassName?: string,
    outClose?: boolean,
    children: ReactNode | ((p: { toggleOpen: (open?: boolean) => void }) => ReactNode),
    childrenClassName?: string,
    bgImage?: boolean
}
export default function Modal({ className, trigger, triggerClassName, children, childrenClassName, outClose = true, bgImage, }: ModalProps) {
    const [isOpen, toggleOpen] = useToggle(false)
    const ref = useRef<HTMLDivElement>(null)
    useClickAway(ref, () => outClose && toggleOpen(false))
    return <Fragment>
        {typeof trigger == 'function' ? trigger({ toggleOpen }) : <div className={triggerClassName} onClick={() => toggleOpen(true)}>
            {trigger}
        </div>}
        {
            isOpen &&
            <div className={cn("fixed top-0 z-50 left-0 w-full h-full flex flex-col items-center overflow-auto bg-black/80", className)}>
                <div ref={ref} style={{
                    background: bgImage ? 'no-repeat bottom/100% url("/bg_join.svg"),#FFF1A4' : '#FFF1A4'
                }} className={cn("w-[20.625rem] flex flex-col items-center p-5 my-auto rounded-[1.25rem]", childrenClassName)}>
                    {typeof children == 'function' ? children({ toggleOpen }) : children}
                </div>
            </div>
        }
    </Fragment>
}