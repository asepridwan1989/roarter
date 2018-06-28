const jwt = require('jsonwebtoken')
const Post = require('../models/post.model')
const mongoose = require('mongoose')

module.exports = {
    getListSelf: (req, res)=>{
      console.log('post profile')
        const token = req.headers.token
        let verified = jwt.decode(token,process.env.TOKENKEY)
        const userId = verified.id
        Post.find({
            userId
        })
        .then(post=>{
          if(post.length > 0){
              res.status(200).json({
                  message: 'successfuly got data',
                  data: post
              })
          }else{
            res.status(200).json({
                message: 'you dont have any post'
            })
          }
        })
        .catch(err=>{
            res.status(403).json({
                message: 'invalid user'
            })
        })
    },

    addPost: (req, res)=>{
        const token = req.headers.token
        let verified = jwt.decode(token,process.env.TOKENKEY)
        const userId = verified.id
        const title = req.body.title
        const content = req.body.content
        let newPost = new Post({
            userId,
            status
        })
        newPost.save()
            .then(result=>{
                res.status(201).json({
                    message: 'successfuly add new post',
                    data: result
                })
            })
            .catch(error=>{
                res.status(400).json({
                    message: 'failed to add new task'
                })
            })
    },

    editPost: (req, res) => {
        const id = mongoose.Types.ObjectId(req.params.id)
        const token = req.headers.token
        let verified = jwt.decode(token,process.env.TOKENKEY)
        const userId = verified.id
        const status = req.body.status
        Post.findById(id, (err, post) => {
          if(err) {
            res.status(400).send({
              message: err.message
            })
          } else {
            if(post.userId == userId) {
              Post.update({
                _id: id
              }, {
                $set: req.body
              }, {
                overwrite: false
              }, (err, result) => {
                if(err) {
                  res.status(400).send({
                    message: 'failed to edit post'
                  })
                } else {
                  res.status(201).send({
                    message: 'successfuly edited post',
                    data: result
                  })
                }
              })
            } else {
              res.status(400).send({
                message: 'Invalid user'
              })
            }
          }
        })
      },

      deletePost: (req, res) => {
        const id = mongoose.Types.ObjectId(req.params.id)
        const token = req.headers.token
        let verified = jwt.decode(token,process.env.TOKENKEY)
        const userId = verified.id

        Post.findById(id, (err, post) => {
            if(err) {
                res.status(400).send({
                    message: 'post not found'
                })
            } else {
                if(post.userId == userId) {
                    Post.remove({
                        _id: id
                    }, (err) => {
                        if(err) {
                            res.status(400).send({
                                message: 'failed to delete post'
                            })
                        } else {
                            res.status(200).send({
                                message: 'post was successfuly deleted',
                                data: post
                            })
                        }
                    })
                } else {
                    res.status(400).send({
                        message: 'Invalid user'
                    })
                }
            }
        })
    },

    searchPost: (req, res)=>{
        const statusQuery = req.query.status
        console.log(req.query.status)
        Post.find({
            status: {
                $regex: '.*' + statusQuery + '.*'
            }
        },(err,post)=>{
            if(err){
                res.status(400).send({
                    message: 'failed to get task'
                })
            }else {
                if(post.length > 0){
                    res.status(200).send({
                        message: 'post was succesfuly got',
                        data: post
                    })
                }else{
                    res.status(200).send({
                        message: 'nothing to show'
                    })
                }
            }
        })
    },
    getListAll: (req, res)=>{
        console.log('masuk home')
        Post.find()
        .populate('userId', 'username')
        .then(post=>{
          console.log(post)
          if(post.length > 0){
              res.status(200).json({
                  message: 'successfuly got data',
                  data: post
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
                message: 'invalid user'
            })
        })
    },

}
