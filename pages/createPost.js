import { useRouter } from "next/router";
import { useState } from "react";
import axios from "axios";

export default function NewPost(){
    const r = useRouter()
    const topicCategories = ["Front-End Development", "Back-End Development", "AI / Machine Learning"]
    const [category, setCategory] = useState("")
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");


    const submitData = async (e) => {
        e.preventDefault()
        const res = await axios.post('/api/posts', { 
            title,
            content,
            category
        })
        // setPosts([...dogbreed, res.data])
        console.log(res)
    }
    return(
        <>
            <form onSubmit={submitData}>
                {topicCategories.map((o,i)=>(
                    <div onClick={()=>{setCategory(o)}}>{o}</div>
                ))}
                <input onChange={(e) => setTitle(e.target.value)} placeholder="Enter Post Title" type="text" value={title}/>
                <textarea onChange={(e) => setContent(e.target.value)} value={content} placeholder="Leave a description about the link and paste it below"></textarea>
                <button type="submit">Submit</button>
            </form>
        </>
    )
}