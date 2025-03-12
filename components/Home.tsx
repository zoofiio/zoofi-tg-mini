'use client'

import { Logo } from "@/components/imgs/logo";
import { ArrowRightTop, Telegram, TwitterX } from "@/components/imgs/social";
import { getTgUser, reportCheck, TGUser } from "@/libs/api";
import { cn, getTgApp } from "@/libs/utils";
import { useMutation } from "@tanstack/react-query";
import { Fragment, ReactNode, useRef } from "react";
import { FaSpinner } from "react-icons/fa6";
import { FiChevronDown, FiChevronUp, FiX } from 'react-icons/fi';
import { useEffectOnce, useToggle } from "react-use";
import { create } from "zustand";
import { useShallow } from "zustand/shallow";

import { Menus, useMenusStore } from "./Menus";
import Modal from "./Modal";

const useTgUser = create<{
    tguser?: TGUser,
    fetchTgUser: () => Promise<TGUser | undefined>
}>((set) => ({
    fetchTgUser: async () => {
        const uid = getTgApp().initDataUnsafe.user?.id;
        if (uid) {
            const user = await getTgUser(uid)
            set({ tguser: user })
            return user
        }
        return undefined
    }
}))
function FrameLanuch({ finished }: { finished?: boolean }) {
    const litghtText = (text: string) => {
        return <span className="text-[#2BBD34]">{text}</span>
    }
    const refJoinTg = useRef<HTMLDivElement>(null)
    const isClcikedGo = useMenusStore(useShallow(s => s.isClickedGo))
    const { mutate: reportCheckJoin, isPending: isPendingReportCheckJoin } = useMutation({
        mutationFn: async (toggleOpen: (open?: boolean) => void) => {
            const tgApp = getTgApp()
            if (!tgApp || !tgApp.initData) {
                return
            }
            await reportCheck(tgApp.initData, 'joinTgChannel')
            await useTgUser.getState().fetchTgUser()
            toggleOpen(false)
        }
    })
    return <div className="w-full h-full relative overflow-hidden">
        <img src={'/bg_t.svg'} alt="top bg" className="w-full absolute top-0 left-0" />
        <div className="flex flex-col w-full gap-2.5 absolute top-[8.125rem] items-center">
            <Logo className="text-[4rem]" />
            <div className="font-semibold text-center">{litghtText('L')}iquid {litghtText('N')}ode {litghtText('T')}oken</div>
            <img src={'/time.svg'} alt="time" className="w-full -mt-8 object-contain h-[67.18vh]" />
        </div>
        <img src={'/bg_rb.svg'} alt="bg right bottom" className="w-[12.1875rem] absolute bottom-0 right-0" />
        <img src={'/bg_lb.svg'} alt="bg left bottom" className="w-[22.9375rem] absolute bottom-0 left-0" />
        <div className="absolute left-0 w-full px-5 gap-2.5 text-sm flex flex-col bottom-[2.125rem]">
            <div className="p-2.5 rounded-lg bg-[#374F3F]/95 text-center whitespace-break-spaces">
                All-in-one Liquidity Solution for<br />
                Initial Node Offering
            </div>
            {isClcikedGo && <Menus />}
            {!isClcikedGo && finished && <div className="btn-primary" onClick={() => useMenusStore.setState({ isClickedGo: true })}>Go</div>}
            {
                !isClcikedGo && !finished && <Modal bgImage trigger={<div className="btn-primary">Go</div>} childrenClassName="h-[31.25rem]">
                    {({ toggleOpen }) => <>
                        <div className="mt-5 bg-primary rounded-sm font-semibold text-lg p-2">Join out community</div>
                        <div className="mt-auto btn-primary" onClick={async () => {
                            const tgApp = getTgApp()
                            if (tgApp && tgApp.initData) {
                                tgApp.openLink(encodeURI(`https://x.com/intent/follow?original_referer=zoofi.io&ref_src=twsrc^tfw|twcamp^buttonembed|twterm^follow|twgr^ZooFinanceIO&screen_name=ZooFinanceIO`))
                                await reportCheck(tgApp.initData, 'followX').catch(console.error)
                                await useTgUser.getState().fetchTgUser()
                            }
                        }}>
                            <TwitterX className="text-[2rem]" />
                            Follow out official account
                            <ArrowRightTop className="text-base mr-auto" />
                        </div>
                        <div className="mb-[1.875rem] mt-2.5 btn-primary" onClick={() => {
                            toggleOpen(false)
                            refJoinTg.current?.click()
                        }}>
                            <Telegram className="text-[2rem]" />
                            Join out Telegram Channel
                            <ArrowRightTop className="text-base mr-auto" />
                        </div>
                    </>}
                </Modal>
            }
        </div>
        <Modal trigger={<div ref={refJoinTg} className="flex"></div>} triggerClassName="hidden" >
            {({ toggleOpen }) => <>
                <div className="flex items-center w-full">
                    <div
                        onClick={() => toggleOpen(false)}
                        className="ml-auto w-6 h-6 rounded-full bg-[#D99825] hover:opacity-80 cursor-pointer flex items-center justify-center text-sm text-white">
                        <FiX />
                    </div>
                </div>
                <div className="text-lg font-semibold text-[#355722] text-center w-full my-[1.875rem]">Join The Telegram Channel</div>
                <div className=" btn-second" onClick={() => {
                    const tgApp = getTgApp()
                    if (tgApp && tgApp.initData) {
                        tgApp.openTelegramLink('https://t.me/ZooLnt')
                    }
                }}>Go</div>
                <div className="mt-2.5 btn-primary" onClick={() => !isPendingReportCheckJoin && reportCheckJoin(toggleOpen)}>{isPendingReportCheckJoin && <FaSpinner className="animate-spin text-base" />} Check</div>
            </>}
        </Modal>
    </div>
}

