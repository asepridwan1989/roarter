var express = require('express');
var router = express.Router();
const {addComment, getListAll } = require('../controllers/comment.controller')
/* GET users listing. */
router
  .post('/', addComment)
  .get('/', getListAll)

module.exports = router;
