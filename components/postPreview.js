import { Dropdown } from "@nextui-org/react";

export default function PostPreview({
    keyId,
    onClick=()=>{},
    date,
    addHeart,
    preview,
    postUserDetails = 1,
    sessionUserDetails = 2,
    onClickEdit=()=>{},
    postData
}){
    return(
        <div key={keyId} className='bg-[#333333] w-full rounded-[12px] py-5 px-8 mb-8 max-w-[860px]'>
            <div onClick={onClick} className='flex items-center cursor-pointer justify-between'>
                <div className="flex">
                    <img className='h-12 w-12 rounded-[50%] mr-4' src={postData.user.image}/>
                    <div>
                        <h2 className='text-[#348F8A] text-[20px] font-extrabold flex items-center'>{postData.user.name}
                            <span className='text-[#898989] font-normal text-[16px] pl-5'>
                                <span className='font-bold'>Category: </span>{postData.category}
                            </span>
                        </h2>
                        <p className='text-[#898989] text-[16px] flex items-center'>Posted on {date}</p>
                    </div>
                </div>
                {postUserDetails == sessionUserDetails && 
                    <Dropdown>
                        <Dropdown.Button flat><img src="/menu.png" className="w-6"></img></Dropdown.Button>
                        <Dropdown.Menu onAction={onClickEdit} aria-label="Static Actions">
                            <Dropdown.Item key="edit">Edit Post</Dropdown.Item>
                            <Dropdown.Item key="delete" color="error">Delete Post</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                }   
            </div>
            <h2 onClick={onClick} className='text-[20px] font-extrabold flex items-center cursor-pointer pt-4'>{postData.title}</h2>
            <p className={preview ? 'max-w-[75ch] overflow-hidden text-ellipsis whitespace-nowrap' : 'text-white'}>{postData.content}</p>
            
            <div className="flex w-[65px] justify-between mt-8">
                <div className="flex flex-col items-center">
                    <img onClick={addHeart} src="/heart.png" className="w-6 h-6 cursor-pointer" id="heartHover"></img>
                    <p className="text-[#348F8A]">{postData.totalLikes}</p>
                </div>
                <div className="flex flex-col items-center">
                    <img src="/comment.png" className="w-6 h-6"></img>
                    <p className="text-[#348F8A]">{postData.comments.length}</p>
                </div>
                
            </div>
        </div>
    )
}