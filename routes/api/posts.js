const express = require('express');
const router = express.Router();

const Posts = require('../../models/Posts');

//Get all pots
router.get('/' , async (req, res)=>{
    try {
        const posts = await Posts.find();
        if(!posts) throw Error('No hay Items...')
          res.status(200).json(posts);
    } catch (err) {
          res.status(400).json({msg: err})
    }
})

//One Single Get
router.get('/:id' , async (req, res)=>{
    try {
        const post = await Posts.findById(req.params.id);
        if(!post) throw Error('No hay Items...')
          res.status(200).json(post);
    } catch (err) {
          res.status(400).json({msg: err})
    }
})

//Post
router.post('/', async (req, res)=>{
    const newPost = new Posts(req.body)

    try {
        const post = await newPost.save();
        
        if(!post) throw Error('Algo ocurrio y no se puedo postear!!')
            res.status(200).json(post)
    }  catch (err) {
        res.status(400).json({msg: err})
        
    }
})


//DELETE
router.delete('/:id' , async (req, res)=>{
    try {
       const post = await Posts.findByIdAndDelete(req.params.id)
       if(!post) throw Error('Post No encontrado')
         res.status(200).json({success: true})
    } catch (err) {
         res.status(400).json({msg: err})
    }
});

//UPDATE
router.patch('/:id' , async (req, res)=>{
    try {
       const post = await Posts.findByIdAndUpdate(req.params.id, req.body);
       if(!post) throw Error('La actualización np pudo ser concretada')
         res.status(200).json({success: true});
    } catch (err) {
         res.status(400).json({msg: err})
    }
});

module.exports = router;