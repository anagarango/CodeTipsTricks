import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()


export default async function handler(req,res){
  const method = req.method

  switch (method) {
    case 'POST':
      const title = req.body.title
      const content = req.body.content
      const category = req.body.category
      const post = await prisma.post.create({
        data:{
            title,
            content,
            category
        }
      })
      res.status(201).json(post)
      break
    default:
        res.status(405).end(`Method ${method} not allowed`)

  }
}