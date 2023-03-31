import { useState } from "react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/router"

export default function NavBar({
    onClickSignOut=()=>{},
    onClickSignIn=()=>{}
}){
    const r = useRouter()
    const {data:session} = useSession()

    return(
        <header className='fixed top-0 left-0 w-screen h-fit py-5 px-10 bg-[#333333] flex items-center justify-between'>
            <img onClick={()=>r.push("/")} src="/codetipstricks.svg" className='h-6 cursor-pointer'></img>
            {session?.user && <img onClick={onClickSignOut} src={session?.user.image} className="h-10 w-10 rounded-[50%] cursor-pointer"></img>}
            {!session?.user && <img onClick={onClickSignIn} src="/user.png" className="h-10 w-10 rounded-[50%] cursor-pointer"></img>}
        </header>
    )
}