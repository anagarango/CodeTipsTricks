import {prisma} from "../../../../../server/database/client"

export default async function handler(req,res){
  const method = req.method
  const postId = req.query.postId
  

  switch (method) {
    case 'GET':
        const SelectedPost = await prisma.post.findMany({
            where: { id: Number(postId) },
        })

        res.status(201).json("totalLikes: " + SelectedPost[0].totalLikes);
        break

    case 'PUT':
        const IncrementLike = await prisma.post.update({
            where: { id: Number(postId) },
            data: {
              totalLikes: { increment: 1 }
            }
          })

        res.status(201).json(IncrementLike);
  }
}