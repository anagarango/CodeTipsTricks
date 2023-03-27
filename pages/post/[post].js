import { useRouter } from "next/router";

export default function Post({data}){
    const r = useRouter()
    const event = new Date(data[0].createdAt)
    const options = {hour: "numeric", minute: "numeric", year: 'numeric', month: 'long', day: 'numeric' };
    const date = event.toLocaleString('en-GB', options)

    console.log(data)
    
    return(
        <>
            <div onClick={()=>{r.push("/")}}>Go back</div>
            {data.map((o,i)=>(
                <div key={i}>
                    <h1>{o.title}</h1>
                    <h5>{o.category}</h5>
                    <h6>{date}</h6>
                    <p>{o.content}</p>
                    <p>Number of Likes: {o.totalLikes}</p>
                </div>
            ))}
        </>
    )
}

export async function getServerSideProps(context){
    const singlePost = context.query.post

    const getSinglePost = await prisma.post.findMany({
        where:{
            id: Number(singlePost)
        }
      })
  
    return{
      props:{
        data: JSON.parse(JSON.stringify(getSinglePost))
      }
    }
  }