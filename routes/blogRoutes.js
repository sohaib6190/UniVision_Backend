
const express = require('express');
const {
    readBlogs,
    readAllBlogs,
    readSingleBlog,
    addBlog,
    updateBlog,
    deleteBlog,
    upload
} = require('../controllers/blogController');
const router = express.Router();

router.get('/read/blogs', readBlogs);
router.get('/read/blogs/all', readAllBlogs);
router.get('/read/blog', readSingleBlog);
router.post('/add/blogs', upload.single('image'), addBlog);
router.put('/update/blogs/:id', upload.single('image'), updateBlog);
router.delete('/delete/blogs/:id', deleteBlog);

module.exports = router;
