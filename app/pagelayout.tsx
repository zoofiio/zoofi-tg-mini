'use client'
import { getDefaultConfig, RainbowKitProvider } from '@rainbow-me/rainbowkit';
import {
    bitgetWallet,
    gateWallet,
    metaMaskWallet,
    okxWallet,
    tokenPocketWallet,
    walletConnectWallet
} from '@rainbow-me/rainbowkit/wallets';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { TonConnectUIProvider } from '@tonconnect/ui-react';
import * as React from 'react';
import { mainnet } from 'viem/chains';
import { WagmiProvider } from 'wagmi';
const walletConnectProjectId = 'abf1f323cd9ff9f6a27167188d993168'
const config = getDefaultConfig({
    appName: 'Zoo Finance Mini',
    projectId: walletConnectProjectId,
    chains: [mainnet],
    ssr: false,
    wallets: [
        {
            groupName: 'Recommended',
            wallets: [metaMaskWallet, okxWallet, bitgetWallet, tokenPocketWallet, gateWallet, walletConnectWallet],
        }
    ]
})
const client = new QueryClient()
export function PageLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    // const inited = useMountedState()
    const [inited, setInited] = React.useState(false)
    React.useEffect(() => {
        console.info('inited')
        setInited(true)
    }, [])

    return <WagmiProvider config={config}>
        <QueryClientProvider client={client}>
            <RainbowKitProvider locale='en'>
                <TonConnectUIProvider manifestUrl="https://mini.zoofi.io/tonconnect-manifest.json">
                    <div className='w-screen h-screen overflow-y-auto max-w-[800px] mx-auto'>
                        {inited && children}
                    </div>
                </TonConnectUIProvider>
            </RainbowKitProvider>
        </QueryClientProvider>
    </WagmiProvider>
}