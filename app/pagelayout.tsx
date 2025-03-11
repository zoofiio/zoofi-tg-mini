'use client'
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';

const client = new QueryClient()
import * as React from 'react';
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
    return <QueryClientProvider client={client}>
        {inited && children}
    </QueryClientProvider>
}