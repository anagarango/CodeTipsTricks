import { useRouter } from "next/router";
import { useState } from "react";
import axios from "axios";

export default function Post({data, comments}){
    const r = useRouter()
    const event = new Date(data[0].createdAt)
    const options = {hour: "numeric", minute: "numeric", year: 'numeric', month: 'long', day: 'numeric' };
    const date = event.toLocaleString('en-GB', options)
    const topicCategories = ["Front-End Development", "Back-End Development", "AI / Machine Learning"]


    const [editingPostMode, setEditingPostMode] = useState(false)
    const [editingCommentMode, setEditingCommentMode] = useState(false)

    const [leaveComment, setLeaveComment] = useState("")

    const [editingCategory, setEditingCategory] = useState(data[0].category)
    const [editingTitle, setEditingTitle] = useState(data[0].title);
    const [editingContent, setEditingContent] = useState(data[0].content);
    const [editingComment, setEditingComment] = useState(comments[0].content)

    const [deletePost, setDeletePost] = useState(false)

    

    const handleLike = async () => {
        const res = await axios.put(`/api/posts/${data[0].id}/likes`)
        console.log(res)
    }

    const handleComment = async (e) => {
        e.preventDefault()
        const res = await axios.post(`/api/posts/${data[0].id}/comments`, { 
            content: leaveComment
        })
        console.log(res)
    }

    const handleEdit = async (e) => {
        e.preventDefault()
        const res = await axios.put(`/api/posts/${data[0].id}`, {
            title: editingTitle,
            content: editingContent,
            category: editingCategory
        })
        console.log(res)
    }

    const handleDelete = async (e) => {
        e.preventDefault()
        const res = await axios.delete(`/api/posts/${data[0].id}`)
        console.log(res)

        r.push("/")
    }

    const handleUpdateComment = async (e, commentId) => {
        e.preventDefault()
        console.log(commentId)
        // const res = await axios.put(`/api/posts/${data[0].id}/comments/${commentId}`)
    }    
    return(
        <>
            <div onClick={()=>{r.push("/")}}>Go back</div>
            <div onClick={()=>{setEditingPostMode(true)}}>Edit</div>
            <div onClick={()=>{setDeletePost(true)}}>Delete Post</div>
            {!editingPostMode && data.map((o,i)=>(
                <div key={i}>
                    <h1>{o.title}</h1>
                    <h5>{o.category}</h5>
                    <h6>{date}</h6>
                    <p>{o.content}</p>
                    <p onClick={handleLike}>Number of Likes: {o.totalLikes}</p>
                </div>
            ))}
            {editingPostMode && data.map((o,i)=>(
                <form onSubmit={handleEdit} key={i}>
                    <input onChange={(e) => setEditingTitle(e.target.value)} placeholder="Enter Post Title" type="text" value={editingTitle} required />
                    {topicCategories.map((o,i)=>(
                        <div key={i} onClick={()=>{setEditingCategory(o)}}>{o}</div>
                    ))}
                    <h6>{date}</h6>
                    <textarea onChange={(e) => setEditingContent(e.target.value)} value={editingContent} placeholder="Leave a description about the link and paste it below" required></textarea>
                    <p onClick={handleLike}>Number of Likes: {o.totalLikes}</p>
                    <button onClick={()=>{setEditingPostMode(false)}}>Cancel</button>
                    <button onClick={()=>{setEditingPostMode(false)}} type="submit">Done Editing?</button>
                </form>
            ))}
            <div>
                <h3>Leave your thoughts:</h3>
                <form onSubmit={handleComment}>
                    <textarea onChange={(e) => setLeaveComment(e.target.value)} value={leaveComment} placeholder="Whatcha thinking?" required></textarea>
                    <button type="submit">Submit</button>
                </form>
            </div>
            {comments.map((o,i)=> {
                if(!editingCommentMode){
                    return(
                        <div key={i}>
                            <p>{o.content}</p>
                            <p onClick={()=>{setEditingCommentMode(true)}}>Edit</p>
                        </div>
                    )
                } else {
                    return(
                        <form onSubmit={()=>{handleUpdateComment(event, o.id)}}>
                            <textarea onChange={(e) => setEditingComment(e.target.value)} value={editingComment} placeholder="Leave a description about the link and paste it below" required></textarea>
                            <button onClick={()=>{setEditingCommentMode(false)}}>Nevermind</button>
                            <button type="submit">Submit</button>
                        </form>
                    )
                }

            }
                
            )}
            {deletePost && <div style={{width:"100vw", height:"100vh", backgroundColor:"rgba(0,0,0,0.7)", display:"flex", flexDirection:"column", position:"fixed", top:"0"}}>
                    <form onSubmit={handleDelete} style={{display:"flex"}}>
                        <h2>Are you sure you want to delete this post?</h2>
                        <button onClick={()=>{setDeletePost(false)}}>Nevermind</button>
                        <button type="submit">Why else would I press "Delete Post"?</button>
                    </form>
            </div>}
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
    const allComments = await prisma.comment.findMany({
        where:{
            postBelongingId: Number(singlePost)
        },
        orderBy: {
            createdAt: "desc"
        }
    })
  
    return{
      props:{
        data: JSON.parse(JSON.stringify(getSinglePost)),
        comments: JSON.parse(JSON.stringify(allComments))
      }
    }
  }