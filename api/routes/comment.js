const express=require('express')
const router = express.Router()
const Comment=require('../model/comment')
const mongoose=require('mongoose')
const checkAuth=require('../middleware/checkAuth')

//post new comment
router.post('/',(req,res)=>{
    const newComment=new Comment({
        _id:new mongoose.Types.ObjectId,
        email:req.body.email,
        commentText:req.body.commentText,
        blogId:req.body.blogId,
        imageUrl:req.body.imageUrl,
        fullName:req.body.fullName
    })
    newComment.save()
    .then(result=>{
        res.status(200).json({
            new_Comment:result
        })
    })
    .catch(err=>{
        console.log(err)
        res.status(500).json({
            error:err
        })
    })
})

//get all comment
router.get('/',(req,res)=>{
    Comment.find()
    .select('_id email commentText blogId imageUrl fullName timestamp')
    .then(result=>{
        res.status(200).json({
            comments:result
        })
    })
    .catch(err=>{
        console.log(err)
        err.status(500).json({
            error:err
        })
    })
})


// Get comments based on blogId using URL parameter
router.get('/:blogId', (req, res) => {
    const { blogId } = req.params; 
  
    Comment.find({ blogId }) 
      .select('_id email commentText blogId imageUrl fullName timestamp')
      .then(result => {
        res.status(200).json({
          comments: result
        });
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({
          error: err
        });
      });
  });
  





//delete comment by id
router.delete('/:id',(req,res)=>{
    Comment.deleteOne({_id:req.params.id})
    .then(result=>{
        res.status(200).json({
            deleteData:result
        })
    })
    .catch(err=>{
        console.log(err)
        res.status(500).json({
            error:err
        })
    })
})

//count all comment
router.get('/get/count/:blogId',(req,res)=>{
    Comment.find({blogId:req.params.blogId}).countDocuments()
    .then(result=>{
        res.status(200).json({
            total:result
        })
    })
    .catch(err=>{
        console.log(err)
        res.status(500).json({
            error:err
        })
    })
})
module.exports=router;