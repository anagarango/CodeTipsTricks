import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Post({data, comments}){
    const r = useRouter()
    const event = new Date(data[0].createdAt)
    const options = {hour: "numeric", minute: "numeric", year: 'numeric', month: 'long', day: 'numeric' };
    const date = event.toLocaleString('en-GB', options)
    const topicCategories = ["Front-End Development", "Back-End Development", "AI / Machine Learning"]

    

    const [updatedComments, setUpdatedComments] = useState(comments)
    const [updatedLikes, setUpdatedLikes] = useState(data[0].totalLikes)
    const [updatedPost, setUpdatedPost] = useState(data)

    const [leaveComment, setLeaveComment] = useState("")
    const [deletePost, setDeletePost] = useState(false)

    const [editingPostMode, setEditingPostMode] = useState(false)
    const [editingCommentMode, setEditingCommentMode] = useState("")

    const [editingCategory, setEditingCategory] = useState(updatedPost[0].category)
    const [editingTitle, setEditingTitle] = useState(updatedPost[0].title);
    const [editingContent, setEditingContent] = useState(updatedPost[0].content);
    const [editingComment, setEditingComment] = useState()



    const handleLike = async () => {
        const res = await axios.put(`/api/posts/${data[0].id}/likes`)
        console.log(res)

        const updateLikeRes = await fetch(`/api/posts/${data[0].id}/`);
        const updateLike = await updateLikeRes.json();
        setUpdatedLikes(updateLike[0].totalLikes)
    }

    const handleComment = async (e) => {
        e.preventDefault()
        const res = await axios.post(`/api/posts/${data[0].id}/comments`, { 
            content: leaveComment
        })
        console.log(res)

        const createCommentRes = await fetch(`/api/posts/${data[0].id}/comments/`);
        const createComments = await createCommentRes.json();  
        setUpdatedComments(createComments)
    }

    const handleEdit = async (e) => {
        e.preventDefault()
        const res = await axios.put(`/api/posts/${data[0].id}`, {
            title: editingTitle,
            content: editingContent,
            category: editingCategory
        })
        console.log(res)
        setEditingPostMode(false)

        const editPostRes = await fetch(`/api/posts/${data[0].id}`);
        const editPost = await editPostRes.json();
        setUpdatedPost(editPost)
    }

    const handleDelete = async (e) => {
        e.preventDefault()
        const res = await axios.delete(`/api/posts/${data[0].id}`)
        console.log(res)

        r.push("/")
    }

    const handleUpdateComment = async (e, commentId) => {
        e.preventDefault()
        const res = await axios.put(`/api/posts/${data[0].id}/comments/${commentId}`, {
            content: editingComment
        })
        setEditingCommentMode(false)
        console.log(res)

        const updatedCommentsRes = await fetch(`/api/posts/${data[0].id}/comments/`);
        const updatedComments = await updatedCommentsRes.json();
        setUpdatedComments(updatedComments)
    }   
    
    const handleDeleteComment = async (commentId) => {
        const res = await axios.delete(`/api/posts/${data[0].id}/comments/${commentId}`)
        console.log(res)

        const deletedCommentsRes = await fetch(`/api/posts/${data[0].id}/comments/`);
        const deletedComments = await deletedCommentsRes.json();
        setUpdatedComments(deletedComments)
    }


    return(
        <>
            <div onClick={()=>{r.push("/")}}>Go back</div>
            <div onClick={()=>{setEditingPostMode(true)}}>Edit</div>
            <div onClick={()=>{setDeletePost(true)}}>Delete Post</div>
            {!editingPostMode && updatedPost.map((o,i)=>(
                <div key={i}>
                    <h1>{o.title}</h1>
                    <h5>{o.category}</h5>
                    <h6>{date}</h6>
                    <p>{o.content}</p>
                    <p onClick={handleLike}>Number of Likes: {updatedLikes}</p>
                </div>
            ))}
            {editingPostMode && updatedPost.map((o,i)=>(
                <form onSubmit={handleEdit} key={i}>
                    <input onChange={(e) => setEditingTitle(e.target.value)} placeholder="Enter Post Title" type="text" value={editingTitle} required />
                    {topicCategories.map((o,i)=>(
                        <div key={i} onClick={()=>{setEditingCategory(o)}}>{o}</div>
                    ))}
                    <h6>{date}</h6>
                    <textarea onChange={(e) => setEditingContent(e.target.value)} value={editingContent} placeholder="Leave a description about the link and paste it below" required></textarea>
                    <p onClick={handleLike}>Number of Likes: {o.totalLikes}</p>
                    <button onClick={()=>{setEditingPostMode(false)}}>Cancel</button>
                    <button type="submit">Done Editing?</button>
                </form>
            ))}
            <div>
                <h3>Leave your thoughts:</h3>
                <form onSubmit={handleComment}>
                    <textarea onChange={(e) => setLeaveComment(e.target.value)} value={leaveComment} placeholder="Whatcha thinking?" required></textarea>
                    <button type="submit">Submit</button>
                </form>
            </div>
            {updatedComments.map((o,i)=> (
                        <div key={i}>
                            <p>{o.content}</p>
                            <p onClick={()=>{setEditingCommentMode(o.content); setEditingComment(o.content)}}>Edit</p>
                            <p onClick={()=>{handleDeleteComment(o.id)}}>Delete</p>
                            {editingCommentMode == o.content && 
                                <form onSubmit={(e)=>{handleUpdateComment(e, o.id)}}>
                                    <textarea onChange={(e) => setEditingComment(e.target.value)} value={editingComment} placeholder="Leave a description about the link and paste it below" required></textarea>
                                    <button onClick={()=>{setEditingCommentMode(false)}}>Nevermind</button>
                                    <button type="submit">Submit</button>
                                </form>
                            }
                        </div>
            )).reverse()}
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
        }
    })
  
    return{
      props:{
        data: JSON.parse(JSON.stringify(getSinglePost)),
        comments: JSON.parse(JSON.stringify(allComments))
      }
    }
  }