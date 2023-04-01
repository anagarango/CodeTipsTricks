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
        
      } catch (err) {
        console.error(err)
        res.status(500).send('Internal Server Error')
      }
      
      break


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
          
        } catch {
          console.error(err)
          res.status(500).send('Internal Server Error')
        }
        
        break
  
  
  
  
      case 'DELETE':
        try{
          // console.log("del comment")
          const DeleteComment = await prisma.comment.delete({
            where:{
                id: parseInt(commentsId)
            }
          });
    
          res.status(200).json(DeleteComment)
        } catch (err) {
          console.error(err)
          res.status(500).send('Internal Server Error')
        }
        break
  }
}
