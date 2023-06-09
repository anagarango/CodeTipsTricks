import { Dropdown } from "@nextui-org/react";
import { useState } from "react";
import { useRouter } from "next/router";
import { Input  } from '@nextui-org/react';
import { Textarea  } from '@nextui-org/react';

export default function EditingPost({
    keyId,
    date,
    addHeart,
    postData,
    childParent,
    cancelButton=()=>{},
    creatingPost = false,
    onSubmit=()=>{}
}){
    const topicCategories = ["Front-End Development", "Back-End Development", "AI / Machine Learning"]
    const [categoryChosen, setCategoryChosen] = useState(postData?.category)
    const [titleChosen, setTitleChosen] = useState(postData?.title);
    const [contentChosen, setContentChosen] = useState(postData?.content);

    const pushingData = (e) => {
        e.preventDefault()
        childParent({title:titleChosen, content:contentChosen, category:categoryChosen}) 
    }

    return(
        <form onSubmit={pushingData} key={keyId} className='bg-[#333333] w-full rounded-[12px] py-5 px-8 mb-8 max-w-[860px]'>
            {!creatingPost && 
                <div className='flex items-center cursor-pointer justify-between'>
                    <div className="flex">
                        <img className='h-12 w-12 rounded-[50%] mr-4' src={postData?.user.image}/>
                        <div>
                            <h2 className='text-[#348F8A] text-[20px] font-extrabold flex items-center'>{postData?.user.name}
                                <span className='text-[#898989] font-normal text-[16px] pl-5'>
                                    <span className='font-bold'>Current Category: </span>{postData?.category}
                                </span>
                            </h2>
                            <p className='text-[#898989] text-[16px] flex items-center'>Posted on {date}</p>
                        </div>
                    </div>
                </div>
            }
            
            <h1 className='text-[#898989] text-[16px] font-bold'>{creatingPost ? "Choose Catagory" : "Change Category"}</h1>      
            <div className="flex justify-between -mx-1">
                {topicCategories.map((o,i) => (
                    <div key={i} onClick={()=>{setCategoryChosen(o)}} className={categoryChosen == o ? "p-3 rounded-[12px] mx-1 bg-[#348F8A] max-w-fit mb-4 font-bold border-solid border-2 border-[#348F8A] hover:bg-[#348F8A] hover:text-white duration-300" : "p-3 rounded-[12px] w-fit mb-4 mx-1 font-bold border-solid border-2 border-[#348F8A] hover:bg-[#348F8A] hover:text-white duration-300"}>{o}</div>
                ))}
            </div>      
            <div className="mt-4">
                <Input onChange={(e) => setTitleChosen(e.target.value)} value={titleChosen} css={{width:"100%", marginTop:"20px"}} labelPlaceholder="Title" required/>
            </div>
            <div className="mt-8">
                <Textarea onChange={(e) => setContentChosen(e.target.value)} value={contentChosen} css={{width:"100%", marginTop:"20px"}} labelPlaceholder="Leave a description about the link and paste it below" required/>
            </div>

            <div className="flex w-full justify-end mt-10">
                <button className="p-3 rounded-[12px] font-bold border-solid border-2 border-[#348F8A] hover:bg-[#348F8A] hover:text-white mr-5 duration-300" onClick={cancelButton}>Cancel</button>
                <button className="p-3 rounded-[12px] font-bold border-solid border-2 border-[#348F8A] hover:bg-[#348F8A] hover:text-white duration-300" type="submit">{creatingPost ? "Create Post" : "Done Editing?"}</button>
            </div>
        </form>
    )
}