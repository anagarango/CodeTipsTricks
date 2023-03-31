export default function PostPreview({
    keyId,
    onClick=()=>{},
    profileImage,
    profileName,
    postCategory,
    date,
    postTitle,
    postContent,
    heartLikes,
    addHeart,
    commentLength
}){
    return(
        <div key={keyId} className='bg-[#333333] rounded-[12px] p-4 mb-8'>
            <div onClick={onClick} className='flex items-center cursor-pointer'>
                <img className='h-12 w-12 rounded-[50%] mr-4' src={profileImage}/>
                <div>
                <h2 className='text-[#348F8A] text-[20px] font-extrabold flex items-center'>{profileName}
                    <span className='text-[#898989] font-normal text-[16px] pl-5'>
                    <span className='font-bold'>Category: </span>{postCategory}
                    </span>
                </h2>
                <p className='text-[#898989] text-[16px] flex items-center'>Posted on {date}</p>
                </div>
            </div>
            <h2 onClick={onClick} className='text-[20px] font-extrabold flex items-center cursor-pointer'>{postTitle}</h2>
            <p className='max-w-[75ch] overflow-hidden text-ellipsis whitespace-nowrap'>{postContent}</p>
            <div className="flex w-[65px] justify-between mt-8">
                <div className="flex flex-col items-center">
                    <img onClick={addHeart} src="/heart.png" className="w-6 h-6 cursor-pointer" id="heartHover"></img>
                    <p className="text-[#348F8A]">{heartLikes}</p>
                </div>
                <div className="flex flex-col items-center">
                    <img src="/comment.png" className="w-6 h-6"></img>
                    <p className="text-[#348F8A]">{commentLength}</p>
                </div>
                
            </div>
        </div>
    )
}