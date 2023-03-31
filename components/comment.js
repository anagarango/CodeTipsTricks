export default function Comment({
    keyId,
    commentData,
    date
}){
    return(
        <div key={keyId} className='w-full py-10 px-8 mt-8 max-w-[860px] border-b-2 border-[#9A9A9A]'>
            <div className='flex items-center cursor-pointer justify-between'>
                <div className="flex">
                    <img className='h-12 w-12 rounded-[50%] mr-4' src={commentData.user.image}/>
                    <div>
                        <h2 className='text-[#348F8A] text-[20px] font-extrabold flex items-center'>{commentData.user.name}</h2>
                        <p className='text-[#898989] text-[16px] flex items-center'>Posted on {date}</p>
                    </div>
                </div>
            </div>
            <p className='text-white'>{commentData.content}</p>
        
        </div>
    )
}