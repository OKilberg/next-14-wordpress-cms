import { getCategories, getPage, getPost } from '@/lib/fetchApi'
import React from 'react'
import { notFound } from 'next/navigation'
import PageNode from '@/components/Page'
import { node } from './layout'
import Post from '@/components/Post'

type Props = {
    params: {
        slug: string[],
    }
}
/*
export async function generateStaticParams() {
    //const posts = await fetch('https://.../posts').then((res) => res.json())
    const categories = await getCategories()

    console.log("Categories", categories)

    return categories.map((category: { slug: string }) => ({
        slug: [category.slug],
    }))
}
*/

//This is where we determine whether the node is a page or a post and render the corresponding component.
export default async function Page({ params }: Props) {
    const { slug } = params
    console.log("Page params:", slug)
    const slugString = slug.join('/')
    let node = await getPage(slugString)
    if (!node) node = await getPost(slugString)
    if (!node) notFound()

    //console.log("Slug", slugString)
    const nodeComponent = node.contentTypeName
    return (
        <>
            {getNodeComponent(node)}
        </>
    )
}

function getNodeComponent(node: node) {
    switch (node.contentTypeName) {
        case 'page': return <PageNode page={node} />
        case 'post': return <Post post={node}/>
    }
}
