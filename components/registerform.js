import { Input  } from '@nextui-org/react';
import { signIn } from 'next-auth/react';
import { useState } from 'react';

export default function RegisterForm({
    githubOnClick=()=>{},
    closeOnClick=()=>{}
}){

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault()
    signIn('email', {email, password})
  }

    return(
        <div className="m-0 flex fixed w-screen h-screen top-0 left-0 justify-center items-center bg-[rgba(12,36,34,0.8)] z-10">
          <div className='w-6/12 bg-[#FFF] p-10 rounded-[12px] min-w-[360px]'>
            <img onClick={closeOnClick} src="/close.png" className='w-4'></img>
            <div className='flex flex-col w-full justify-center items-center'>
              <h1 className='text-[#348F8A] text-[30px] font-bold'>Get the full </h1>
              <img className='max-w-[650px] w-full' src="/codetipstricks.gif"/>
              <h1 className='text-[#348F8A] text-[30px] font-bold'>Experience </h1>
            </div>
            <form onSubmit={handleSubmit} className='flex flex-col'>
              <div>
                <Input onChange={(e)=>{setEmail(e.target.value)}} value={email} css={{width:"100%", marginTop:"20px"}} labelPlaceholder="Email" required/>
              </div>
              <div className='mt-10'>
                <Input onChange={(e)=>{setPassword(e.target.value)}} value={password} css={{width:"100%"}} labelPlaceholder="Password" required/>
              </div>
              <button className='mt-5 rounded-[12px] text-[#348F8A] py-2 bg-white font-bold border-solid border-2 border-[#348F8A] hover:bg-[#348F8A] hover:text-white duration-300' type="submit">Sign In</button>
            </form>
            <h1 className='py-14 text-[#969696] text-[25px] font-bold text-center'>-------- or --------- </h1>
            
            <div className='flex justify-center items-center p-5 rounded-[12px] bg-white text-[#348F8A] cursor-pointer border-solid border-2 border-[#333333] hover:bg-[#333333] hover:text-[#348F8A] duration-300' onClick={githubOnClick}>
                <img src="/github.png" className='w-10'></img>
                <h1 className='text-[#348F8A] ml-5 text-[20px] font-bold'>Sign In with Github</h1>
              </div>
          </div>
        </div>
    )
}