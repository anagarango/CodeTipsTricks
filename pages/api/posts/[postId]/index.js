import {prisma} from "../../../../server/database/client"

export default async function handler(req,res){
  const method = req.method
  const postId = req.query.postId
  

  switch (method) {
    case 'GET':
      const getSinglePost = await prisma.post.findMany({
        where:{
            id: Number(postId)
        }
      })
      res.status(201).json(getSinglePost);
    // case 'POST':
    //   const title = req.body.title
    //   const content = req.body.content
    //   const category = req.body.category
    //   const post = await prisma.post.create({
    //     data:{
    //         title,
    //         content,
    //         category
    //     }
    //   })
    //   res.status(201).json(post)
    //   break
    // default:
    //     res.status(405).end(`Method ${method} not allowed`)

  }
}