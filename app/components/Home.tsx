'use client'

import { Logo } from "@/app/components/imgs/logo";
import { ArrowRightTop, Telegram, TwitterX } from "@/app/components/imgs/social";
import { Fragment, useRef } from "react";
import { useClickAway, useMountedState, useToggle } from "react-use";

function FrameLanuch() {
    const litghtText = (text: string) => {
        return <span className="text-[#2BBD34]">{text}</span>
    }
    const [isOpenJoin, toggleOpenJoin] = useToggle(false)
    const ref = useRef<HTMLDivElement>(null)
    useClickAway(ref, () => toggleOpenJoin(false))
    return <div className="w-full h-full relative overflow-hidden">
        <img src={'/bg_t.svg'} alt="top bg" className="w-full absolute top-0 left-0" />
        <div className="flex flex-col w-full gap-2.5 absolute top-[8.125rem] items-center">
            <Logo className="text-[4rem]" />
            <div className="font-semibold text-center">{litghtText('L')}iquid {litghtText('N')}ode {litghtText('T')}oken</div>
            <img src={'/time.svg'} alt="time" className="w-full -mt-8" />
        </div>
        <img src={'/bg_rb.svg'} alt="bg right bottom" className="w-[12.1875rem] absolute bottom-0 right-0" />
        <img src={'/bg_lb.svg'} alt="bg left bottom" className="w-[22.9375rem] absolute bottom-0 left-0" />
        <div className="absolute bottom-[3rem] left-0 w-full px-5 gap-2.5 text-sm flex flex-col">
            <div className="p-2.5 rounded-lg bg-[#374F3F]/95 text-center whitespace-break-spaces">
                All-in-one Liquidity Solution for<br/>
                Initial Node Offering
            </div>
            <div className="btn-primary" onClick={(e) => {
                console.info('click:', e)
                toggleOpenJoin(true)
            }}>Go</div>
        </div>
        {isOpenJoin && <div className="fixed top-0 z-50 left-0 w-full h-full flex flex-col items-center overflow-auto bg-black/80">
            <div ref={ref} style={{
                background: 'no-repeat bottom/100% url("/bg_join.svg"),#FFF1A4'
            }} className="w-[20.625rem] h-[31.25rem] flex flex-col items-center px-5 my-auto rounded-[1.25rem]">
                <div className="mt-10 bg-primary rounded-sm font-semibold text-lg p-2">Join out community</div>
                <div className="mt-auto btn-primary">
                    <TwitterX className="text-[2rem]" />
                    Follow out official account
                    <ArrowRightTop className="text-base mr-auto" />
                </div>
                <div className="mb-[3.125rem] mt-2.5 btn-primary">
                    <Telegram className="text-[2rem]" />
                    Join out Telegram Channel
                    <ArrowRightTop className="text-base mr-auto" />
                </div>
            </div>
        </div>}

    </div>
}

export function Home() {
    return (
        <Fragment>
            <FrameLanuch />
        </Fragment>
    );
}