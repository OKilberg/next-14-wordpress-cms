import { getPost } from '@/lib/fetchApi';
import React from 'react'

type Props = {
    params: { post: string }
}

export default async function Post({params}: Props) {
    const postData = await getPost(params.post);
  return (
    <div>Test Post!
            {JSON.stringify(postData)}
        </div>
  )
}