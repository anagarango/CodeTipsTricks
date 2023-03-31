import {prisma} from "../../../../server/database/client"
import { authOptions } from '../../auth/[...nextauth]'
import { getServerSession } from "next-auth/next"

export default async function handler(req,res){
  const method = req.method
  const postId = req.query.postId
  

  switch (method) {
    case 'GET':
      try{
        const GetPost = await prisma.post.findMany({
          where:{
              id: Number(postId)
          },
          include:{
            user: true,
            comments: true
          }
        })
        res.status(201).json(GetPost);
        break

      } catch(err) {
        console.error(err)
        res.status(500).send('Internal Server Error')
      }





    case 'PUT':
      try{
        const title = req.body.title
        const content = req.body.content
        const category = req.body.category
  
        if(!title || !content || !category){
          res.status(400).json("Missing fields: either title, content, or category")
          return
        }
  
        const UpdatePost = await prisma.post.update({
          where: { 
            id: Number(postId) 
          },
          data:{
            title,
            content,
            category
        }
        })
        res.status(201).json(UpdatePost)
        break

      } catch {
        console.error(err)
        res.status(500).send('Internal Server Error')
      }
      




    case 'DELETE':
      try{
        const session = await getServerSession(req, res, authOptions)

        if (!session) {
          return res.status(401).send('Unauthorized');
        }

        const prismaUser = await prisma.user.findUnique({
          where: { email: session.user.email }
        })
        
        if(!prismaUser){
          res.status(401).json({error:"Unauthorized"})
        }

        if (session.user.email !== prismaUser.email || session.user.image !== prismaUser.image) {
          return res.status(403).send('Forbidden')
        }


        const DeleteAllMessages = await prisma.comment.deleteMany({
          where:{
            postBelonging:{
              id: Number(postId)
            }
          }
        });

        
  
        const DeletePost = await prisma.post.delete({
          where: { 
            id: Number(postId) 
          },
        })
  
        res.status(201).json(DeletePost + DeleteAllMessages)
        break

      } catch (err) {
        console.error(err)
        res.status(500).send('Internal Server Error')
      }
  }
}