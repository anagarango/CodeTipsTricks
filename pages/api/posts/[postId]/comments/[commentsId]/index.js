import {prisma} from "../../../../../../server/database/client"

export default async function handler(req, res) {
  const method = req.method
  const commentsId = req.query.commentsId

  switch (method) {
    case 'GET':
      try {
        const GetComment = await prisma.comment.findMany({
          where: {
            id: Number(commentsId)
          }
        })
        if (GetComment.length === 0) {
          res.status(404).send('No comments found for this post')
        } else {
          res.status(201).json(GetComment);
        }

        break

      } catch (err) {
        console.error(err)
        res.status(500).send('Internal Server Error')
      }





      case 'PUT':
        try{
          const content = req.body.content
    
          if( !content ){
            res.status(400).json("Missing content")
            return
          }
    
          const UpdateComment = await prisma.comment.update({
            where: { 
              id: Number(commentsId) 
            },
            data:{
              content,
          }
          })
          res.status(201).json(UpdateComment)

          break
  
        } catch {
          console.error(err)
          res.status(500).send('Internal Server Error')
        }
        
  
  
  
  
      case 'DELETE':
        try{
          const DeleteComment = await prisma.comment.delete({
            where:{
                id: Number(commentsId)
            }
          });
    
          res.status(201).json(DeleteComment)
          
          break
  
        } catch (err) {
          console.error(err)
          res.status(500).send('Internal Server Error')
        }
  }
}
