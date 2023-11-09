import { getCategories, querySite } from "@/lib/fetchApi"

export type node = {
    title: string,
    slug: string,
    uri: string,
    contentTypeName: string
}

export async function generateStaticParams() {
    //const posts = await fetch('https://.../posts').then((res) => res.json())
    //const categories = await getCategories()

    //console.log("Categories", categories)

    /*
    return categories.map((category: { slug: string }) => ({
        slug: [category.slug],
    }))
    */
    const siteNodes = await querySite()

    /*
    const params = siteNodes.map((node: node) => ({
        slug: node.uri.split('/'),
    }))
    */

    const params = siteNodes.map((node: node) => {
        const uri = node.uri;
        const cleanUri = uri.slice(1,uri.length-1)
        //console.log(cleanUri)
        const splitUri = cleanUri.split('/')
        //console.log(splitUri)

        return {
            slug: splitUri,
            type: [node.contentTypeName]
        }
    })

    //console.log(params)
    return params;
}

export default function Layout({
    children, params
}: {
    children: React.ReactNode,
}) {
    console.log("Params", params)
    return (
        <section lang="en">
            Layout!
            {children}
        </section>
    )
}