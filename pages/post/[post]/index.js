import { useRouter } from "next/router";
import { useEffect, useState, useRef } from "react";
import axios from "axios";
import { authOptions } from '../../api/auth/[...nextauth]'
import { getServerSession } from "next-auth/next"
import { prisma } from "../../../server/database/client"

export default function Post({data, comments, prismaAuth}){
    const r = useRouter()
    const textAreaRef = useRef();
    const event = new Date(data[0].createdAt)
    const postUserDetails = data[0].user
    const sessionUserDetails = prismaAuth

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

        setUpdatedLikes(res.data.totalLikes)
    }

    const handleComment = async (e) => {
        e.preventDefault()
        const res = await axios.post(`/api/posts/${data[0].id}/comments`, { 
            content: leaveComment
        })
        console.log(res)

        const comment = Object.assign(res.data.comment, res.data.session)
        setUpdatedComments([...updatedComments, comment])
        setLeaveComment("")
    }

    const handleEdit = async (e) => {
        e.preventDefault()
        const res = await axios.put(`/api/posts/${data[0].id}`, {
            title: editingTitle,
            content: editingContent,
            category: editingCategory
        })
        console.log(res)

        const user = { user: prismaAuth }
        var updatedComment = Object.assign(res.data, user)
        setUpdatedPost([updatedComment])
        setEditingPostMode(false)
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
        console.log(res)

        const user = { user: prismaAuth }
        var updatedComment = Object.assign(res.data, user)
        setUpdatedComments([...updatedComments, updatedComment])
        setEditingCommentMode("")
    }   
    
    const handleDeleteComment = async (commentId) => {
        const res = await axios.delete(`/api/posts/${data[0].id}/comments/${commentId}`)
        console.log(res)

        setUpdatedComments((current) => current.filter((comment) => comment.id !== res.data.id))
    }


    return(
        <>
            <div onClick={()=>{r.push("/")}}>Go back</div>

            {postUserDetails.id === sessionUserDetails.id && 
                <div>
                    <div onClick={()=>{setEditingPostMode(true)}}>Edit</div>
                    <div onClick={()=>{setDeletePost(true)}}>Delete Post</div>
                </div>
            }            
            

            {!editingPostMode && updatedPost.map((o,i)=>(
                <div key={i}>
                    <p>{o.user.name}</p> 
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
                    <textarea ref={textAreaRef} onChange={(e) => setLeaveComment(e.target.value)} value={leaveComment} placeholder="Whatcha thinking?" required></textarea>
                    <button type="submit">Submit</button>
                </form>
            </div>


            {updatedComments.map((o,i)=> (
                <div key={i} style={{marginBottom:"20px"}}>
                    <p>{o.user.name}</p>
                    <p>{o.content}</p>

                    {o.userId === sessionUserDetails.id && 
                        <div>
                            <p onClick={()=>{setEditingCommentMode(o.content); setEditingComment(o.content)}}>Edit</p>
                            <p onClick={()=>{handleDeleteComment(o.id)}}>Delete</p>
                        </div>
                    } 

                    {editingCommentMode == o.content && 
                        <form onSubmit={(e)=>{handleUpdateComment(e, o.id)}}>
                            <textarea onChange={(e) => setEditingComment(e.target.value)} value={editingComment} placeholder="Leave a description about the link and paste it below" required></textarea>
                            <button onClick={()=>{setEditingCommentMode(false)}}>Nevermind</button>
                            <button type="submit">Submit</button>
                        </form>
                    }
                </div>
            )).reverse()}



            {deletePost && 
                <div style={{width:"100vw", height:"100vh", backgroundColor:"rgba(0,0,0,0.7)", display:"flex", flexDirection:"column", position:"fixed", top:"0"}}>
                    <form onSubmit={handleDelete} style={{display:"flex"}}>
                        <h2>Are you sure you want to delete this post?</h2>
                        <button onClick={()=>{setDeletePost(false)}}>Nevermind</button>
                        <button type="submit">Why else would I press "Delete Post"?</button>
                    </form>
                </div>
            }
        </>
    )
}

export async function getServerSideProps(context){
    const singlePost = context.query.post
    const session = await getServerSession(context.req, context.res, authOptions)
    if(!session){
        return{
            redirect:{
                destination: "/api/auth/signin",
                permanent:false
            }
        }
    }

    const prismaUser = await prisma.user.findUnique({
        where: { email: session.user.email }
    })

    const getSinglePost = await prisma.post.findMany({
        where:{
            id: Number(singlePost)
        },
        include: {
            user: true
          }
      })
    const allComments = await prisma.comment.findMany({
        where:{
            postBelongingId: Number(singlePost)
        },
        include: {
            user: true
          }
    })
  
    return{
      props:{
        data: JSON.parse(JSON.stringify(getSinglePost)),
        comments: JSON.parse(JSON.stringify(allComments)),
        prismaAuth: JSON.parse(JSON.stringify(prismaUser))
      }
    }
  }