import {prisma} from "../../../../../server/database/client"

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

            } catch (err) {
                  console.error(err)
                  res.status(500).send('Internal Server Error')
            }
           
        case 'POST':
          try{
            const content = req.body.content
            const comment = await prisma.comment.create({
                data:{
                    content,
                    postBelonging: {connect: {id: Number(postId)}}
                }
            })
            res.status(201).json(comment)

          } catch(err) {
            console.error(err)
            res.status(500).send('Internal Server Error')
          }
            
  }
}