import { Dropdown } from "@nextui-org/react";
import { Textarea  } from '@nextui-org/react';
import { useState, useRef } from "react";
import axios from "axios";

export default function Comment({
    postUserDetails = 1,
    sessionUserDetails = 2,
    postData,
    commentsData
}){

    const [commentChosen, setCommentChosen] = useState()
    const [updateComment, setUpdateComment] = useState()
    const [updatedComments, setUpdatedComments] = useState(commentsData)
    const [leaveComment, setLeaveComment] = useState("")
    const textAreaRef = useRef();

    const handleComment = async (e) => {
        e.preventDefault()
        const res = await axios.post(`/api/posts/${postData.id}/comments`, { 
            content: leaveComment
        })
        console.log(res)

        const comment = Object.assign(res.data.comment, res.data.session)
        setUpdatedComments([...updatedComments, comment])
        setLeaveComment("")
    }

    const handleDeleteComment = async (e, commentId) => {
        if (e == "delete"){
            const res = await axios.delete(`/api/posts/${postData.id}/comments/${commentId}`)
            
            setUpdatedComments((current) => current.filter((comment) => comment.id !== res.data.id))
        }
    }

    const handleUpdateComment = async (e, commentData) => {
        e.preventDefault()
        const res = await axios.put(`/api/posts/${postData.id}/comments/${commentData.id}`, {
            content: updateComment
        })
        console.log(res)

        const updatedCommentRes = await fetch(`/api/posts/${postData.id}/comments`);
        const updatedCommentOKAY = await updatedCommentRes.json();

        setUpdatedComments(updatedCommentOKAY)
        setCommentChosen("")
    }   


    

    return(
        <>
            <div>
                <h3 className="text-[#348F8A] text-[30px] font-extrabold flex items-center">Comments ({updatedComments.length})</h3>
                <form onSubmit={handleComment}>
                    <Textarea css={{width:"100%", marginTop:"30px"}} ref={textAreaRef} onChange={(e) => setLeaveComment(e.target.value)} value={leaveComment} labelPlaceholder="Whatcha thinking?" required/>
                    <button type="submit" className="w-full text-center mt-5 rounded-[12px] text-[20px] text-[#348F8A] py-2 bg-transparent font-bold border-solid border-2 border-[#348F8A] hover:bg-[#348F8A] hover:text-white duration-300">Post Comment</button>
                </form>
            </div>

            {updatedComments.map((o,i)=> {
                const event = new Date(o.createdAt)
                const options = {hour: "numeric", minute: "numeric", year: 'numeric', month: 'long', day: 'numeric' };
                const createdAtDate = event.toLocaleString('en-GB', options)
            
                const updated = new Date(o.updatedAt)
                const updatedAtDate = updated.toLocaleString('en-GB', options)

                return(
                    <div key={i} className='w-full py-10 px-8 mt-8 max-w-[860px] border-b-2 border-[#9A9A9A] flex-col'>
                        <div className='flex items-center cursor-pointer justify-between'>
                            <div className="flex">
                                <img className='h-12 w-12 rounded-[50%] mr-4' src={o.user.image}/>
                                <div>
                                    <h2 className='text-[#348F8A] text-[20px] font-extrabold flex items-center'>{o.user.name}</h2>
                                    <div className="flex">
                                        {createdAtDate !== updatedAtDate && 
                                            <p className='text-[#898989] text-[16px] flex items-center mr-5'>Updated on {updatedAtDate}</p>
                                        }
                                        <p className='text-[#898989] text-[16px] flex items-center'>Posted on {createdAtDate}</p>
                                        
                                    </div>
                                </div>
                            </div>
                            {postUserDetails == sessionUserDetails && 
                                <Dropdown>
                                    <Dropdown.Button flat><img src="/menu.png" className="w-6"></img></Dropdown.Button>
                                    <Dropdown.Menu onAction={(e)=>{handleDeleteComment(e, o.id); setCommentChosen(o); setUpdateComment(o.content)}} aria-label="Static Actions">
                                        <Dropdown.Item key="edit">Edit Comment</Dropdown.Item>
                                        <Dropdown.Item key="delete" color="error">Delete Comment</Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>
                            }   
                        </div>

                        {commentChosen?.id !== o.id  && 
                            <div style={{marginBottom:"20px"}}>
                                <p className="mt-4">{o.content}</p>
                            </div>
                        }

                        {commentChosen?.id == o.id && 
                            <form onSubmit={(e)=>{handleUpdateComment(e, o)}}>
                                <div className="mt-4">
                                    <Textarea onChange={(e) => setUpdateComment(e.target.value)} value={updateComment} css={{width:"100%", marginTop:"20px"}} labelPlaceholder="Whatcha thinking?" required/>
                                </div>
                                <div className="flex w-full justify-end mt-10">
                                    <button className="p-3 rounded-[12px] font-bold border-solid border-2 border-[#348F8A] hover:bg-[#348F8A] hover:text-white mr-5 duration-300" onClick={()=>{setCommentChosen("")}}>Cancel</button>
                                    <button className="p-3 rounded-[12px] font-bold border-solid border-2 border-[#348F8A] hover:bg-[#348F8A] hover:text-white duration-300" type="submit">Done Editing?</button>
                                </div>
                            </form>
                        }
    
                    </div>
                )
            }).reverse()}
         
        </>
    )
}