var express = require('express');
var router = express.Router();
const {addPost, getListSelf, deletePost, getListAll, searchPost, editPost} = require('../controllers/post.controller')
const {auth} = require('../middleware/auth')
/* GET users listing. */
router
  .post('/', auth, addPost)
  .get('/profile', auth, getListSelf)
  .get('/home', getListAll)
  .delete('/:id', auth,deletePost)
  .put('/:id', auth, editPost)
  .get('/search', searchPost)

module.exports = router;
