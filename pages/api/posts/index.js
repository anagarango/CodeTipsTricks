import { prisma } from '../../../server/database/client'

export default async function handler(req,res){
  const method = req.method

  switch (method) {
    case 'GET':
      try{
        const getAllPosts = await prisma.post.findMany({
          orderBy: {
            createdAt: "desc"
          }
        })
        res.status(201).json(getAllPosts);
        break

      } catch(err) {
        console.error(err)
        res.status(500).send('Internal Server Error')
      }
      


      
    case 'POST':
      try{
        const title = req.body.title
        const content = req.body.content
        const category = req.body.category
  
        if(!title || !content || !category){
          res.status(400).json("Missing fields: either title, content, or category")
          return
        }
  
        const post = await prisma.post.create({
          data:{
              title,
              content,
              category
          }
        })
        res.status(201).json(post)
        break

      } catch(err) {
        console.error(err)
        res.status(500).send('Internal Server Error')
      }
      
      
    default:
        res.status(405).end(`Method ${method} not allowed`)
  }
}