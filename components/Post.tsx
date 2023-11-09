import { node } from '@/app/[...slug]/layout'
import React from 'react'

type Props = {post: node}

export default function Post({post}: Props) {
    const {title} = post
  return (
    <div>
        <h2>Post Title: {title}</h2>
    </div>
  )
}