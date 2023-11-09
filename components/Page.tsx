import { node } from '@/app/[...slug]/layout'
import React from 'react'

type Props = { page: node }

export default function Page({ page }: Props) {
    const { title } = page
    return (
        <div>Page Title: {title}</div>
    )
}