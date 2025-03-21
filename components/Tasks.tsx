import { reportCheck, TaskID } from "@/libs/api";
import { followXLink, isLocal, TGChannelLink, TGGroupLink } from "@/libs/env";
import { cn, getTgApp } from "@/libs/utils";
import { useConnectModal } from "@rainbow-me/rainbowkit";
import { useMutation } from "@tanstack/react-query";
import { toUserFriendlyAddress, useTonConnectUI } from "@tonconnect/ui-react";
import { useEffect, useRef, useState } from "react";
import { FaSpinner } from "react-icons/fa6";
import { useAccount, useDisconnect } from "wagmi";
import { reFetchTGUser, useTGUser } from "./hooks/useTguser";
import { Correct, LinkC, Telegram, TwitterX, Wallet } from "./imgs/social";

export type TaskUI = {
    id: TaskID
    icon: React.ComponentType<{ className?: string }>
    name: string
    finished: boolean
    btn: string
    onClick: (clicked: boolean) => void
    reward?: string
    needCheck?: boolean
    loading?: boolean
}

function TaskItem({ task }: { task: TaskUI }) {
    const [clicked, setClicked] = useState(false)
    return <div className="px-2.5 py-3 bg-white/15 rounded-lg flex text-white items-center gap-2.5">
        <task.icon className={"text-[2rem] shrink-0"} />
        <div className="whitespace-nowrap flex-1">
            <div className="w-full text-sm">{task.name}</div>
            <div className="w-full text-xs text-primary mt-2">{task.reward || '+10 points'}</div>
        </div>
        <div className={cn("shrink-0 btn-primary w-[4.8125rem]", { "!text-white !bg-primary": task.finished })} onClick={() => {
            if (task.finished) return
            if (task.needCheck && task.loading) return
            task.onClick(clicked)
            setClicked(true)
        }}>
            {task.loading && <FaSpinner className="shrink-0" />}
            {task.finished ? 'Done' : task.needCheck && clicked ? 'Check' : task.loading ? '' : task.btn}
            {task.finished && <Correct className="text-sm text-white shrink-0" />}
        </div>
    </div>
}

export function TaskFollowX() {
    const tguser = useTGUser()
    const onClickLinkX = () => {
        const tgApp = getTgApp()
        tgApp?.openLink(encodeURI(followXLink))
        setTimeout(() => reportCheck(tgApp.initData, 'followX').then(reFetchTGUser), 1000)
    }
    return <TaskItem task={{ id: 'followX', icon: TwitterX, name: 'Follow our official account', finished: Boolean(tguser?.profile?.followX) || isLocal, btn: 'Link', onClick: onClickLinkX }} />
}
export function TaskShare() {
    const tguser = useTGUser()
    const onClick = () => {
        const tgApp = getTgApp()
        const user = tgApp?.initDataUnsafe?.user
        if(!user) return
        const inviteText = `🔥 Join with me to earn extra ZooLNT airdrops and NFTs!`
        const link = `https://t.me/ZooFinanceBot`
        console.info('link:',link)
        const shareLink = `https://t.me/share/url?url=${encodeURI(link)}&text=${encodeURIComponent(inviteText)}`
        tgApp.openTelegramLink(shareLink)
        setTimeout(() => reportCheck(tgApp.initData, 'shareBot').then(reFetchTGUser), 1000)
    }
    return <TaskItem task={{ id: 'shareBot', icon: LinkC, name: 'Share', finished: Boolean(tguser?.profile?.shareBot), btn: 'Share', onClick: onClick }} />
}

export function TaskJoinTGChannel() {
    const tguser = useTGUser()
    const { mutate: joinCheckTgChannel, isPending: isCheckingTgChannel } = useMutation({
        mutationFn: () => reportCheck(getTgApp().initData, 'joinTgChannel').then(reFetchTGUser)
    })
    const onClickJoinTgChannel = (clicked: boolean) => {
        if (!clicked) {
            getTgApp()?.openTelegramLink(TGChannelLink)
        } else {
            joinCheckTgChannel()
        }
    }
    return <TaskItem task={{ id: 'joinTgChannel', icon: Telegram, name: 'Subscribe our telegram channel', finished: Boolean(tguser?.profile?.joinTgChannel), btn: 'Subscribe', onClick: onClickJoinTgChannel, needCheck: true, loading: isCheckingTgChannel }} />

}
export function TaskJoinTGGroup() {
    const tguser = useTGUser()

    const { mutate: joinCheckTgGroup, isPending: isCheckingTgGroup } = useMutation({
        mutationFn: () => reportCheck(getTgApp().initData, 'joinTgChat').then(reFetchTGUser)
    })
    const onClickJoinTgGroup = (clicked: boolean) => {
        if (!clicked) {
            getTgApp()?.openTelegramLink(TGGroupLink)
        } else {
            joinCheckTgGroup()
        }
    }
    return <TaskItem task={{ id: 'joinTgChat', icon: Telegram, name: 'Join our telegram group', finished: Boolean(tguser?.profile?.joinTgChat), btn: 'Join', onClick: onClickJoinTgGroup, needCheck: true, loading: isCheckingTgGroup }} />
}
export function TaskConnectTon() {
    const tguser = useTGUser()
    const [tonConnectUI] = useTonConnectUI();
    const onClickConnectTonWallet = async () => {
        await tonConnectUI.disconnect().catch(console.error)
        const unSub = tonConnectUI.onStatusChange((wallet) => {
            if (wallet && wallet.account) {
                reportCheck(getTgApp().initData, 'connectTonAccount', { account: toUserFriendlyAddress(wallet.account.address) })
                    .then(reFetchTGUser)
            }
            unSub()
        })
        tonConnectUI.openModal()
    }
    return <TaskItem task={{ id: 'connectTonAccount', icon: Wallet, name: 'Connect TON wallet', finished: Boolean(tguser?.profile?.connectTonAccount), btn: 'Connect', onClick: onClickConnectTonWallet, }} />
}
export function TaskConnectEvm() {
    const tguser = useTGUser()
    const { openConnectModal } = useConnectModal()
    const { address, isConnected } = useAccount()
    const { disconnectAsync } = useDisconnect()
    const refDoConnectEvm = useRef(false)
    const onClickConnectEvmWallet = async () => {
        await disconnectAsync().catch(console.error)
        openConnectModal?.()
        refDoConnectEvm.current = true
    }
    useEffect(() => {
        if ((refDoConnectEvm.current) && isConnected && address) {
            reportCheck(getTgApp().initData, 'connectEvmAccount', { account: address })
                .then(reFetchTGUser)
        }
    }, [address, isConnected])
    return <TaskItem task={{ id: 'connectEvmAccount', icon: Wallet, name: 'Connect EVM wallet', finished: Boolean(tguser?.profile?.connectEvmAccount), btn: 'Connect', onClick: onClickConnectEvmWallet, }} />
}

