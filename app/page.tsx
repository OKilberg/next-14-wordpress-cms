import { getPage } from '@/lib/fetchApi'

type block = {
  name: string,
  clientId?: string,
  id?: string,
  attributes: {
    content: string
  }
}

async function getBlockComponents(editorBlocks:Array<block>){
  const blockComponents = editorBlocks.map(block => {
    if(block.name === 'core/paragraph') return <BlockParagraph key={block.clientId || block.id} content={block.attributes.content}/>
  });
  return blockComponents

}

export default async function Home() {
  
  const pageData = await getPage('/');
  const blocks = await getBlockComponents(pageData.editorBlocks)


  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <h1>{pageData.title}</h1>
      {blocks}
    </main>
  )
}

type Props = {content: string}

function BlockParagraph({content}: Props) {
  return (
    <p className='border-blue-900'>{content}</p>
  )
}