function QA(p: { q?: ReactNode, a?: ReactNode, defExpand?: boolean }) {
    const [expand, toggleExpand] = useToggle(p.defExpand || false)
    return <div className="transition-all">
        <div
            onClick={() => toggleExpand()}
            className="whitespace-nowrap rounded-lg bg-primary cursor-pointer flex justify-between p-3 items-center text-white font-medium text-[.9375rem]">
            {p.q}
            {expand ? <FiChevronUp className="text-base" /> : <FiChevronDown className="text-base" />}
        </div>
        <div className={cn("text-xs text-black whitespace-pre-wrap tracking-normal mt-2.5", { 'hidden': !expand })}>{p.a}</div>
    </div>
}
const qas: { q?: ReactNode, a?: ReactNode }[] = [
    { q: 'What is an Initial Node Offering (INO)?', a: 'Initial Node Offering (INO) is a modern cryptocurrency fundraising model where blockchain projects sell node licenses to participants. These licenses grant holders the right to operate or delegate nodes, which validate transactions, secure the network, and maintain decentralization. INOs prioritize regulatory compliance (via KYC/AML checks), community-driven network participation, and long-term value creation. Unlike speculative models like ICOs, INOs incentivize active contributors through rewards (e.g., fee sharing, tokens), fostering sustainable growth and decentralized governance while aligning stakeholders with the project’s operational success.' },
    { q: 'What is Liquid Node Token (LNT)?', a: 'Liquid Node Token, is a solution designed to solve liquidity and accessibility issues in Initial Node Offerings (INO). It transforms long-term income of node licenses into tradable tokens, enabling instant liquidity and lowering participation barriers. LNT bridges the gap between long-term node commitments and short-term liquidity needs, making INOs more attractive to both retail and institutional investors, it pioneers a new standard for node-based fundraising—combining decentralization, compliance, and market-driven efficiency.' },
    { q: 'How Does LNT Work?', a: 'Users deposit their Node licenses into the LNT Vault. The Vault calculates and issues VT (Vesting Tokens) based on the vesting schedule and expected future rewards associated with the Node license. Simultaneously, the Vault generates a YT (Yield Token) for the user.' },
    { q: 'What is VT (Vesting Token)?', a: 'VT (Vesting Token) represents the future value of the node license (e.g., tokens unlocked over years). Tradable instantly as an ERC20 token.' },
    { q: 'What is YT (Yiled Token)?', a: 'YT (Yield Token) represents excess returns (e.g., fees, airdrops). Traded via a Dutch auction-style AMM for short-term speculation.' },
    {
        q: 'How to stabilize VT Value?', a: <>
            LNT solution establishes a VT/T liquidity pool where node licenses continuously earn T tokens (native rewards), which are used to buy back and burn VT from the market, reducing supply.<br />
            Additionally, VT holders can redeem their tokens 1:1 for T once the vesting period ends, ensuring its value aligns with the underlying asset. This dual mechanism balances market-driven buybacks and guaranteed redemption, promoting VT’s price stability and long-term confidence.
        </>
    },
    {
        q: 'Is LNT Safe? What Are the Risks?', a: <>
            LNT’s contracts are audited by Certik, a top-tier blockchain security firm. However, risks still exist:<br />
            Smart Contract Risk:Despite rigorous audits by Certik, vulnerabilities in the protocol’s code could theoretically be exploited.<br />
            Slashing Risk:Validators (node operators) might face penalties (slashing) for downtime or malicious behavior. LNT mitigates this by distributing node operations across multiple professional operators to reduce single points of failure.<br />
            LNT Token Price Risk:The exchange rate between LNT tokens (e.g., VT/YT) and their underlying assets (e.g., node rewards) could fluctuate on DEXs, creating arbitrage gaps or volatility.
        </>
    },
]
function AboutLNT() {
    return <div className="w-full h-full relative overflow-hidden flex flex-col items-center px-5 py-[2.125rem] gap-2.5">
        <img src={'/bg_t.svg'} alt="top bg" className="w-full absolute top-0 left-0" />
        <div className="flex flex-col w-full gap-2.5 mt-[6rem] items-center relative shrink-0">
            <Logo className="text-[3rem]" />
            <div className="absolute top-0 left-1/2 translate-x-[3.375rem] font-medium text-[.625rem]">LNT Solution</div>
            <div className="font-semibold text-center">Node Liquidity Unshackled</div>
        </div>
        <div className="flex-1 w-full rounded-lg bg-[#FFF1A4] p-[.9375rem] overflow-y-auto gap-5 flex flex-col">
            {qas.map(({ q, a }, i) => <QA key={i} q={q} a={a} defExpand={i == 0} />)}
        </div>
        <div className="w-full gap-2.5 shrink-0">
            <Menus />
        </div>
    </div>

}

export function Home() {
    const menu = useMenusStore(useShallow(s => s.current))
    const tguser = useTgUser(useShallow(s => s.tguser))
    useEffectOnce(() => { setTimeout(useTgUser.getState().fetchTgUser, 500) })
    const finished = Boolean(tguser) && Boolean(tguser?.profile?.followX) && Boolean(tguser?.profile?.joinTgChannel)
    return (
        <Fragment>
            {menu.txt == "Home" && <FrameLanuch finished={finished} />}
            {menu.txt == "About LNT" && <AboutLNT />}
        </Fragment>
    );
}