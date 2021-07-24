const express=require('express');
const Blog = require('../models/blog');

const router= express.Router();

router.get('/', (req,res) => {
    Blog.find()
        .then((result) => {
            res.render('index', {title: 'All blogs', blogs: result})
        })
        .catch((err)=>{
            console.log('error occured');
        })
});

router.post('/', (req,res)=>{
    const blog= new Blog(req.body);

    blog.save()
        .then((result) => {
            res.redirect('./blogs');
        })
        .catch((err) => {
            console.log('error occured');
        })
})

router.get('/create',(req,res)=>{
    res.render('create', { title: 'Create new blog'});
});

router.get('/:id', (req,res)=>{
    const id=req.params.id;
    Blog.findById(id)
        .then(result=>{
            res.render('details', {blog: result, title:'Blog details'});
        })
        .catch(err =>{
            console.log('error occured');
        })
})

router.delete('/:id', (req,res)=>{
    const id=req.params.id;

    Blog.findByIdAndDelete(id)
        .then(result=> {
            res.json({redirect:'/blogs'});
        })
        .catch(err=> {
            console.log('error');
        })
})

module.exports = router;
