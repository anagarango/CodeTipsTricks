import Head from 'next/head'
import { useRouter } from 'next/router'
import { prisma } from '@/server/database/client'

export default function Home({posts}) {
  const r = useRouter()

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        CodeTipsTricks
        <div onClick={()=>{r.push("/submit")}}>Create A Post</div>
        {posts.map((o, index) => (
              <li onClick={()=>{r.push(`/post/${o.id}`)}} key={index}>{o.title}</li>
          )
          )}
      </main>
    </>
  )
}

export async function getServerSideProps(){
  const posts = await prisma.post.findMany({
    orderBy: {
      createdAt: "desc"
    }
  })

  return{
    props:{
      posts: JSON.parse(JSON.stringify(posts))
    }
  }
}