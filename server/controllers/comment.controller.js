const Comment = require('../models/comment.model')
const mongoose = require('mongoose')

module.exports = {
    addComment: (req, res)=>{
        const postId = verified.id
        const user = req.body.user
        const status = req.body.status
        let newComment = new Comment({
            postId,
            user,
            status
        })
        newComment.save()
            .then(result=>{
                res.status(201).json({
                    message: 'successfuly add new comment',
                    data: result
                })
            })
            .catch(error=>{
                res.status(400).json({
                    message: 'failed to add new comment'
                })
            })
    },
    getListAll: (req, res)=>{
        Comment.find({postId: req.body.postId})
        .then(comment=>{
          console.log(comment)
          if(comment.length > 0){
              res.status(200).json({
                  message: 'successfuly got data',
                  data: comment
              })
          }else{
                res.status(200).json({
                message: 'you dont have any post'
            })
          }
        })
        .catch(err=>{
            console.log('error', err)
            res.status(403).json({
                message: 'invalid post'
            })
        })
    },

}
