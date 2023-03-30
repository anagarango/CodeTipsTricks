import {prisma} from "../../../../../server/database/client"
import { authOptions } from '../../../auth/[...nextauth]'
import { getServerSession } from "next-auth/next"

export default async function handler(req,res){
  const method = req.method
  const postId = req.query.postId
  

  switch (method) {
        case 'GET':
          try {
              const allComments = await prisma.comment.findMany({
                where:{
                  postBelongingId: Number(postId)
                }
              })
              res.status(200).json(allComments)
              break

            } catch (err) {
                  console.error(err)
                  res.status(500).send('Internal Server Error')
            }
           
        case 'POST':
          try{
            const session = await getServerSession(req, res, authOptions)
            if(!session){
              res.status(401).json({error:"Unauthorized"})
              break     
            }

            const prismaUser = await prisma.user.findUnique({
              where: { email: session.user.email },
              include: {comments: true}
            })

            if(!prismaUser){
              res.status(401).json({error:"Unauthorized"})
            }

            const content = req.body.content
      
            if(!content){
              res.status(400).json("Missing field content")
              break
            }

            const comment = await prisma.comment.create({
                data:{
                    content,
                    postBelonging: {connect: {id: Number(postId)}},
                    user: {connect: {id: prismaUser.id}},
                    // userId: prismaUser.id
                }
            })
            res.status(201).json({comment, session, prismaUser})
            break

          } catch(err) {
            console.error(err)
            res.status(500).send('Internal Server Error')
          }
            
  }
}