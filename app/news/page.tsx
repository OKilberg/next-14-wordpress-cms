import { getPage } from '@/lib/fetchApi'
import React from 'react'

type Props = {}

export default async function News({ }: Props) {
    const pageData = await getPage('/news');
    return (
        <div>Test Page! Poggers
            {JSON.stringify(pageData)}
        </div>
    )
}