'use client'
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
    if (inited) {
        return children
    } else {
        return null
    }
}