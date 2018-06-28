var express = require('express');
var router = express.Router();
const {addPost, getListSelf, deletePost, getListAll, searchPost, editPost} = require('../controllers/post.controller')
const {auth} = require('../middleware/auth')
/* GET users listing. */
router.post('/', auth, addPost);
router.get('/profile', auth, getListSelf)
router.get('/home', getListAll)
router.delete('/:id', auth,deletePost)
router.put('/:id', auth, editPost)
router.get('/search', searchPost)

module.exports = router;
