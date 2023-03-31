import { useRouter } from "next/router";
import { useState } from "react";
import axios from "axios";
import { authOptions } from './api/auth/[...nextauth]'
import { getServerSession } from "next-auth/next"

export default function NewPost(){
    const r = useRouter()
    const topicCategories = ["Front-End Development", "Back-End Development", "AI / Machine Learning"]
    const [category, setCategory] = useState("")
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [errorMessage, setErrorMessage] = useState("")


    const submitData = async (e) => {
        e.preventDefault()
        if(category == ""){
            setErrorMessage("Error: Must select a category!")
            return
        } else {
            setErrorMessage("")
        }
        const res = await axios.post('/api/posts', { 
            title,
            content,
            category
        })
        console.log(res)
        
        r.push("/")
    }
    return(
        <>
            <form onSubmit={submitData}>
                {topicCategories.map((o,i)=>(
                    <div key={i} onClick={()=>{setCategory(o)}}>{o}</div>
                ))}
                <input onChange={(e) => setTitle(e.target.value)} placeholder="Enter Post Title" type="text" value={title} required/>
                <textarea onChange={(e) => setContent(e.target.value)} value={content} placeholder="Leave a description about the link and paste it below" required></textarea>
                <button type="submit">Submit</button>
            </form>
            {errorMessage && <div>
                {errorMessage}
            </div>}
        </>
    )
}

export async function getServerSideProps(context){
    const session = await getServerSession(context.req, context.res, authOptions)
    if(!session){
        return{
            redirect:{
                destination: "/api/auth/signin",
                permanent:false
            }
        }
    }
    return{
        props:{
            session
        }
    }
  }