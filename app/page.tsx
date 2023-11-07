import { getPosts } from '@/lib/fetchApi'

type block = {
  name: string,
  clientId: string,
  attributes: {
    content: string
  }
}

async function getBlockComponents(editorBlocks:Array<block>){
  const blockComponents = editorBlocks.map(block => {
    if(block.name === 'core/paragraph') return <BlockParagraph key={block.clientId} content={block.attributes.content}/>
  });
  return blockComponents

}

export default async function Home() {
  
  const data = await getPosts();
  const blocks = await getBlockComponents(data[0].editorBlocks)


  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      Hello
      {blocks}
      {JSON.stringify(data)}
      
    </main>
  )
}

type Props = {content: string}

function BlockParagraph({content}: Props) {
  return (
    <p className='border-blue-900'>{content}</p>
  )
}
